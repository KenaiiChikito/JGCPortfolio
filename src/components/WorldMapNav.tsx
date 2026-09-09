import { useEffect, useState } from 'react';
import { PORTFOLIO_CONFIG } from '../portfolioConfig';

export interface WorldSection {
  id: string;
  number: string;
  label: string;
  shortLabel: string;
}

export const ALL_WORLD_SECTIONS: WorldSection[] = [
  { id: 'inicio', number: '00', label: 'PRESS START', shortLabel: 'INICIO' },
  { id: 'about', number: '01', label: 'SOBRE MÍ', shortLabel: 'MUNDO 01' },
  { id: 'proyectos', number: '02', label: 'PROGRAMACIÓN', shortLabel: 'MUNDO 02' },
  { id: 'prog-destacado', number: '02★', label: 'PROG. DESTACADO', shortLabel: 'DESTACADO' },
  { id: 'modelado', number: '03', label: 'MODELADO 3D', shortLabel: 'MUNDO 03' },
  { id: 'creative-destacado', number: '03★', label: '3D DESTACADO', shortLabel: 'DESTACADO' },
  { id: 'skills', number: '04', label: 'INVENTARIO', shortLabel: 'MUNDO 04' },
  { id: 'contacto', number: '05', label: 'GUARDAR PARTIDA', shortLabel: 'MUNDO 05' },
];

export const WORLD_SECTIONS: WorldSection[] = ALL_WORLD_SECTIONS.filter((sec) => {
  if (sec.id === 'proyectos' && PORTFOLIO_CONFIG.seccionesVisibles?.mundo02Programacion === false) {
    return false;
  }
  if (sec.id === 'prog-destacado' && PORTFOLIO_CONFIG.seccionesVisibles?.mundo02Destacado === false) {
    return false;
  }
  return true;
});

interface WorldMapNavProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
}

export function WorldMapNav({ activeSection, onSelectSection }: WorldMapNavProps) {
  const [markerTop, setMarkerTop] = useState(0);
  const [progressPct, setProgressPct] = useState(0);

  useEffect(() => {
    const activeIdx = WORLD_SECTIONS.findIndex((s) => s.id === activeSection);
    const total = WORLD_SECTIONS.length - 1;
    if (activeIdx !== -1 && total > 0) {
      setProgressPct((activeIdx / total) * 100);
      // approximate pixel position based on 46px per item
      setMarkerTop(activeIdx * 46 + 18);
    }
  }, [activeSection]);

  return (
    <>
      {/* Desktop Vertical Level Map (Right side) */}
      <nav
        aria-label="Mapa de niveles del portafolio"
        className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end py-4 px-2 select-none"
      >
        {/* Background track line and active progress line */}
        <div className="absolute right-[19px] top-6 bottom-6 w-[2px] bg-[rgba(224,122,63,0.2)]">
          <div
            className="w-full bg-gradient-to-b from-[#e07a3f] via-[#e8a038] to-[#f59e0b] transition-all duration-300 ease-out rounded-full shadow-[0_0_8px_rgba(232,160,56,0.6)]"
            style={{ height: `${progressPct}%` }}
          />
        </div>

        {/* Moving player marker (golden diamond) */}
        <div
          className="absolute right-[15px] w-[10px] h-[10px] bg-[#e8a038] transition-all duration-300 ease-out z-10 shadow-[0_0_12px_#e8a038]"
          style={{
            top: `${markerTop}px`,
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          }}
        />

        {/* Section nodes */}
        <div className="flex flex-col gap-3 relative z-20">
          {WORLD_SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                className="group flex items-center gap-3 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e07a3f] rounded-lg transition-all"
                title={`${sec.shortLabel}: ${sec.label}`}
              >
                {/* Floating label on hover or active */}
                <span
                  className={`font-mono text-xs px-2.5 py-1 rounded-md border transition-all duration-200 whitespace-nowrap shadow-md ${
                    isActive
                      ? 'opacity-100 translate-x-0 bg-[#261910] text-[#e8a038] border-[#e07a3f]/60 font-semibold'
                      : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 bg-[#1c120b] text-[#bda89b] border-[#e07a3f]/20'
                  }`}
                >
                  <span className="text-[#e07a3f] mr-1.5">{sec.number}</span>
                  {sec.label}
                </span>

                {/* Node dot */}
                <span
                  className={`w-[16px] h-[16px] rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                    isActive
                      ? 'bg-[#e07a3f] border-[#e8a038] shadow-[0_0_10px_rgba(224,122,63,0.7)] scale-110'
                      : 'bg-[#1c120b] border-[#7f6a5e] group-hover:border-[#e07a3f] group-hover:bg-[#261910]'
                  }`}
                >
                  {isActive && <span className="w-1.5 h-1.5 bg-[#faede5] rounded-full" />}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Bottom Level Bar */}
      <nav
        aria-label="Navegación móvil de niveles"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1c120b]/95 backdrop-blur-md border-t border-[rgba(224,122,63,0.25)] px-3 py-2 flex justify-around items-center"
      >
        {WORLD_SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              className={`flex flex-col items-center gap-1 p-1 rounded transition-colors ${
                isActive ? 'text-[#e8a038]' : 'text-[#7f6a5e] hover:text-[#bda89b]'
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full border transition-all ${
                  isActive
                    ? 'bg-[#e07a3f] border-[#e8a038] scale-125 shadow-[0_0_8px_#e07a3f]'
                    : 'bg-[#140c07] border-[#7f6a5e]'
                }`}
              />
              <span className="font-pixel text-[8px] tracking-tight">{sec.number}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
