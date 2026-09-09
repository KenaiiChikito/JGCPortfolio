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
    tagAvailability: "DISPONIBLE PARA PROYECTOS GRANDES, MEDIANOS O TAMBIEN PEQUEÑOS",
    
    // Tu nombre o gamertag principal
    nombre: "Juan Gomez",
    
    // Tu especialidad o título profesional (incluye cursor titilante en la pantalla)
    rol: "Game Programmer - 3D Artist - Free-Lancer",
    
    // Breve descripción o frase de impacto que aparece debajo del rol
    tagline: "Desarrollo de videojuegos, combinando código de alto rendimiento con arte 3D estilizado.",
    
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
    src: "./Avatar.jpeg",
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
    "¡Hola lector! Soy estudiante de desarrollo de videojuegos, artista hard-surface y buscando el aprender modelado organico.", 
    "Mi rol principal es de programacion en motores de desarrollo como Unity, Unreal y basico de Godot, con conocimiento de modelado hard-surface en Blender siempre tratando de hacer Props propios para proyectos propios o subirlos para aquellos que les cuesta un poco hacerlos.",
    "Cuando no estoy programando estoy aprendiendo modelado organico en la aplicacion de NomadSculpt con formato estilizado para poder a futuro hacer mis propias creaciones e implementarla en futuros proyectos."
  ],

  // Atributos y estadísticas RPG (valores del 0 al 100) que se animan al hacer scroll
  stats: [
    { label: "Programación C++ / C#", value: 83 },
    { label: "GDD", value: 60 },
    { label: "Modelado Hard Surface", value: 60 },
    { label: "Modelado & Esculpido 3D", value: 20 },
    //{ label: "Texturizado PBR (Substance)", value: 80 },
   //{ label: "Optimización de Rendimiento", value: 90 },
  ],

  /* ==================================================================================
     CONFIGURACIÓN DE VISIBILIDAD DE SECCIONES (ENCENDER / APAGAR MUNDOS)
     Si en el futuro deseas reactivar el Mundo 02, simplemente cambia 'false' por 'true'.
     ================================================================================== */
  seccionesVisibles: {
    // Apagado temporalmente a petición del usuario. Cambiar a true para volver a mostrarlo:
    mundo02Programacion: false,
    // Proyecto destacado de programación (C# Photon PUN2):
    mundo02Destacado: true,
  },

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
     3.B NUEVO MÓDULO: PROYECTO DE PROGRAMACIÓN DESTACADO (SPOTLIGHT)
     Un desglose profundo de tu mejor desarrollo técnico: benchmarks, arquitectura y código.
     ================================================================================== */
  proyectoProgramacionDestacado: {
    subtituloBadge: "MUNDO 02-B · SPOTLIGHT TÉCNICO",
    titulo: "RUSTED STEAM GEAR",
    subtitulo: "Programacion de sistema de movimiento y conexion con Photon",
    descripcion: "Trabaje como estudiante en el desarrollo de Rusted Steam Gear en el area de programacion para la funcionalidad completa de este mismo, tanto movimiento, disparos, vida y destruccion de murallas, este videojuego fue desarrollado principalmente como trabajo de universidad.",
    historiaDesarrollo: "Diseñado con enfasis en el area de Photon-PUN2 para conexion local/LAN con una misma build.",
    imagen: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&auto=format&fit=crop&q=80",
    video: "", //por si hay video de youtube o similar para posibles gameplays
    tags: ["Unity", "C#", "Optimización"],

    // Barra inferior de estado (puedes cambiar los textos libremente o poner mostrarStatusFooter: false)
    statusTexto: "Status: Incompleto",
    statusTargetBadge: "60 FPS TARGET",
    mostrarStatusFooter: false, // Pon false si quieres ocultar toda la barra inferior

    // CONSEJO: Para "esconder" métricas o bloques sin borrarlos, puedes:
    // Opción 1: Agregar "visible: false" al objeto que quieras apagar.
    // Opción 2: Comentar la línea colocando // al inicio o envolviendo con /* ... */
    metricasRendimiento: [
      { label: "Frame Rate", valor: "60+ FPS", detalle: "Estable en PC", visible: true },
      { label: "GC Alloc / Frame", valor: "0 Bytes", detalle: "Zero Allocation Loop", visible: true },
      // Cambia "visible: true" a "visible: false" para ocultarlo en la web sin borrar el código:
      { label: "Generación de Mapa", valor: "< 45 ms", detalle: "Seed Determinista 64-bit", visible: false },
      { label: "Entidades Activas", valor: "120+ Agentes", detalle: "Árboles de Comportamiento", visible: false },
    ],
    caracteristicasTecnicas: [
      // Puedes apagar cualquiera con visible: false
      { titulo: "Multiplayer Active", descripcion: "Funciones integradas de Photon-PUN para el juego multijugador entre computadoras.", visible: true },
      { titulo: "Simulación basada en inputs", descripcion: "Inputs unicos verificados de forma local para ambas computadoras para no tener problemas con estos mismos.", visible: true },
      { titulo: "Pool de Objetos & Reutilización de Memoria", descripcion: "Estructuras pre-asignadas para proyectiles, efectos visuales y enemigos sin sobrecargar la memoria.", visible: false },
    ],
    codigoSnippet: {
      lenguaje: "C#",
      archivo: "GameManager.cs",
      codigo: `using UnityEngine;
using Photon.Pun;
using Photon.Realtime;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviourPunCallbacks
{
    public GameObject winPanel;   
    public GameObject pausePanel; 
    private bool isPaused = false;

    void Start()
    {
        // Al iniciar la partida, ocultamos el mouse pero lo dejamos funcional
        Cursor.visible = false;
        Cursor.lockState = CursorLockMode.None; 
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Escape) && !winPanel.activeSelf)
        {
            TogglePause();
        }
    }

    public void TogglePause()
    {
        isPaused = !isPaused;
        pausePanel.SetActive(isPaused);

        if (isPaused)
        {
            // EN PAUSA: Mouse visible para clickear botones
            Cursor.visible = true;
            Cursor.lockState = CursorLockMode.None;
            Time.timeScale = 0f; // Opcional: frena el tiempo local
        }
        else
        {
            // JUGANDO: Mouse invisible pero NO bloqueado para que el Raycast funcione
            Cursor.visible = false;
            Cursor.lockState = CursorLockMode.None; 
            Time.timeScale = 1f;
        }
    }

    public override void OnPlayerLeftRoom(Player otherPlayer)
    {
        if (PhotonNetwork.CurrentRoom.PlayerCount == 1)
        {
            ShowWinUI();
        }
    }

    void ShowWinUI()
    {
        pausePanel.SetActive(false);
        winPanel.SetActive(true);
        Cursor.visible = true;
        Cursor.lockState = CursorLockMode.None;
    }

    public void OnClick_Leave()
    {
        Time.timeScale = 1f;
        PhotonNetwork.LeaveRoom();
    }

    public override void OnLeftRoom()
    {
        SceneManager.LoadScene("Menu");
    }

    public void OnClick_Quit()
    {
        Application.Quit();
    }
}`
    },
    linkDemo: "https://kenaiichikito.itch.io/", //añadir a futuro link del juego directo
    linkCodigo: "https://github.com/KenaiiChikito/Prototipo.git", //añadir a futuro el repertorio de Github directo
    //linkGDD: "https://github.com/KenaiiChikito", //añadir a futuro link de GDD de Notion
  },

  /* ==================================================================================
     4. MUNDO 03 — PROYECTOS CREATIVOS / MODELADO 3D (CARRUSEL & RENDERS)
     Aquí configuras la galería interactiva de renders 3D y los accesos a tus perfiles
     en plataformas de arte 3D (ArtStation, Sketchfab, Behance, Gumroad, etc.).
     ================================================================================== */
  modelado3D: {
    descripcionSeccion: "Exploración de assets 3D optimizados para tiempo real, desde personajes de alta densidad poligonal esculpidos en NomadCulpt hasta modelos de hard-surface en Blender.",
    
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
      // {
      //   id: "render-01",
      //   titulo: "EL GUARDIÁN DE OCRE",
      //   subtitulo: "Personaje Game-Ready · Fantasy Sci-Fi",
      //   descripcion: "Criatura autómata inspirada en la arquitectura de bronce y hojas otoñales. Modelada en ZBrush con retopología manual en Blender y mapas de texturas 4K.",
      //   imagen: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80",
      //   software: ["Blender", "ZBrush", "Substance 3D Painter", "Marmoset Toolbag"],
      //   polycount: "28,450 Tris",
      //   texturas: "2 Sets 4K (Albedo, Normal, Roughness, Metal, AO, Emission)",
      //   plataformas: [
      //     { nombre: "Ver en ArtStation", url: "https://artstation.com" },
      //     { nombre: "Inspeccionar 3D en Sketchfab", url: "https://sketchfab.com" }
      //   ]
      // },
      // {
      //   id: "render-02",
      //   titulo: "ESPADA RÚNICA SOLAR",
      //   subtitulo: "Hard-Surface Prop · Hero Asset",
      //   descripcion: "Arma ceremonial forjada en obsidiana y aleación de cobre otoñal. Diseñada como arma principal para un RPG en tercera persona, con efectos de brillo rúnico parametrizables.",
      //   imagen: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80",
      //   software: ["Blender", "Substance 3D Painter", "Photoshop"],
      //   polycount: "6,200 Tris",
      //   texturas: "1 Set 4K PBR Met/Rough",
      //   plataformas: [
      //     { nombre: "Ver en ArtStation", url: "https://artstation.com" },
      //     { nombre: "Descargar en Gumroad", url: "https://gumroad.com" }
      //   ]
      // },
      {
        id: "nomad-mask",
        titulo: "Mascara",
        subtitulo: "Mascara Japonesa estilizado (no terminado)",
        descripcion: "Diseño de mascara estilo japonesa modelada en NomadSculpt con un formato de diseño estilizado.",
        imagen: "./Mask.png",
        software: ["NomadSculpt"],
        polycount: "278.7k Triangles",
        texturas: "Uncolored",
        plataformas: [
          //{ nombre: "Ver desglose en ArtStation", url: "https://artstation.com" },
          { nombre: "Ver proyecto en Sketchfab", url: "https://sketchfab.com/3d-models/mask-f2675005f0c64ecaa8a70f73482f2f59" }
        ]
      },
      {
        id: "nomad-lizzard",
        titulo: "Lizzard Model",
        subtitulo: "Chibi Lizzard uncolored Model",
        descripcion: "Modelo de lagarto hecho en tiempos de ocio en NomadSculpt, pensado principalmente como modelo de prueba para practicar y aprender modelado organico.",
        imagen: "./Lizzard.png",
        software: ["NomadSculpt"],
        polycount: "863.3K Triangles",
        texturas: "Uncolored",
        plataformas: [
          //{ nombre: "Ver en ArtStation", url: "https://artstation.com" },
          { nombre: "Modelo 3D en Sketchfab", url: "https://sketchfab.com/3d-models/lizzard-7908c2bf3bfe489bbb9c78dd4c2bb0f6" }
        ]
      }
    ]
  },

  /* ==================================================================================
     4.B NUEVO MÓDULO: PROYECTO CREATIVO / MODELADO 3D DESTACADO (HERO ASSET)
     Exhibición detallada de tu pieza 3D insignia con mallas, topología y Sketchfab 3D.
     ================================================================================== */
  proyectoCreativoDestacado: {
    subtituloBadge: "MUNDO 03-B · HERO ASSET 3D",
    titulo: "MÁSCARA JAPONESA ESTILIZADA",
    subtitulo: "Esculpido Orgánico & Hard-Surface en NomadSculpt",
    descripcion: "Diseño y modelado de máscara tradicional de estilo japonés, pensada como accesorio místico para personajes de acción o fantasía en videojuegos. Combina curvaturas orgánicas fluidas con bordes afilados legibles.",
    conceptoArtistico: "Inspirada en el folclore asiático con reinterpretación estilizada moderna. Modelada directamente en NomadSculpt, optimizando los bucles de aristas para capturar la luz de manera impactante en motores de tiempo real.",
    imagenPrincipal: "./Mask.png",
    imagenSecundaria: "./Lizzard.png",
    software: ["NomadSculpt", "Blender"],
    detallesGeometria: [
      { label: "Triángulos", valor: "278.7K Tris" },
      { label: "Estilo", valor: "Estilizado" },
      { label: "Topología", valor: "Game Ready" },
      { label: "Software", valor: "NomadSculpt" },
    ],
    puntosClave: [
      { titulo: "Silueta de Alto Impacto", descripcion: "Volúmenes y cuernos modelados para máxima legibilidad visual en cámara en tercera persona." },
      { titulo: "Flujo de Curvas Esculpidas", descripcion: "Transición orgánica sin artefactos de pellizco, lista para texturizado PBR o sombreado Cel-Shaded." },
      { titulo: "Inspección 3D Interactiva", descripcion: "Malla subida a Sketchfab para inspección de geometría en tiempo real a 360 grados." },
    ],
    plataformas: [
      { nombre: "Sketchfab 3D", url: "https://sketchfab.com/3d-models/mask-f2675005f0c64ecaa8a70f73482f2f59", icono: "sketchfab" },
      { nombre: "ArtStation", url: "https://www.artstation.com/kenaiichikito", icono: "artstation" },
    ],
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

  /* ==================================================================================
     CONFIGURACIÓN DE ACCESO PRIVADO / ADMINISTRADOR (SOLO PARA TI)
     Configura aquí tu clave personal para desbloquear el generador de QR privado.
     Puedes cambiar esta clave en cualquier momento.
     ================================================================================== */
  adminConfig: {
    // Tu clave maestra secreta (Cámbiala cuando quieras por la que prefieras):
    claveAcceso: "152436JG",
    // Tu usuario oficial de GitHub para validar autoría:
    githubUsername: "KenaiIchikito",
  },

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
