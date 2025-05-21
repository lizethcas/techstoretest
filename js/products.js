// Productos de la tienda
const products = [
    {
        id: 1,
        name: "Laptop HP Pavilion",
        price: 799.99,
        description: "Laptop HP Pavilion con procesador Intel Core i5, 8GB RAM, 512GB SSD, pantalla de 15.6 pulgadas.",
        image: "../img/products/laptop-hp.jpg",
        category: "tecnologia",
        stock: 15,
        featured: true
    },
    {
        id: 2,
        name: "Smartphone Samsung Galaxy S21",
        price: 699.99,
        description: "Samsung Galaxy S21 con pantalla AMOLED de 6.2 pulgadas, 8GB RAM, 128GB almacenamiento, cámara triple de 64MP.",
        image: "../img/products/samsung-s21.jpg",
        category: "tecnologia",
        stock: 20,
        featured: true
    },
    {
        id: 3,
        name: "Auriculares Sony WH-1000XM4",
        price: 349.99,
        description: "Auriculares inalámbricos con cancelación de ruido, 30 horas de batería, sonido de alta resolución.",
        image: "../img/products/sony-headphones.jpg",
        category: "accesorios",
        stock: 25,
        featured: true
    },
    {
        id: 4,
        name: "Smart TV LG 55 pulgadas",
        price: 549.99,
        description: "Smart TV LG 4K UHD de 55 pulgadas, tecnología OLED, compatible con HDR y Dolby Vision.",
        image: "../img/products/lg-tv.jpg",
        category: "tecnologia",
        stock: 10,
        featured: true
    },
    {
        id: 5,
        name: "Teclado mecánico Logitech G Pro",
        price: 129.99,
        description: "Teclado mecánico gaming con switches GX Blue Clicky, RGB personalizable, formato compacto sin teclado numérico.",
        image: "../img/products/logitech-keyboard.jpg",
        category: "accesorios",
        stock: 30,
        featured: false
    },
    {
        id: 6,
        name: "Monitor Dell Ultrasharp 27\"",
        price: 399.99,
        description: "Monitor Dell Ultrasharp de 27 pulgadas, resolución QHD (2560x1440), panel IPS, conectividad USB-C.",
        image: "../img/products/dell-monitor.jpg",
        category: "tecnologia",
        stock: 8,
        featured: false
    },
    {
        id: 7,
        name: "iPad Air 4",
        price: 599.99,
        description: "iPad Air 4 con pantalla Liquid Retina de 10.9 pulgadas, chip A14 Bionic, 64GB, compatible con Apple Pencil.",
        image: "../img/products/ipad-air.jpg",
        category: "tecnologia",
        stock: 12,
        featured: true
    },
    {
        id: 8,
        name: "Cafetera Nespresso Vertuo",
        price: 179.99,
        description: "Cafetera Nespresso Vertuo con tecnología Centrifusion, 5 tamaños de taza, incluye kit de bienvenida con cápsulas.",
        image: "../img/products/nespresso.jpg",
        category: "hogar",
        stock: 18,
        featured: false
    },
    {
        id: 9,
        name: "Aspiradora robot Roomba i7+",
        price: 799.99,
        description: "Aspiradora robot Roomba i7+ con vaciado automático, mapeo inteligente, ideal para hogares con mascotas.",
        image: "../img/products/roomba.jpg",
        category: "hogar",
        stock: 7,
        featured: false
    },
    {
        id: 10,
        name: "Smartwatch Apple Watch Series 7",
        price: 399.99,
        description: "Apple Watch Series 7 con pantalla siempre activa, medición de oxígeno en sangre, GPS, resistente al agua.",
        image: "../img/products/apple-watch.jpg",
        category: "accesorios",
        stock: 22,
        featured: true
    },
    {
        id: 11,
        name: "Licuadora Ninja Professional",
        price: 99.99,
        description: "Licuadora Ninja Professional de 1000W, jarra de 72oz, tecnología Total Crushing para hielo y alimentos congelados.",
        image: "../img/products/ninja-blender.jpg",
        category: "hogar",
        stock: 15,
        featured: false
    },
    {
        id: 12,
        name: "Consola PlayStation 5",
        price: 499.99,
        description: "Consola PlayStation 5 con unidad de disco, control DualSense, SSD de alta velocidad para carga rápida.",
        image: "../img/products/ps5.jpg",
        category: "tecnologia",
        stock: 5,
        featured: true
    },
    {
        id: 13,
        name: "Cámara Canon EOS R6",
        price: 2499.99,
        description: "Cámara Canon EOS R6 sin espejo, sensor full-frame de 20.1MP, grabación 4K, estabilización de imagen en el cuerpo.",
        image: "../img/products/canon-camera.jpg",
        category: "tecnologia",
        stock: 3,
        featured: false
    },
    {
        id: 14,
        name: "Altavoz inteligente Amazon Echo",
        price: 99.99,
        description: "Altavoz inteligente Amazon Echo con Alexa, sonido premium, hub de hogar inteligente integrado.",
        image: "../img/products/amazon-echo.jpg",
        category: "tecnologia",
        stock: 28,
        featured: false
    },
    {
        id: 15,
        name: "Silla de oficina ergonómica",
        price: 249.99,
        description: "Silla de oficina ergonómica con soporte lumbar ajustable, apoyabrazos 3D, malla transpirable, ideal para largas horas de trabajo.",
        image: "../img/products/office-chair.jpg",
        category: "hogar",
        stock: 10,
        featured: false
    },
    {
        id: 16,
        name: "Zapatillas Nike Air Max",
        price: 129.99,
        description: "Zapatillas Nike Air Max con tecnología de amortiguación, malla transpirable, ideales para running o uso casual.",
        image: "../img/products/nike-shoes.jpg",
        category: "moda",
        stock: 20,
        featured: false
    },
    {
        id: 17,
        name: "Batidora KitchenAid",
        price: 349.99,
        description: "Batidora de pie KitchenAid Artisan de 5 cuartos, 10 velocidades, incluye accesorios para amasar, mezclar y batir.",
        image: "../img/products/kitchenaid.jpg",
        category: "hogar",
        stock: 8,
        featured: false
    },
    {
        id: 18,
        name: "Chaqueta Columbia impermeable",
        price: 89.99,
        description: "Chaqueta Columbia impermeable con tecnología Omni-Tech, costuras selladas, capucha ajustable, perfecta para actividades al aire libre.",
        image: "../img/products/columbia-jacket.jpg",
        category: "moda",
        stock: 15,
        featured: false
    },
    {
        id: 19,
        name: "Freidora de aire Ninja",
        price: 119.99,
        description: "Freidora de aire Ninja de 5.5 cuartos, tecnología de circulación de aire para freír con poco o ningún aceite, 6 funciones en 1 electrodoméstico.",
        image: "../img/products/air-fryer.jpg",
        category: "hogar",
        stock: 12,
        featured: false
    },
    {
        id: 20,
        name: "Reloj Garmin Forerunner 245",
        price: 299.99,
        description: "Reloj GPS para correr Garmin Forerunner 245, monitorización de rendimiento, seguimiento de salud, conectividad Bluetooth.",
        image: "../img/products/garmin-watch.jpg",
        category: "accesorios",
        stock: 9,
        featured: false
    },
    {
        id: 21,
        name: "Mochila para portátil Targus",
        price: 59.99,
        description: "Mochila para portátil Targus de hasta 15.6 pulgadas, múltiples compartimentos, acolchada, resistente al agua.",
        image: "../img/products/laptop-backpack.jpg",
        category: "accesorios",
        stock: 25,
        featured: false
    },
    {
        id: 22,
        name: "Cinta de correr NordicTrack",
        price: 1499.99,
        description: "Cinta de correr NordicTrack con pantalla táctil HD, inclinación ajustable, programas de entrenamiento, compatibilidad con iFit.",
        image: "../img/products/treadmill.jpg",
        category: "salud",
        stock: 4,
        featured: false
    },
    {
        id: 23,
        name: "Báscula inteligente Withings",
        price: 99.99,
        description: "Báscula inteligente Withings Body+ con análisis de composición corporal, sincronización con aplicación, reconocimiento automático de usuarios.",
        image: "../img/products/smart-scale.jpg",
        category: "salud",
        stock: 18,
        featured: false
    },
    {
        id: 24,
        name: "Set de mancuernas ajustables",
        price: 349.99,
        description: "Set de mancuernas ajustables Bowflex SelectTech de 5 a 52.5 libras, reemplazan 15 pares de mancuernas, ajuste rápido de peso.",
        image: "../img/products/dumbbells.jpg",
        category: "salud",
        stock: 7,
        featured: false
    }
];

// Función para obtener productos por categoría
function getProductsByCategory(category) {
    if (category === 'todos') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Función para obtener productos destacados
function getFeaturedProducts() {
    return products.filter(product => product.featured);
}

// Función para obtener un producto por su ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// Función para buscar productos por nombre
function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Función para ordenar productos
function sortProducts(productsArray, sortOption) {
    let sortedProducts = [...productsArray];
    
    switch(sortOption) {
        case 'precio-asc':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'precio-desc':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'nombre-asc':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'nombre-desc':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            // Por defecto no se ordena (relevancia)
            break;
    }
    
    return sortedProducts;
}

// Función para filtrar productos por precio
function filterProductsByPrice(productsArray, minPrice) {
    return productsArray.filter(product => product.price >= minPrice);
} 