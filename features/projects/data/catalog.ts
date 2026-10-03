import type { Project } from "../model/project";
import { getAssetPath } from "@/lib/assets";
import cocaColaPic from "@/public/images/cocacola.png";
import portalDatosPic from "@/public/images/portaldedatosabietos.png";
import dragonBallPic from "@/public/images/DragonBallAPI.png";
import callConnectPic from "@/public/images/CallConnect.png";
import mercadoExpressPic from "@/public/images/Mercado-Express.png";
import galleryPic from "@/public/images/Gallery.png";
import tiendaVirtualPic from "@/public/images/Tienda-Virtual.png";

export const projects: Project[] = [
    {
        id: "geomaps", category: "web", title: "GeoMaps",
        description: "Proyecto de inteligencia territorial presentado en mi CV, organizado en un frontend y un backend. Sus repositorios públicos no están disponibles para verificar la implementación actual.",
        tech: [], image: getAssetPath("/images/geomaps-info.svg"), imageKind: "presentation",
        features: ["Proyecto de inteligencia territorial", "Frontend y backend en repositorios separados", "Información técnica pendiente de verificación pública"],
        repositories: [{ label: "Frontend", url: "https://github.com/Naiker12/GeoMaps-Frontend" }, { label: "Backend", url: "https://github.com/Naiker12/GeoMaps-Backend" }],
        repositoryStatus: "Ambos enlaces devuelven 404 sin autenticación. Pueden ser privados, haberse renombrado o no estar disponibles.",
        link: "https://github.com/Naiker12/GeoMaps-Frontend", github: "https://github.com/Naiker12/GeoMaps-Frontend",
        colors: { main: "#38a89b", secondary: "#244b65" }
    },
    {
        id: "mediadock", category: "web", title: "MediaDock",
        description: "Aplicación web para analizar enlaces de video, consultar formatos de descarga y generar clips desde una URL o un archivo local. Combina un frontend React con una API Express y procesamiento multimedia.",
        tech: ["React", "Vite", "TypeScript", "Express", "yt-dlp", "FFmpeg"],
        features: ["Consulta de metadatos, calidad y formatos de video/audio", "Descargas con progreso y cancelación", "Generación de clips desde URL o archivo local", "Historial local y atajos de teclado"],
        image: getAssetPath("/images/mediadock-descarga.png"),
        gallery: [{ image: getAssetPath("/images/mediadock-descarga.png"), label: "Descarga de video" }, { image: getAssetPath("/images/mediadock-clips.png"), label: "Generación de clips" }],
        demo: { url: "https://naiker12.github.io/MediaDock/", label: "Abrir MediaDock", note: "Frontend publicado. Las descargas y los clips requieren una API activa con yt-dlp y FFmpeg; no se ha probado el procesamiento." },
        link: "https://github.com/Naiker12/MediaDock", github: "https://github.com/Naiker12/MediaDock",
        colors: { main: "#8e65de", secondary: "#344a82" }
    },
    {
        id: "sentinel-ai", category: "desktop", title: "SentinelAI",
        description: "MVP de percepción visual que procesa una cámara local con YOLOv8, registra detecciones y analiza eventos de riesgo. Incluye APIs y un dashboard local con almacenamiento en Supabase e integración opcional con n8n.",
        tech: ["Python", "OpenCV", "YOLOv8", "FastAPI", "Streamlit", "Supabase", "Prisma", "n8n"],
        features: ["Detección con cámara local y modelo entrenado", "Análisis y registro estructurado de eventos", "Dashboard local conectado a Supabase", "Integración opcional con n8n y alertas", "Herramientas para captura de dataset y diagnóstico de cámara"],
        image: getAssetPath("/icons/apps/sentinel.svg"), imageKind: "presentation",
        link: "https://github.com/Naiker12/SentinelAI", github: "https://github.com/Naiker12/SentinelAI",
        colors: { main: "#4b9ee4", secondary: "#263757" }
    },
    {
        id: "sparta-agent", category: "desktop", title: "Sparta Agent",
        description: "Aplicación de escritorio para desarrollar software con agentes de IA por API. Reúne chat, contexto de proyecto, revisión de cambios, terminal e integraciones MCP con control humano de las acciones.",
        tech: ["React", "Electron", "Vite", "Tailwind", "Python", "MCP"],
        image: getAssetPath("/images/sparta-demo.jpg"),
        gallery: [{ image: getAssetPath("/images/sparta-demo.jpg"), label: "Demo interactiva" }, { image: getAssetPath("/images/sparta-demo.jpg"), label: "Control de permisos" }, { image: getAssetPath("/images/sparta-contexto.png"), label: "Chat y contexto" }],
        features: ["Conversaciones con proveedores de IA por API", "Contexto de archivos y revisión de cambios", "Terminal integrada y permisos para herramientas", "Integraciones mediante MCP"],
        demo: { url: "https://naiker12.github.io/Sparta-Agent/#producto", label: "Abrir demo de Sparta", note: "Demo interactiva con datos de ejemplo. La aplicación completa se descarga para escritorio." },
        link: "https://github.com/Naiker12/Sparta-Agent", github: "https://github.com/Naiker12/Sparta-Agent",
        colors: { main: "#e75a42", secondary: "#892e40" }
    },
    {
        id: "autem", category: "web", title: "AUTEM",
        description: "Plataforma inmobiliaria con visualización arquitectónica, modelos 3D, realidad aumentada y mapas interactivos para explorar propiedades, terrenos y masterplans.",
        tech: ["React", "TypeScript", "TanStack", "Three.js", "Tailwind", "Leaflet"],
        image: getAssetPath("/images/autem-live.jpg"),
        features: ["Presentación de servicios de arquitectura e interiorismo", "Exploración de Villa Paraíso y su plano maestro", "Visualizaciones de propuestas y entorno", "Formulario de consulta con contacto por WhatsApp"],
        demo: { url: "https://autemarquitectura.com/", label: "Abrir AUTEM", note: "GitHub Pages redirige al dominio público de AUTEM. El recorrido 360° está en preparación." },
        link: "https://github.com/Naiker12/AUTEM", github: "https://github.com/Naiker12/AUTEM",
        colors: { main: "#b6a078", secondary: "#384f4a" }
    },
    {
        id: "coca-cola",
        features: ["Administración de productos y personal", "Interfaces gráficas con Swing y JFrame", "Persistencia de información empresarial"],
        category: "desktop",
        title: "Sistema de Gestión Coca-Cola",
        description: "Aplicación de escritorio para la gestión de productos y administración de personal de la empresa Coca-Cola. Desarrollada íntegramente con interfaces gráficas JFrame, lógica empresarial pura en Java y persistencia de datos.",
        tech: ["Java", "Swing / JFrame", "NetBeans", "MySQL"],
        image: cocaColaPic,
        link: "https://www.youtube.com/watch?v=kGjp3VdUktI",
        github: "https://github.com/Naiker12/SOFTWARE-DE-GESTI-N-DE-PRODUCTO-DE-COCA-COLA",
        colors: { main: "#F40009", secondary: "#000000" }
    },
    {
        id: "portal-datos-abiertos",
        features: ["Dashboard de métricas y visualizaciones", "Gestión de permisos y autenticación", "Administración de datos gubernamentales"],
        repositoryStatus: "El repositorio público devuelve 404 al verificarlo; su código puede no estar disponible.",
        category: "web",
        title: "Portal de Datos Abiertos",
        description: "Dashboard administrativo premium para la gestión y visualización de datos gubernamentales. Incluye autenticación avanzada, gestión de permisos granular, visualización de métricas en tiempo real con Recharts y una arquitectura modular escalable.",
        tech: ["React 18", "TypeScript", "Tailwind 4", "Framer Motion", "Recharts", "Vite"],
        image: portalDatosPic,
        link: "https://github.com/Naiker12/portal-datos-abiertos",
        github: "https://github.com/Naiker12/portal-datos-abiertos",
        colors: { main: "#3b82f6", secondary: "#60a5fa" }
    },
    {
        id: "dragonball-api",
        demo: { url: "https://naiker12.github.io/dragolBall-ionic-angular-ionic-taller/", label: "Abrir demo" },
        features: ["Consulta de personajes del universo Dragon Ball", "Información de transformaciones y técnicas", "Interfaz adaptable desarrollada con Ionic"],
        category: "mobile",
        title: "DragonBall - API",
        description: "DragonBallAPI es una API interactiva que permite a los desarrolladores acceder a información detallada sobre el universo de Dragon Ball. La plataforma proporciona datos actualizados sobre personajes, transformaciones, técnicas y más.",
        tech: ["Ionic", "Angular", "Firebase", "CSS"],
        image: dragonBallPic,
        link: "https://naiker12.github.io/dragolBall-ionic-angular-ionic-taller/dragol-ball",
        github: "https://github.com/Naiker12/dragolBall-ionic-angular-ionic-taller.git",
        colors: { main: "#f59e0b", secondary: "#ef4444" }
    },
    {
        id: "call-connect",
        features: ["Videollamadas desde una interfaz móvil", "Autenticación de usuarios", "Señalización y presencia con Firebase y Supabase"],
        category: "mobile",
        title: "Call - Connect",
        description: "Aplicación de videollamadas de alta fidelidad desarrollada con Ionic y Angular. Utiliza Firebase y Supabase para la gestión de señalización, autenticación y presencia en tiempo real.",
        tech: ["Ionic", "Angular", "Firebase", "Supabase", "CSS"],
        image: callConnectPic,
        link: "https://github.com/Naiker12/CallConnect-Ionic-Angular-",
        github: "https://github.com/Naiker12/CallConnect-Ionic-Angular-",
        colors: { main: "#8b5cf6", secondary: "#6366f1" }
    },
    {
        id: "mercado-express",
        demo: { url: "https://naiker12.github.io/ionic-angular-fakestore-ecommerce/", label: "Abrir demo" },
        features: ["Catálogo de productos desde FakeStore", "Detalle de productos y carrito", "Autenticación básica e interfaz móvil"],
        category: "mobile",
        title: "Mercado Express",
        description: "Aplicación móvil de e-commerce construida con Ionic y Angular consumiendo la API de FakeStore. Incluye listado de productos, detalles, carrito de compras y autenticación básica. Ideal como ejemplo de tienda online adaptable.",
        tech: ["Ionic", "Angular", "Firebase", "Tailwind CSS"],
        image: mercadoExpressPic,
        link: "https://www.youtube.com/watch?si=kfdNEZ22GXp67-Kz&v=92VdP308iJM&feature=youtu.be",
        github: "https://github.com/Naiker12/ionic-angular-fakestore-ecommerce.git",
        colors: { main: "#3b82f6", secondary: "#10b981" }
    },
    {
        id: "gallery",
        features: ["Carga de fotografías a la nube", "Exploración y visualización de imágenes", "Almacenamiento con Firebase y Supabase"],
        category: "mobile",
        title: "Gallery - App",
        description: "Aplicación móvil para la gestión y carga de fotografías en la nube. Implementa un sistema de almacenamiento seguro y visualización optimizada de medios digitales.",
        tech: ["Ionic", "Angular", "Firebase", "Supabase", "CSS"],
        image: galleryPic,
        link: "https://github.com/Naiker12/Gallery",
        github: "https://github.com/Naiker12/Gallery",
        colors: { main: "#ec4899", secondary: "#f43f5e" }
    },
    {
        id: "tienda-virtual",
        features: ["Catálogo y gestión de productos", "Carrito de compras", "Panel de administración con PHP y MySQL"],
        repositoryStatus: "El repositorio público devuelve 404 al verificarlo; su código puede no estar disponible.",
        category: "web",
        title: "Tienda Virtual",
        description: "Aplicación web de tienda virtual con gestión de productos, carrito de compras y panel de administración dinámico. Creado con un stack robusto para garantizar eficiencia y seguridad en las transacciones.",
        tech: ["PHP", "JavaScript", "MySQL", "Bootstrap", "Tailwind"],
        image: tiendaVirtualPic,
        link: "https://github.com/Naiker12/Tienda-virtual",
        github: "https://github.com/Naiker12/Tienda-virtual",
        colors: { main: "#10b981", secondary: "#3b82f6" }
    }
];




