import { useState, useEffect, useMemo } from 'react';
import { ResearchResourceItem, ResourcesArchiveConfig } from '../types';
import {
  Archive,
  BookOpen,
  Download,
  ExternalLink,
  FileText,
  Film,
  FolderOpen,
  Play,
  X,
} from 'lucide-react';

interface ResourcesArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  config?: ResourcesArchiveConfig;
}

type CategoryFilter = 'todos' | ResearchResourceItem['categoria'];

interface ActiveVideoState {
  itemId: string;
  titulo: string;
  src: string;
}

const CATEGORY_META: Record<
  ResearchResourceItem['categoria'],
  { label: string; badgeClass: string }
> = {
  investigacion: {
    label: 'Investigación',
    badgeClass: 'bg-[#e8a038]/15 text-[#e8a038] border-[#e8a038]/40',
  },
  tutorial: {
    label: 'Tutorial',
    badgeClass: 'bg-[#e07a3f]/15 text-[#e07a3f] border-[#e07a3f]/40',
  },
  descarga: {
    label: 'Descarga',
    badgeClass: 'bg-[#85994b]/15 text-[#85994b] border-[#85994b]/40',
  },
  apuntes: {
    label: 'Apuntes',
    badgeClass: 'bg-[#c2522b]/15 text-[#e07a3f] border-[#c2522b]/40',
  },
};

function resolveSafeUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';
  try {
    return encodeURI(decodeURI(trimmed));
  } catch {
    return trimmed;
  }
}

function isLocalAssetUrl(input: string): boolean {
  const trimmed = input.trim();
  return trimmed.startsWith('./') || (trimmed.startsWith('/') && !trimmed.startsWith('//'));
}

function getFileName(input: string): string {
  const clean = input.trim().split('?')[0].split('#')[0];
  const parts = clean.split('/');
  return parts[parts.length - 1] || 'archivo';
}

function isLocalVideoFile(src: string): boolean {
  const lower = src.trim().toLowerCase();
  return (
    lower.endsWith('.mp4') ||
    lower.endsWith('.webm') ||
    lower.endsWith('.ogg') ||
    lower.endsWith('.mov')
  );
}

function isPlayableVideo(src: string): boolean {
  const trimmed = src.trim();
  if (!trimmed || trimmed.endsWith('/')) return false;
  if (isLocalAssetUrl(trimmed)) return isLocalVideoFile(trimmed);
  return true;
}

function extractYouTubeId(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([a-zA-Z0-9_-]{11})/
  );
  return match?.[1] || trimmed;
}

function getItemVideos(item: ResearchResourceItem): { titulo: string; src: string }[] {
  const list: { titulo: string; src: string }[] = [];
  if (item.video && isPlayableVideo(item.video)) {
    list.push({ titulo: 'Ver Video', src: item.video.trim() });
  }
  if (item.videos && item.videos.length > 0) {
    item.videos.forEach((v) => {
      if (v.src && isPlayableVideo(v.src)) {
        list.push({
          titulo: v.titulo?.trim() || `Video ${list.length + 1}`,
          src: v.src.trim(),
        });
      }
    });
  }
  return list;
}

