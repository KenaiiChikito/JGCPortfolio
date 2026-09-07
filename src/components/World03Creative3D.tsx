import { useState, useEffect } from 'react';
import { PortfolioConfig, Render3DProject } from '../types';
import { PlatformIcon } from './PlatformIcon';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  Maximize2,
  Box,
  Cpu,
  Palette,
  Pause,
  Play,
  X
} from 'lucide-react';

interface World03Creative3DProps {
  modeladoData: PortfolioConfig['modelado3D'];
}

export function World03Creative3D({ modeladoData }: World03Creative3DProps) {
  const { plataformasPrincipales, descripcionSeccion } = modeladoData;
  const renders = (modeladoData.renders || []).filter((r) => r.visible !== false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [lightboxRender, setLightboxRender] = useState<Render3DProject | null>(null);

  const currentRender = renders[currentIndex] || renders[0];

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlay || renders.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % renders.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay, renders.length]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev === 0 ? renders.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % renders.length);
  };

  return (
    <section id="modelado" className="relative z-10 py-24 md:py-32 border-t border-[rgba(224,122,63,0.2)]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="font-pixel text-xs text-[#e8a038] tracking-widest flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#e8a038] rotate-45 inline-block shadow-[0_0_8px_#e8a038]" />
              MUNDO 03
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#faede5]">
              Proyectos Creativos · Modelado 3D
            </h2>
            <p className="text-[#bda89b] text-base mt-2 max-w-2xl font-body">
              {descripcionSeccion}
            </p>
          </div>

          {/* Carousel control buttons */}
          <div className="flex items-center gap-3 bg-[#1c120b] border border-[rgba(224,122,63,0.2)] rounded-xl p-1.5 self-start md:self-auto">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`p-2 rounded-lg font-mono text-xs flex items-center gap-1 transition-colors ${
                isAutoPlay ? 'text-[#85994b] hover:text-[#9bb356]' : 'text-[#7f6a5e] hover:text-[#faede5]'
              }`}
              title={isAutoPlay ? 'Pausar auto-reproducción' : 'Iniciar auto-reproducción'}
            >
              {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isAutoPlay ? 'Auto' : 'Manual'}</span>
            </button>
            <div className="w-[1px] h-4 bg-[rgba(224,122,63,0.2)]" />
            <button
              onClick={handlePrev}
              className="p-2 rounded-lg text-[#faede5] hover:bg-[#261910] hover:text-[#e8a038] transition-colors"
              title="Render anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-[#e8a038] px-2 font-bold">
              {String(currentIndex + 1).padStart(2, '0')} / {String(renders.length).padStart(2, '0')}
            </span>
            <button
              onClick={handleNext}
              className="p-2 rounded-lg text-[#faede5] hover:bg-[#261910] hover:text-[#e8a038] transition-colors"
              title="Siguiente render"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Platforms Hub: Direct links to ArtStation, Sketchfab, Behance */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {plataformasPrincipales.map((plat) => (
            <a
              key={plat.nombre}
              href={plat.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#1c120b] border border-[rgba(224,122,63,0.2)] hover:border-[#e07a3f] p-4 rounded-xl transition-all hover:-translate-y-1 flex items-start justify-between shadow-sm"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#261910] flex items-center justify-center text-[#e8a038] group-hover:text-[#e07a3f] transition-colors">
                    <PlatformIcon name={plat.nombre} className="w-4 h-4" />
                  </div>
                  <span className="font-display font-bold text-[#faede5] group-hover:text-[#e8a038] transition-colors">
                    {plat.nombre}
                  </span>
                </div>
                <p className="text-xs text-[#bda89b] font-body line-clamp-2">
                  {plat.descripcion}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-[#7f6a5e] group-hover:text-[#e07a3f] transition-colors shrink-0 ml-2 mt-1" />
            </a>
          ))}
        </div>

        {/* Main 3D Render Slider / Showcase */}
        <div className="bg-[#1c120b] border border-[rgba(224,122,63,0.25)] rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] items-stretch">
            
            {/* Viewport with Image & Lightbox Trigger */}
            <div className="relative aspect-[16/10] lg:aspect-auto min-h-[340px] md:min-h-[460px] bg-[#140c07] overflow-hidden group">
              <img
                src={currentRender.imagen}
                alt={`Render 3D de ${currentRender.titulo}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 scanlines opacity-25 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140c07] via-transparent to-transparent opacity-60" />

              {/* Lightbox zoom trigger */}
              <button
                onClick={() => setLightboxRender(currentRender)}
                className="absolute top-4 right-4 bg-[#140c07]/80 hover:bg-[#e07a3f] text-[#faede5] hover:text-[#140c07] p-2.5 rounded-xl border border-[rgba(224,122,63,0.3)] transition-all shadow-md flex items-center gap-1.5 font-mono text-xs"
                title="Ampliar render en alta resolución"
              >
                <Maximize2 className="w-4 h-4" />
                <span className="hidden sm:inline">Zoom HD</span>
              </button>

              {/* 3D Asset Tag */}
              <div className="absolute top-4 left-4 bg-[#140c07]/85 border border-[#e8a038]/50 text-[#e8a038] font-mono text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-md">
                <Layers className="w-3.5 h-3.5 text-[#e07a3f]" />
                <span>3D RENDER SLIDER</span>
              </div>

              {/* Prev / Next overlaid navigation arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#140c07]/75 hover:bg-[#e07a3f] text-[#faede5] hover:text-[#140c07] flex items-center justify-center border border-[rgba(224,122,63,0.3)] transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                title="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#140c07]/75 hover:bg-[#e07a3f] text-[#faede5] hover:text-[#140c07] flex items-center justify-center border border-[rgba(224,122,63,0.3)] transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                title="Siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Model Specs & Platform Links */}
            <div className="p-6 sm:p-8 flex flex-col justify-between gap-6 bg-[#1c120b]">
              <div className="space-y-4">
                <div>
                  <span className="font-mono text-xs text-[#e8a038] uppercase tracking-wider block mb-1">
                    {currentRender.subtitulo}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#faede5]">
                    {currentRender.titulo}
                  </h3>
                </div>

                <p className="text-sm text-[#bda89b] leading-relaxed font-body">
                  {currentRender.descripcion}
                </p>

                {/* Software Pipeline Pills */}
                <div className="space-y-1.5">
                  <span className="font-mono text-[11px] text-[#7f6a5e] uppercase tracking-wider flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-[#e07a3f]" /> Software & Herramientas:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentRender.software.map((sw) => (
                      <span
                        key={sw}
                        className="font-mono text-xs px-2.5 py-1 rounded bg-[#261910] text-[#faede5] border border-[rgba(224,122,63,0.25)]"
                      >
                        {sw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technical Geometry & Textures breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {currentRender.polycount && (
                    <div className="bg-[#261910]/80 border border-[rgba(224,122,63,0.2)] rounded-xl p-3">
                      <span className="font-mono text-[10px] text-[#7f6a5e] uppercase block flex items-center gap-1">
                        <Cpu className="w-3 h-3 text-[#e8a038]" /> Topología / Polycount:
                      </span>
                      <span className="font-mono text-xs text-[#faede5] font-semibold mt-0.5 block">
                        {currentRender.polycount}
                      </span>
                    </div>
                  )}

                  {currentRender.texturas && (
                    <div className="bg-[#261910]/80 border border-[rgba(224,122,63,0.2)] rounded-xl p-3">
                      <span className="font-mono text-[10px] text-[#7f6a5e] uppercase block flex items-center gap-1">
                        <Layers className="w-3 h-3 text-[#e07a3f]" /> Materiales / PBR:
                      </span>
                      <span className="font-mono text-xs text-[#faede5] font-semibold mt-0.5 block truncate" title={currentRender.texturas}>
                        {currentRender.texturas}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Direct links to platforms for this specific render */}
              <div className="pt-4 border-t border-[rgba(224,122,63,0.2)] space-y-2">
                <span className="font-mono text-[11px] text-[#7f6a5e] uppercase tracking-wider block">
                  Ver este modelo en plataformas 3D:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {currentRender.plataformas.map((plat) => (
                    <a
                      key={plat.nombre}
                      href={plat.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs text-[#faede5] bg-[#261910] hover:bg-[#e07a3f] hover:text-[#140c07] border border-[rgba(224,122,63,0.3)] hover:border-[#e07a3f] px-3.5 py-2 rounded-lg transition-all font-semibold"
                    >
                      <PlatformIcon name={plat.icono || plat.nombre} className="w-3.5 h-3.5" />
                      <span>{plat.nombre}</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Thumbnail Carousel Bar */}
          <div className="bg-[#140c07] p-3 sm:p-4 border-t border-[rgba(224,122,63,0.2)] flex items-center gap-3 overflow-x-auto">
            <span className="font-mono text-[11px] text-[#7f6a5e] uppercase tracking-widest shrink-0 px-2 hidden sm:inline">
              Renders:
            </span>
            {renders.map((renderItem, rIdx) => {
              const isActive = rIdx === currentIndex;
              return (
                <button
                  key={renderItem.id}
                  onClick={() => {
                    setIsAutoPlay(false);
                    setCurrentIndex(rIdx);
                  }}
                  className={`relative shrink-0 w-20 sm:w-28 aspect-[16/10] rounded-lg overflow-hidden border-2 transition-all ${
                    isActive
                      ? 'border-[#e8a038] scale-105 shadow-[0_0_12px_rgba(232,160,56,0.6)]'
                      : 'border-[rgba(224,122,63,0.25)] opacity-60 hover:opacity-100 hover:border-[#e07a3f]'
                  }`}
                >
                  <img
                    src={renderItem.imagen}
                    alt={renderItem.titulo}
                    className="w-full h-full object-cover"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-[#e8a038]/20 pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for High-Res View */}
      {lightboxRender && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0c0704]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxRender(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#1c120b] border border-[#e8a038]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-[#140c07] border-b border-[rgba(224,122,63,0.2)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 text-[#e8a038]" />
                <span className="font-display font-bold text-[#faede5]">
                  {lightboxRender.titulo} · Vista de Render 3D HD
                </span>
              </div>
              <button
                onClick={() => setLightboxRender(null)}
                className="p-1.5 rounded-lg text-[#bda89b] hover:text-[#faede5] hover:bg-[#261910] border border-transparent hover:border-[rgba(224,122,63,0.3)] transition-colors"
                title="Cerrar ventana"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/10] bg-[#140c07] max-h-[70vh]">
              <img
                src={lightboxRender.imagen}
                alt={lightboxRender.titulo}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-4 bg-[#1c120b] border-t border-[rgba(224,122,63,0.2)] flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-[#bda89b] font-mono">
                {lightboxRender.polycount} · {lightboxRender.texturas}
              </span>
              <div className="flex gap-2">
                {lightboxRender.plataformas.map((p) => (
                  <a
                    key={p.nombre}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[#140c07] bg-[#e8a038] hover:bg-[#f59e0b] px-3 py-1.5 rounded-lg font-bold transition-colors inline-flex items-center gap-1.5"
                  >
                    <PlatformIcon name={p.icono || p.nombre} className="w-3.5 h-3.5" />
                    <span>{p.nombre}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
