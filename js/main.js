document.addEventListener('DOMContentLoaded', function() {
    // Cargar productos destacados en la página principal
    loadFeaturedProducts();
    
    // Inicializar contadores del carrito
    updateCartCount();
    
    // Inicializar modales
    initializeModals();
});

// Función para cargar productos destacados
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;
    
    const featuredProducts = getFeaturedProducts();
    
    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        featuredContainer.appendChild(productCard);
    });
}

// Función para crear una tarjeta de producto
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.dataset.id = product.id;
    
    // Usar una imagen de placeholder en caso de que las imágenes no estén disponibles
    const imagePath = product.image || 'img/placeholder.jpg';
    
    productCard.innerHTML = `
        <div class="product-card__img-container">
            <img src="${imagePath}" alt="${product.name}" class="product-card__img">
        </div>
        <div class="product-card__content">
            <h3 class="product-card__title">${product.name}</h3>
            <p class="product-card__price">$${product.price.toFixed(2)}</p>
            <p class="product-card__stock">${product.stock > 0 ? `Stock: ${product.stock}` : 'Agotado'}</p>
            <button class="product-card__btn btn ${product.stock === 0 ? 'disabled' : ''}" ${product.stock === 0 ? 'disabled' : ''}>
                ${product.stock > 0 ? 'Agregar al carrito' : 'Agotado'}
            </button>
        </div>
    `;
    
    // Añadir evento al botón de agregar al carrito
    const addToCartBtn = productCard.querySelector('.product-card__btn');
    if (product.stock > 0) {
        addToCartBtn.addEventListener('click', () => {
            addToCart(product);
        });
    }
    
    return productCard;
}

// Función para agregar un producto al carrito
function addToCart(product) {
    // Obtener el carrito del localStorage o crear uno nuevo si no existe
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Verificar si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex >= 0) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        cart[existingProductIndex].quantity += 1;
    } else {
        // Si no está en el carrito, añadirlo con cantidad 1
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Actualizar el contador del carrito
    updateCartCount();
    
    // Mostrar mensaje de confirmación
    showNotification('Producto añadido al carrito');
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart__count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Calcular el total de productos en el carrito
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Actualizar todos los contadores del carrito en la página
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Función para mostrar notificaciones
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Añadir al DOM
    document.body.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Inicializar modales
function initializeModals() {
    // Botones para abrir modales
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const forgotPasswordLink = document.getElementById('forgot-password');
    
    // Modales
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    
    // Botones para cerrar modales
    const closeButtons = document.querySelectorAll('.modal__close');
    
    // Eventos para abrir modales
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', () => {
            loginModal.classList.add('show');
        });
    }
    
    if (registerBtn && registerModal) {
        registerBtn.addEventListener('click', () => {
            registerModal.classList.add('show');
        });
    }
    
    // Eventos para cerrar modales
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.classList.remove('show');
            }
        });
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', (e) => {
        document.querySelectorAll('.modal.show').forEach(modal => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    });
    
    // Evitar que el clic dentro del contenido del modal cierre el modal
    document.querySelectorAll('.modal__content').forEach(content => {
        content.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
}

// Estilo CSS para notificaciones
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--color-primary);
        color: white;
        padding: 10px 20px;
        border-radius: var(--border-radius-md);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
        transform: translateY(100px);
        opacity: 0;
        transition: transform 0.3s, opacity 0.3s;
        z-index: 9999;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
`;
document.head.appendChild(notificationStyles); 