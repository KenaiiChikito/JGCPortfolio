import { X } from 'lucide-react';

interface VideoModalProps {
  videoId: string | null;
  onClose: () => void;
}

export function VideoModal({ videoId, onClose }: VideoModalProps) {
  if (!videoId) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#0c0704]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#1c120b] border border-[#e8a038]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 bg-[#140c07] border-b border-[rgba(224,122,63,0.2)] flex items-center justify-between">
          <span className="font-mono text-xs text-[#e8a038] font-bold">
            TRAILER / DEMO REEL DE JUEGO
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#bda89b] hover:text-[#faede5] hover:bg-[#261910] transition-colors"
            title="Cerrar video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative aspect-video w-full bg-[#140c07]">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
            title="Video del proyecto"
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
