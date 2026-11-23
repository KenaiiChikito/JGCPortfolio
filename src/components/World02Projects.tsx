import { useState, useEffect } from 'react';
import { ProgrammingProject, FeaturedMediaItem } from '../types';
import {
  Code2,
  Play,
  Terminal,
  CheckCircle2,
  Film,
  Maximize2,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
  ListChecks,
} from 'lucide-react';
import { PlatformIcon } from './PlatformIcon';

interface World02ProjectsProps {
  proyectos: ProgrammingProject[];
  onOpenVideo?: (videoId: string) => void;
}

function extractYouTubeId(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([a-zA-Z0-9_-]{11})/
  );
  if (match && match[1]) return match[1];
  return trimmed;
}

function inferMediaType(item: FeaturedMediaItem): FeaturedMediaItem['tipo'] {
  if (item.tipo) return item.tipo;
  const lower = item.src.toLowerCase();
  if (lower.endsWith('.gif')) return 'gif';
  if (lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.ogg')) return 'video';
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'youtube';
  return 'imagen';
}

function buildProjectMediaList(proyecto: ProgrammingProject): FeaturedMediaItem[] {
  if (proyecto.galeriaMedia && proyecto.galeriaMedia.length > 0) {
    return proyecto.galeriaMedia
      .filter((item) => item.visible !== false && item.src.trim().length > 0)
      .map((item) => ({ ...item, tipo: inferMediaType(item) }));
  }

  const list: FeaturedMediaItem[] = [];
  if (proyecto.video && proyecto.video.trim().length > 0) {
    const lower = proyecto.video.toLowerCase();
    const isLocalVideo =
      lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.ogg');
    const isGif = lower.endsWith('.gif');
    list.push({
      tipo: isLocalVideo ? 'video' : isGif ? 'gif' : 'youtube',
      src: proyecto.video,
      thumbnail: proyecto.imagen,
      titulo: isGif ? 'Demo Animado' : 'Video Demo',
    });
  }
  if (proyecto.imagen && proyecto.imagen.trim().length > 0) {
    list.push({
      tipo: 'imagen',
      src: proyecto.imagen,
      titulo: proyecto.titulo,
    });
  }
  return list;
}

export function World02Projects({ proyectos, onOpenVideo }: World02ProjectsProps) {
  const [selectedTag, setSelectedTag] = useState<string>('Todos');
  const [cardTabs, setCardTabs] = useState<Record<string, 'hitos' | 'codigo'>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modales dedicados para ver código completo y galería de videos/GIFs
  const [codeModalProject, setCodeModalProject] = useState<ProgrammingProject | null>(null);
  const [mediaModalState, setMediaModalState] = useState<{
    proyecto: ProgrammingProject;
    media: FeaturedMediaItem[];
    index: number;
  } | null>(null);

  const proyectosVisibles = proyectos.filter((p) => p.visible !== false);

  // Extract all unique tags
  const allTags = ['Todos', ...Array.from(new Set(proyectosVisibles.flatMap((p) => p.tags)))];

  const filteredProjects =
    selectedTag === 'Todos'
      ? proyectosVisibles
      : proyectosVisibles.filter((p) => p.tags.includes(selectedTag));

  // Keyboard navigation for modals
  useEffect(() => {
    if (!mediaModalState && !codeModalProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMediaModalState(null);
        setCodeModalProject(null);
      }
      if (mediaModalState && mediaModalState.media.length > 1) {
        if (e.key === 'ArrowLeft') {
          setMediaModalState((prev) =>
            prev
              ? {
                  ...prev,
                  index: (prev.index - 1 + prev.media.length) % prev.media.length,
                }
              : null
          );
        }
        if (e.key === 'ArrowRight') {
          setMediaModalState((prev) =>
            prev
              ? {
                  ...prev,
                  index: (prev.index + 1) % prev.media.length,
                }
              : null
          );
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mediaModalState, codeModalProject]);

  const handleCopyCode = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId((prev) => (prev === id ? null : prev)), 2000);
    } catch {
      // Clipboard no disponible
    }
  };

  const openProjectMediaModal = (
    proyecto: ProgrammingProject,
    media: FeaturedMediaItem[],
    startIndex = 0
  ) => {
    if (media.length === 1 && media[0].tipo === 'youtube' && onOpenVideo) {
      onOpenVideo(extractYouTubeId(media[0].src));
      return;
    }
    setMediaModalState({ proyecto, media, index: startIndex });
  };

  const getThumbnailSrc = (item: FeaturedMediaItem, fallbackImg: string): string => {
    if (item.thumbnail) return item.thumbnail;
    if (item.tipo === 'youtube') {
      const ytId = extractYouTubeId(item.src);
      return ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : fallbackImg;
    }
    return item.src;
  };

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
              Ingeniería de software para videojuegos: mecánicas de gameplay, inteligencia artificial, sistemas multijugador y código fuente.
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
          {filteredProjects.map((proyecto) => {
            const mediaList = buildProjectMediaList(proyecto);

            const videoClips = mediaList.filter(
              (m) => m.tipo === 'video' || m.tipo === 'gif' || m.tipo === 'youtube'
            );
            const firstVideoIndex = mediaList.findIndex(
              (m) => m.tipo === 'video' || m.tipo === 'gif' || m.tipo === 'youtube'
            );

            const hasCode = Boolean(
              proyecto.codigoSnippet &&
                proyecto.codigoSnippet.visible !== false &&
                proyecto.codigoSnippet.codigo.trim().length > 0
            );
            const hasDetails = Boolean(
              proyecto.detallesTecnicos && proyecto.detallesTecnicos.length > 0
            );
            const activeCardTab =
              cardTabs[proyecto.id] === 'codigo' && hasCode
                ? 'codigo'
                : !hasDetails && hasCode
                  ? 'codigo'
                  : 'hitos';

            return (
              <article
                key={proyecto.id}
                className="group bg-[#1c120b] border border-[rgba(224,122,63,0.25)] hover:border-[#e07a3f] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_35px_-10px_rgba(224,122,63,0.25)] flex flex-col"
              >
                {/* Cover Portada (siempre muestra proyecto.imagen; los videos se abren en el reproductor) */}
                <div
                  className="relative aspect-[16/9] overflow-hidden bg-[#140c07] cursor-pointer"
                  onClick={() =>
                    mediaList.length > 0 &&
                    openProjectMediaModal(
                      proyecto,
                      mediaList,
                      firstVideoIndex >= 0 ? firstVideoIndex : 0
                    )
                  }
                >
                  <img
                    src={proyecto.imagen}
                    alt={`Portada del proyecto de programación: ${proyecto.titulo}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 scanlines opacity-25 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c120b] via-transparent to-transparent opacity-80 pointer-events-none" />

                  {/* Play Button if this project has video/GIF/YouTube media */}
                  {videoClips.length > 0 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openProjectMediaModal(
                          proyecto,
                          mediaList,
                          Math.max(0, firstVideoIndex)
                        );
                      }}
                      className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#140c07]/85 hover:bg-[#e8a038] border-2 border-[#e8a038] text-[#e8a038] hover:text-[#140c07] flex items-center justify-center transition-all duration-200 shadow-xl hover:scale-110 z-10"
                      title={`Ver ${videoClips.length > 1 ? `${videoClips.length} videos/demos` : 'video demo'}`}
                    >
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </button>
                  )}

                  {/* Top-left Featured badge */}
                  {proyecto.destacado && (
                    <div className="absolute top-3 left-3 bg-[#e8a038] text-[#140c07] font-pixel text-[9px] px-2.5 py-1 rounded shadow-md font-bold z-10">
                      DESTACADO
                    </div>
                  )}

                  {/* Top-right Video/Gallery counter badge */}
                  {videoClips.length > 0 && (
                    <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-[#140c07]/90 text-[#e8a038] border border-[#e8a038]/40 font-mono text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md z-10">
                      <Film className="w-3.5 h-3.5" />
                      <span>
                        {videoClips.length} {videoClips.length === 1 ? 'Video' : 'Videos'}
                      </span>
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
                  <p className="text-sm text-[#bda89b] leading-relaxed font-body">
                    {proyecto.descripcion}
                  </p>

                  {/* Switchable Panel: Hitos de Implementación vs Código Fuente */}
                  {(hasDetails || hasCode) && (
                    <div className="flex-1 flex flex-col">
                      {hasDetails && hasCode && (
                        <div className="flex items-center gap-1.5 border-b border-[rgba(224,122,63,0.2)] mb-3">
                          <button
                            type="button"
                            onClick={() =>
                              setCardTabs((prev) => ({ ...prev, [proyecto.id]: 'hitos' }))
                            }
                            className={`inline-flex items-center gap-1.5 font-mono text-xs px-3 py-2 border-b-2 transition-colors ${
                              activeCardTab === 'hitos'
                                ? 'border-[#e8a038] text-[#e8a038] font-bold'
                                : 'border-transparent text-[#7f6a5e] hover:text-[#faede5]'
                            }`}
                          >
                            <ListChecks className="w-3.5 h-3.5" />
                            <span>Hitos</span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setCardTabs((prev) => ({ ...prev, [proyecto.id]: 'codigo' }))
                            }
                            className={`inline-flex items-center gap-1.5 font-mono text-xs px-3 py-2 border-b-2 transition-colors ${
                              activeCardTab === 'codigo'
                                ? 'border-[#e8a038] text-[#e8a038] font-bold'
                                : 'border-transparent text-[#7f6a5e] hover:text-[#faede5]'
                            }`}
                          >
                            <Code2 className="w-3.5 h-3.5" />
                            <span>Código ({proyecto.codigoSnippet?.archivo})</span>
                          </button>
                        </div>
                      )}

                      {activeCardTab === 'codigo' && hasCode && proyecto.codigoSnippet ? (
                        <div className="rounded-xl overflow-hidden border border-[rgba(224,122,63,0.3)] bg-[#140c07] font-mono text-xs flex flex-col">
                          <div className="bg-[#1f130a] px-3 py-2 border-b border-[rgba(224,122,63,0.2)] flex items-center justify-between gap-2">
                            <span className="text-[#e8a038] truncate">
                              {proyecto.codigoSnippet.archivo}
                            </span>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopyCode(proyecto.id, proyecto.codigoSnippet!.codigo)
                                }
                                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#261910] hover:bg-[#342217] text-[#bda89b] hover:text-[#faede5] transition-colors text-[11px]"
                                title="Copiar código"
                              >
                                {copiedId === proyecto.id ? (
                                  <>
                                    <Check className="w-3 h-3 text-[#85994b]" />
                                    <span className="text-[#85994b]">Copiado</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copiar</span>
                                  </>
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() => setCodeModalProject(proyecto)}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#261910] hover:bg-[#e8a038] text-[#bda89b] hover:text-[#140c07] transition-colors text-[11px]"
                                title="Ver código completo en pantalla grande"
                              >
                                <Maximize2 className="w-3 h-3" />
                                <span>Ampliar</span>
                              </button>
                            </div>
                          </div>
                          <pre className="p-3.5 overflow-x-auto text-[#faede5] text-[11.5px] leading-relaxed max-h-56">
                            <code>{proyecto.codigoSnippet.codigo}</code>
                          </pre>
                        </div>
                      ) : (
                        hasDetails && (
                          <div className="bg-[#261910]/70 border border-[rgba(224,122,63,0.15)] rounded-xl p-3.5 space-y-1.5">
                            <span className="font-mono text-[10px] text-[#7f6a5e] uppercase tracking-wider block">
                              Hitos de Implementación:
                            </span>
                            {proyecto.detallesTecnicos!.map((detalle, dIdx) => (
                              <div
                                key={dIdx}
                                className="flex items-start gap-2 text-xs text-[#d6c3b6] font-mono"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#85994b] shrink-0 mt-0.5" />
                                <span>{detalle}</span>
                              </div>
                            ))}
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* Actions Footer */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-3 mt-auto border-t border-[rgba(224,122,63,0.15)]">
                    {videoClips.length > 0 && (
                      <button
                        type="button"
                        onClick={() =>
                          openProjectMediaModal(
                            proyecto,
                            mediaList,
                            Math.max(0, firstVideoIndex)
                          )
                        }
                        className="inline-flex items-center gap-2 font-mono text-xs text-[#140c07] bg-[#e8a038] hover:bg-[#f59e0b] px-3.5 py-2 rounded-lg transition-all font-bold"
                      >
                        <Film className="w-3.5 h-3.5" />
                        <span>
                          {videoClips.length > 1
                            ? `Ver Demos (${videoClips.length})`
                            : 'Ver Video'}
                        </span>
                      </button>
                    )}

                    {hasCode && (
                      <button
                        type="button"
                        onClick={() => setCodeModalProject(proyecto)}
                        className="inline-flex items-center gap-2 font-mono text-xs text-[#faede5] bg-[#261910] hover:bg-[#e07a3f] hover:text-[#140c07] border border-[rgba(224,122,63,0.3)] hover:border-[#e07a3f] px-3.5 py-2 rounded-lg transition-all font-semibold"
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Ver Código Completo</span>
                      </button>
                    )}

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
                        <PlatformIcon
                          name="itch.io"
                          className="w-3.5 h-3.5 text-[#e8a038] group-hover:text-[#140c07]"
                        />
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
            );
          })}
        </div>
      </div>

      {/* Modal de Galería Multimedia (Videos MP4/WebM, GIFs, YouTube, Capturas) */}
      {mediaModalState && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0c0704]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setMediaModalState(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#1c120b] border border-[#e8a038]/40 rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-5 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-display font-bold text-[#faede5] truncate">
                  {mediaModalState.media[mediaModalState.index]?.titulo ||
                    mediaModalState.proyecto.titulo}
                </span>
                {mediaModalState.media.length > 1 && (
                  <span className="font-mono text-xs tabular-nums text-[#e8a038] shrink-0">
                    {mediaModalState.index + 1} / {mediaModalState.media.length}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setMediaModalState(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#261910] hover:bg-[#e8a038] text-[#bda89b] hover:text-[#140c07] font-mono text-xs transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
                <span>Cerrar (Esc)</span>
              </button>
            </div>

            {(() => {
              const activeItem = mediaModalState.media[mediaModalState.index];
              const ytId = activeItem?.tipo === 'youtube' ? extractYouTubeId(activeItem.src) : '';

              return (
                <div className="relative aspect-video w-full bg-[#0a0503] rounded-xl overflow-hidden border border-[rgba(224,122,63,0.2)] flex items-center justify-center">
                  {activeItem?.tipo === 'video' ? (
                    <video
                      key={activeItem.src}
                      ref={(el) => {
                        if (el) {
                          el.muted = true;
                          el.defaultMuted = true;
                        }
                      }}
                      src={activeItem.src}
                      poster={activeItem.thumbnail || undefined}
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  ) : activeItem?.tipo === 'youtube' && ytId ? (
                    <iframe
                      key={ytId}
                      src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0`}
                      title={activeItem.titulo || mediaModalState.proyecto.titulo}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <img
                      key={activeItem?.src}
                      src={activeItem?.src}
                      alt={activeItem?.titulo || mediaModalState.proyecto.titulo}
                      className="w-full h-full object-contain"
                    />
                  )}

                  {mediaModalState.media.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setMediaModalState((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  index: (prev.index - 1 + prev.media.length) % prev.media.length,
                                }
                              : null
                          )
                        }
                        aria-label="Anterior"
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#140c07]/90 hover:bg-[#e8a038] text-[#faede5] hover:text-[#140c07] border border-[rgba(224,122,63,0.5)] transition-all"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setMediaModalState((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  index: (prev.index + 1) % prev.media.length,
                                }
                              : null
                          )
                        }
                        aria-label="Siguiente"
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#140c07]/90 hover:bg-[#e8a038] text-[#faede5] hover:text-[#140c07] border border-[rgba(224,122,63,0.5)] transition-all"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              );
            })()}

            {mediaModalState.media.length > 1 && (
              <div className="mt-3 flex items-center justify-center gap-2.5 overflow-x-auto pb-1">
                {mediaModalState.media.map((item, idx) => {
                  const isSelected = idx === mediaModalState.index;
                  const isVid = item.tipo === 'video' || item.tipo === 'youtube';
                  return (
                    <button
                      key={`${item.src}-${idx}`}
                      type="button"
                      onClick={() =>
                        setMediaModalState((prev) => (prev ? { ...prev, index: idx } : null))
                      }
                      className={`relative w-24 aspect-video rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-[#0b0603] ${
                        isSelected
                          ? 'border-[#e8a038] shadow-[0_0_10px_rgba(232,160,56,0.4)]'
                          : 'border-[rgba(224,122,63,0.25)] opacity-60 hover:opacity-100'
                      }`}
                      title={item.titulo || `Vista ${idx + 1}`}
                    >
                      {item.tipo === 'video' && !item.thumbnail ? (
                        <video
                          src={`${item.src}#t=0.2`}
                          preload="metadata"
                          muted
                          playsInline
                          className="w-full h-full object-cover pointer-events-none"
                        />
                      ) : (
                        <img
                          src={getThumbnailSrc(item, mediaModalState.proyecto.imagen)}
                          alt={item.titulo || `Miniatura ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                      {isVid && (
                        <span className="absolute inset-0 flex items-center justify-center bg-[#0b0603]/35">
                          <Play className="w-4 h-4 text-[#e8a038] fill-current" />
                        </span>
                      )}
                      {item.tipo === 'gif' && (
                        <span className="absolute bottom-1 right-1 font-mono text-[9px] font-bold bg-[#140c07]/90 text-[#e8a038] px-1 rounded">
                          GIF
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de Código Fuente Completo */}
      {codeModalProject && codeModalProject.codigoSnippet && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0c0704]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setCodeModalProject(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#1c120b] border border-[#e8a038]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[88vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#24160d] px-5 py-3.5 border-b border-[rgba(224,122,63,0.25)] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <Terminal className="w-4 h-4 text-[#e8a038] shrink-0" />
                <span className="font-display font-bold text-[#faede5] truncate">
                  {codeModalProject.titulo}
                </span>
                <span className="font-mono text-xs text-[#e8a038] bg-[#140c07] border border-[#e8a038]/30 px-2.5 py-0.5 rounded shrink-0">
                  {codeModalProject.codigoSnippet.archivo} · {codeModalProject.codigoSnippet.lenguaje}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    handleCopyCode(
                      codeModalProject.id,
                      codeModalProject.codigoSnippet!.codigo
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#140c07] hover:bg-[#342217] text-[#faede5] border border-[rgba(224,122,63,0.3)] font-mono text-xs transition-colors"
                >
                  {copiedId === codeModalProject.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#85994b]" />
                      <span className="text-[#85994b]">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#e8a038]" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setCodeModalProject(null)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#261910] hover:bg-[#e8a038] text-[#bda89b] hover:text-[#140c07] font-mono text-xs transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cerrar</span>
                </button>
              </div>
            </div>

            <pre className="p-5 overflow-auto bg-[#140c07] text-[#faede5] font-mono text-xs sm:text-[13px] leading-relaxed">
              <code>{codeModalProject.codigoSnippet.codigo}</code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}
