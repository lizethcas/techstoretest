document.addEventListener('DOMContentLoaded', function() {
    // Variables para paginación
    let currentPage = 1;
    const productsPerPage = 6;
    let filteredProducts = [...products];
    
    // Referencia a elementos del DOM
    const productsContainer = document.getElementById('productos-container');
    const paginationNumbers = document.getElementById('pagination-numbers');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const sortSelect = document.getElementById('sort-select');
    const categoryRadios = document.querySelectorAll('input[name="categoria"]');
    const priceRangeInput = document.getElementById('precio-min');
    const priceMinValueDisplay = document.getElementById('precio-min-value');
    const applyFiltersBtn = document.getElementById('aplicar-filtros');
    
    // Inicializar contador del carrito
    updateCartCount();
    
    // Inicializar modales
    initializeModals();
    
    // Obtener parámetros de URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('categoria');
    
    // Si hay una categoría en la URL, seleccionar esa categoría
    if (categoryParam) {
        const categoryRadio = document.querySelector(`input[name="categoria"][value="${categoryParam}"]`);
        if (categoryRadio) {
            categoryRadio.checked = true;
        }
    }
    
    // Cargar productos iniciales
    loadProducts();
    
    // Event listeners
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            applyFilters();
        });
    }
    
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            applyFilters();
        });
    }
    
    if (priceRangeInput) {
        priceRangeInput.addEventListener('input', function() {
            if (priceMinValueDisplay) {
                priceMinValueDisplay.textContent = '$' + this.value;
            }
        });
    }
    
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                displayProductsPage(currentPage);
                updatePaginationButtons();
            }
        });
    }
    
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                displayProductsPage(currentPage);
                updatePaginationButtons();
            }
        });
    }

    // Función para cargar productos iniciales
    function loadProducts() {
        // Aplicar filtros iniciales si hay categoría en URL
        if (categoryParam) {
            applyFilters();
        } else {
            // Mostrar todos los productos por defecto
            filteredProducts = [...products];
            displayProductsPage(currentPage);
            updatePaginationUI();
        }
    }

    // Función para buscar productos
    function handleSearch() {
        if (!searchInput) return;
        
        const query = searchInput.value.trim();
        
        if (query !== '') {
            filteredProducts = searchProducts(query);
        } else {
            // Si el campo de búsqueda está vacío, mostrar todos los productos
            filteredProducts = [...products];
        }
        
        // Reiniciar a la primera página
        currentPage = 1;
        
        // Mostrar resultados
        displayProductsPage(currentPage);
        updatePaginationUI();
    }

    // Función para aplicar todos los filtros
    function applyFilters() {
        // Categoría
        let selectedCategory = 'todos';
        categoryRadios.forEach(radio => {
            if (radio.checked) {
                selectedCategory = radio.value;
            }
        });
        
        // Filtrar por categoría
        filteredProducts = getProductsByCategory(selectedCategory);
        
        // Precio mínimo
        if (priceRangeInput) {
            const minPrice = parseInt(priceRangeInput.value);
            filteredProducts = filterProductsByPrice(filteredProducts, minPrice);
        }
        
        // Ordenamiento
        if (sortSelect) {
            const sortOption = sortSelect.value;
            filteredProducts = sortProducts(filteredProducts, sortOption);
        }
        
        // Reiniciar a la primera página
        currentPage = 1;
        
        // Mostrar resultados
        displayProductsPage(currentPage);
        updatePaginationUI();
    }

    // Función para mostrar los productos de la página actual
    function displayProductsPage(page) {
        if (!productsContainer) return;
        
        // Limpiar contenedor
        productsContainer.innerHTML = '';
        
        // Calcular índices
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        
        // Obtener productos para esta página
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
        
        // Mostrar mensaje si no hay productos
        if (paginatedProducts.length === 0) {
            productsContainer.innerHTML = '<p class="no-products">No se encontraron productos que coincidan con tu búsqueda</p>';
            return;
        }
        
        // Crear tarjetas de producto
        paginatedProducts.forEach(product => {
            const productCard = createProductCard(product);
            productsContainer.appendChild(productCard);
        });
    }

    // Función para actualizar los botones de paginación
    function updatePaginationUI() {
        if (!paginationNumbers) return;
        
        // Limpiar paginación
        paginationNumbers.innerHTML = '';
        
        // Calcular número total de páginas
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        
        // Crear botones de página
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('span');
            pageBtn.className = 'pagination__number' + (i === currentPage ? ' active' : '');
            pageBtn.textContent = i;
            
            pageBtn.addEventListener('click', function() {
                currentPage = i;
                displayProductsPage(currentPage);
                updatePaginationButtons();
                
                // Actualizar clases activas
                document.querySelectorAll('.pagination__number').forEach(btn => {
                    btn.classList.remove('active');
                });
                pageBtn.classList.add('active');
            });
            
            paginationNumbers.appendChild(pageBtn);
        }
        
        // Actualizar estado de botones prev/next
        updatePaginationButtons();
    }

    // Función para actualizar estado de botones prev/next
    function updatePaginationButtons() {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        
        if (prevPageBtn) {
            prevPageBtn.disabled = currentPage === 1;
        }
        
        if (nextPageBtn) {
            nextPageBtn.disabled = currentPage === totalPages;
        }
        
        // Actualizar clases activas en números de página
        document.querySelectorAll('.pagination__number').forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.textContent) === currentPage) {
                btn.classList.add('active');
            }
        });
    }

    // Función para crear tarjeta de producto
    function createProductCard(product) {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.id = product.id;
        
        // Usar una imagen de placeholder en caso de que las imágenes no estén disponibles
        const imagePath = product.image || '../img/placeholder.jpg';
        
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
}); 