document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const forgotPasswordLink = document.getElementById('forgot-password');
    
    // Event listeners para formularios
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', handleForgotPassword);
    }
    
    // Verificar si el usuario está logueado
    checkAuthStatus();
    
    // Función para manejar el login
    function handleLogin(event) {
        event.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Validar campos
        if (!email || !password) {
            showNotification('Por favor completa todos los campos');
            return;
        }
        
        // Obtener usuarios registrados
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Buscar usuario
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Guardar sesión
            const session = {
                userId: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin || false,
                timestamp: new Date().getTime()
            };
            
            localStorage.setItem('session', JSON.stringify(session));
            
            // Cerrar modal
            const loginModal = document.getElementById('login-modal');
            if (loginModal) {
                loginModal.classList.remove('show');
            }
            
            // Actualizar UI
            updateAuthUI(session);
            
            showNotification(`Bienvenido, ${user.name}`);
        } else {
            showNotification('Email o contraseña incorrectos');
        }
    }
    
    // Función para manejar el registro
    function handleRegister(event) {
        event.preventDefault();
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        
        // Validar campos
        if (!name || !email || !password || !confirmPassword) {
            showNotification('Por favor completa todos los campos');
            return;
        }
        
        // Validar coincidencia de contraseñas
        if (password !== confirmPassword) {
            showNotification('Las contraseñas no coinciden');
            return;
        }
        
        // Obtener usuarios registrados
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Verificar si el email ya está registrado
        if (users.some(user => user.email === email)) {
            showNotification('Este email ya está registrado');
            return;
        }
        
        // Crear nuevo usuario
        const newUser = {
            id: generateUserId(),
            name,
            email,
            password,
            isAdmin: false,
            createdAt: new Date().getTime()
        };
        
        // Añadir a la lista de usuarios
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Iniciar sesión automáticamente
        const session = {
            userId: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            timestamp: new Date().getTime()
        };
        
        localStorage.setItem('session', JSON.stringify(session));
        
        // Cerrar modal
        const registerModal = document.getElementById('register-modal');
        if (registerModal) {
            registerModal.classList.remove('show');
        }
        
        // Actualizar UI
        updateAuthUI(session);
        
        showNotification('Registro exitoso. ¡Bienvenido!');
    }
    
    // Función para manejar el olvido de contraseña
    function handleForgotPassword(event) {
        event.preventDefault();
        
        const email = prompt('Ingresa tu correo electrónico para recuperar tu contraseña:');
        
        if (!email) return;
        
        // Verificar si el email existe
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email);
        
        if (user) {
            // En un caso real, aquí se enviaría un email con un link para restablecer la contraseña
            // Para esta simulación, simplemente mostramos un mensaje
            
            // Generar un token de recuperación (simulado)
            const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            
            // Guardar el token en localStorage (en un caso real, se guardaría en la base de datos)
            let resetTokens = JSON.parse(localStorage.getItem('reset_tokens')) || {};
            resetTokens[email] = {
                token: resetToken,
                expires: new Date().getTime() + (24 * 60 * 60 * 1000) // 24 horas
            };
            localStorage.setItem('reset_tokens', JSON.stringify(resetTokens));
            
            alert(`Se ha enviado un enlace de recuperación a ${email}. Por favor revisa tu correo.`);
        } else {
            showNotification('No se encontró ninguna cuenta con ese correo electrónico');
        }
    }
    
    // Función para verificar el estado de autenticación
    function checkAuthStatus() {
        const session = JSON.parse(localStorage.getItem('session'));
        
        if (session) {
            // Verificar si la sesión ha expirado (24 horas)
            const now = new Date().getTime();
            const expirationTime = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
            
            if (now - session.timestamp > expirationTime) {
                // Sesión expirada, eliminarla
                localStorage.removeItem('session');
                return;
            }
            
            // Sesión válida, actualizar UI
            updateAuthUI(session);
        }
    }
    
    // Función para actualizar la UI según el estado de autenticación
    function updateAuthUI(session) {
        if (session) {
            // Usuario logueado
            if (loginBtn) {
                loginBtn.textContent = session.name;
                loginBtn.removeEventListener('click', showLoginModal);
                loginBtn.addEventListener('click', showUserMenu);
            }
            
            if (registerBtn) {
                registerBtn.textContent = 'Cerrar sesión';
                registerBtn.removeEventListener('click', showRegisterModal);
                registerBtn.addEventListener('click', handleLogout);
            }
        } else {
            // Usuario no logueado
            if (loginBtn) {
                loginBtn.textContent = 'Iniciar Sesión';
                loginBtn.removeEventListener('click', showUserMenu);
                loginBtn.addEventListener('click', showLoginModal);
            }
            
            if (registerBtn) {
                registerBtn.textContent = 'Registrarse';
                registerBtn.removeEventListener('click', handleLogout);
                registerBtn.addEventListener('click', showRegisterModal);
            }
        }
    }
    
    // Función para mostrar el modal de login
    function showLoginModal() {
        const loginModal = document.getElementById('login-modal');
        if (loginModal) {
            loginModal.classList.add('show');
        }
    }
    
    // Función para mostrar el modal de registro
    function showRegisterModal() {
        const registerModal = document.getElementById('register-modal');
        if (registerModal) {
            registerModal.classList.add('show');
        }
    }
    
    // Función para mostrar menú de usuario (podría expandirse en una aplicación real)
    function showUserMenu() {
        // Aquí se implementaría un menú desplegable con opciones de usuario
        // Para esta simulación, simplemente mostramos un mensaje
        alert('Esta función estaría disponible en una implementación completa.');
    }
    
    // Función para manejar el cierre de sesión
    function handleLogout() {
        if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            localStorage.removeItem('session');
            updateAuthUI(null);
            showNotification('Sesión cerrada correctamente');
        }
    }
    
    // Función para generar ID único de usuario
    function generateUserId() {
        return 'user_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}); 