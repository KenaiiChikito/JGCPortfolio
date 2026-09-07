import { useState } from 'react';
import { FeaturedCreativeProject } from '../types';
import { PlatformIcon } from './PlatformIcon';
import {
  Box,
  ExternalLink,
  Layers,
  Sparkles,
  Maximize2,
  Cpu,
  Compass,
  CheckCircle2,
  Eye,
} from 'lucide-react';

interface WorldFeaturedCreativeProps {
  proyecto?: FeaturedCreativeProject;
}

export function WorldFeaturedCreative({ proyecto }: WorldFeaturedCreativeProps) {
  const [showWireframe, setShowWireframe] = useState(false);
  const [fullscreenModal, setFullscreenModal] = useState(false);

  if (!proyecto) return null;

  const currentImage = showWireframe && proyecto.imagenSecundaria
    ? proyecto.imagenSecundaria
    : proyecto.imagenPrincipal;

  return (
    <section
      id="creative-destacado"
      className="relative z-10 py-24 md:py-32 border-t border-[rgba(224,122,63,0.25)] bg-gradient-to-b from-[#140c07] via-[#1a0f0a] to-[#140c07]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 font-pixel text-xs text-[#e8a038] tracking-widest uppercase bg-[#261910] border border-[#e8a038]/30 px-3.5 py-1.5 rounded-full mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#e8a038] animate-pulse" />
            <span>{proyecto.subtituloBadge || "MUNDO 03-B · HERO ASSET 3D"}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#faede5]">
            Proyecto Creativo & Modelado Destacado
          </h2>
          <p className="text-[#bda89b] text-base mt-2 max-w-2xl font-body">
            Pieza escultórica principal: proceso de diseño conceptual, esculpido orgánico, topología optimizada para tiempo real y presentación estética.
          </p>
        </div>

        {/* Featured Card */}
        <div className="bg-[#1c120b] border-2 border-[#e8a038]/40 hover:border-[#e8a038] rounded-3xl overflow-hidden shadow-2xl transition-all duration-300">
          {/* Header Title Bar */}
          <div className="bg-[#24160d] border-b border-[rgba(224,122,63,0.2)] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#e8a038] shadow-[0_0_8px_#e8a038]" />
              <span className="font-display font-bold text-lg sm:text-xl text-[#faede5] tracking-wide">
                {proyecto.titulo}
              </span>
              <span className="hidden sm:inline-block text-[#e8a038] font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#140c07] border border-[#e8a038]/30">
                {proyecto.subtitulo}
              </span>
            </div>

            {/* Platform links with vector icons */}
            <div className="flex items-center gap-2.5">
              {proyecto.plataformas.map((plat) => (
                <a
                  key={plat.nombre}
                  href={plat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs text-[#faede5] bg-[#140c07] hover:bg-[#e07a3f] hover:text-[#140c07] border border-[rgba(224,122,63,0.3)] hover:border-[#e07a3f] px-3.5 py-2 rounded-xl transition-all font-semibold shadow-sm"
                  title={plat.nombre}
                >
                  <PlatformIcon name={plat.icono || plat.nombre} className="w-4 h-4" />
                  <span>{plat.nombre}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              ))}
            </div>
          </div>

          {/* Grid Layout: Visual Showcase + Technical Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left side: Big Stage Render (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[rgba(224,122,63,0.2)] bg-[#140c07]/80">
              <div>
                {/* Visual Viewport */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[rgba(224,122,63,0.3)] bg-[#0f0804] group shadow-inner">
                  <img
                    src={currentImage}
                    alt={proyecto.titulo}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140c07] via-transparent to-transparent opacity-60" />

                  {/* Expand Modal button */}
                  <button
                    onClick={() => setFullscreenModal(true)}
                    className="absolute top-3 right-3 p-2.5 rounded-xl bg-[#140c07]/80 hover:bg-[#e8a038] text-[#bda89b] hover:text-[#140c07] border border-[rgba(224,122,63,0.3)] transition-all shadow-md"
                    title="Ver en pantalla completa"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  {/* Wireframe / Angle Toggle if second image is provided */}
                  {proyecto.imagenSecundaria && (
                    <button
                      onClick={() => setShowWireframe(!showWireframe)}
                      className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-lg bg-[#140c07]/90 text-[#e8a038] border border-[#e8a038]/40 hover:bg-[#e8a038] hover:text-[#140c07] transition-all shadow-md"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{showWireframe ? 'Ver Render' : 'Ver Vista B'}</span>
                    </button>
                  )}

                  {/* Bottom indicator badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider bg-[#140c07]/90 text-[#85994b] border border-[#85994b]/40 px-2.5 py-1 rounded-md">
                      ESTILIZADO · GAME READY
                    </span>
                  </div>
                </div>

                {/* Software Badges */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-[#7f6a5e] uppercase tracking-wider mr-1">
                    Software Utilizado:
                  </span>
                  {proyecto.software.map((sw) => (
                    <span
                      key={sw}
                      className="inline-flex items-center gap-1.5 font-mono text-xs bg-[#24160d] text-[#faede5] border border-[rgba(224,122,63,0.25)] px-3 py-1 rounded-lg"
                    >
                      <PlatformIcon name={sw} className="w-3.5 h-3.5 text-[#e8a038]" />
                      <span>{sw}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Geometry Specs Chips */}
              <div className="mt-6 pt-5 border-t border-[rgba(224,122,63,0.15)] grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {proyecto.detallesGeometria.map((item) => (
                  <div
                    key={item.label}
                    className="bg-[#1c120b] border border-[rgba(224,122,63,0.2)] rounded-xl p-2.5 text-center flex flex-col"
                  >
                    <span className="font-mono text-[10px] text-[#7f6a5e] uppercase tracking-wider">
                      {item.label}
                    </span>
                    <span className="font-mono text-sm font-bold text-[#e8a038] mt-0.5">
                      {item.valor}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Artistic Concept & Highlights (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#1c120b]">
              <div>
                <div className="mb-6">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#faede5] mb-2">
                    {proyecto.titulo}
                  </h3>
                  <p className="text-[#faede5] text-base leading-relaxed font-body mb-4">
                    {proyecto.descripcion}
                  </p>
                  {proyecto.conceptoArtistico && (
                    <div className="bg-[#24160d]/80 border-l-2 border-[#e07a3f] p-4 rounded-r-xl mb-6">
                      <div className="font-mono text-xs text-[#e8a038] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5" />
                        <span>Enfoque & Concepto Artístico</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#bda89b] font-body leading-relaxed">
                        {proyecto.conceptoArtistico}
                      </p>
                    </div>
                  )}
                </div>

                {/* Key Points */}
                <div className="space-y-3 mb-6">
                  <span className="font-mono text-xs text-[#7f6a5e] uppercase tracking-wider block">
                    Puntos Clave del Pipeline:
                  </span>
                  {proyecto.puntosClave.map((punto, i) => (
                    <div
                      key={i}
                      className="bg-[#24160d]/50 border border-[rgba(224,122,63,0.15)] hover:border-[#e07a3f]/40 p-3.5 rounded-xl transition-all"
                    >
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#e8a038] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-mono text-xs font-bold text-[#faede5]">
                            {punto.titulo}
                          </h4>
                          <p className="text-xs text-[#bda89b] font-body mt-0.5">
                            {punto.descripcion}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Platform CTA */}
              <div className="pt-6 border-t border-[rgba(224,122,63,0.15)] flex flex-col gap-2.5">
                {proyecto.plataformas.slice(0, 1).map((plat) => (
                  <a
                    key={plat.nombre}
                    href={plat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 font-mono text-xs text-[#140c07] bg-[#e8a038] hover:bg-[#f59e0b] px-5 py-3 rounded-xl font-bold transition-all shadow-md hover:scale-[1.02]"
                  >
                    <PlatformIcon name={plat.icono || plat.nombre} className="w-4 h-4" />
                    <span>Explorar Modelo 3D Interactivo en {plat.nombre}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {fullscreenModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0c0704]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setFullscreenModal(false)}
        >
          <div className="relative max-w-5xl w-full bg-[#1c120b] border border-[#e8a038]/40 rounded-2xl overflow-hidden shadow-2xl p-4 flex flex-col">
            <div className="flex justify-between items-center mb-3 px-2">
              <span className="font-display font-bold text-[#faede5]">{proyecto.titulo}</span>
              <button
                onClick={() => setFullscreenModal(false)}
                className="p-1.5 rounded-lg bg-[#261910] text-[#bda89b] hover:text-[#faede5]"
              >
                ✕ Cerrar
              </button>
            </div>
            <div className="max-h-[75vh] flex items-center justify-center overflow-hidden">
              <img
                src={currentImage}
                alt={proyecto.titulo}
                className="max-h-[70vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
