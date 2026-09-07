export interface SocialLink {
  icon: string;
  label: string;
  url: string;
}

export interface StatItem {
  label: string;
  value: number; // 0 to 100
  category?: string;
}

export interface ProgrammingProject {
  id: string;
  titulo: string;
  tags: string[];
  descripcion: string;
  imagen: string;
  video?: string; // YouTube video ID or embed
  linkDemo?: string;
  linkCodigo?: string;
  destacado?: boolean;
  detallesTecnicos?: string[];
  visible?: boolean; // Permite ocultar temporalmente sin borrar el código (visible: false)
}

export interface Render3DProject {
  id: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  imagen: string;
  software: string[];
  polycount?: string;
  texturas?: string;
  plataformas: {
    nombre: string;
    url: string;
    icono?: string;
  }[];
  visible?: boolean; // Permite ocultar temporalmente sin borrar el código (visible: false)
}

export interface SkillItem {
  icon: string;
  label: string;
  nivel?: string; // e.g., 'Experto', 'Avanzado'
  descripcion?: string;
  visible?: boolean;
}

export interface HistorialUpdate {
  version: string;
  fecha: string;
  titulo: string;
  descripcion: string;
  tipo: 'nuevo' | 'mejora' | 'correccion' | 'hito';
}

export interface FeaturedProgrammingProject {
  subtituloBadge?: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  historiaDesarrollo?: string;
  imagen: string;
  video?: string;
  tags: string[];
  // Campos configurables para el footer inferior de la tarjeta
  statusTexto?: string; // Por ejemplo: "Status: Compilado & Optimizado"
  statusTargetBadge?: string; // Por ejemplo: "60 FPS TARGET" o "LAN MULTIPLAYER OK"
  mostrarStatusFooter?: boolean; // Poner en false si se desea ocultar toda la barra inferior
  metricasRendimiento: {
    label: string;
    valor: string;
    detalle?: string;
    visible?: boolean; // Permite ocultar esta métrica con visible: false
  }[];
  caracteristicasTecnicas: {
    titulo: string;
    descripcion: string;
    visible?: boolean; // Permite ocultar este bloque con visible: false
  }[];
  codigoSnippet?: {
    lenguaje: string;
    archivo: string;
    codigo: string;
    visible?: boolean; // Permite ocultar la pestaña de código con visible: false
  };
  linkDemo?: string;
  linkCodigo?: string;
  linkGDD?: string;
}

export interface FeaturedCreativeProject {
  subtituloBadge?: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  conceptoArtistico?: string;
  imagenPrincipal: string;
  imagenSecundaria?: string;
  software: string[];
  detallesGeometria: {
    label: string;
    valor: string;
  }[];
  puntosClave: {
    titulo: string;
    descripcion: string;
  }[];
  plataformas: {
    nombre: string;
    url: string;
    icono?: string;
  }[];
}

export interface PortfolioConfig {
  hero: {
    tagAvailability: string;
    nombre: string;
    rol: string;
    tagline: string;
    botonPressStart: string;
  };
  socials: SocialLink[];
  avatar: {
    src: string;
    badge: string;
  };
  fichaRpg?: {
    rolPrincipal: string;
    motorFavorito: string;
    staminaCreativa: string;
  };
  bio: string[];
  stats: StatItem[];
  proyectosProgramacion: ProgrammingProject[];
  proyectoProgramacionDestacado?: FeaturedProgrammingProject;
  modelado3D: {
    descripcionSeccion: string;
    plataformasPrincipales: {
      nombre: string;
      url: string;
      descripcion: string;
    }[];
    renders: Render3DProject[];
  };
  proyectoCreativoDestacado?: FeaturedCreativeProject;
  inventario: Record<string, SkillItem[]>;
  contacto: {
    intro: string;
    email: string;
    ubicacion: string;
    disponibilidad: string;
    cvUrl: string;
  };
  qrUrl: string;
  historialActualizaciones: HistorialUpdate[];
  footer: string;
}
