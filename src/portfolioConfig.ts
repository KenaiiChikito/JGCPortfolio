import { PortfolioConfig } from './types';

/* ====================================================================================
   🍂 GUÍA DE EDICIÓN RÁPIDA DEL PORTAFOLIO (CONFIGURACIÓN CENTRAL) 🍂
   ====================================================================================
   ¡Hola! Puedes cambiar TODOS los textos, fotos, enlaces, proyectos, modelos 3D,
   habilidades e historial de tu portafolio editando únicamente este archivo.
   
   ÍNDICE DE SECCIONES PARA EDITAR:
   1. HERO / PRESS START (Línea ~30): Nombre, título, disponibilidad, redes.
   2. MUNDO 01 - SOBRE MÍ (Línea ~70): Foto avatar, biografía y barras de atributos RPG.
   3. MUNDO 02 - PROYECTOS DE PROGRAMACIÓN (Línea ~120): Juegos y herramientas de código.
   4. MUNDO 03 - MODELADO 3D Y RENDERS (Línea ~190): Galería carrusel 3D y plataformas.
   5. MUNDO 04 - INVENTARIO DE HABILIDADES (Línea ~290): (Sin GDScript, JS ni Python).
   6. MUNDO 05 - GUARDAR PARTIDA E HISTORIAL (Línea ~340): Contacto, QR y bitácora.
   ==================================================================================== */

