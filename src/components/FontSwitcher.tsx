import React, { useState } from 'react';
import { Type, Check, RotateCcw, ChevronDown, ChevronUp, Box, Gamepad2, Terminal, Sparkles, Monitor } from 'lucide-react';

export type FontMode = 'original' | 'milky-vintage' | 'oxanium' | 'pixelify' | 'space-mono';

interface FontSwitcherProps {
  fontMode: FontMode;
  onSelectFont: (mode: FontMode) => void;
  vintageEffect: boolean;
  onToggleVintageEffect: (enabled: boolean) => void;
}

export function FontSwitcher({
  fontMode,
  onSelectFont,
  vintageEffect,
  onToggleVintageEffect,
}: FontSwitcherProps) {
  const [minimized, setMinimized] = useState(false);

  const getLabel = (mode: FontMode) => {
    switch (mode) {
      case 'oxanium':
        return 'Oxanium (3D & Game Dev)';
      case 'pixelify':
        return 'Pixelify Sans (16-Bit RPG)';
      case 'space-mono':
        return 'Space Mono (Terminal 70s)';
      case 'milky-vintage':
        return 'Milky Vintage';
      case 'original':
        return 'Fuente Original';
    }
  };

  const options: {
    id: FontMode;
    name: string;
    tag: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      id: 'oxanium',
      name: 'Oxanium',
      tag: 'Modelado 3D & Tech',
      icon: <Box className="w-3.5 h-3.5" />,
      color: '#e07a3f',
    },
    {
      id: 'pixelify',
      name: 'Pixelify Sans',
      tag: '16-Bit JRPG Retro',
      icon: <Gamepad2 className="w-3.5 h-3.5" />,
      color: '#85994b',
    },
    {
      id: 'space-mono',
      name: 'Space Mono',
      tag: 'Terminal Código 70s',
      icon: <Terminal className="w-3.5 h-3.5" />,
      color: '#e8a038',
    },
    {
      id: 'milky-vintage',
      name: 'Milky Vintage',
      tag: 'Sign Studio Cursiva',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      color: '#c2522b',
    },
    {
      id: 'original',
      name: 'Fuente Original',
      tag: 'Space Grotesk + Inter',
      icon: <RotateCcw className="w-3.5 h-3.5" />,
      color: '#bda89b',
    },
  ];

  return (
    <aside
      aria-label="Selector de tipografía y efectos"
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 font-sans select-none"
    >
      {minimized ? (
        <button
          onClick={() => setMinimized(false)}
          className="flex items-center gap-2 bg-[#1c120b]/95 hover:bg-[#261910] text-[#e8a038] border border-[#e8a038]/50 px-3.5 py-2.5 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all hover:scale-105"
          title="Abrir panel de tipografía y efectos"
        >
          <Type className="w-4 h-4" />
          <span className="text-xs font-semibold">
            {getLabel(fontMode)}
          </span>
          {vintageEffect && (
            <span className="w-2 h-2 rounded-full bg-[#85994b] animate-pulse" title="Efecto CRT activo" />
          )}
          <ChevronUp className="w-3.5 h-3.5 text-[#bda89b]" />
        </button>
      ) : (
        <div className="bg-[#1c120b]/95 backdrop-blur-md border border-[rgba(224,122,63,0.35)] rounded-2xl p-3.5 shadow-[0_12px_32px_rgba(0,0,0,0.75)] w-[320px] transition-all">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-[rgba(224,122,63,0.15)]">
            <div className="flex items-center gap-2 text-xs text-[#faede5] font-semibold">
              <span className="w-6 h-6 rounded-lg bg-[#e07a3f]/20 border border-[#e07a3f]/40 flex items-center justify-center text-[#e8a038]">
                <Type className="w-3.5 h-3.5" />
              </span>
              <span>Tipografía & Efecto Retro</span>
            </div>

            <button
              onClick={() => setMinimized(true)}
              className="text-[#7f6a5e] hover:text-[#faede5] p-1 rounded transition-colors"
              title="Minimizar panel"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-[#bda89b] mb-2 leading-tight">
            Estilos para programador / modelador 3D (100% legibles con todos los caracteres):
          </p>

          {/* Font List */}
          <div className="flex flex-col gap-1 p-1 bg-[#140c07] rounded-xl border border-[rgba(224,122,63,0.2)] max-h-[220px] overflow-y-auto">
            {options.map((opt) => {
              const isSelected = fontMode === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onSelectFont(opt.id)}
                  className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs transition-all ${
                    isSelected
                      ? 'bg-[#e07a3f] text-[#140c07] shadow-sm font-bold'
                      : 'text-[#bda89b] hover:text-[#faede5] hover:bg-[#261910]'
                  }`}
                >
                  <div className="flex items-center gap-2 text-left">
                    <span className={isSelected ? 'text-[#140c07]' : 'text-[#e8a038]'}>
                      {opt.icon}
                    </span>
                    <div>
                      <div className="leading-none text-xs font-semibold">{opt.name}</div>
                      <div
                        className={`text-[9.5px] leading-tight ${
                          isSelected ? 'text-[#140c07]/80' : 'text-[#7f6a5e]'
                        }`}
                      >
                        {opt.tag}
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                </button>
              );
            })}
          </div>

          {/* Retro CRT Effect Toggle */}
          <div className="mt-2.5 pt-2 border-t border-[rgba(224,122,63,0.15)] flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-[#faede5]">
              <Monitor className="w-3.5 h-3.5 text-[#e8a038]" />
              <span className="text-[11px]">Efecto Monitor CRT</span>
            </div>
            <button
              onClick={() => onToggleVintageEffect(!vintageEffect)}
              className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all border ${
                vintageEffect
                  ? 'bg-[#85994b]/30 border-[#85994b] text-[#85994b]'
                  : 'bg-[#261910] border-[rgba(224,122,63,0.25)] text-[#bda89b] hover:text-[#faede5]'
              }`}
            >
              {vintageEffect ? 'ACTIVADO' : 'DESACTIVADO'}
            </button>
          </div>

          <div className="mt-2 flex items-center justify-between text-[10px] text-[#7f6a5e]">
            <span>Acentos y caracteres verificados</span>
            <span className="text-[#e8a038]">Reversible</span>
          </div>
        </div>
      )}
    </aside>
  );
}
