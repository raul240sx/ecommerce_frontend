# GuitarZone - Frontend E-commerce

Plataforma de comercio electrónico especializada en instrumentos y accesorios musicales para guitarristas. Este frontend consume la API de guitarzone.cl y proporciona una experiencia de compra fluida, adaptable a dispositivos móviles y con funcionalidades completas de carrito, checkout y gestión de pedidos.

## 🚀 Características principales

### 🛍️ Catálogo y Browsing
- **Visualización de productos**: Catálogo completo de guitarras, amplificadores y accesorios musicales.
- **Filtrado por categorías**: Los usuarios pueden filtrar productos por tipo de instrumento (Guitarras, Amplificadores, Accesorios).
- **Página de detalle de producto**: Información completa del producto con imágenes, descripción, precio y disponibilidad.
- **Home page destacada**: Exhibición de productos por categoría con hero image adaptable a móviles.

### 👤 Autenticación y Gestión de Usuarios
- **Registro de usuarios**: Formulario personalizado para crear cuenta con validaciones.
- **Login**: Autenticación mediante email en lugar de username.
- **Recuperación de contraseña**: Funcionalidad para resetear contraseña olvidada.
- **Verificación de email**: Sistema de verificación de correo electrónico tras el registro.
- **Sesión persistente**: Mantenimiento automático de sesión al recargar la página.

### 🛒 Carrito de Compras
- **Gestión del carrito a nivel frontend**: Almacenamiento local mediante localStorage.
- **Operaciones completas**: Agregar artículos, actualizar cantidades, eliminar productos.
- **Cálculo dinámico de totales**: Cálculo automático de precios y cantidades.
- **Persistencia de datos**: El carrito se mantiene entre sesiones del navegador.
- **Validación de stock**: El sistema respeta los limites de stock de cada producto.

### 💳 Proceso de Compra
- **Página de carrito**: Visualización en grid desktop y list mobile del carrito actual.
- **Modalidad educativa**: Modal de advertencia destacando que es una plataforma de demostración.
- **Checkout**: Formulario de finalización de compra con selección de dirección de envío.
- **Gestión de direcciones**: Crear, editar y seleccionar direcciones de envío principales.
- **Estados de pago**: Manejo de estados de pago (éxito, fallos, pendientes).

### 👥 Dashboard de Usuario
- **Mi Cuenta**: Visualización y edición de datos personales del usuario.
- **Mis Pedidos**: Historial completo de órdenes con estado y detalles.
- **Mis Direcciones**: Gestión de direcciones de envío registradas.
- **Detalle de pedido**: Visualización detallada de cada orden realizada.

### 📱 Diseño Responsivo
- **Mobile first**: Interfaces optimizadas para dispositivos móviles.
- **Desktop experience**: Vista mejorada para pantallas de escritorio.
- **Componentes adaptables**: Componentes que se ajustan según tamaño de pantalla.

### ℹ️ Páginas Informativas
- **About**: Información sobre la tienda y el equipo.
- **Legal**: Página de términos y condiciones y políticas de privacidad.
- **Advertencia educativa**: Banner destacado indicando que es un proyecto con fines educativos.

## 🛠️ Tecnologías utilizadas

| Categoría | Tecnología |
|-----------|-----------|
| **Frontend** | React 19.2.0 |
| **Build Tool** | Vite 7.2.4 |
| **Routing** | React Router DOM 7.11.0 |
| **State Management** | Context API, Hooks personalizados |
| **HTTP Client** | Axios 1.13.2 |
| **Almacenamiento** | localStorage (carrito) |
| **Estilos** | CSS modular (SCSS/CSS puro) |
| **Linting** | ESLint 9.39.1 |
| **Contenedores** | Docker & Docker Compose |
| **Reverse Proxy** | Nginx |
| **Tunneling** | Cloudflare Tunnel |
| **Control de versiones** | Git & GitHub |

## 📂 Estructura del proyecto

```
ecommerce_frontend/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js                 # Configuración de Axios
│   │   │   ├── orderService.js         # Servicio de órdenes
│   │   │   └── productService.js       # Servicio de productos
│   │   ├── components/
│   │   │   ├── addresses/               # Componentes de direcciones
│   │   │   ├── common/                  # Componentes reutilizables
│   │   │   ├── footer/                  # Footer
│   │   │   ├── layouts/                 # Layouts principales
│   │   │   ├── navbar/                  # Navegación (desktop/mobile)
│   │   │   ├── orders/                  # Componentes de órdenes
│   │   │   └── products/                # Componentes de productos
│   │   ├── context/
│   │   │   ├── AuthContext.jsx          # Contexto de autenticación
│   │   │   └── CartContext.jsx          # Contexto de carrito
│   │   ├── hooks/
│   │   │   ├── useCooldown.js          # Hook para cooldowns
│   │   │   ├── useOrders.js            # Hook para órdenes
│   │   │   └── useProducts.js          # Hook para productos
│   │   ├── pages/
│   │   │   ├── about/                   # Páginas informativas
│   │   │   ├── cart/                    # Carrito y checkout
│   │   │   ├── home/                    # Homepage
│   │   │   ├── login/                   # Autenticación
│   │   │   ├── orders/                  # Detalle de órdenes
│   │   │   ├── payment/                 # Estados de pago
│   │   │   ├── products/                # Catálogo y detalle
│   │   │   ├── register/                # Registro
│   │   │   └── user/                    # Dashboard de usuario
│   │   ├── utils/                       # Utilidades
│   │   ├── assets/                      # Imágenes y recursos
│   │   ├── App.jsx                      # Componente raíz
│   │   ├── App.css                      # Estilos globales
│   │   ├── main.jsx                     # Entrada de la aplicación
│   │   └── index.css                    # Estilos base
│   ├── public/                          # Archivos estáticos públicos
│   ├── .env                             # Variables de entorno
│   ├── Dockerfile                       # Dockerfile para el contenedor
│   ├── package.json                     # Dependencias del proyecto
│   ├── vite.config.js                   # Configuración de Vite
│   ├── eslint.config.js                 # Configuración de ESLint
│   └── README.md                        # Este archivo
├── nginx/
│   └── default.conf                     # Configuración de Nginx
├── docker-compose.yml                   # Orquestación de servicios
└── .env                                 # Variables de entorno globales
```

