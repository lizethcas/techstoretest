document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const cartItemsContainer = document.getElementById('cart-items');
    const cartEmptyDiv = document.getElementById('cart-empty');
    const cartContentDiv = document.getElementById('cart-content');
    const subtotalElement = document.getElementById('cart-subtotal');
    const taxElement = document.getElementById('cart-tax');
    const shippingElement = document.getElementById('cart-shipping');
    const totalElement = document.getElementById('cart-total');
    const emptyCartBtn = document.getElementById('vaciar-carrito');
    const checkoutBtn = document.getElementById('continuar-compra');
    
    // Inicializar contador del carrito
    updateCartCount();
    
    // Inicializar modales
    initializeModals();
    
    // Constantes para cálculos
    const TAX_RATE = 0.19; // 19% de impuesto
    const SHIPPING_COST = 10; // Costo fijo de envío
    const FREE_SHIPPING_THRESHOLD = 100; // Envío gratis a partir de $100
    
    // Cargar los productos del carrito
    loadCartItems();
    
    // Event listeners
    if (emptyCartBtn) {
        emptyCartBtn.addEventListener('click', emptyCart);
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', startCheckout);
    }
    
    // Para el checkout paso a paso
    const shippingNextBtn = document.getElementById('shipping-next');
    const paymentNextBtn = document.getElementById('payment-next');
    const paymentPrevBtn = document.getElementById('payment-prev');
    const confirmationPrevBtn = document.getElementById('confirmation-prev');
    const completePurchaseBtn = document.getElementById('complete-purchase');
    
    if (shippingNextBtn) {
        shippingNextBtn.addEventListener('click', goToPaymentStep);
    }
    
    if (paymentNextBtn) {
        paymentNextBtn.addEventListener('click', goToConfirmationStep);
    }
    
    if (paymentPrevBtn) {
        paymentPrevBtn.addEventListener('click', goToShippingStep);
    }
    
    if (confirmationPrevBtn) {
        confirmationPrevBtn.addEventListener('click', goToPaymentStep);
    }
    
    if (completePurchaseBtn) {
        completePurchaseBtn.addEventListener('click', completePurchase);
    }
    
    // Escuchar cambios en el método de pago
    const paymentMethodRadios = document.querySelectorAll('input[name="payment-method"]');
    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', toggleCardFields);
    });
    
    // Función para cargar los productos del carrito
    function loadCartItems() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Mostrar mensaje si el carrito está vacío
        if (cart.length === 0) {
            if (cartEmptyDiv) cartEmptyDiv.classList.remove('hidden');
            if (cartContentDiv) cartContentDiv.classList.add('hidden');
            return;
        } else {
            if (cartEmptyDiv) cartEmptyDiv.classList.add('hidden');
            if (cartContentDiv) cartContentDiv.classList.remove('hidden');
        }
        
        // Limpiar contenedor
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            
            // Crear filas del carrito
            cart.forEach(item => {
                const row = document.createElement('tr');
                
                // Usar una imagen de placeholder
                const imagePath = item.image || '../img/placeholder.jpg';
                
                row.innerHTML = `
                    <td>
                        <div class="cart__item-details">
                            <img src="${imagePath}" alt="${item.name}" class="cart__item-img">
                            <div>
                                <p class="cart__item-title">${item.name}</p>
                            </div>
                        </div>
                    </td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>
                        <div class="cart__quantity">
                            <button class="cart__quantity-btn decrease">-</button>
                            <input type="number" class="cart__quantity-input" value="${item.quantity}" min="1" max="99">
                            <button class="cart__quantity-btn increase">+</button>
                        </div>
                    </td>
                    <td>$${(item.price * item.quantity).toFixed(2)}</td>
                    <td><span class="cart__remove" data-id="${item.id}">🗑️</span></td>
                `;
                
                cartItemsContainer.appendChild(row);
                
                // Añadir eventos a los botones de cantidad
                const decreaseBtn = row.querySelector('.decrease');
                const increaseBtn = row.querySelector('.increase');
                const quantityInput = row.querySelector('.cart__quantity-input');
                const removeBtn = row.querySelector('.cart__remove');
                
                // Disminuir cantidad
                decreaseBtn.addEventListener('click', function() {
                    if (item.quantity > 1) {
                        item.quantity--;
                        quantityInput.value = item.quantity;
                        updateCartItem(item);
                    }
                });
                
                // Aumentar cantidad
                increaseBtn.addEventListener('click', function() {
                    item.quantity++;
                    quantityInput.value = item.quantity;
                    updateCartItem(item);
                });
                
                // Cambio manual de cantidad
                quantityInput.addEventListener('change', function() {
                    const newQuantity = parseInt(this.value);
                    
                    if (newQuantity < 1) {
                        this.value = 1;
                        item.quantity = 1;
                    } else {
                        item.quantity = newQuantity;
                    }
                    
                    updateCartItem(item);
                });
                
                // Eliminar producto
                removeBtn.addEventListener('click', function() {
                    removeFromCart(item.id);
                });
            });
        }
        
        // Actualizar totales
        updateCartTotals();
    }
    
    // Función para actualizar un producto del carrito
    function updateCartItem(updatedItem) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Encontrar y actualizar el item
        cart = cart.map(item => {
            if (item.id === updatedItem.id) {
                return updatedItem;
            }
            return item;
        });
        
        // Guardar el carrito actualizado
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Recargar los productos y totales
        loadCartItems();
        updateCartCount();
    }
    
    // Función para eliminar un producto del carrito
    function removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Filtrar el producto
        cart = cart.filter(item => item.id !== productId);
        
        // Guardar el carrito actualizado
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Recargar los productos
        loadCartItems();
        updateCartCount();
        
        // Mostrar mensaje
        showNotification('Producto eliminado del carrito');
    }
    
    // Función para vaciar el carrito
    function emptyCart() {
        // Confirmar con el usuario
        if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
            localStorage.removeItem('cart');
            loadCartItems();
            updateCartCount();
            showNotification('Carrito vaciado correctamente');
        }
    }
    
    // Función para actualizar los totales del carrito
    function updateCartTotals() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Calcular subtotal
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        // Calcular impuestos
        const tax = subtotal * TAX_RATE;
        
        // Calcular envío
        const shipping = subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
        
        // Calcular total
        const total = subtotal + tax + shipping;
        
        // Actualizar elementos del DOM
        if (subtotalElement) subtotalElement.textContent = '$' + subtotal.toFixed(2);
        if (taxElement) taxElement.textContent = '$' + tax.toFixed(2);
        if (shippingElement) {
            if (shipping === 0) {
                shippingElement.textContent = 'Gratis';
            } else {
                shippingElement.textContent = '$' + shipping.toFixed(2);
            }
        }
        if (totalElement) totalElement.textContent = '$' + total.toFixed(2);
    }
    
    // Función para iniciar el proceso de checkout
    function startCheckout() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Verificar que el carrito no esté vacío
        if (cart.length === 0) {
            showNotification('No hay productos en el carrito');
            return;
        }
        
        // Abrir modal de checkout
        const checkoutModal = document.getElementById('checkout-modal');
        if (checkoutModal) {
            checkoutModal.classList.add('show');
            
            // Mostrar el primer paso
            goToShippingStep();
        }
    }
    
    // Funciones para navegación del checkout
    function goToShippingStep() {
        setActiveStep(1);
        
        // Ocultar todos los formularios y mostrar el de envío
        document.querySelectorAll('.checkout-form').forEach(form => {
            form.classList.remove('checkout-form--active');
        });
        
        const shippingForm = document.getElementById('shipping-form');
        if (shippingForm) {
            shippingForm.classList.add('checkout-form--active');
        }
    }
    
    function goToPaymentStep() {
        // Validar formulario de envío
        const shippingForm = document.getElementById('shipping-form');
        if (shippingForm && !shippingForm.checkValidity()) {
            shippingForm.reportValidity();
            return;
        }
        
        setActiveStep(2);
        
        // Ocultar todos los formularios y mostrar el de pago
        document.querySelectorAll('.checkout-form').forEach(form => {
            form.classList.remove('checkout-form--active');
        });
        
        const paymentForm = document.getElementById('payment-form');
        if (paymentForm) {
            paymentForm.classList.add('checkout-form--active');
        }
        
        // Mostrar/ocultar campos de tarjeta según el método seleccionado
        toggleCardFields();
    }
    
    function goToConfirmationStep() {
        // Validar formulario de pago si se seleccionó tarjeta
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
        const paymentForm = document.getElementById('payment-form');
        
        if (paymentMethod === 'card') {
            const cardFields = document.querySelectorAll('#card-fields input');
            let isValid = true;
            
            cardFields.forEach(field => {
                if (!field.value) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                showNotification('Por favor completa todos los campos de la tarjeta');
                return;
            }
        }
        
        setActiveStep(3);
        
        // Ocultar todos los formularios y mostrar la confirmación
        document.querySelectorAll('.checkout-form').forEach(form => {
            form.classList.remove('checkout-form--active');
        });
        
        const confirmationForm = document.getElementById('confirmation');
        if (confirmationForm) {
            confirmationForm.classList.add('checkout-form--active');
            
            // Rellenar datos de confirmación
            fillConfirmationData();
        }
    }
    
    // Función para marcar el paso activo
    function setActiveStep(stepNumber) {
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('step--active');
            if (parseInt(step.dataset.step) === stepNumber) {
                step.classList.add('step--active');
            }
        });
    }
    
    // Función para mostrar/ocultar campos de tarjeta
    function toggleCardFields() {
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
        const cardFields = document.getElementById('card-fields');
        
        if (!paymentMethod || !cardFields) return;
        
        if (paymentMethod.value === 'card') {
            cardFields.style.display = 'block';
        } else {
            cardFields.style.display = 'none';
        }
    }
    
    // Función para rellenar datos en el paso de confirmación
    function fillConfirmationData() {
        // Obtener elementos de confirmación
        const confirmAddress = document.getElementById('confirm-address');
        const confirmCityZip = document.getElementById('confirm-city-zip');
        const confirmPhone = document.getElementById('confirm-phone');
        const confirmPayment = document.getElementById('confirm-payment');
        const confirmProducts = document.getElementById('confirm-products');
        const confirmTotal = document.getElementById('confirm-total');
        
        // Obtener datos de envío
        const shippingName = document.getElementById('shipping-name').value;
        const shippingAddress = document.getElementById('shipping-address').value;
        const shippingCity = document.getElementById('shipping-city').value;
        const shippingZip = document.getElementById('shipping-zip').value;
        const shippingPhone = document.getElementById('shipping-phone').value;
        
        // Obtener método de pago
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
        let paymentText = '';
        
        switch(paymentMethod) {
            case 'card':
                const cardNumber = document.getElementById('card-number').value;
                const lastDigits = cardNumber.slice(-4);
                paymentText = `Tarjeta de crédito terminada en ${lastDigits}`;
                break;
            case 'transfer':
                paymentText = 'Transferencia bancaria';
                break;
            case 'cash':
                paymentText = 'Pago contraentrega';
                break;
        }
        
        // Rellenar datos de envío
        if (confirmAddress) confirmAddress.textContent = `${shippingName}, ${shippingAddress}`;
        if (confirmCityZip) confirmCityZip.textContent = `${shippingCity}, ${shippingZip}`;
        if (confirmPhone) confirmPhone.textContent = shippingPhone;
        
        // Rellenar método de pago
        if (confirmPayment) confirmPayment.textContent = paymentText;
        
        // Rellenar productos
        if (confirmProducts) {
            confirmProducts.innerHTML = '';
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            cart.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
                confirmProducts.appendChild(li);
            });
        }
        
        // Rellenar total
        if (confirmTotal && totalElement) {
            confirmTotal.textContent = totalElement.textContent;
        }
    }
    
    // Función para completar la compra
    function completePurchase() {
        // Simular procesamiento
        showNotification('Procesando compra...');
        
        setTimeout(function() {
            // Cerrar modal de checkout
            const checkoutModal = document.getElementById('checkout-modal');
            if (checkoutModal) {
                checkoutModal.classList.remove('show');
            }
            
            // Mostrar modal de éxito
            const successModal = document.getElementById('success-modal');
            if (successModal) {
                successModal.classList.add('show');
                
                // Generar número de orden aleatorio
                const orderNumber = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
                const orderNumberElement = document.getElementById('order-number');
                if (orderNumberElement) {
                    orderNumberElement.textContent = orderNumber;
                }
            }
            
            // Vaciar el carrito
            localStorage.removeItem('cart');
            updateCartCount();
            
        }, 2000);
    }
}); 