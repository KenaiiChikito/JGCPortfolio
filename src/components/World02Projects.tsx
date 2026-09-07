import { useState } from 'react';
import { ProgrammingProject } from '../types';
import { Code2, ExternalLink, Play, Terminal, CheckCircle2 } from 'lucide-react';
import { PlatformIcon } from './PlatformIcon';

interface World02ProjectsProps {
  proyectos: ProgrammingProject[];
  onOpenVideo?: (videoId: string) => void;
}

export function World02Projects({ proyectos, onOpenVideo }: World02ProjectsProps) {
  const [selectedTag, setSelectedTag] = useState<string>('Todos');

  const proyectosVisibles = proyectos.filter((p) => p.visible !== false);

  // Extract all unique tags
  const allTags = ['Todos', ...Array.from(new Set(proyectosVisibles.flatMap((p) => p.tags)))];

  const filteredProjects =
    selectedTag === 'Todos'
      ? proyectosVisibles
      : proyectosVisibles.filter((p) => p.tags.includes(selectedTag));

  return (
    <section id="proyectos" className="relative z-10 py-24 md:py-32 border-t border-[rgba(224,122,63,0.2)]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="font-pixel text-xs text-[#e8a038] tracking-widest flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#e8a038] rotate-45 inline-block shadow-[0_0_8px_#e8a038]" />
              MUNDO 02
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#faede5]">
              Proyectos de Programación
            </h2>
            <p className="text-[#bda89b] text-base mt-2 max-w-2xl font-body">
              Ingeniería de software para videojuegos: motores propios, sistemas procedurales, shaders HLSL y arquitecturas multijugador deterministas.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`font-mono text-xs px-3.5 py-1.5 rounded-lg border transition-all ${
                  selectedTag === tag
                    ? 'bg-[#e07a3f] text-[#140c07] border-[#e07a3f] font-bold shadow-md'
                    : 'bg-[#1c120b] text-[#bda89b] border-[rgba(224,122,63,0.2)] hover:border-[#e07a3f] hover:text-[#faede5]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((proyecto) => (
            <article
              key={proyecto.id}
              className="group bg-[#1c120b] border border-[rgba(224,122,63,0.25)] hover:border-[#e07a3f] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_35px_-10px_rgba(224,122,63,0.25)] flex flex-col"
            >
              {/* Cover Image with scanlines */}
              <div className="relative aspect-[16/9] overflow-hidden bg-[#140c07]">
                <img
                  src={proyecto.imagen}
                  alt={`Captura del proyecto de programación: ${proyecto.titulo}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 scanlines opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c120b] via-transparent to-transparent opacity-80" />

                {/* Video Play Button if available */}
                {proyecto.video && (
                  <button
                    onClick={() => onOpenVideo?.(proyecto.video!)}
                    className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#140c07]/80 border-2 border-[#e8a038] text-[#e8a038] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl hover:scale-110"
                    title="Ver video / trailer"
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>
                )}

                {/* Badge if featured */}
                {proyecto.destacado && (
                  <div className="absolute top-3 left-3 bg-[#e8a038] text-[#140c07] font-pixel text-[9px] px-2.5 py-1 rounded shadow-md font-bold">
                    DESTACADO
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1 gap-4">
                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {proyecto.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] text-[#e8a038] bg-[#261910] border border-[rgba(224,122,63,0.3)] px-2.5 py-0.5 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#faede5] group-hover:text-[#e8a038] transition-colors flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-[#e07a3f] shrink-0" />
                  <span>{proyecto.titulo}</span>
                </h3>

                {/* Description */}
                <p className="text-sm text-[#bda89b] leading-relaxed flex-1 font-body">
                  {proyecto.descripcion}
                </p>

                {/* Technical Highlights if provided */}
                {proyecto.detallesTecnicos && proyecto.detallesTecnicos.length > 0 && (
                  <div className="bg-[#261910]/70 border border-[rgba(224,122,63,0.15)] rounded-xl p-3 space-y-1.5">
                    <span className="font-mono text-[10px] text-[#7f6a5e] uppercase tracking-wider block">
                      Hitos de Implementación:
                    </span>
                    {proyecto.detallesTecnicos.map((detalle, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-[#d6c3b6] font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#85994b] shrink-0 mt-0.5" />
                        <span>{detalle}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-2 mt-auto border-t border-[rgba(224,122,63,0.15)]">
                  {proyecto.linkCodigo && (
                    <a
                      href={proyecto.linkCodigo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs text-[#faede5] bg-[#261910] hover:bg-[#e07a3f] hover:text-[#140c07] border border-[rgba(224,122,63,0.3)] hover:border-[#e07a3f] px-3.5 py-2 rounded-lg transition-all font-semibold"
                    >
                      <PlatformIcon name="github" className="w-3.5 h-3.5" />
                      <span>⟨/⟩ Código Fuente</span>
                    </a>
                  )}

                  {proyecto.linkDemo && (
                    <a
                      href={proyecto.linkDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs text-[#faede5] bg-[#261910] hover:bg-[#e8a038] hover:text-[#140c07] border border-[rgba(224,122,63,0.3)] hover:border-[#e8a038] px-3.5 py-2 rounded-lg transition-all font-semibold"
                    >
                      <PlatformIcon name="itch.io" className="w-3.5 h-3.5 text-[#e8a038] group-hover:text-[#140c07]" />
                      <span>▶ Demo / Jugar</span>
                    </a>
                  )}

                  <div className="ml-auto flex items-center text-[#7f6a5e] font-mono text-[11px] gap-1">
                    <Code2 className="w-3.5 h-3.5 text-[#e07a3f]" />
                    <span>Native Code</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