export function ResourcesArchiveModal({
  isOpen,
  onClose,
  config,
}: ResourcesArchiveModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('todos');
  const [activeVideo, setActiveVideo] = useState<ActiveVideoState | null>(null);

  const visibleItems = useMemo(
    () => (config?.items || []).filter((item) => item.visible !== false),
    [config]
  );

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'todos') return visibleItems;
    return visibleItems.filter((item) => item.categoria === selectedCategory);
  }, [visibleItems, selectedCategory]);

  useEffect(() => {
    if (!isOpen) {
      setActiveVideo(null);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeVideo) {
          setActiveVideo(null);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeVideo, onClose]);

  if (!isOpen) return null;

  const availableCategories: CategoryFilter[] = [
    'todos',
    ...Array.from(new Set<ResearchResourceItem['categoria']>(visibleItems.map((item) => item.categoria))),
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Archivo de investigaciones, tutoriales y recursos"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[88vh] bg-[#1c120b] border border-[#e07a3f]/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#faede5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 px-6 py-5 bg-[#140c07] border-b border-[rgba(224,122,63,0.2)] flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#261910] border border-[#e8a038]/30 flex items-center justify-center text-[#e8a038] shrink-0 mt-0.5">
              <Archive className="w-5 h-5" />
            </div>
            <div>
              <div className="font-pixel text-[10px] text-[#e07a3f] tracking-widest uppercase mb-1">
                ANEXO · ARCHIVO COMPLEMENTARIO
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#faede5]">
                {config?.titulo || 'Investigaciones, Tutoriales & Recursos'}
              </h3>
              <p className="text-xs sm:text-sm text-[#bda89b] font-body mt-1 max-w-2xl">
                {config?.descripcion ||
                  'Espacio aparte del portafolio principal con documentos PDF, tutoriales en video y material descargable.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#261910] hover:bg-[#342217] text-[#bda89b] hover:text-[#faede5] border border-[rgba(224,122,63,0.2)] transition-colors shrink-0"
            title="Cerrar ventana (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inline Video Viewer */}
        {activeVideo && (
          <div className="shrink-0 bg-[#0d0704] border-b border-[rgba(224,122,63,0.25)] p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <Film className="w-4 h-4 text-[#e8a038] shrink-0" />
                <span className="font-mono text-xs sm:text-sm font-bold text-[#faede5] truncate">
                  {activeVideo.titulo}
                </span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="px-3 py-1 rounded-lg bg-[#261910] hover:bg-[#e8a038] text-[#bda89b] hover:text-[#140c07] font-mono text-xs transition-colors shrink-0"
              >
                Cerrar video
              </button>
            </div>

            <div className="relative w-full h-[220px] sm:h-[340px] bg-black rounded-xl overflow-hidden border border-[rgba(224,122,63,0.25)]">
              {isLocalVideoFile(activeVideo.src) ? (
                <video
                  key={activeVideo.src}
                  src={resolveSafeUrl(activeVideo.src)}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${extractYouTubeId(
                    activeVideo.src
                  )}?autoplay=1`}
                  title={activeVideo.titulo}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        )}

        {/* Filter Bar */}
        {visibleItems.length > 0 && (
          <div className="shrink-0 px-6 py-3 bg-[#170e09] border-b border-[rgba(224,122,63,0.15)] flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {availableCategories.map((cat) => {
                const isActive = selectedCategory === cat;
                const label = cat === 'todos' ? 'Todos' : CATEGORY_META[cat].label;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs border transition-all ${
                      isActive
                        ? 'bg-[#e8a038] text-[#140c07] border-[#e8a038] font-bold'
                        : 'bg-[#261910] text-[#bda89b] border-[rgba(224,122,63,0.2)] hover:border-[#e07a3f] hover:text-[#faede5]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <span className="font-mono text-[11px] text-[#7f6a5e]">
              {filteredItems.length} {filteredItems.length === 1 ? 'elemento' : 'elementos'}
            </span>
          </div>
        )}

        {/* Content Body */}
        <div className="min-h-0 flex-1 p-6 overflow-y-auto space-y-4">
          {visibleItems.length === 0 ? (
            <div className="bg-[#140c07] border border-dashed border-[rgba(224,122,63,0.3)] rounded-2xl p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#261910] border border-[rgba(224,122,63,0.25)] flex items-center justify-center text-[#e8a038] mx-auto">
                <FolderOpen className="w-6 h-6" />
              </div>
              <h4 className="font-display text-lg font-bold text-[#faede5]">
                Baúl listo para tus archivos
              </h4>
              <p className="text-sm text-[#bda89b] font-body max-w-md mx-auto leading-relaxed">
                Todavía no hay investigaciones ni tutoriales publicados en este anexo. Puedes agregar PDFs, videos locales o de YouTube y links de descarga desde la sección comentada{' '}
                <code className="font-mono text-xs text-[#e8a038] bg-[#261910] px-1.5 py-0.5 rounded">
                  archivoRecursos
                </code>
                .
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredItems.map((item) => {
                const catMeta = CATEGORY_META[item.categoria];
                const itemVideos = getItemVideos(item);
                const safePdfUrl = item.pdfUrl ? resolveSafeUrl(item.pdfUrl) : '';
                const safeDownloadUrl = item.linkDescarga ? resolveSafeUrl(item.linkDescarga) : '';
                const safeExternalUrl = item.linkExterno ? resolveSafeUrl(item.linkExterno) : '';

                return (
                  <article
                    key={item.id}
                    className="bg-[#261910]/65 hover:bg-[#261910] border border-[rgba(224,122,63,0.2)] hover:border-[#e8a038]/50 rounded-2xl p-5 transition-all space-y-3.5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`font-mono text-[10px] uppercase font-bold px-2.5 py-0.5 rounded border ${catMeta.badgeClass}`}
                          >
                            {catMeta.label}
                          </span>
                          {item.fecha && (
                            <span className="font-mono text-xs text-[#7f6a5e]">
                              {item.fecha}
                            </span>
                          )}
                        </div>
                        <h4 className="font-display text-lg font-bold text-[#faede5]">
                          {item.titulo}
                        </h4>
                      </div>
                    </div>

                    <p className="text-sm text-[#bda89b] font-body leading-relaxed">
                      {item.descripcion}
                    </p>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#140c07] text-[#bda89b] border border-[rgba(224,122,63,0.2)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action buttons */}
                    {(safePdfUrl || itemVideos.length > 0 || safeDownloadUrl || safeExternalUrl) && (
                      <div className="pt-2 border-t border-[rgba(224,122,63,0.15)] flex flex-wrap gap-2.5">
                        {safePdfUrl && (
                          <>
                            <a
                              href={safePdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold px-3.5 py-2 rounded-xl bg-[#140c07] hover:bg-[#e8a038] text-[#faede5] hover:text-[#140c07] border border-[rgba(224,122,63,0.3)] hover:border-[#e8a038] transition-all"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>Ver PDF</span>
                              <ExternalLink className="w-3 h-3 opacity-70" />
                            </a>
                            <a
                              href={safePdfUrl}
                              download={item.pdfUrl ? getFileName(item.pdfUrl) : true}
                              className="inline-flex items-center gap-1.5 font-mono text-xs px-3.5 py-2 rounded-xl bg-[#140c07] hover:bg-[#342217] text-[#bda89b] hover:text-[#faede5] border border-[rgba(224,122,63,0.25)] transition-all"
                            >
                              <Download className="w-3.5 h-3.5 text-[#e8a038]" />
                              <span>Descargar PDF</span>
                            </a>
                          </>
                        )}

                        {itemVideos.map((vid, vIdx) => {
                          const isThisVideoActive =
                            activeVideo?.itemId === item.id && activeVideo?.src === vid.src;
                          return (
                            <button
                              key={`${item.id}-vid-${vIdx}`}
                              onClick={() =>
                                setActiveVideo(
                                  isThisVideoActive
                                    ? null
                                    : {
                                        itemId: item.id,
                                        titulo:
                                          vid.titulo === 'Ver Video'
                                            ? item.titulo
                                            : `${item.titulo} · ${vid.titulo}`,
                                        src: vid.src,
                                      }
                                )
                              }
                              className={`inline-flex items-center gap-1.5 font-mono text-xs font-semibold px-3.5 py-2 rounded-xl border transition-all ${
                                isThisVideoActive
                                  ? 'bg-[#e8a038] text-[#140c07] border-[#e8a038]'
                                  : 'bg-[#140c07] hover:bg-[#e07a3f] text-[#faede5] hover:text-[#140c07] border-[rgba(224,122,63,0.3)] hover:border-[#e07a3f]'
                              }`}
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>{isThisVideoActive ? 'Ocultar Video' : vid.titulo}</span>
                            </button>
                          );
                        })}

                        {safeDownloadUrl && item.linkDescarga && (
                          isLocalAssetUrl(item.linkDescarga) ? (
                            <a
                              href={safeDownloadUrl}
                              download={getFileName(item.linkDescarga)}
                              title={`Descargar ${getFileName(item.linkDescarga)}`}
                              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold px-3.5 py-2 rounded-xl bg-[#85994b]/20 hover:bg-[#85994b] text-[#85994b] hover:text-[#140c07] border border-[#85994b]/40 transition-all"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Descargar Recurso</span>
                            </a>
                          ) : (
                            <a
                              href={safeDownloadUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold px-3.5 py-2 rounded-xl bg-[#85994b]/20 hover:bg-[#85994b] text-[#85994b] hover:text-[#140c07] border border-[#85994b]/40 transition-all"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Descargar Recurso</span>
                              <ExternalLink className="w-3 h-3 opacity-70" />
                            </a>
                          )
                        )}

                        {safeExternalUrl && (
                          <a
                            href={safeExternalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-xs px-3.5 py-2 rounded-xl bg-[#140c07] hover:bg-[#342217] text-[#bda89b] hover:text-[#e8a038] border border-[rgba(224,122,63,0.25)] transition-all"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Enlace / Referencia</span>
                            <ExternalLink className="w-3 h-3 opacity-70" />
                          </a>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
