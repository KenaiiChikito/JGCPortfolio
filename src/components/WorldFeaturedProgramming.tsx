import { useState, useRef, useEffect, useMemo, MouseEvent } from 'react';
import { FeaturedProgrammingProject, FeaturedMediaItem } from '../types';
import { PlatformIcon } from './PlatformIcon';
import {
  ExternalLink,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Terminal,
  Zap,
  Layers,
  FileText,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Film,
  Image as ImageIcon,
  X,
} from 'lucide-react';

interface WorldFeaturedProgrammingProps {
  proyecto?: FeaturedProgrammingProject;
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

function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function inferMediaType(item: FeaturedMediaItem): FeaturedMediaItem['tipo'] {
  if (item.tipo) return item.tipo;
  const lower = item.src.toLowerCase();
  if (lower.endsWith('.gif')) return 'gif';
  if (lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.ogg')) return 'video';
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'youtube';
  return 'imagen';
}

export function WorldFeaturedProgramming({ proyecto, onOpenVideo }: WorldFeaturedProgrammingProps) {
  const [activeTab, setActiveTab] = useState<'arquitectura' | 'codigo'>('arquitectura');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  // Estado del reproductor de video nativo
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [youtubeActive, setYoutubeActive] = useState(false);
  const [failedMedia, setFailedMedia] = useState<Record<number, boolean>>({});

  // Construye la lista final de medios combinando galeriaMedia o fallback con video + imagen
  const mediaList: FeaturedMediaItem[] = useMemo(() => {
    if (!proyecto) return [];
    if (proyecto.galeriaMedia && proyecto.galeriaMedia.length > 0) {
      return proyecto.galeriaMedia
        .filter((item) => item.visible !== false && item.src.trim().length > 0)
        .map((item) => ({ ...item, tipo: inferMediaType(item) }));
    }

    const fallback: FeaturedMediaItem[] = [];
    if (proyecto.video && proyecto.video.trim().length > 0) {
      const lower = proyecto.video.toLowerCase();
      const isLocalVideo =
        lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.ogg');
      const isGif = lower.endsWith('.gif');
      fallback.push({
        tipo: isLocalVideo ? 'video' : isGif ? 'gif' : 'youtube',
        src: proyecto.video,
        thumbnail: proyecto.imagen,
        titulo: isGif ? 'Animación Gameplay' : 'Video Demo',
      });
    }
    if (proyecto.imagen && proyecto.imagen.trim().length > 0) {
      fallback.push({
        tipo: 'imagen',
        src: proyecto.imagen,
        titulo: proyecto.titulo,
      });
    }
    return fallback;
  }, [proyecto]);

  const totalMedia = mediaList.length;
  const safeIndex = totalMedia > 0 ? ((selectedIndex % totalMedia) + totalMedia) % totalMedia : 0;
  const activeItem = mediaList[safeIndex];

  // Reset estado del reproductor al cambiar de elemento
  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    setYoutubeActive(false);

    const videoEl = videoRef.current;
    if (videoEl && activeItem?.tipo === 'video') {
      videoEl.currentTime = 0;
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    } else {
      setIsPlaying(false);
    }
  }, [safeIndex, activeItem?.src, activeItem?.tipo]);