export const PORTFOLIO_CONFIG: PortfolioConfig = {

  /* ==================================================================================
     1. HERO / PANTALLA DE INICIO (PRESS START)
     Edita aquí tu nombre, rol profesional, lema de bienvenida y enlaces a redes.
     ================================================================================== */
  hero: {
    // Texto superior parpadeante (ej: "DISPONIBLE PARA NUEVOS PROYECTOS" o "EN BUSCA DE EQUIPO")
    tagAvailability: "DISPONIBLE PARA NUEVOS PROYECTOS",
    
    // Tu nombre o gamertag principal
    nombre: "Juan Gomez",
    
    // Tu especialidad o título profesional (incluye cursor titilante en la pantalla)
    rol: "Game Programmer & 3D Artist",
    
    // Breve descripción o frase de impacto que aparece debajo del rol
    tagline: "Desarrollo sistemas de juego escalables y físicas personalizadas, combinando código de alto rendimiento con arte 3D estilizado.",
    
    // Texto del botón arcade principal
    botonPressStart: "▶ PRESS START",
  },

  // Redes sociales que aparecen con botones de acceso directo en el Hero y en el Footer
  socials: [
    { icon: "🐙", label: "GitHub", url: "https://github.com/KenaiiChikito" },
    { icon: "🎨", label: "ArtStation", url: "https://www.artstation.com/kenaiichikito" },
    { icon: "💼", label: "LinkedIn", url: "https://www.linkedin.com/feed/" },
    { icon: "🧊", label: "Sketchfab", url: "https://sketchfab.com/KenaiiChikito" },
    { icon: "🕹️", label: "itch.io", url: "https://kenaiichikito.itch.io/" },
  ],

  /* ==================================================================================
     2. MUNDO 01 — SOBRE MÍ
     Edita tu foto de avatar, nivel de personaje, biografía y atributos RPG.
     ================================================================================== */
  avatar: {
    // Reemplaza por el enlace a tu foto (se recomienda imagen cuadrada 1:1)
    src: "./Avatar.jpg",
    badge: "LV. 25 DEV", // Insignia en la esquina inferior de la foto
  },

  // Ficha rápida de personaje (debajo del avatar)
  fichaRpg: {
    rolPrincipal: "Programador / 3D",
    motorFavorito: "C++ & Unity", // 👈 EDITA AQUÍ TU MOTOR FAVORITO (ej: "Unity", "Unreal Engine 5", "Godot", etc.)
    staminaCreativa: "100% (Café Activo)",
  },

  // Párrafos de tu historia/bio (puedes agregar o quitar líneas en este arreglo)
  bio: [
    "¡Hola viajero! Soy programador de videojuegos y artista 3D con más de 5 años forjando experiencias inmersivas tanto en motores comerciales como en arquitecturas propietarias.",
    "Mi enfoque central radica en la convergencia entre la lógica de programación rigurosa (arquitectura de gameplay en C++ y C#, shaders HLSL, simulación física) y la creación visual de modelos 3D optimizados para tiempo real.",
    "Cuando no estoy optimizando draw calls o esculpiendo mallas en Blender y ZBrush, disfruto componer prototipos en game jams y compartir recursos con la comunidad de desarrollo."
  ],

  // Atributos y estadísticas RPG (valores del 0 al 100) que se animan al hacer scroll
  stats: [
    { label: "Programación C++ / C#", value: 83 },
    { label: "GDD", value: 60 },
    { label: "Modelado Hard Surface", value: 60 },
    { label: "Modelado & Esculpido 3D", value: 20 },
    { label: "Texturizado PBR (Substance)", value: 80 },
    { label: "Optimización de Rendimiento", value: 90 },
  ],

  /* ==================================================================================
     3. MUNDO 02 — PROYECTOS DE PROGRAMACIÓN
     Enfocado estrictamente en arquitectura, código, mecánicas e ingeniería de software.
     Cada proyecto cuenta con tags técnicos, descripción y enlaces a Repositorio / Demo.
     ================================================================================== */
  proyectosProgramacion: [
    {
      id: "prog-01",
      titulo: "CHRONO SHIFT ENGINE",
      tags: ["C++", "Vulkan API", "Multithreading", "Físicas"],
      descripcion: "Motor gráfico 3D personalizado con arquitectura ECS (Entity Component System) orientada a datos, renderizador Vulkan por pases diferidos y buffer de rebobinado temporal determinista a 60 FPS.",
      imagen: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&auto=format&fit=crop&q=80",
      video: "", // Coloca aquí el ID de YouTube si tienes video (ej: "dQw4w9WgXcQ")
      linkDemo: "https://github.com",
      linkCodigo: "https://github.com",
      destacado: true,
      detallesTecnicos: [
        "Pipeline de sombras en cascada (CSM)",
        "Compilación JIT de shaders HLSL a SPIR-V",
        "Spatial Partitioning mediante Octree jerárquico"
      ]
    },
    {
      id: "prog-02",
      titulo: "DUNGEON SYNAPSE (ROGUE-AI)",
      tags: ["C#", "Unity", "Algoritmos Procedurales", "Árboles de Comportamiento"],
      descripcion: "Sistema de generación procedural de mazmorras basado en Wave Function Collapse y autómatas celulares, complementado con una máquina de estados jerárquica para la toma de decisiones tácticas de la IA enemiga.",
      imagen: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&auto=format&fit=crop&q=80",
      video: "",
      linkDemo: "https://itch.io",
      linkCodigo: "https://github.com",
      destacado: true,
      detallesTecnicos: [
        "Generación determinista vía semillas RNG 64-bit",
        "Algoritmo A* con pesos de coste dinámicos",
        "Sistema de inventario modular basado en ScriptableObjects"
      ]
    },
    {
      id: "prog-03",
      titulo: "NET-WARPING MULTIPLAYER",
      tags: ["C++", "UDP Sockets", "Client-Side Prediction", "Lag Compensation"],
      descripcion: "Backend de red autoritativo para combates en tiempo real de hasta 16 jugadores. Implementa reconciliación de predicción del cliente y retroceso temporal (rollback / rewind) para registro exacto de proyectiles.",
      imagen: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&auto=format&fit=crop&q=80",
      video: "",
      linkDemo: "https://github.com",
      linkCodigo: "https://github.com",
      destacado: false,
      detallesTecnicos: [
        "Compresión delta de snapshots de estado",
        "Tasa de tickrate estable a 64hz",
        "Buffer circular de inputs con interpolación hermite"
      ]
    },
    {
      id: "prog-04",
      titulo: "VOLUMETRIC AUTUMN SHADER",
      tags: ["HLSL", "Compute Shaders", "Raymarching", "Unreal Engine 5"],
      descripcion: "Shader volumétrico interactivo que simula niebla densa otoñal y haces de luz crepusculares dispersados por partículas de hojas doradas, optimizado para consolas y PC de gama media.",
      imagen: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=80",
      video: "",
      linkDemo: "https://github.com",
      linkCodigo: "https://github.com",
      destacado: false,
      detallesTecnicos: [
        "Raymarching adaptativo con dither temporal",
        "Sampling de texturas 3D en memoria GPU compartida",
        "Menos de 0.8ms de impacto en frame time"
      ]
    },
  ],

  /* ==================================================================================
     4. MUNDO 03 — PROYECTOS CREATIVOS / MODELADO 3D (CARRUSEL & RENDERS)
     Aquí configuras la galería interactiva de renders 3D y los accesos a tus perfiles
     en plataformas de arte 3D (ArtStation, Sketchfab, Behance, Gumroad, etc.).
     ================================================================================== */
  modelado3D: {
    descripcionSeccion: "Exploración de assets 3D optimizados para tiempo real, desde personajes de alta densidad poligonal esculpidos en ZBrush hasta modelos de hard-surface texturizados con PBR en Substance 3D Painter.",
    
    // Plataformas donde subes tus modelos para que los visitantes los inspeccionen en 3D
    plataformasPrincipales: [
      {
        nombre: "ArtStation",
        url: "https://artstation.com",
        descripcion: "Portafolio principal de renders 4K, breakdowns de topología y mallas de alambre."
      },
      {
        nombre: "Sketchfab",
        url: "https://sketchfab.com",
        descripcion: "Visualizador 3D interactivo en tiempo real: inspecciona geometrías, normales y texturas PBR."
      },
      {
        nombre: "Behance",
        url: "https://behance.net",
        descripcion: "Casos de estudio visuales, bocetos conceptuales y dirección de arte."
      }
    ],

    // Modelos que aparecen en el carrusel / slider interactivo
    renders: [
      {
        id: "render-01",
        titulo: "EL GUARDIÁN DE OCRE",
        subtitulo: "Personaje Game-Ready · Fantasy Sci-Fi",
        descripcion: "Criatura autómata inspirada en la arquitectura de bronce y hojas otoñales. Modelada en ZBrush con retopología manual en Blender y mapas de texturas 4K.",
        imagen: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80",
        software: ["Blender", "ZBrush", "Substance 3D Painter", "Marmoset Toolbag"],
        polycount: "28,450 Tris",
        texturas: "2 Sets 4K (Albedo, Normal, Roughness, Metal, AO, Emission)",
        plataformas: [
          { nombre: "Ver en ArtStation", url: "https://artstation.com" },
          { nombre: "Inspeccionar 3D en Sketchfab", url: "https://sketchfab.com" }
        ]
      },
      {
        id: "render-02",
        titulo: "ESPADA RÚNICA SOLAR",
        subtitulo: "Hard-Surface Prop · Hero Asset",
        descripcion: "Arma ceremonial forjada en obsidiana y aleación de cobre otoñal. Diseñada como arma principal para un RPG en tercera persona, con efectos de brillo rúnico parametrizables.",
        imagen: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80",
        software: ["Blender", "Substance 3D Painter", "Photoshop"],
        polycount: "6,200 Tris",
        texturas: "1 Set 4K PBR Met/Rough",
        plataformas: [
          { nombre: "Ver en ArtStation", url: "https://artstation.com" },
          { nombre: "Descargar en Gumroad", url: "https://gumroad.com" }
        ]
      },
      {
        id: "render-03",
        titulo: "TABERNA DEL BOSQUE DORADO",
        subtitulo: "Modular Environment Diorama",
        descripcion: "Diorama isométrico con piezas modulares de madera rústica, tejas otoñales y faroles de luz cálida. Diseñado con trim sheets para máxima eficiencia de memoria de textura.",
        imagen: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80",
        software: ["Blender", "Substance Designer", "Unreal Engine 5"],
        polycount: "45,000 Tris (Escena Completa)",
        texturas: "Trim Sheets Modulares 2K + Shader Master de Madera",
        plataformas: [
          { nombre: "Ver desglose en ArtStation", url: "https://artstation.com" },
          { nombre: "Ver proyecto en Behance", url: "https://behance.net" }
        ]
      },
      {
        id: "render-04",
        titulo: "ROBOT COSECHADOR DE BELLOTAS",
        subtitulo: "Chibi Mech Character",
        descripcion: "Mecanismo estilizado de exploración forestal con detalles de desgaste y óxido otoñal. Cuenta con esqueleto de huesos completamente configurado para cinemáticas y animaciones de ciclo de caminata.",
        imagen: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&auto=format&fit=crop&q=80",
        software: ["Blender", "Substance 3D Painter", "Rigify"],
        polycount: "14,800 Tris",
        texturas: "1 Set 4K PBR Estilizado",
        plataformas: [
          { nombre: "Ver en ArtStation", url: "https://artstation.com" },
          { nombre: "Modelo 3D en Sketchfab", url: "https://sketchfab.com" }
        ]
      }
    ]
  },

  /* ==================================================================================
     5. MUNDO 04 — INVENTARIO DE HABILIDADES
     NOTA IMPORTANTE: Se han eliminado estrictamente GDScript, JavaScript y Python 
     tal como lo solicitaste. Se conservan lenguajes de alto rendimiento, motores,
     herramientas de modelado 3D y utilidades de desarrollo.
     ================================================================================== */
  inventario: {
    "Lenguajes de Programación": [
      { icon: "⚡", label: "C#", nivel: "Intermedio", descripcion: "Gameplay en Unity" },
      { icon: "⚙️", label: "C++", nivel: "Intermedio", descripcion: "Unreal Engine" },
      //{ icon: "🦀", label: "Rust", nivel: "Intermedio", descripcion: "Desarrollo de herramientas de sistema seguras" },
      //{ icon: "✨", label: "HLSL / GLSL", nivel: "Avanzado", descripcion: "Shaders de superficie, postprocesado y compute shaders" },
      //{ icon: "🔷", label: "TypeScript", nivel: "Intermedio", descripcion: "Herramientas de automatización y UI web" },
    ],
    "Motores de Videojuegos": [
      { icon: "🎮", label: "Unity", nivel: "Avanzado", descripcion: "URP, HDRP, C#, animación, sistemas de UI" },
      { icon: "🏰", label: "Unreal Engine 5", nivel: "Principiante", descripcion: "C++, Blueprints" },
      { icon: "🧩", label: "Godot Engine", nivel: "Principiante", descripcion: "Prototipado rápido" },
      //{ icon: "🕹️", label: "Custom Engine", nivel: "Avanzado", descripcion: "Arquitectura OpenGL / Vulkan en C++" },
    ],
    "Modelado & Arte 3D": [
      { icon: "🌀", label: "Blender", nivel: "Avanzado", descripcion: "Modelado hard-surface, retopología, UVs y rigging" },
      { icon: "🗿", label: "NomadSculpt", nivel: "Intermedio", descripcion: "Aprendiendo esculpido orgánico" },
      //{ icon: "🎨", label: "Substance Painter", nivel: "Avanzado", descripcion: "Texturizado PBR, bakeado de mapas normales y AO" },
      //{ icon: "🧱", label: "Substance Designer", nivel: "Intermedio", descripcion: "Materiales procedurales continuos y trim sheets" },
      //{ icon: "📸", label: "Marmoset Toolbag", nivel: "Avanzado", descripcion: "Bakeado de geometrías y renders de presentación" },
    ],
    "Herramientas & Pipeline": [
      //{ icon: "🗂️", label: "Git & LFS", nivel: "Avanzado", descripcion: "Control de versiones para assets pesados de juego" },
      //{ icon: "🔍", label: "RenderDoc", nivel: "Intermedio", descripcion: "Depuración de draw calls y análisis de pipeline GPU" },
      { icon: "💻", label: "Visual Studio", nivel: "Avanzado", descripcion: "Profiling de CPU/memoria y debugging profundo" },
      //{ icon: "🐳", label: "Docker", nivel: "Intermedio", descripcion: "Servidores dedicados de prueba para multiplayer" },
    ],
  },

  /* ==================================================================================
     6. MUNDO 05 — GUARDAR PARTIDA E HISTORIAL DE ACTUALIZACIONES
     Incluye tu información de contacto, enlace para descargar CV, generador de QR,
     y la nueva sección de HISTORIAL con las últimas actualizaciones realizadas.
     ================================================================================== */
  contacto: {
    intro: "¿Tienes un proyecto indie o buscas un colaborador para programación y modelado 3D? Envíame un mensaje y te responderé en breve.",
    email: "m.gomez.cornejo2001@gmail.com",
    ubicacion: "Rancagua, Chile — Disponible para trabajo remoto global",
    disponibilidad: "Freelance / Contratos por Hito",
    cvUrl: "#descargar-cv", // Coloca aquí el link directo a tu PDF en Google Drive o Dropbox
  },

  // URL para el código QR interactivo de tu portafolio
  qrUrl: "https://kenaiichikito.github.io/PortfolioGit/",

  // NUEVA SECCIÓN: Registro de guardado / Historial de actualizaciones (Changelog de parches)
  historialActualizaciones: [
    {
      version: "v1.4 - OTOÑO UPDATE",
      fecha: "Septiembre 2026",
      titulo: "Lanzamiento de Galería 3D & Nuevos Shaders",
      descripcion: "Se integró el nuevo carrusel interactivo con renders 3D en alta definición, desglose de topología y enlaces a ArtStation y Sketchfab. Actualización de shaders HLSL volumétricos.",
      tipo: "nuevo"
    },
    {
      version: "v1.3 - PATCH",
      fecha: "Julio 2026",
      titulo: "Optimización de Motor C++ & Reconciliación de Red",
      descripcion: "Refactorización del sistema multihilo en el motor propietario Chrono Shift Engine. Reducción del retraso de predicción de red en combates multijugador.",
      tipo: "mejora"
    },
    {
      version: "v1.2 - SAVE STATE",
      fecha: "Mayo 2026",
      titulo: "Publicación de Prototipo Roguelike en itch.io",
      descripcion: "Lanzamiento jugable de 'Dungeon Synapse' con sistema de mazmorras procedurales y generación de mapas con semillas deterministas.",
      tipo: "hito"
    },
    {
      version: "v1.1 - ENGINE FIX",
      fecha: "Marzo 2026",
      titulo: "Limpieza de Dependencias & Inventario de Skills",
      descripcion: "Reorganización profunda de las habilidades técnicas especializadas en desarrollo nativo C++, C# y herramientas 3D.",
      tipo: "correccion"
    }
  ],

  // Texto del pie de página
  footer: `Portafolio Game Developer & 3D Artist · Edición Otoño © ${new Date().getFullYear()} · Todos los derechos reservados.`
};
