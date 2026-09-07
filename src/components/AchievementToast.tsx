import { Trophy } from 'lucide-react';

interface AchievementToastProps {
  message: string | null;
  onClose: () => void;
}

export function AchievementToast({ message, onClose }: AchievementToastProps) {
  if (!message) return null;

  return (
    <aside
      aria-label="Notificación de logro"
      className="fixed left-5 bottom-5 z-50 bg-[#1c120b] border-2 border-[#e8a038] rounded-2xl p-4 flex items-center gap-3.5 shadow-[0_12px_30px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom-5 duration-300 max-w-sm cursor-pointer"
      onClick={onClose}
    >
      <div className="w-10 h-10 rounded-xl bg-[#e8a038]/20 border border-[#e8a038] flex items-center justify-center text-xl shrink-0">
        <Trophy className="w-5 h-5 text-[#e8a038]" />
      </div>
      <div>
        <span className="font-mono text-[10px] text-[#e8a038] font-bold tracking-wider block uppercase">
          ★ LOGRO DESBLOQUEADO
        </span>
        <span className="text-xs text-[#faede5] font-medium font-body leading-snug">
          {message}
        </span>
      </div>
    </aside>
  );
}