  // Centrar miniatura activa solo horizontalmente dentro de la barra (sin mover el scroll vertical de la página)
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || (safeIndex === 0 && strip.scrollLeft === 0)) return;
    const activeThumb = strip.children[safeIndex] as HTMLElement | undefined;
    if (activeThumb) {
      const stripRect = strip.getBoundingClientRect();
      const thumbRect = activeThumb.getBoundingClientRect();
      const targetLeft =
        strip.scrollLeft +
        (thumbRect.left - stripRect.left) -
        (stripRect.width - thumbRect.width) / 2;
      strip.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
    }
  }, [safeIndex]);

  // Navegación con teclado cuando el lightbox está abierto
  useEffect(() => {
    if (!fullscreenOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreenOpen(false);
      if (e.key === 'ArrowLeft' && totalMedia > 1) {
        setSelectedIndex((prev) => (prev - 1 + totalMedia) % totalMedia);
      }
      if (e.key === 'ArrowRight' && totalMedia > 1) {
        setSelectedIndex((prev) => (prev + 1) % totalMedia);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [fullscreenOpen, totalMedia]);

  if (!proyecto) return null;

  const metricasVisibles = (proyecto.metricasRendimiento || []).filter((m) => m.visible !== false);
  const caracteristicasVisibles = (proyecto.caracteristicasTecnicas || []).filter((c) => c.visible !== false);
  const tieneCodigoVisible = Boolean(proyecto.codigoSnippet && proyecto.codigoSnippet.visible !== false);
  const currentTab = activeTab === 'codigo' && !tieneCodigoVisible ? 'arquitectura' : activeTab;

  const handlePrev = (e?: MouseEvent) => {
    e?.stopPropagation();
    if (totalMedia <= 1) return;
    setSelectedIndex((prev) => (prev - 1 + totalMedia) % totalMedia);
  };

  const handleNext = (e?: MouseEvent) => {
    e?.stopPropagation();
    if (totalMedia <= 1) return;
    setSelectedIndex((prev) => (prev + 1) % totalMedia);
  };

  const toggleVideoPlay = (e?: MouseEvent) => {
    e?.stopPropagation();
    const videoEl = videoRef.current;
    if (!videoEl) return;
    if (videoEl.paused) {
      videoEl.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoEl.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: MouseEvent) => {
    e.stopPropagation();
    const videoEl = videoRef.current;
    if (!videoEl) return;
    videoEl.muted = !videoEl.muted;
    setIsMuted(videoEl.muted);
  };

  const handleSeek = (value: number) => {
    const videoEl = videoRef.current;
    if (!videoEl || !Number.isFinite(duration) || duration <= 0) return;
    videoEl.currentTime = value;
    setCurrentTime(value);
  };

  const handleOpenFullscreen = (e: MouseEvent) => {
    e.stopPropagation();
    if (activeItem?.tipo === 'youtube' && onOpenVideo && !youtubeActive) {
      onOpenVideo(extractYouTubeId(activeItem.src));
      return;
    }
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setFullscreenOpen(true);
  };

  const getThumbnailSrc = (item: FeaturedMediaItem): string => {
    if (item.thumbnail) return item.thumbnail;
    if (item.tipo === 'youtube') {
      const ytId = extractYouTubeId(item.src);
      return ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : proyecto.imagen;
    }
    return item.src;
  };

  const getMediaTypeLabel = (tipo: FeaturedMediaItem['tipo']): string => {
    switch (tipo) {
      case 'video':
        return 'Video';
      case 'gif':
        return 'GIF';
      case 'youtube':
        return 'YouTube';
      default:
        return 'Captura';
    }
  };

  const ytId = activeItem?.tipo === 'youtube' ? extractYouTubeId(activeItem.src) : '';
  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <section
      id="prog-destacado"
      className="relative z-10 py-24 md:py-32 border-t border-[rgba(224,122,63,0.25)] bg-gradient-to-b from-[#140c07] via-[#1a0f09] to-[#140c07]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 font-pixel text-xs text-[#e8a038] tracking-widest uppercase bg-[#261910] border border-[#e8a038]/30 px-3.5 py-1.5 rounded-full mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#e8a038]" />
            <span>{proyecto.subtituloBadge || "MUNDO 02-B · SPOTLIGHT TÉCNICO"}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#faede5]">
            Proyecto de Programación Destacado
          </h2>
          <p className="text-[#bda89b] text-base mt-2 max-w-2xl font-body">
            Desglose exhaustivo de ingeniería: muestra interactiva en video/GIF, arquitectura de sistemas, código fuente y métricas de rendimiento.
          </p>
        </div>

        {/* Main Showcase Hero Container */}
        <div className="bg-[#1c120b] border border-[#e07a3f]/35 hover:border-[#e07a3f]/70 rounded-3xl overflow-hidden shadow-2xl transition-colors duration-300">
          {/* Top Banner / Title Bar */}
          <div className="bg-[#24160d] border-b border-[rgba(224,122,63,0.2)] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 min-w-0">
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#faede5] tracking-wide">
                {proyecto.titulo}
              </h3>
              <span className="text-[#7f6a5e] hidden sm:inline" aria-hidden="true">·</span>
              <span className="hidden sm:inline-block text-[#e8a038] font-mono text-xs truncate max-w-md">
                {proyecto.subtitulo}
              </span>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2.5 shrink-0">
              {proyecto.linkCodigo && (
                <a
                  href={proyecto.linkCodigo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs text-[#faede5] bg-[#140c07] hover:bg-[#e07a3f] hover:text-[#140c07] border border-[rgba(224,122,63,0.3)] hover:border-[#e07a3f] px-3.5 py-2 rounded-xl transition-all font-semibold whitespace-nowrap shrink-0"
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
                  className="inline-flex items-center gap-2 font-mono text-xs text-[#140c07] bg-[#e8a038] hover:bg-[#f59e0b] px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap shrink-0"
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
                  className="inline-flex items-center gap-2 font-mono text-xs text-[#bda89b] hover:text-[#faede5] bg-[#140c07] hover:bg-[#261910] border border-[rgba(224,122,63,0.3)] px-3 py-2 rounded-xl transition-all whitespace-nowrap shrink-0"
                  title="Documento de Diseño (GDD)"
                >
                  <FileText className="w-4 h-4 text-[#e8a038]" />
                  <span className="hidden md:inline">GDD / Docs</span>
                </a>
              )}
            </div>
          </div>

          {/* Upper Split: Steam-Inspired Media Showcase (Left 8 cols) + Project Spotlight Info (Right 4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch border-b border-[rgba(224,122,63,0.2)]">
            {/* LEFT COL: Steam-Inspired Media Stage & Thumbnail Carousel (8 cols) */}
            <div className="lg:col-span-8 p-4 sm:p-5 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[rgba(224,122,63,0.2)] bg-[#140c07]/90">
              <div className="w-full">
                {/* Main Media Stage */}
                <div className="relative aspect-video rounded-xl overflow-hidden border border-[rgba(224,122,63,0.3)] bg-[#0b0603] group shadow-inner">
                  {/* Top Caption Bar (subtle scrim like showcase stage) */}
                  {activeItem && (
                    <div className="absolute top-0 inset-x-0 z-20 px-4 py-2.5 bg-gradient-to-b from-[#0b0603]/90 via-[#0b0603]/55 to-transparent flex items-center justify-between gap-3 pointer-events-none">
                      <div className="flex items-center gap-2 min-w-0 font-mono text-xs">
                        <span className="text-[#e8a038] font-bold uppercase tracking-wider shrink-0">
                          {getMediaTypeLabel(activeItem.tipo)}
                        </span>
                        {activeItem.titulo && (
                          <>
                            <span className="text-[#7f6a5e]" aria-hidden="true">|</span>
                            <span className="text-[#faede5] truncate">{activeItem.titulo}</span>
                          </>
                        )}
                      </div>
                      {totalMedia > 1 && (
                        <span className="font-mono text-[11px] tabular-nums text-[#bda89b] shrink-0">
                          {safeIndex + 1} / {totalMedia}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Active Media Renderer */}
                  {activeItem?.tipo === 'video' ? (
                    <div
                      className="relative w-full h-full flex items-center justify-center cursor-pointer"
                      onClick={toggleVideoPlay}
                    >
                      <video
                        ref={videoRef}
                        src={activeItem.src}
                        poster={activeItem.thumbnail}
                        muted={isMuted}
                        playsInline
                        loop={totalMedia === 1}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                        onEnded={() => {
                          setIsPlaying(false);
                          if (totalMedia > 1) handleNext();
                        }}
                        className="w-full h-full object-contain bg-[#0b0603]"
                      />

                      {/* Center Play Overlay when paused */}
                      {!isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#0b0603]/30 transition-opacity">
                          <div className="w-16 h-16 rounded-full bg-[#140c07]/90 border-2 border-[#e8a038] text-[#e8a038] flex items-center justify-center shadow-2xl transition-transform duration-200 group-hover:scale-105">
                            <Play className="w-7 h-7 fill-current ml-0.5" />
                          </div>
                        </div>
                      )}

                      {/* Custom Steam-style Bottom Video Controls */}
                      <div
                        className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-[#0b0603] via-[#0b0603]/90 to-transparent pt-6 pb-2.5 px-3.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Scrubber Track */}
                        <div className="relative w-full h-1.5 bg-[#2a1a10] rounded-full mb-2.5 group/seek cursor-pointer">
                          <div
                            className="absolute left-0 top-0 h-full bg-[#e8a038] rounded-full pointer-events-none"
                            style={{ width: `${progressPercent}%` }}
                          />
                          <input
                            type="range"
                            min={0}
                            max={duration || 100}
                            step={0.1}
                            value={currentTime}
                            onChange={(e) => handleSeek(parseFloat(e.target.value))}
                            aria-label="Progreso del video"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={toggleVideoPlay}
                              className="p-1.5 rounded-lg text-[#faede5] hover:text-[#e8a038] hover:bg-[#24160d] transition-colors"
                              aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
                            >
                              {isPlaying ? (
                                <Pause className="w-4 h-4 fill-current" />
                              ) : (
                                <Play className="w-4 h-4 fill-current" />
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={toggleMute}
                              className="p-1.5 rounded-lg text-[#faede5] hover:text-[#e8a038] hover:bg-[#24160d] transition-colors"
                              aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                            >
                              {isMuted ? (
                                <VolumeX className="w-4 h-4" />
                              ) : (
                                <Volume2 className="w-4 h-4 text-[#e8a038]" />
                              )}
                            </button>

                            <span className="font-mono text-[11px] tabular-nums text-[#bda89b] ml-1">
                              {formatDuration(currentTime)} / {formatDuration(duration)}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={handleOpenFullscreen}
                            className="p-1.5 rounded-lg text-[#bda89b] hover:text-[#e8a038] hover:bg-[#24160d] transition-colors"
                            title="Ver en pantalla completa"
                            aria-label="Ver en pantalla completa"
                          >
                            <Maximize2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : activeItem?.tipo === 'youtube' ? (
                    <div className="relative w-full h-full bg-[#0b0603]">
                      {youtubeActive && ytId ? (
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0`}
                          title={activeItem.titulo || proyecto.titulo}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => setYoutubeActive(true)}
                          className="relative w-full h-full flex items-center justify-center group/yt"
                          aria-label="Reproducir video de YouTube"
                        >
                          <img
                            src={getThumbnailSrc(activeItem)}
                            alt={activeItem.titulo || proyecto.titulo}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover opacity-85 group-hover/yt:opacity-100 transition-opacity"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0603]/80 via-transparent to-[#0b0603]/40" />
                          <div className="relative z-10 w-16 h-16 rounded-full bg-[#140c07]/90 group-hover/yt:bg-[#e8a038] text-[#e8a038] group-hover/yt:text-[#140c07] border-2 border-[#e8a038] flex items-center justify-center transition-all shadow-2xl group-hover/yt:scale-110">
                            <Play className="w-7 h-7 fill-current ml-0.5" />
                          </div>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={handleOpenFullscreen}
                        className="absolute bottom-3 right-3 z-20 p-2 rounded-xl bg-[#140c07]/85 hover:bg-[#e8a038] text-[#bda89b] hover:text-[#140c07] border border-[rgba(224,122,63,0.3)] transition-colors"
                        title="Expandir video"
                        aria-label="Expandir video"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    /* Imagen o GIF */
                    <div className="relative w-full h-full flex items-center justify-center bg-[#0b0603]">
                      {failedMedia[safeIndex] || !activeItem?.src ? (
                        <div className="flex flex-col items-center justify-center gap-2 p-6 text-center text-[#bda89b]">
                          <ImageIcon className="w-8 h-8 text-[#e07a3f]/60" />
                          <span className="font-mono text-xs">{activeItem?.titulo || proyecto.titulo}</span>
                        </div>
                      ) : (
                        <img
                          key={activeItem.src}
                          src={activeItem.src}
                          alt={activeItem.titulo || proyecto.titulo}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedMedia((prev) => ({ ...prev, [safeIndex]: true }))
                          }
                          className={`w-full h-full transition-transform duration-500 group-hover:scale-[1.02] ${
                            activeItem.tipo === 'gif' ? 'object-contain' : 'object-cover'
                          }`}
                        />
                      )}

                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0b0603]/85 to-transparent pointer-events-none" />

                      {/* GIF indicator when viewing an animated GIF */}
                      {activeItem?.tipo === 'gif' && (
                        <span className="absolute bottom-3 left-3 z-10 font-mono text-[11px] font-bold tracking-wider uppercase bg-[#140c07]/90 text-[#e8a038] border border-[#e8a038]/40 px-2.5 py-1 rounded-md">
                          GIF ANIMADO
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={handleOpenFullscreen}
                        className="absolute bottom-3 right-3 z-20 p-2 rounded-xl bg-[#140c07]/85 hover:bg-[#e8a038] text-[#bda89b] hover:text-[#140c07] border border-[rgba(224,122,63,0.3)] transition-colors"
                        title="Ver en pantalla completa"
                        aria-label="Ver en pantalla completa"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Stage Left / Right Navigation Arrows (visible when > 1 item) */}
                  {totalMedia > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Elemento multimedia anterior"
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#140c07]/80 hover:bg-[#e8a038] text-[#faede5] hover:text-[#140c07] border border-[rgba(224,122,63,0.35)] transition-all opacity-80 group-hover:opacity-100"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Siguiente elemento multimedia"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#140c07]/80 hover:bg-[#e8a038] text-[#faede5] hover:text-[#140c07] border border-[rgba(224,122,63,0.35)] transition-all opacity-80 group-hover:opacity-100"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Steam-Style Horizontal Thumbnail Strip + Stepper Bar */}
                {totalMedia > 1 && (
                  <div className="mt-3.5">
                    <div
                      ref={stripRef}
                      className="flex items-center gap-2.5 overflow-x-auto pb-2 scroll-smooth"
                    >
                      {mediaList.map((item, idx) => {
                        const isSelected = idx === safeIndex;
                        const isVideoOrYt = item.tipo === 'video' || item.tipo === 'youtube';
                        const isGif = item.tipo === 'gif';
                        const thumbUrl = getThumbnailSrc(item);

                        return (
                          <button
                            key={`${item.src}-${idx}`}
                            type="button"
                            onClick={() => setSelectedIndex(idx)}
                            className={`relative w-28 sm:w-32 aspect-video rounded-lg overflow-hidden border-2 shrink-0 bg-[#0b0603] transition-all ${
                              isSelected
                                ? 'border-[#e8a038] shadow-[0_0_12px_rgba(232,160,56,0.35)] opacity-100'
                                : 'border-[rgba(224,122,63,0.2)] opacity-60 hover:opacity-100 hover:border-[#e07a3f]/70'
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
                                src={thumbUrl}
                                alt={item.titulo || `Miniatura ${idx + 1}`}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            )}

                            {/* Centered Play Badge for Video / YouTube */}
                            {isVideoOrYt && (
                              <span className="absolute inset-0 flex items-center justify-center bg-[#0b0603]/35">
                                <span className="w-7 h-7 rounded-full bg-[#140c07]/90 border border-[#e8a038]/80 text-[#e8a038] flex items-center justify-center">
                                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                                </span>
                              </span>
                            )}

                            {/* Corner GIF badge */}
                            {isGif && (
                              <span className="absolute bottom-1 right-1 font-mono text-[9px] font-bold uppercase bg-[#140c07]/90 text-[#e8a038] border border-[#e8a038]/40 px-1.5 py-0.5 rounded">
                                GIF
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Stepper Slider Bar (inspired by Steam's bottom carousel navigation bar) */}
                    <div className="mt-1 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="p-1.5 rounded-lg bg-[#24160d] hover:bg-[#e07a3f] text-[#bda89b] hover:text-[#140c07] border border-[rgba(224,122,63,0.25)] transition-colors shrink-0"
                        aria-label="Anterior en la galería"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex-1 flex items-center gap-1.5">
                        {mediaList.map((item, idx) => (
                          <button
                            key={`dot-${idx}`}
                            type="button"
                            onClick={() => setSelectedIndex(idx)}
                            aria-label={`Ir a ${item.titulo || `elemento ${idx + 1}`}`}
                            className={`h-1.5 rounded-full transition-all ${
                              idx === safeIndex
                                ? 'flex-[2] bg-[#e8a038]'
                                : 'flex-1 bg-[#2a1a10] hover:bg-[#e07a3f]/60'
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={handleNext}
                        className="p-1.5 rounded-lg bg-[#24160d] hover:bg-[#e07a3f] text-[#bda89b] hover:text-[#140c07] border border-[rgba(224,122,63,0.25)] transition-colors shrink-0"
                        aria-label="Siguiente en la galería"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COL: Project Capsule Banner, Description & Stack (4 cols) */}
            <div className="lg:col-span-4 p-4 sm:p-5 flex flex-col justify-between bg-[#1a100a]">
              <div>
                {/* Capsule Cover Image */}
                {proyecto.imagen && (
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-[rgba(224,122,63,0.25)] mb-4 bg-[#0b0603]">
                    <img
                      src={proyecto.imagen}
                      alt={proyecto.titulo}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a100a] via-transparent to-transparent opacity-50" />
                  </div>
                )}

                {/* Description */}
                <p className="text-[#faede5] text-sm sm:text-[15px] leading-relaxed font-body mb-4">
                  {proyecto.descripcion}
                </p>

                {/* Development Context */}
                {proyecto.historiaDesarrollo && (
                  <div className="text-[#bda89b] text-xs sm:text-sm leading-relaxed font-body border border-[rgba(224,122,63,0.2)] bg-[#24160d]/50 p-3.5 rounded-xl mb-4">
                    {proyecto.historiaDesarrollo}
                  </div>
                )}
              </div>

              {/* Clean Metadata Tags Footer + Quick Media Hint */}
              <div className="pt-3.5 border-t border-[rgba(224,122,63,0.15)] space-y-2.5">
                {proyecto.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-[#bda89b]">
                    <span className="text-[#7f6a5e] uppercase tracking-wider text-[11px] mr-1">
                      Stack:
                    </span>
                    {proyecto.tags.map((tag, idx) => (
                      <span key={tag} className="inline-flex items-center gap-2.5">
                        <span className="text-[#e8a038]">{tag}</span>
                        {idx < proyecto.tags.length - 1 && (
                          <span className="text-[#7f6a5e]" aria-hidden="true">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] font-mono text-[#7f6a5e]">
                  <span className="inline-flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5 text-[#e8a038]" />
                    <span>
                      {totalMedia > 1
                        ? `${totalMedia} elementos en galería`
                        : 'Vista previa de proyecto'}
                    </span>
                  </span>
                  <span>Clic para ampliar</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width Performance Metrics Strip (below the 8/4 split, balanced grid) */}
          {metricasVisibles.length > 0 && (
            <div className="px-5 sm:px-7 py-4 border-b border-[rgba(224,122,63,0.2)] bg-[#170f0a]">
              <div className="flex items-center gap-1.5 font-mono text-xs text-[#7f6a5e] uppercase tracking-wider mb-3">
                <Zap className="w-3.5 h-3.5 text-[#e8a038]" />
                <span>Métricas de Rendimiento & Optimización</span>
              </div>
              <div
                className={`grid gap-3 ${
                  metricasVisibles.length === 1
                    ? 'grid-cols-1'
                    : metricasVisibles.length === 2
                      ? 'grid-cols-1 sm:grid-cols-2'
                      : metricasVisibles.length === 3
                        ? 'grid-cols-1 sm:grid-cols-3'
                        : 'grid-cols-2 lg:grid-cols-4'
                }`}
              >
                {metricasVisibles.map((metrica) => (
                  <div
                    key={metrica.label}
                    className="bg-[#140c07] border border-[rgba(224,122,63,0.2)] rounded-xl px-4 py-3 flex items-center justify-between gap-3"
                  >
                    <div>
                      <span className="font-mono text-[11px] text-[#7f6a5e] block">
                        {metrica.label}
                      </span>
                      {metrica.detalle && (
                        <span className="font-mono text-[11px] text-[#e8a038] block mt-0.5">
                          {metrica.detalle}
                        </span>
                      )}
                    </div>
                    <span className="font-display text-xl font-bold tabular-nums text-[#faede5] shrink-0">
                      {metrica.valor}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lower Full-Width Section: Architecture Systems & Code Snippet Tabs */}
          {(caracteristicasVisibles.length > 0 || tieneCodigoVisible) && (
            <div className="p-5 sm:p-7 bg-[#1c120b]">
              {/* Tabs */}
              <div className="flex items-center gap-2 border-b border-[rgba(224,122,63,0.2)] mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab('arquitectura')}
                  className={`font-mono text-xs py-2.5 px-4 font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
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
                    type="button"
                    onClick={() => setActiveTab('codigo')}
                    className={`font-mono text-xs py-2.5 px-4 font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {caracteristicasVisibles.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#24160d]/70 border border-[rgba(224,122,63,0.2)] hover:border-[#e07a3f]/50 p-4 rounded-xl transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#85994b] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-mono text-sm font-bold text-[#faede5] mb-1">
                            {item.titulo}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#bda89b] font-body leading-relaxed">
                            {item.descripcion}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                tieneCodigoVisible &&
                proyecto.codigoSnippet && (
                  <div className="rounded-xl overflow-hidden border border-[rgba(224,122,63,0.3)] bg-[#140c07] font-mono text-xs shadow-inner">
                    <div className="bg-[#1f130a] px-4 py-2.5 border-b border-[rgba(224,122,63,0.2)] flex items-center justify-between text-[#7f6a5e]">
                      <span className="text-xs text-[#e8a038]">{proyecto.codigoSnippet.archivo}</span>
                      <span className="text-[11px] uppercase tracking-wider">
                        {proyecto.codigoSnippet.lenguaje}
                      </span>
                    </div>
                    <pre className="p-4 overflow-x-auto text-[#faede5] text-[12px] leading-relaxed max-h-80">
                      <code>{proyecto.codigoSnippet.codigo}</code>
                    </pre>
                  </div>
                )
              )}

              {/* Bottom Quick Bar */}
              {proyecto.mostrarStatusFooter !== false && (
                <div className="mt-6 pt-4 border-t border-[rgba(224,122,63,0.15)] flex items-center justify-between font-mono text-xs text-[#7f6a5e]">
                  <span>{proyecto.statusTexto || "Status: Compilado & Optimizado"}</span>
                  <span className="text-[#85994b] font-bold">
                    {proyecto.statusTargetBadge || "60 FPS TARGET"}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Media Lightbox Modal */}
      {fullscreenOpen && activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0c0704]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setFullscreenOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#1c120b] border border-[#e8a038]/40 rounded-2xl overflow-hidden shadow-2xl p-4 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3 px-1 gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-display font-bold text-[#faede5] truncate">
                  {activeItem.titulo || proyecto.titulo}
                </span>
                {totalMedia > 1 && (
                  <span className="font-mono text-xs tabular-nums text-[#e8a038] shrink-0">
                    {safeIndex + 1} / {totalMedia}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setFullscreenOpen(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#261910] hover:bg-[#e8a038] text-[#bda89b] hover:text-[#140c07] font-mono text-xs transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cerrar (Esc)</span>
              </button>
            </div>

            <div className="relative aspect-video w-full bg-[#0a0503] rounded-xl overflow-hidden border border-[rgba(224,122,63,0.2)] flex items-center justify-center">
              {activeItem.tipo === 'video' ? (
                <video
                  key={activeItem.src}
                  ref={(el) => {
                    if (el) {
                      el.muted = true;
                      el.defaultMuted = true;
                    }
                  }}
                  src={activeItem.src}
                  controls
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : activeItem.tipo === 'youtube' && ytId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0`}
                  title={activeItem.titulo || proyecto.titulo}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img
                  src={activeItem.src}
                  alt={activeItem.titulo || proyecto.titulo}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              )}

              {totalMedia > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#140c07]/90 hover:bg-[#e8a038] text-[#faede5] hover:text-[#140c07] border border-[rgba(224,122,63,0.5)] transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Siguiente"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#140c07]/90 hover:bg-[#e8a038] text-[#faede5] hover:text-[#140c07] border border-[rgba(224,122,63,0.5)] transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {totalMedia > 1 && (
              <div className="mt-3 flex items-center justify-center gap-2 overflow-x-auto pb-1">
                {mediaList.map((item, idx) => (
                  <button
                    key={`modal-thumb-${idx}`}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    className={`relative w-20 aspect-video rounded-lg overflow-hidden border transition-all shrink-0 bg-[#0b0603] ${
                      idx === safeIndex
                        ? 'border-[#e8a038] ring-2 ring-[#e8a038]/50'
                        : 'border-[rgba(224,122,63,0.3)] opacity-55 hover:opacity-100'
                    }`}
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
                        src={getThumbnailSrc(item)}
                        alt={item.titulo || `Miniatura ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
