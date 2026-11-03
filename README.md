# KALON — Catálogo Editorial & Streetwear DTF

Catálogo web minimalista de alta gama inspirado en la estética editorial en blanco y negro (estilo *GAZU* y *ELYON*). Diseñado específicamente para exhibir prendas terminadas con estampado textil DTF (*Direct To Film*) de ultra-alta definición, selector de tallas y variantes, y coordinación directa de pedidos vía **WhatsApp** sin intermediarios ni pasarelas complejas.

---

## ⚡ Características Principales

- **Diseño Editorial & Streetwear**: Tipografía *Bodoni Moda* y *Plus Jakarta Sans*, contrastes puros en blanco y negro, paleta monocroma y líneas limpias.
- **Logotipo KALON Centrado**: Posicionado en el centro exacto de la barra de navegación en todas las resoluciones (móvil, tablet y PC).
- **Navegación Depurada**: Acceso directo a *Colección*, *Lookbook*, *Contacto*, alternador de tema claro/oscuro y bolsa de compras.
- **Gestión 100% por WhatsApp**: La bolsa de compras calcula totales y variantes sin pedir dirección ni datos bancarios en la web; al pulsar "Enviar Pedido a WhatsApp", el cliente se comunica con atención directa para coordinar entrega, método de pago y despacho.
- **Ficha Técnica DTF**: Cada prenda incluye especificaciones de durabilidad (+50 lavados), micropigmentación a 300 DPI, tabla de medidas en centímetros y galería de alta resolución.
- **Panel Administrativo Oculto**: Accesible mediante `/admin` o `#/admin` para editar precios, prendas, textos de campaña y número de WhatsApp sin tocar código.
- **Listo para GitHub & Navegador Normal**: Configuración con rutas relativas (`base: './'`) para funcionar en **GitHub Pages**, Vercel, Netlify o cualquier servidor web estático.

---

## 🚀 Cómo ejecutarlo en tu computadora (Local)

### Requisitos previos
- Tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).
- Git instalado.

### Pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/TU-USUARIO/TU-REPOSITORIO.git
   cd TU-REPOSITORIO
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abrir en tu navegador:**
   - Abre [http://localhost:3000](http://localhost:3000) o la URL mostrada en tu terminal.

---

## 📦 Cómo compilar para producción

Para generar los archivos estáticos optimizados y listos para subir a cualquier hosting:

```bash
npm run build
```

Esto generará la carpeta `dist/` con el HTML, CSS, JavaScript e imágenes optimizadas.

Para previsualizar la compilación de producción en local:
```bash
npm run preview
```

---

## 🌐 Cómo publicarlo gratis en GitHub Pages

Este proyecto ya incluye el archivo de despliegue automático en `.github/workflows/deploy.yml` y la configuración `base: './'` en `vite.config.ts`.

### Opción 1: Despliegue automático con GitHub Actions (Recomendado)
1. Sube tu código a GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - KALON Editorial Catalog"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
   git push -u origin main
   ```
2. En tu repositorio en GitHub:
   - Ve a **Settings** (Configuración) > **Pages**.
   - En **Build and deployment** > **Source**, selecciona **GitHub Actions**.
3. ¡Listo! En 1-2 minutos tu web estará publicada en `https://TU-USUARIO.github.io/TU-REPOSITORIO/`.

### Opción 2: Despliegue en Vercel o Netlify
- Simplemente conecta tu repositorio en [Vercel](https://vercel.com/) o [Netlify](https://www.netlify.com/).
- El comando de build es `npm run build` y el directorio de salida es `dist`.

---

## ⚙️ Estructura del Proyecto

```
├── public/                 # Archivos estáticos (imágenes de prendas, logo.svg)
│   ├── images/             # Imágenes en alta resolución
│   └── logo.svg            # Isotipo KALON
├── src/
│   ├── components/         # Componentes modulares
│   │   ├── TopBar.tsx      # Barra de navegación con logo centrado
│   │   ├── OrderDrawer.tsx # Bolsa de pedido y derivación a WhatsApp
│   │   ├── HeroSection.tsx # Portada editorial y slider
│   │   ├── ProductCard.tsx # Tarjetas de prendas con micro-interacciones
│   │   ├── ProductDetailModal.tsx # Ficha técnica y tabla de medidas
│   │   └── admin/          # Panel administrativo
│   ├── data/               # Base de datos de prendas y configuración
│   │   ├── products.ts     # Catálogo de prendas DTF
│   │   └── defaultSettings.ts # Textos editoriales y campañas
│   ├── utils/
│   │   └── whatsapp.ts     # Generador de enlaces y mensajes a WhatsApp
│   ├── App.tsx             # Aplicación principal
│   └── main.tsx            # Punto de entrada de React
├── .github/workflows/      # Automatización de GitHub Pages
├── index.html              # HTML con fuentes Google Fonts (Bodoni Moda)
├── package.json            # Scripts y dependencias
├── tailwind.config.js / css# Tailwind CSS v4
└── vite.config.ts          # Configuración Vite con rutas relativas
```

---

## 🖤 Licencia & Derechos
Desarrollado para la marca **KALON** — Todos los derechos reservados.
