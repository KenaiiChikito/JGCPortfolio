import React from 'react';

interface SkillLogoProps {
  label: string;
  className?: string;
  fallback?: string;
}

export function SkillLogo({ label, className = "w-7 h-7", fallback }: SkillLogoProps) {
  const normalized = (label || '').toLowerCase().trim();

  let iconSrc = '';
  let altText = label;
  let customStyle = '';

  // 1. Lenguajes de Programación
  if (normalized === 'c#' || normalized.includes('c sharp') || normalized.includes('csharp')) {
    iconSrc = './icons/csharp.svg';
  } else if (normalized === 'c++' || normalized.includes('cpp') || normalized.includes('c plus')) {
    iconSrc = './icons/cplusplus.svg';
  } else if (normalized.includes('rust')) {
    iconSrc = './icons/rust.svg';
  } else if (normalized.includes('typescript') || normalized === 'ts') {
    iconSrc = './icons/typescript.svg';
  }
  
  // 2. Motores de Videojuegos
  else if (normalized.includes('unity')) {
    iconSrc = './icons/unity.svg';
  } else if (normalized.includes('unreal') || normalized.includes('ue5') || normalized.includes('ue4')) {
    iconSrc = './icons/unrealengine.svg';
  } else if (normalized.includes('godot')) {
    iconSrc = './icons/godot.svg';
  }

  // 3. Modelado & Arte 3D
  else if (normalized.includes('blender')) {
    iconSrc = './icons/blender.svg';
  } else if (normalized.includes('nomad') || normalized.includes('sculpt')) {
    iconSrc = './icons/nomadsculpt.png';
    customStyle = 'rounded-lg shadow-sm';
  }

  // 4. Herramientas & Pipeline
  else if (normalized.includes('visual studio') || normalized.includes('vs')) {
    iconSrc = './icons/visualstudio.svg';
  } else if (normalized.includes('git')) {
    iconSrc = './icons/git.svg';
  } else if (normalized.includes('docker')) {
    iconSrc = './icons/docker.svg';
  }

  if (iconSrc) {
    return (
      <img
        src={iconSrc}
        alt={altText}
        className={`${className} ${customStyle} object-contain select-none`}
        loading="lazy"
        onError={(e) => {
          if (fallback) {
            e.currentTarget.style.display = 'none';
          }
        }}
      />
    );
  }

  if (fallback) {
    return <span className="text-2xl select-none">{fallback}</span>;
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}
