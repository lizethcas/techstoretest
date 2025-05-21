# TechStore Online - Plataforma E-commerce

## Descripción del Proyecto

TechStore Online es una plataforma de comercio electrónico desarrollada como proyecto integrador para una tienda física que busca digitalizar sus operaciones. La plataforma permite a los usuarios explorar productos por categorías, añadirlos a un carrito de compras, gestionar sus pedidos y realizar pagos online.

## Características

- **Catálogo de Productos**: Visualización y búsqueda de productos con filtros por categoría y precio.
- **Autenticación de Usuarios**: Registro e inicio de sesión con validación.
- **Carrito de Compras**: Agregar, eliminar y actualizar productos en el carrito con persistencia en localStorage.
- **Proceso de Checkout**: Flujo paso a paso para finalizar la compra con diferentes métodos de pago.
- **Diseño Responsive**: Interfaz adaptable a diferentes dispositivos (móviles, tablets y escritorio).
- **Interfaz Moderna**: Diseño atractivo utilizando CSS moderno con la metodología BEM.

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica del sitio web.
- **CSS3**: Estilos con metodología BEM, animaciones y diseño responsive.
- **JavaScript**: Interactividad del sitio, manipulación del DOM y gestión del localStorage.
- **Git/GitHub**: Control de versiones y colaboración.

## Estructura del Proyecto

```
/
├── index.html              # Página principal
├── pages/                  # Otras páginas
│   ├── catalogo.html       # Catálogo de productos
│   ├── carrito.html        # Carrito de compras
│   └── ...                 # Otras páginas
├── css/
│   ├── styles.css          # Estilos principales
│   └── responsive.css      # Estilos para responsive design
├── js/
│   ├── main.js             # Script principal
│   ├── products.js         # Datos y funciones de productos
│   ├── catalog.js          # Funcionalidad del catálogo
│   ├── cart.js             # Funcionalidad del carrito
│   └── auth.js             # Autenticación de usuarios
└── img/                    # Imágenes del sitio
    └── products/           # Imágenes de productos
```

## Funcionalidades Implementadas

### Página Principal
- Banner promocional
- Productos destacados
- Navegación a categorías

### Catálogo de Productos
- Filtros por categoría
- Filtro por precio mínimo
- Búsqueda por texto
- Ordenamiento por precio y nombre
- Paginación de resultados

### Carrito de Compras
- Añadir productos al carrito
- Actualizar cantidades
- Eliminar productos
- Cálculo de subtotal, impuestos y envío
- Vaciar carrito

### Autenticación
- Registro de usuarios
- Inicio de sesión
- Recuperación de contraseñas (simulado)
- Persistencia de sesión en localStorage

### Proceso de Compra
- Formulario de datos de envío
- Selección de método de pago
- Confirmación de pedido
- Simulación de procesamiento

## Instalación y Uso

1. Clona el repositorio:
   ```
   git clone https://github.com/tu-usuario/techstore-online.git
   ```

2. Abre el archivo `index.html` en tu navegador para ver el sitio localmente.

3. Para una experiencia completa, es recomendable utilizar un servidor local como Live Server para VSCode.

## Mejoras Futuras

- Integración con backend real para gestión de productos y usuarios
- Implementación de pasarelas de pago reales
- Panel de administración para gestionar productos, pedidos y usuarios
- Historial de pedidos para usuarios registrados
- Sistema de reseñas y valoraciones para productos

## Autor

Desarrollado como parte del proyecto integrador Sprint 2.

## Licencia

Este proyecto está bajo la Licencia MIT. 