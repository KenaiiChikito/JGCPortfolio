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
   7. ARCHIVO ANEXO (BOTÓN DISCRETO EN FOOTER): Investigaciones, tutoriales, PDFs y descargas.
   ==================================================================================== */

export const PORTFOLIO_CONFIG: PortfolioConfig = {

  /* ==================================================================================
     1. HERO / PANTALLA DE INICIO (PRESS START)
     Edita aquí tu nombre, rol profesional, lema de bienvenida y enlaces a redes.
     ================================================================================== */
  hero: {
    // Texto superior parpadeante (ej: "DISPONIBLE PARA NUEVOS PROYECTOS" o "EN BUSCA DE EQUIPO")
    tagAvailability: "BUSCANDO PRÁCTICA PROFESIONAL · GAME PROGRAMMER / UNITY",
    
    // Tu nombre o gamertag principal
    nombre: "Juan Gomez",
    
    // Tu especialidad o título profesional (incluye cursor titilante en la pantalla)
    rol: "Game Programmer · Unity / C# · 3D Artist",
    
    // Breve descripción o frase de impacto que aparece debajo del rol
    tagline: "Desarrollo de videojuegos en Unity y C++, combinando programación de gameplay y sistemas con arte 3D estilizado.",
    
    // Texto del botón arcade principal
    botonPressStart: "▶ PRESS START",
  },

  // Redes sociales que aparecen con botones de acceso directo en el Hero y en el Footer
  socials: [
    { icon: "🐙", label: "GitHub", url: "https://github.com/KenaiiChikito" },
    { icon: "🎨", label: "ArtStation", url: "https://www.artstation.com/kenaiichikito" },
    { icon: "💼", label: "LinkedIn", url: "https://www.linkedin.com/in/KenaiiChikito" },
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
    rolPrincipal: "Gameplay / Sistemas",
    motorFavorito: "Unity (C#) & C++", // 👈 EDITA AQUÍ TU MOTOR FAVORITO (ej: "Unity", "Unreal Engine 5", "Godot", etc.)
    staminaCreativa: "100% (Café Activo)",
  },

  // Párrafos de tu historia/bio (puedes agregar o quitar líneas en este arreglo)
  bio: [
    "¡Hola! Soy estudiante de desarrollo de videojuegos enfocado en programación de gameplay y sistemas, con conocimientos en modelado 3D hard-surface y esculpido orgánico estilizado.",
    "Mi especialidad es la programación en Unity (C#) y Unreal Engine (C++), además de bases en Godot. En el área artística utilizo Blender para crear props propios pensados para integrarse directamente en motor.",
    "Cuando no estoy programando, continúo perfeccionando mi flujo de esculpido orgánico en NomadSculpt con estilo estilizado para dar vida a criaturas y accesorios propios en futuros proyectos."
  ],

  // Atributos y estadísticas RPG (valores del 0 al 100) que se animan al hacer scroll
  stats: [
    { label: "Programación C# / Unity", value: 83 },
    { label: "Gameplay, IA & Sistemas", value: 78 },
    { label: "C++ / Unreal Engine", value: 70 },
    { label: "Modelado 3D (Blender / Sculpt)", value: 65 },
    //{ label: "Texturizado PBR (Substance)", value: 80 },
    //{ label: "Optimización de Rendimiento", value: 90 },
  ],

  /* ==================================================================================
     CONFIGURACIÓN DE VISIBILIDAD DE SECCIONES (ENCENDER / APAGAR MUNDOS)
     Si en el futuro deseas reactivar el Mundo 02, simplemente cambia 'false' por 'true'.
     ================================================================================== */
  seccionesVisibles: {
    // Apagado temporalmente a petición del usuario. Cambiar a true para volver a mostrarlo:
    mundo02Programacion: true,
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
      titulo: "RUSTED STEAM GEAR",
      tags: ["Unity", "C#", "Photon PUN2"],
      descripcion: "Prototipo multijugador universitario en Unity donde programé el bucle completo de combate y jugabilidad: desplazamiento, dash, disparos, gestión de vida y destrucción de murallas.",
      imagen: "./Gears.jpeg",
      video: "", // Coloca aquí el ID de YouTube si tienes video (ej: "dQw4w9WgXcQ")
      linkDemo: "https://kenaiichikito.itch.io/rusted-steam-gear",
      linkCodigo: "https://github.com/KenaiiChikito/Prototipo",
      destacado: true,
      detallesTecnicos: [
        "Mecánicas de combate, dash, disparo y murallas destructibles en C#",
        "Sincronización LAN / online mediante Photon PUN2 en una sola build",
        "Validación local de inputs para evitar desincronización entre clientes"
      ]
    },
    {
      id: "prog-02",
      titulo: "IA de Enemigo con NavMesh (Enemy AI)",
      tags: ["C#", "Unity", "VR", "NavMesh"],
      descripcion: "Sistema modular de IA en Unity con NavMesh desarrollado para un proyecto VR en curso: el enemigo persigue al jugador al detectarlo dentro de un cono de visión de 90°, activa un temporizador de alerta por la espalda, valida obstáculos con Raycast y navega al último punto conocido al perder línea de visión.",
      imagen: "./UnityArchives/Visual.jpg",
      video: "",
      // Galería de videos / GIFs de muestra (la "imagen" de arriba queda solo como portada de la tarjeta):
      galeriaMedia: [
        {
          tipo: "video",
          src: "./Videos/Raycast.mp4",
          titulo: "Detección de obstáculos con Raycast",
          visible: true,
        },
        {
          tipo: "video",
          src: "./Videos/Persecucion.mp4",
          titulo: "Detección frontal 90° y persecución",
          visible: true,
        },
        {
          tipo: "video",
          src: "./Videos/CatchBack.mp4",
          titulo: "Detección trasera con temporizador",
          visible: true,
        },
        {
          tipo: "video",
          src: "./Videos/FuncionCode.mp4",
          titulo: "Visualización de estados del enemigo",
          visible: true,
        },
        {
          tipo: "video",
          src: "./Videos/UltimoPoint.mp4",
          titulo: "Búsqueda en último punto conocido",
          visible: true,
        },
        // --- EJEMPLOS PARA AGREGAR TUS VIDEOS DE MUESTRA (quita las // para activar) ---
        // {
        //   tipo: "video",
        //   src: "./UnityArchives/deteccion-90.mp4",
        //   titulo: "Detección frontal 90° y persecución",
        //   visible: true,
        // },
        // {
        //   tipo: "video",
        //   src: "./UnityArchives/ultimo-punto.mp4",
        //   titulo: "Búsqueda en último punto conocido",
        //   visible: true,
        // },
      ],
      // linkCodigo: "https://github.com", // Desactivado: ahora el código se muestra directo abajo
      codigoSnippet: {
        lenguaje: "C#",
        archivo: "EnemyAI.cs",
        visible: true,
        codigo: `using UnityEngine;
using UnityEngine.AI;

public class EnemigoIA : MonoBehaviour
{
    [Header("Referencias")]
    public Transform jugador;
    private NavMeshAgent agente;

    [Header("Configuracion de Vision")]
    public float rangoVision = 15f;
    [Range(0, 360)]
    public float anguloVision = 90f;
    public LayerMask capaObstaculos;

    [Header("Tiempos de Deteccion y Memoria")]
    public float tiempoDeteccionEspalda = 3f;
    public float tiempoParaPerderRastro = 3f;
    public float velocidadGiro = 6f;

    [Header("Alerta Visual Flotante (Sin Canvas)")]
    public float alturaAlerta = 2.3f;
    public float duracionSignoExclamacion = 2f;
    private TextMesh textoAlerta;
    private float temporizadorExclamacion;

    private float contadorEspalda;
    private int ultimoSegundoEspalda = -1;

    private float temporizadorPerdida;
    private int ultimoSegundoPerdida = -1;

    private bool persiguiendo = false;
    private bool viendoActualmente = false;
    private Vector3 ultimaPosicionConocida;

    void Start()
    {
        agente = GetComponent<NavMeshAgent>();
        contadorEspalda = tiempoDeteccionEspalda;
        CrearTextoAlertaFlotante();
    }

    void CrearTextoAlertaFlotante()
    {
        // Crea un objeto 3D hijo sobre el enemigo sin necesidad de Canvas
        GameObject objAlerta = new GameObject("AlertaVisual_3D");
        objAlerta.transform.SetParent(transform);
        objAlerta.transform.localPosition = new Vector3(0, alturaAlerta, 0);

        textoAlerta = objAlerta.AddComponent<TextMesh>();
        textoAlerta.alignment = TextAlignment.Center;
        textoAlerta.anchor = TextAnchor.MiddleCenter;
        textoAlerta.fontSize = 60;
        textoAlerta.characterSize = 0.15f;
        textoAlerta.fontStyle = FontStyle.Bold;
        textoAlerta.text = "";
    }

    void Update()
    {
        if (jugador == null) return;

        // Mantener el signo flotante mirando siempre hacia la camara principal
        if (textoAlerta != null && Camera.main != null)
        {
            textoAlerta.transform.rotation = Camera.main.transform.rotation;
        }

        // Apagar el signo de exclamacion despues de unos segundos
        if (temporizadorExclamacion > 0)
        {
            temporizadorExclamacion -= Time.deltaTime;
            if (temporizadorExclamacion <= 0 && textoAlerta.text == "!")
            {
                textoAlerta.text = "";
            }
        }

        bool tieneLineaDeVision = HayLineaDeVisionSinObstaculos();
        bool dentroDeCono = EstaEnConoDeVision();

        // CASO 1: Te esta viendo directamente en su cono de vision
        if (tieneLineaDeVision && dentroDeCono)
        {
            viendoActualmente = true;
            ultimaPosicionConocida = jugador.position; // Actualiza tu posicion real

            if (!persiguiendo)
            {
                Debug.Log("<color=green>[IA]</color> ¡Jugador avistado! Persecucion iniciada.");
                MostrarExclamacion();
            }
            ActivarPersecucion();
        }
        // CASO 2: Estas detras de el (sin paredes, pero fuera de su cono)
        else if (tieneLineaDeVision && !dentroDeCono && !persiguiendo)
        {
            viendoActualmente = false;
            ProcesarDeteccionPorEspalda();
        }
        // CASO 3: No te ve (te escondiste detras de un muro o saliste del rango)
        else
        {
            viendoActualmente = false;

            // Cancelar sospecha por la espalda si te alejas antes de los 3 segundos
            if (contadorEspalda < tiempoDeteccionEspalda)
            {
                contadorEspalda = tiempoDeteccionEspalda;
                ultimoSegundoEspalda = -1;
                if (textoAlerta.text == "?") textoAlerta.text = "";
                Debug.Log("<color=cyan>[IA]</color> Sospecha por la espalda cancelada.");
            }

            // Si ya te estaba persiguiendo, va hacia tu ultima posicion conocida y cuenta los segundos
            if (persiguiendo)
            {
                ProcesarPerdidaDeRastro();
            }
        }

        // Ejecutar movimiento hacia la ultima posicion conocida (no hacia el jugador real si esta escondido)
        if (persiguiendo)
        {
            agente.SetDestination(ultimaPosicionConocida);

            // Solo gira activamente hacia el jugador si lo esto viendo o acaba de girar al detectarlo
            if (viendoActualmente || Vector3.Distance(transform.position, ultimaPosicionConocida) > 0.5f)
            {
                GirarHaciaPunto(ultimaPosicionConocida);
            }
        }
    }

    void MostrarExclamacion()
    {
        if (textoAlerta == null) return;
        textoAlerta.text = "!";
        textoAlerta.color = Color.red;
        temporizadorExclamacion = duracionSignoExclamacion;
    }

    void ProcesarDeteccionPorEspalda()
    {
        // Muestra un '?' amarillo mientras sospecha
        if (textoAlerta != null && temporizadorExclamacion <= 0)
        {
            textoAlerta.text = "?";
            textoAlerta.color = Color.yellow;
        }

        contadorEspalda -= Time.deltaTime;
        int segundoActual = Mathf.CeilToInt(contadorEspalda);

        if (segundoActual != ultimoSegundoEspalda && segundoActual > 0)
        {
            ultimoSegundoEspalda = segundoActual;
            Debug.Log($"<color=yellow>[IA - Espalda]</color> Sintiendo presencia detras... {segundoActual}s");
        }

        if (contadorEspalda <= 0f)
        {
            Debug.Log("<color=red>[IA - Espalda]</color> ¡Te descubrio por la espalda!");
            ultimaPosicionConocida = jugador.position;
            MostrarExclamacion();
            ActivarPersecucion();
        }
    }

    void ProcesarPerdidaDeRastro()
    {
        temporizadorPerdida -= Time.deltaTime;

        float tiempoTranscurrido = tiempoParaPerderRastro - temporizadorPerdida;
        int segundoTranscurrido = Mathf.FloorToInt(tiempoTranscurrido);

        if (segundoTranscurrido != ultimoSegundoPerdida && segundoTranscurrido > 0)
        {
            ultimoSegundoPerdida = segundoTranscurrido;
            Debug.Log($"<color=orange>[IA - Rastro]</color> Jugador fuera de vista hace {segundoTranscurrido}s...");
        }

        if (temporizadorPerdida <= 0f)
        {
            persiguiendo = false;
            ultimoSegundoPerdida = -1;
            agente.ResetPath(); // Se detiene donde llego
            Debug.Log("<color=grey>[IA - Rastro]</color> Rastro perdido por completo. Enemigo detenido.");
        }
    }

    void ActivarPersecucion()
    {
        persiguiendo = true;
        temporizadorPerdida = tiempoParaPerderRastro;
        ultimoSegundoPerdida = -1;
        contadorEspalda = tiempoDeteccionEspalda;
        ultimoSegundoEspalda = -1;
    }

    void GirarHaciaPunto(Vector3 puntoObjetivo)
    {
        Vector3 direccion = (puntoObjetivo - transform.position).normalized;
        direccion.y = 0;
        if (direccion != Vector3.zero)
        {
            Quaternion rotacionObjetivo = Quaternion.LookRotation(direccion);
            transform.rotation = Quaternion.Slerp(transform.rotation, rotacionObjetivo, Time.deltaTime * velocidadGiro);
        }
    }

    bool HayLineaDeVisionSinObstaculos()
    {
        float distancia = Vector3.Distance(transform.position, jugador.position);
        if (distancia > rangoVision) return false;

        Vector3 origenOjos = transform.position + Vector3.up * 1f;
        Vector3 destinoPecho = jugador.position + Vector3.up * 1f;
        Vector3 direccionRayo = (destinoPecho - origenOjos).normalized;

        return !Physics.Raycast(origenOjos, direccionRayo, distancia, capaObstaculos);
    }

    bool EstaEnConoDeVision()
    {
        Vector3 direccionAlJugador = (jugador.position - transform.position).normalized;
        float angulo = Vector3.Angle(transform.forward, direccionAlJugador);
        return angulo < anguloVision / 2f;
    }

    // Ayudas visuales en la pestaña Scene
    void OnDrawGizmos()
    {
        Gizmos.color = Color.yellow;
        Gizmos.DrawWireSphere(transform.position, rangoVision);

        Vector3 limiteIzquierdo = Quaternion.Euler(0, -anguloVision / 2f, 0) * transform.forward * rangoVision;
        Vector3 limiteDerecho = Quaternion.Euler(0, anguloVision / 2f, 0) * transform.forward * rangoVision;

        Gizmos.color = Color.white;
        Gizmos.DrawLine(transform.position + Vector3.up * 1f, transform.position + Vector3.up * 1f + limiteIzquierdo);
        Gizmos.DrawLine(transform.position + Vector3.up * 1f, transform.position + Vector3.up * 1f + limiteDerecho);

        // Dibuja una esfera azul en el ultimo punto donde te vio
        if (persiguiendo)
        {
            Gizmos.color = Color.cyan;
            Gizmos.DrawSphere(ultimaPosicionConocida, 0.4f);
        }

        if (jugador != null)
        {
            float distancia = Vector3.Distance(transform.position, jugador.position);
            if (distancia <= rangoVision)
            {
                Vector3 origenOjos = transform.position + Vector3.up * 1f;
                Vector3 destinoPecho = jugador.position + Vector3.up * 1f;

                bool sinObstaculos = HayLineaDeVisionSinObstaculos();
                bool enCono = EstaEnConoDeVision();

                if (sinObstaculos && enCono)
                    Gizmos.color = Color.green;
                else if (sinObstaculos && !enCono)
                    Gizmos.color = Color.yellow;
                else
                    Gizmos.color = Color.red;

                Gizmos.DrawLine(origenOjos, destinoPecho);
            }
        }
    }
}`,
      },
      destacado: false,
      detallesTecnicos: [
        "IA de enemigo modular basada en NavMeshAgent para proyecto VR en desarrollo",
        "Cono de visión (90°–360°) con depuración visual vía Gizmos y Raycast",
        "Alerta diegética 3D en espacio de mundo (TextMesh sin Canvas, orientada a cámara VR)",
        "Temporizador de alerta por la espalda y parámetros ajustables en Inspector",
        "Memoria espacial: navegación al último punto conocido tras perder visión"
      ]
    },
    {
      id: "prog-03",
      visible: false, // Cambia a true cuando quieras volver a mostrarlo
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
      visible: false, // Cambia a true cuando quieras volver a mostrarlo
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
    subtitulo: "Arquitectura de gameplay y conexión multijugador con Photon PUN2",
    descripcion: "Desglose técnico de mi trabajo de programación en Rusted Steam Gear: desde el control de movimiento, dash y disparos hasta el flujo de salas multijugador y estado de partida en Unity.",
    historiaDesarrollo: "Implementado con Photon PUN2 para permitir partidas en red local/LAN usando una misma build compilada, sincronizando eventos clave y estados de sala.",
    imagen: "./Gears.jpeg",
    video: "", //por si hay video de youtube o similar para posibles gameplays

    // GALERÍA MULTIMEDIA ESTILO STEAM (GIFs, videos MP4/WebM, YouTube o capturas)
    // Coloca tus archivos .gif o .mp4 dentro de la carpeta "public/" y agrégalos aquí:
    galeriaMedia: [
      {
        tipo: "imagen",
        src: "./Gears.jpeg",
        titulo: "Portada · Rusted Steam Gear",
        visible: true,
      },
      {
        tipo: "video",
        src: "./Videos/Test.mp4",
        titulo: "Movimiento, dash y disparo",
        visible: true,
      },
      {
        tipo: "video",
        src: "./Videos/CreatingRoom.mp4",
        titulo: "Creación de Sala Online",
        visible: true,
      },
      {
        tipo: "video",
        src: "./Videos/MultiOnUnity.mp4",
        titulo: "Multijugador en Tiempo Real",
        visible: true,
      },
      // --- EJEMPLOS PARA AGREGAR TUS GIFs O VIDEOS (quita las // para activar) ---
      // {
      //   tipo: "gif",
      //   src: "./gameplay-movimiento.gif",
      //   titulo: "Gameplay · Sistema de Movimiento",
      //   visible: true,
      // },
      // {
      //   tipo: "video",
      //   src: "./demo-photon.mp4",
      //   thumbnail: "./Gears.jpeg", // Opcional: si lo omites, usa el primer frame del video
      //   titulo: "Video · Conexión Multijugador LAN",
      //   visible: true,
      // },
      // {
      //   tipo: "youtube",
      //   src: "ID_O_URL_DE_YOUTUBE",
      //   titulo: "Trailer Técnico en YouTube",
      //   visible: true,
      // },
    ],

    tags: ["Unity", "C#", "Photon PUN2"],

    // Barra inferior de estado (puedes cambiar los textos libremente o poner mostrarStatusFooter: false)
    statusTexto: "Status: Prototipo Jugable (itch.io)",
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
      { titulo: "Multiplayer con Photon PUN2", descripcion: "Gestión de salas, conexión entre clientes y manejo de eventos de victoria o abandono.", visible: true },
      { titulo: "Simulación basada en inputs", descripcion: "Inputs únicos verificados de forma local en cada cliente para evitar desincronización entre jugadores.", visible: true },
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
    linkDemo: "https://kenaiichikito.itch.io/rusted-steam-gear", //añadir a futuro link del juego directo
    linkCodigo: "https://github.com/KenaiiChikito/Prototipo", //añadir a futuro el repertorio de Github directo
    //linkGDD: "https://github.com/KenaiiChikito", //añadir a futuro link de GDD de Notion
  },

  /* ==================================================================================
     4. MUNDO 03 — PROYECTOS CREATIVOS / MODELADO 3D (CARRUSEL & RENDERS)
     Aquí configuras la galería interactiva de renders 3D y los accesos a tus perfiles
     en plataformas de arte 3D (ArtStation, Sketchfab, Behance, Gumroad, etc.).
     ================================================================================== */
  modelado3D: {
    descripcionSeccion: "Exploración de assets y personajes 3D, desde esculpido de alta densidad poligonal en NomadSculpt hasta modelos hard-surface creados en Blender.",
    
    // Plataformas donde subes tus modelos para que los visitantes los inspeccionen en 3D
    plataformasPrincipales: [
      {
        nombre: "ArtStation",
        url: "https://www.artstation.com/kenaiichikito",
        descripcion: "Perfil artístico con renders de presentación, avances de esculpido y proyectos 3D."
      },
      {
        nombre: "Sketchfab",
        url: "https://sketchfab.com/KenaiiChikito",
        descripcion: "Visualizador 3D interactivo en tiempo real para inspeccionar geometrías y volúmenes en 360°."
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
      //     { nombre: "Ver en ArtStation", url: "https://www.artstation.com/kenaiichikito" },
      //     { nombre: "Inspeccionar 3D en Sketchfab", url: "https://sketchfab.com/KenaiiChikito" }
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
      //     { nombre: "Ver en ArtStation", url: "https://www.artstation.com/kenaiichikito" },
      //     { nombre: "Descargar en Gumroad", url: "https://gumroad.com" }
      //   ]
      // },
      {
        id: "nomad-mask",
        titulo: "Máscara Japonesa",
        subtitulo: "Esculpido Estilizado en NomadSculpt",
        descripcion: "Diseño de máscara tradicional japonesa esculpida en NomadSculpt con enfoque en silueta marcada y formas estilizadas.",
        imagen: "./Mask.png",
        software: ["NomadSculpt"],
        polycount: "278.7K Tris (High-Poly)",
        texturas: "Sin texturizar (Sculpt)",
        plataformas: [
          { nombre: "Ver proyecto en Sketchfab", url: "https://sketchfab.com/3d-models/mask-f2675005f0c64ecaa8a70f73482f2f59" }
        ]
      },
      {
        id: "nomad-lizzard",
        titulo: "Lizzard Model",
        subtitulo: "Chibi Lizzard · Esculpido Orgánico",
        descripcion: "Modelo de lagarto chibi esculpido en NomadSculpt como práctica de anatomía orgánica, proporciones y volúmenes estilizados.",
        imagen: "./Lizzard.png",
        software: ["NomadSculpt"],
        polycount: "863.3K Tris (High-Poly)",
        texturas: "Sin texturizar (Sculpt)",
        plataformas: [
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
    descripcion: "Diseño y esculpido de máscara tradicional japonesa, pensada como accesorio místico para personajes de acción o fantasía en videojuegos. Combina curvaturas orgánicas fluidas con bordes definidos y legibles.",
    conceptoArtistico: "Inspirada en el folclore asiático con una reinterpretación estilizada moderna. Esculpida en NomadSculpt y revisada en Blender, cuidando las transiciones de volumen para una lectura clara bajo iluminación direccional.",
    
    // RULETA / CARRUSEL DE IMÁGENES: Puedes agregar tantas imágenes como desees aquí
    imagenes: [
      "./Mask.png",
      "./Poligon.png",
      "./Render.png",
      // Agrega más imágenes aquí si lo deseas, ej: "./OtraImagen.png",
    ],

    imagenPrincipal: "./Mask.png",
    imagenSecundaria: "./Poligon.png",
    software: ["NomadSculpt", "Blender"],
    detallesGeometria: [
      { label: "Triángulos", valor: "278.7K Tris" },
      { label: "Estilo", valor: "Estilizado" },
      { label: "Etapa", valor: "High-Poly Sculpt" },
      { label: "Software", valor: "NomadSculpt" },
    ],
    puntosClave: [
      { titulo: "Silueta de Alto Impacto", descripcion: "Volúmenes y cuernos esculpidos para máxima legibilidad visual desde cámara en tercera persona." },
      { titulo: "Flujo de Curvas Esculpidas", descripcion: "Transiciones suaves entre planos orgánicos y aristas marcadas, lista como base para futura retopología y texturizado PBR." },
      { titulo: "Inspección 3D Interactiva", descripcion: "Malla publicada en Sketchfab para inspección de geometría y proporciones en 360°." },
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
      { icon: "⚡", label: "C#", nivel: "Intermedio", descripcion: "Programación de gameplay e IA en Unity" },
      { icon: "⚙️", label: "C++", nivel: "Intermedio", descripcion: "Lógica y sistemas base en Unreal Engine" },
      //{ icon: "🦀", label: "Rust", nivel: "Intermedio", descripcion: "Desarrollo de herramientas de sistema seguras" },
      //{ icon: "✨", label: "HLSL / GLSL", nivel: "Avanzado", descripcion: "Shaders de superficie, postprocesado y compute shaders" },
      //{ icon: "🔷", label: "TypeScript", nivel: "Intermedio", descripcion: "Herramientas de automatización y UI web" },
    ],
    "Motores de Videojuegos": [
      { icon: "🎮", label: "Unity", nivel: "Avanzado", descripcion: "C#, NavMesh, Photon PUN2, animación y sistemas de UI" },
      { icon: "🏰", label: "Unreal Engine 5", nivel: "Principiante", descripcion: "C++ y Blueprints" },
      { icon: "🧩", label: "Godot Engine", nivel: "Principiante", descripcion: "Prototipado rápido de mecánicas" },
      //{ icon: "🕹️", label: "Custom Engine", nivel: "Avanzado", descripcion: "Arquitectura OpenGL / Vulkan en C++" },
    ],
    "Modelado & Arte 3D": [
      { icon: "🌀", label: "Blender", nivel: "Avanzado", descripcion: "Modelado hard-surface, retopología, UVs y rigging" },
      { icon: "🗿", label: "NomadSculpt", nivel: "Intermedio", descripcion: "Esculpido orgánico y estilizado de personajes y props" },
      //{ icon: "🎨", label: "Substance Painter", nivel: "Avanzado", descripcion: "Texturizado PBR, bakeado de mapas normales y AO" },
      //{ icon: "🧱", label: "Substance Designer", nivel: "Intermedio", descripcion: "Materiales procedurales continuos y trim sheets" },
      //{ icon: "📸", label: "Marmoset Toolbag", nivel: "Avanzado", descripcion: "Bakeado de geometrías y renders de presentación" },
    ],
    "Herramientas & Pipeline": [
      //{ icon: "🗂️", label: "Git & LFS", nivel: "Avanzado", descripcion: "Control de versiones para assets pesados de juego" },
      //{ icon: "🔍", label: "RenderDoc", nivel: "Intermedio", descripcion: "Depuración de draw calls y análisis de pipeline GPU" },
      { icon: "💻", label: "Visual Studio", nivel: "Avanzado", descripcion: "Debugging, profiling de CPU/memoria e integración con Unity" },
      //{ icon: "🐳", label: "Docker", nivel: "Intermedio", descripcion: "Servidores dedicados de prueba para multiplayer" },
    ],
  },

  /* ==================================================================================
     6. MUNDO 05 — GUARDAR PARTIDA E HISTORIAL DE ACTUALIZACIONES
     Incluye tu información de contacto, enlace para descargar CV, generador de QR,
     y la nueva sección de HISTORIAL con las últimas actualizaciones realizadas.
     ================================================================================== */
  contacto: {
    intro: "¿Buscas un practicante o colaborador para programación en Unity / C# y soporte de arte 3D? Escríbeme o descarga mi CV y conversemos.",
    email: "m.gomez.cornejo2001@gmail.com",
    ubicacion: "Rancagua, Chile — Disponible para modalidad presencial, híbrida o remota",
    disponibilidad: "Práctica Profesional / Proyectos Indie / Freelance",
    cvUrl: "./Archivosvarios/Gomez_Juan.pdf",
  },

  // URL para el código QR interactivo de tu portafolio
  qrUrl: "https://kenaiichikito.github.io/JGCPortfolio/",

  /* ==================================================================================
     CONFIGURACIÓN DE ACCESO PRIVADO / ADMINISTRADOR (SOLO PARA TI)
     Configura aquí tu clave personal para desbloquear el generador de QR privado.
     Puedes cambiar esta clave en cualquier momento.
     ================================================================================== */
  adminConfig: {
    // Tu clave maestra secreta (Cámbiala cuando quieras por la que prefieras):
    claveAcceso: "152436JG",
    // Tu usuario oficial de GitHub para validar autoría:
    githubUsername: "KenaiiChikito",
  },

  // NUEVA SECCIÓN: Registro de guardado / Historial de actualizaciones (Changelog de parches)
  historialActualizaciones: [
    {
      version: "v1.6",
      fecha: "Noviembre 2026",
      titulo: "Anexo de Investigaciones & Tutoriales: Mocap Facial",
      descripcion: "Agregué un espacio aparte al pie de la página para subir investigaciones, tutoriales y descargas sin interrumpir el portafolio. Lo estrené con mi guía de tracking facial en Blender (ARKit / LiveLinkFace / MeowFace), incluyendo PDF, video explicativo y archivos de apoyo.",
      tipo: "nuevo"
    },
    {
      version: "v1.5",
      fecha: "Noviembre 2026",
      titulo: "Ajustes de Navegación, Contexto VR en Enemy AI y Pulido General",
      descripcion: "Corregí las etiquetas flotantes del mapa lateral para que no tapen botones al navegar, actualicé el proyecto de Enemy AI indicando su desarrollo para VR, limpié enlaces en desuso de Modelado 3D y dejé la ruta del CV lista para GitHub Pages.",
      tipo: "mejora"
    },
    {
      version: "v1.4",
      fecha: "Noviembre 2026",
      titulo: "Sistema de IA con NavMesh, Demos en Video y Código en Vivo",
      descripcion: "Agregué mi proyecto de Enemy AI para Unity (cono de visión de 90°, detección por espalda con temporizador, raycast de obstáculos y último punto conocido) junto con 5 videos de prueba y el script completo de C# legible directo desde el portafolio.",
      tipo: "nuevo"
    },
    {
      version: "v1.3",
      fecha: "Noviembre 2026",
      titulo: "Rusted Steam Gear en itch.io & Galería de Gameplay",
      descripcion: "Sumé la ficha completa de Rusted Steam Gear con enlace directo para probarlo en itch.io, el código de GameManager en Photon PUN2 y un reproductor multimedia para ver clips de movimiento, dash y creación de salas LAN.",
      tipo: "hito"
    },
    {
      version: "v1.2",
      fecha: "Septiembre 2026",
      titulo: "Vitrina 3D: Máscara Japonesa Estilizada y Lizzard",
      descripcion: "Incorporé mis modelos 3D esculpidos en NomadSculpt y Blender con visor de múltiples capturas (render y topología) y acceso directo a Sketchfab para inspeccionarlos en 360°.",
      tipo: "nuevo"
    },
    {
      version: "v1.1",
      fecha: "Septiembre 2026",
      titulo: "CV Descargable, Enlaces Oficiales y Ajuste de Habilidades",
      descripcion: "Dejé configurada la descarga directa de mi currículum en PDF, la ficha técnica enfocada en Unity, C#, C++ y modelado 3D, y la nueva URL del portafolio en GitHub Pages.",
      tipo: "mejora"
    }
  ],

  /* ==================================================================================
     7. ARCHIVO ANEXO — INVESTIGACIONES, TUTORIALES, PDFs Y DESCARGAS
     Este apartado NO aparece como un "Mundo" en el portafolio; se abre únicamente
     desde un botón discreto al final del pie de página (footer) como ventana emergente.

     📘 GUÍA RÁPIDA PARA AGREGAR TUS ARCHIVOS AQUÍ:
     1) ARCHIVOS LOCALES (PDF, ZIP, UnityPackage, etc.):
        - Guarda el archivo dentro de la carpeta: public/Archivosvarios/
        - Escríbelo con "./" al inicio, por ejemplo: "./Archivosvarios/mi-investigacion.pdf"
          (El "./" es obligatorio para que funcione bien en GitHub Pages).

     2) VIDEOS LOCALES O YOUTUBE:
        - Si es un video tuyo (.mp4 / .webm): guárdalo en public/Videos/ y usa "./Videos/mi-tutorial.mp4"
        - Si es un video de YouTube: pega la URL completa o solo el ID (ej: "https://youtu.be/dQw4w9WgXcQ")

     3) LINKS DE DESCARGA O REFERENCIAS EXTERNAS:
        - Puedes usar Google Drive, GitHub Releases, itch.io, Notion o un .zip en "./Archivosvarios/archivo.zip"

     4) CÓMO ACTIVAR O APAGAR UN ELEMENTO:
        - Copia cualquiera de los bloques de ejemplo de abajo dentro de `items: [ ... ]`
        - Quita las barras "//" del inicio de las líneas.
        - Si quieres ocultarlo temporalmente sin borrarlo, cambia `visible: true` a `visible: false`.
     ================================================================================== */
  archivoRecursos: {
    titulo: "Investigaciones, Tutoriales & Recursos",
    descripcion: "Anexo técnico aparte del portafolio principal con documentos PDF, guías en video y material de descarga.",
    items: [
      {
        id: "MocapFacial",
        categoria: 'investigacion',
        fecha: "Noviembre 2026",
        titulo: "Investigación Mocap / Tracking Facial",
        descripcion: "Investigación sobre mocap facial para clase: integración en Blender con LiveLinkFace (Iphone/Ipad app) o MeowFace (APK android), Add-on Blender LiveLinkFace, descargando extension para toma de vrm para Viverse, para android instalar solo MewFace en android y el add-on arkit y para iphone/ipad instalar LiveLinkFace y add-on blender_livelinkface + arkit..",
        tags: ["Blender"],
        pdfUrl: "./ArchivosInvesti/ARKit Mocap StudioGuía de uso.pdf",
        //linkExterno: "https://nickfisher.gumroad.com/l/tvzndw",
        video: "./ArchivosInvesti/TutorialArkit-LiveLinkFace.mp4", // Pon aquí el nombre completo del .mp4 cuando lo subas
        linkDescarga: "./ArchivosInvesti/ArchivosNecesarios.rar",
        // Puedes sumar un video, varios videos o un link de descarga EN ESTE MISMO BLOQUE (quita las //):
        // video: "./Videos/mi-tutorial.mp4", // o pega un link de YouTube
        // videos: [
        //   { titulo: "Parte 1 · LiveLinkServer", src: "./Videos/parte1.mp4" },
        //   { titulo: "Parte 2 · MeowFace", src: "https://youtu.be/TU_ID" },
        // ],
        // linkDescarga: "./ArchivosInvesti/archivo.zip",
        visible: true,
      },
      // --- EJEMPLO 1: INVESTIGACIÓN CON PDF Y ENLACE DE REFERENCIA ---
      // {
      //   id: "inv-01",
      //   categoria: "investigacion", // Opciones: "investigacion" | "tutorial" | "descarga" | "apuntes"
      //   fecha: "Noviembre 2026",
      //   titulo: "Investigación sobre Optimización en VR para Unity",
      //   descripcion: "Documento con pruebas de draw calls, bakeo de luces y manejo de UI diegética en visores VR.",
      //   tags: ["Unity", "VR", "Investigación"],
      //   pdfUrl: "./Archivosvarios/investigacion-vr.pdf", // Archivo guardado en public/Archivosvarios/
      //   linkExterno: "https://github.com/KenaiiChikito",   // Opcional: enlace a repo, Notion o artículo
      //   visible: true,
      // },

      // --- EJEMPLO 2: TUTORIAL CON VIDEO (MP4 LOCAL O YOUTUBE) + LINK DE DESCARGA ---
      // {
      //   id: "tut-01",
      //   categoria: "tutorial",
      //   fecha: "Noviembre 2026",
      //   titulo: "Cómo configurar un Cono de Visión con Raycast en Unity",
      //   descripcion: "Video paso a paso explicando ángulos de detección, Gizmos en escena y memoria de última posición.",
      //   tags: ["C#", "Unity", "Tutorial"],
      //   video: "./Videos/mi-tutorial.mp4", // O pega aquí un link/ID de YouTube
      //   linkDescarga: "./Archivosvarios/EnemyAI_Script.zip", // Opcional: link directo o archivo en public/Archivosvarios/
      //   visible: true,
      // },

      // --- EJEMPLO 3: PACK DESCARGABLE / APUNTES (PDF + VIDEO + DESCARGA) ---
      // {
      //   id: "rec-01",
      //   categoria: "descarga",
      //   fecha: "Noviembre 2026",
      //   titulo: "Base de Props Hard-Surface para Prototipos",
      //   descripcion: "Paquete de modelos FBX exportados desde Blender listos para pruebas rápidas en Unity.",
      //   tags: ["Blender", "Hard-Surface", "FBX"],
      //   pdfUrl: "./Archivosvarios/guia-exportacion.pdf", // Opcional
      //   video: "",                                       // Opcional
      //   linkDescarga: "https://github.com/KenaiiChikito",
      //   visible: true,
      // },
    ],
  },

  // Texto del pie de página
  footer: `Portafolio Game Developer & 3D Artist · Edición Otoño © ${new Date().getFullYear()} · Todos los derechos reservados.`
};
