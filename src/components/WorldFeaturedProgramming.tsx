import { useState } from 'react';
import { FeaturedProgrammingProject } from '../types';
import { PlatformIcon } from './PlatformIcon';
import {
  Code2,
  ExternalLink,
  Play,
  Terminal,
  Cpu,
  Zap,
  Layers,
  FileText,
  Sparkles,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

interface WorldFeaturedProgrammingProps {
  proyecto?: FeaturedProgrammingProject;
  onOpenVideo?: (videoId: string) => void;
}

export function WorldFeaturedProgramming({ proyecto, onOpenVideo }: WorldFeaturedProgrammingProps) {
  const [activeTab, setActiveTab] = useState<'arquitectura' | 'codigo'>('arquitectura');

  if (!proyecto) return null;

  const metricasVisibles = (proyecto.metricasRendimiento || []).filter((m) => m.visible !== false);
  const caracteristicasVisibles = (proyecto.caracteristicasTecnicas || []).filter((c) => c.visible !== false);
  const tieneCodigoVisible = Boolean(proyecto.codigoSnippet && proyecto.codigoSnippet.visible !== false);
  const currentTab = activeTab === 'codigo' && !tieneCodigoVisible ? 'arquitectura' : activeTab;

  return (
    <section
      id="prog-destacado"
      className="relative z-10 py-24 md:py-32 border-t border-[rgba(224,122,63,0.25)] bg-gradient-to-b from-[#140c07] via-[#1a0f09] to-[#140c07]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 font-pixel text-xs text-[#e8a038] tracking-widest uppercase bg-[#261910] border border-[#e8a038]/30 px-3.5 py-1.5 rounded-full mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#e8a038] animate-pulse" />
            <span>{proyecto.subtituloBadge || "MUNDO 02-B · SPOTLIGHT TÉCNICO"}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#faede5]">
            Proyecto de Programación Destacado
          </h2>
          <p className="text-[#bda89b] text-base mt-2 max-w-2xl font-body">
            Desglose exhaustivo de ingeniería: arquitectura interna, sistemas de gameplay, optimizaciones de cómputo y benchmarks de rendimiento.
          </p>
        </div>

        {/* Main Showcase Hero Container */}
        <div className="bg-[#1c120b] border-2 border-[#e07a3f]/40 hover:border-[#e07a3f] rounded-3xl overflow-hidden shadow-2xl transition-all duration-300">
          {/* Top Banner / Title Bar */}
          <div className="bg-[#24160d] border-b border-[rgba(224,122,63,0.2)] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#e07a3f] animate-ping" />
              <span className="font-display font-bold text-lg sm:text-xl text-[#faede5] tracking-wide">
                {proyecto.titulo}
              </span>
              <span className="hidden sm:inline-block text-[#e8a038] font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#140c07] border border-[#e8a038]/30">
                {proyecto.subtitulo}
              </span>
            </div>

            {/* Quick action buttons with vector icons */}
            <div className="flex items-center gap-2.5">
              {proyecto.linkCodigo && (
                <a
                  href={proyecto.linkCodigo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs text-[#faede5] bg-[#140c07] hover:bg-[#e07a3f] hover:text-[#140c07] border border-[rgba(224,122,63,0.3)] hover:border-[#e07a3f] px-3.5 py-2 rounded-xl transition-all font-semibold shadow-sm"
                  title="Ver repositorio en GitHub"
                >
                  <PlatformIcon name="github" className="w-4 h-4" />
                  <span className="hidden sm:inline">Código GitHub</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              )}
              {proyecto.linkDemo && (
                <a
                  href={proyecto.linkDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs text-[#140c07] bg-[#e8a038] hover:bg-[#f59e0b] px-3.5 py-2 rounded-xl font-bold transition-all shadow-md hover:scale-105"
                  title="Jugar / Probar Demo"
                >
                  <PlatformIcon name="itch.io" className="w-4 h-4" />
                  <span>Probar Demo</span>
                </a>
              )}
              {proyecto.linkGDD && (
                <a
                  href={proyecto.linkGDD}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs text-[#bda89b] hover:text-[#faede5] bg-[#140c07] hover:bg-[#261910] border border-[rgba(224,122,63,0.3)] px-3 py-2 rounded-xl transition-all"
                  title="Documento de Diseño (GDD)"
                >
                  <FileText className="w-4 h-4 text-[#e8a038]" />
                  <span className="hidden md:inline">GDD / Docs</span>
                </a>
              )}
            </div>
          </div>

          {/* Core Body Grid: Media + Deep Dive */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Col: Media & Performance Specs (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[rgba(224,122,63,0.2)] bg-[#170e08]/60">
              <div>
                {/* Visual Preview */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[rgba(224,122,63,0.3)] mb-6 shadow-lg group">
                  <img
                    src={proyecto.imagen}
                    alt={proyecto.titulo}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 scanlines opacity-25 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140c07] via-transparent to-transparent opacity-70" />

                  {/* Video Play overlay if configured */}
                  {proyecto.video && (
                    <button
                      onClick={() => onOpenVideo?.(proyecto.video!)}
                      className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#140c07]/80 hover:bg-[#e8a038] text-[#e8a038] hover:text-[#140c07] border-2 border-[#e8a038] flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-2xl"
                      title="Reproducir trailer técnico"
                    >
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </button>
                  )}

                  {/* Floating Tag */}
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                    {proyecto.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] font-bold uppercase tracking-wider bg-[#140c07]/90 text-[#e8a038] border border-[#e8a038]/40 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Performance Metrics Cards */}
                {metricasVisibles.length > 0 && (
                  <div className="space-y-2 mb-6">
                    <div className="font-mono text-xs text-[#7f6a5e] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <Zap className="w-3.5 h-3.5 text-[#e8a038]" />
                      <span>Métricas de Rendimiento & Optimización</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {metricasVisibles.map((metrica) => (
                        <div
                          key={metrica.label}
                          className="bg-[#1c120b] border border-[rgba(224,122,63,0.2)] rounded-xl p-3 flex flex-col"
                        >
                          <span className="font-mono text-[11px] text-[#7f6a5e]">{metrica.label}</span>
                          <span className="font-display text-lg font-bold text-[#faede5]">{metrica.valor}</span>
                          {metrica.detalle && (
                            <span className="font-mono text-[10px] text-[#e8a038] mt-0.5">{metrica.detalle}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tag Badges list */}
              <div className="pt-4 border-t border-[rgba(224,122,63,0.15)] flex flex-wrap gap-1.5">
                {proyecto.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs bg-[#24160d] text-[#bda89b] border border-[rgba(224,122,63,0.2)] px-2.5 py-1 rounded-lg"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Col: Deep Breakdown & Technical Pillars (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Description & Narrative */}
                <div className="mb-6">
                  <p className="text-[#faede5] text-base sm:text-lg leading-relaxed font-body font-normal mb-4">
                    {proyecto.descripcion}
                  </p>
                  {proyecto.historiaDesarrollo && (
                    <p className="text-[#bda89b] text-sm leading-relaxed font-body border-l-2 border-[#e8a038] pl-3.5 italic bg-[#261910]/40 py-2 rounded-r-lg">
                      {proyecto.historiaDesarrollo}
                    </p>
                  )}
                </div>

                {/* Tabs for Architecture vs Code Snippet */}
                <div className="flex items-center gap-2 border-b border-[rgba(224,122,63,0.2)] mb-5">
                  <button
                    onClick={() => setActiveTab('arquitectura')}
                    className={`font-mono text-xs py-2.5 px-4 font-bold border-b-2 transition-all flex items-center gap-2 ${
                      currentTab === 'arquitectura'
                        ? 'border-[#e8a038] text-[#e8a038]'
                        : 'border-transparent text-[#7f6a5e] hover:text-[#faede5]'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Sistemas & Arquitectura</span>
                  </button>

                  {tieneCodigoVisible && (
                    <button
                      onClick={() => setActiveTab('codigo')}
                      className={`font-mono text-xs py-2.5 px-4 font-bold border-b-2 transition-all flex items-center gap-2 ${
                        currentTab === 'codigo'
                          ? 'border-[#e8a038] text-[#e8a038]'
                          : 'border-transparent text-[#7f6a5e] hover:text-[#faede5]'
                      }`}
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Snippet de Código ({proyecto.codigoSnippet?.lenguaje})</span>
                    </button>
                  )}
                </div>

                {/* Tab Content */}
                {currentTab === 'arquitectura' ? (
                  <div className="space-y-3.5">
                    {caracteristicasVisibles.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-[#24160d]/70 border border-[rgba(224,122,63,0.2)] hover:border-[#e07a3f]/50 p-4 rounded-xl transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#85994b] shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-mono text-sm font-bold text-[#faede5] mb-1">
                              {item.titulo}
                            </h4>
                            <p className="text-xs text-[#bda89b] font-body leading-relaxed">
                              {item.descripcion}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  tieneCodigoVisible && proyecto.codigoSnippet && (
                    <div className="rounded-xl overflow-hidden border border-[rgba(224,122,63,0.3)] bg-[#140c07] font-mono text-xs shadow-inner">
                      <div className="bg-[#1f130a] px-4 py-2 border-b border-[rgba(224,122,63,0.2)] flex items-center justify-between text-[#7f6a5e]">
                        <span className="text-xs text-[#e8a038]">{proyecto.codigoSnippet.archivo}</span>
                        <span className="text-[11px] uppercase tracking-wider">{proyecto.codigoSnippet.lenguaje}</span>
                      </div>
                      <pre className="p-4 overflow-x-auto text-[#faede5] text-[12px] leading-relaxed max-h-72">
                        <code>{proyecto.codigoSnippet.codigo}</code>
                      </pre>
                    </div>
                  )
                )}
              </div>

              {/* Bottom Quick Bar */}
              {proyecto.mostrarStatusFooter !== false && (
                <div className="mt-8 pt-4 border-t border-[rgba(224,122,63,0.15)] flex items-center justify-between font-mono text-xs text-[#7f6a5e]">
                  <span>{proyecto.statusTexto || "Status: Compilado & Optimizado"}</span>
                  <span className="text-[#85994b] font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#85994b] inline-block" />
                    {proyecto.statusTargetBadge || "60 FPS TARGET"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
