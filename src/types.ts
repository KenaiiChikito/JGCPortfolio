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
}

export interface SkillItem {
  icon: string;
  label: string;
  nivel?: string; // e.g., 'Experto', 'Avanzado'
  descripcion?: string;
}

export interface HistorialUpdate {
  version: string;
  fecha: string;
  titulo: string;
  descripcion: string;
  tipo: 'nuevo' | 'mejora' | 'correccion' | 'hito';
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
  modelado3D: {
    descripcionSeccion: string;
    plataformasPrincipales: {
      nombre: string;
      url: string;
      descripcion: string;
    }[];
    renders: Render3DProject[];
  };
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