## ⚙️ Instalación y configuración

La forma recomendada de ejecutar este proyecto es mediante Docker Compose. No es necesario crear entornos virtuales manualmente.

### 1. Clonar repositorio

```bash
git clone https://github.com/raul240sx/ecommerce_frontend.git
cd ecommerce_frontend
```

### 2. Configurar archivos .env

Debes crear dos archivos .env en ubicaciones distintas:

📌 **En la raíz del proyecto (.env para docker-compose.yml):**

```env
# API Gateway (necesario si usas Cloudflare Tunnel)
TUNNEL_TOKEN=tu_token_cloudflare_tunnel

# Puedes agregar otras variables de entorno necesarias
```

📌 **Dentro de frontend/.env (para configuración del frontend):**

```env
# Configuración de la API backend
VITE_API_BASE_URL=https://api.guitarzone.cl
# O para desarrollo local:
# VITE_API_BASE_URL=http://localhost:8000
```

⚠️ **Nota:** Reemplaza los valores con los tuyos propios. El TUNNEL_TOKEN debe ser obtenido desde Cloudflare si usas tunneling.

### 3. Levantar contenedores

```bash
docker-compose up --build
```

El proyecto quedará disponible en:
- **Frontend (Desarrollo)**: http://localhost:5173
- **Frontend (Producción/Nginx)**: http://localhost:80
- **API Backend**: https://api.guitarzone.cl (externa)

### 4. Ejecución en desarrollo local (sin Docker)

Si prefieres ejecutar sin Docker:

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo con Vite
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint
```

## 📖 Uso de la aplicación

1. **Explorar productos**: Navega por el catálogo de guitarras, amplificadores y accesorios.
2. **Filtrar por categoría**: Usa las categorías para encontrar productos específicos.
3. **Ver detalles**: Haz clic en una producto para ver información detallada.
4. **Agregar al carrito**: Selecciona cantidad y agrega al carrito (sin necesidad de login).
5. **Ir al carrito**: Visualiza tu carrito y edita cantidades o elimina productos.
6. **Proceder al checkout**: 
   - Si no estás logueado, serás redirigido a login.
   - Selecciona o crea una dirección de envío.
   - Completa el formulario de checkout.
7. **Finalizar compra**: Procede al pago (integración con plataforma de pagos).
8. **Mi Cuenta**: Accede al dashboard para ver tu perfil, órdenes y direcciones.

## 🔑 Funcionalidades técnicas destacadas

### Contextos personalizados
- **AuthContext**: Maneja autenticación, sesión persistente y logout.
- **CartContext**: Gestiona el carrito con localStorage, agregar/quitar items, actualizar cantidades.

### Hooks personalizados
- **useProducts**: Obtiene productos con filtros (categoría, límite, offset, stock).
- **useOrders**: Gestiona órdenes con parámetros de búsqueda y filtros.
- **useCooldown**: Hook utilitario para manejar cooldowns (ej: evitar clics múltiples).

### Componentes reutilizables
- **FormatDate**: Formatea fechas según localización.
- **FormatMoney**: Formatea moneda (CLP).
- **FormatStatusOrder**: Muestra estado de órdenes con estilos.
- **ProtectedRoute**: Componente para rutas protegidas que requieren autenticación.
- **ScrollToTop**: Auto-scroll al cambiar de página.

### Manejo de responsividad
- Componentes desktop/mobile específicos (CartPageDesktop, CartPageMobile).
- Media queries en CSS para adaptación automática.
- Detección de tamaño de pantalla en `useEffect`.

## 🔮 Mejoras futuras

- ✅ **Notificaciones visuales**: Toast o notificaciones cuando se agrega producto al carrito.
- ✅ **Dashboard de administración**: Panel para gestión de inventario y órdenes (requiere backend).
- ✅ **Wishlist/Favoritos**: Sistema para guardar productos preferidos.
- ✅ **Reviews y ratings**: Calificaciones y comentarios de usuarios.
- ✅ **Búsqueda avanzada**: Buscador con autocomplete y filtros.
- ✅ **Historial de navegación**: Mostrar productos visitados recientemente.
- ✅ **Carrito persistente en servidor**: Sincronizar carrito en backend para sesiones múltiples.
- ✅ **Integración de métodos de pago**: Integración completa con WebPay, Stripe, etc.
- ✅ **Dark mode**: Tema oscuro opcional.
- ✅ **Optimización SEO**: Metadatos dinámicos, sitemap, robots.txt.
- ✅ **Analytics**: Seguimiento de comportamiento de usuarios.
- ✅ **Internacionalización (i18n)**: Soporte para múltiples idiomas.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Para colaborar:

1. Haz un fork del proyecto.
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`).
3. Haz commit de tus cambios (`git commit -m 'Agrega nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## 📜 Licencia

Este proyecto está bajo la licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente, siempre mencionando al autor original.

## 👨‍💻 Autor

Desarrollado como frontend para guitarzone.cl - Plataforma e-commerce de instrumentos musicales.

**Perfil**: [raul240sx](https://github.com/raul240sx)
**Descripción**: Frontend moderno con React + Vite para aplicaciones e-commerce de alto rendimiento con experiencia de usuario adaptable.

---

**Última actualización**: Abril 2026
