import React from 'react';
import {
  Github,
  Linkedin,
  Youtube,
  Globe,
  Box,
  Gamepad2,
  ExternalLink,
  Code2,
  FileText,
  Share2,
  Layers,
} from 'lucide-react';

interface PlatformIconProps {
  name: string;
  className?: string;
}

export function PlatformIcon({ name, className = "w-4 h-4" }: PlatformIconProps) {
  const normalized = (name || "").toLowerCase().trim();

  // GitHub
  if (normalized.includes('github') || normalized.includes('git')) {
    return <Github className={className} />;
  }

  // LinkedIn
  if (normalized.includes('linkedin')) {
    return <Linkedin className={className} />;
  }

  // YouTube
  if (normalized.includes('youtube') || normalized.includes('video') || normalized.includes('trailer')) {
    return <Youtube className={className} />;
  }

  // ArtStation SVG mark
  if (normalized.includes('artstation')) {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M0 17.723l2.027 3.509h.001a2.424 2.424 0 0 0 2.164 1.337h13.385l-3.32-5.753H0zm23.585-3.294l-7.79-13.49A2.43 2.43 0 0 0 13.688 0h-.012a2.424 2.424 0 0 0-2.106 1.231L1.76 17.723h6.638l5.28-9.148 4.384 7.592h-4.384l2.139 3.708h5.367a2.427 2.427 0 0 0 2.401-2.146 2.435 2.435 0 0 0-.001-3.006z" />
      </svg>
    );
  }

  // Sketchfab 3D Cube Isometric SVG
  if (normalized.includes('sketchfab') || normalized.includes('skfb')) {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      </svg>
    );
  }

  // itch.io Gamepad Controller SVG mark
  if (normalized.includes('itch') || normalized.includes('itch.io')) {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M2.57 3A2.57 2.57 0 0 0 0 5.57v1.86a2.57 2.57 0 0 0 .57 1.64L3.43 12.5a2.57 2.57 0 0 0 1.93.93h.36a4.29 4.29 0 0 0 2.56-1.55l.77-.92a.86.86 0 0 1 1.32 0l.77.92A4.29 4.29 0 0 0 13.7 13.43h.36a2.57 2.57 0 0 0 1.93-.93l2.86-3.43a2.57 2.57 0 0 0 .57-1.64V5.57A2.57 2.57 0 0 0 16.85 3H2.57zm1.71 3.43h1.72v1.71H4.28V6.43zm9.43 0h1.71v1.71h-1.71V6.43zM3.43 9h1.71v1.71H3.43V9zm3.43 0h1.71v1.71H6.86V9zm7.71 0h1.71v1.71h-1.71V9zm-3.43 0h1.71v1.71h-1.71V9zM1.71 16.29A5.14 5.14 0 0 0 6.86 21.43h8.57a5.14 5.14 0 0 0 5.14-5.14v-1.72H1.71v1.72z" transform="scale(1.1) translate(-1, -1)" />
      </svg>
    );
  }

  // Steam
  if (normalized.includes('steam')) {
    return <Gamepad2 className={className} />;
  }

  // NomadSculpt / Esculpido 3D
  if (normalized.includes('nomad') || normalized.includes('sculpt') || normalized.includes('zbrush')) {
    return <Layers className={className} />;
  }

  // Blender
  if (normalized.includes('blender') || normalized.includes('3d')) {
    return <Box className={className} />;
  }

  // GDD / Documentación
  if (normalized.includes('gdd') || normalized.includes('doc') || normalized.includes('pdf')) {
    return <FileText className={className} />;
  }

  // Código / Repositorio
  if (normalized.includes('code') || normalized.includes('codigo')) {
    return <Code2 className={className} />;
  }

  // Demo / Juego
  if (normalized.includes('demo') || normalized.includes('juego') || normalized.includes('play')) {
    return <Gamepad2 className={className} />;
  }

  // Default web / link
  return <ExternalLink className={className} />;
}
