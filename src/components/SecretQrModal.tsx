import { useState, useEffect } from 'react';
import {
  QrCode,
  X,
  Download,
  Copy,
  CheckCircle,
  Sparkles,
  ExternalLink,
  Lock,
  RefreshCw,
} from 'lucide-react';

interface SecretQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultUrl: string;
}

export function SecretQrModal({ isOpen, onClose, defaultUrl }: SecretQrModalProps) {
  const [customInput, setCustomInput] = useState(defaultUrl);
  const [activeQrUrl, setActiveQrUrl] = useState(defaultUrl);
  const [qrTheme, setQrTheme] = useState<'autumn' | 'classic' | 'dark'>('autumn');
  const [qrSize, setQrSize] = useState<number>(300);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Build QR API parameters based on selected theme
  const getThemeParams = () => {
    switch (qrTheme) {
      case 'autumn':
        return { color: '14-0c-07', bgcolor: 'fa-ed-e5' };
      case 'dark':
        return { color: 'fa-ed-e5', bgcolor: '14-0c-07' };
      case 'classic':
      default:
        return { color: '00-00-00', bgcolor: 'ff-ff-ff' };
    }
  };

  const { color, bgcolor } = getThemeParams();
  const encodedData = encodeURIComponent(activeQrUrl.trim() || defaultUrl);
  const qrImageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&margin=10&color=${color}&bgcolor=${bgcolor}&data=${encodedData}`;

  const handleApply = () => {
    if (customInput.trim()) {
      setActiveQrUrl(customInput.trim());
    }
  };

  const handleQuickPreset = (url: string) => {
    setCustomInput(url);
    setActiveQrUrl(url);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(activeQrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQr = async () => {
    try {
      setDownloading(true);
      const response = await fetch(qrImageSrc);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `QR_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      // Fallback: open in new window
      window.open(qrImageSrc, '_blank');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="secret-qr-title"
    >
      <div
        className="relative w-full max-w-2xl bg-[#1c120b] border border-[#e8a038]/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#faede5] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Developer Badge */}
        <div className="flex items-center justify-between border-b border-[rgba(224,122,63,0.2)] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#261910] border border-[#e8a038]/30 flex items-center justify-center text-[#e8a038]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-pixel text-[10px] text-[#e8a038] tracking-widest flex items-center gap-2">
                <span>MODO CREADOR · ACCESO PRIVADO</span>
              </div>
              <h3 id="secret-qr-title" className="font-display text-xl sm:text-2xl font-bold text-[#faede5]">
                Generador de Códigos QR Personalizado
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#261910] hover:bg-[#342217] text-[#bda89b] hover:text-[#faede5] border border-[rgba(224,122,63,0.2)] transition-colors"
            title="Cerrar modal (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info hint */}
        <div className="bg-[#261910]/80 border border-[#85994b]/30 rounded-xl p-3 text-xs font-mono text-[#bda89b] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#85994b] shrink-0" />
            <span>Este generador es solo visible para ti (puedes abrirlo con el atajo <kbd className="bg-[#140c07] px-1.5 py-0.5 rounded border border-[#e8a038]/30 text-[#e8a038]">Ctrl + Q</kbd> o <kbd className="bg-[#140c07] px-1.5 py-0.5 rounded border border-[#e8a038]/30 text-[#e8a038]">Alt + Q</kbd>).</span>
          </div>
        </div>

        {/* Input area */}
        <div className="space-y-3">
          <label className="font-mono text-xs text-[#e8a038] uppercase font-bold tracking-wider block">
            Texto o URL a convertir en QR:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleApply()}
              placeholder="https://... o cualquier texto"
              className="flex-1 bg-[#140c07] border border-[rgba(224,122,63,0.3)] focus:border-[#e8a038] rounded-xl px-4 py-3 text-sm font-mono text-[#faede5] placeholder-[#7f6a5e] focus:outline-none"
            />
            <button
              onClick={handleApply}
              className="bg-[#e8a038] hover:bg-[#f59e0b] text-[#140c07] px-5 py-3 rounded-xl font-mono text-xs font-bold transition-all shadow-md flex items-center gap-1.5 shrink-0"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Generar</span>
            </button>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px] text-[#bda89b]">
            <span className="text-[#7f6a5e]">Accesos rápidos:</span>
            <button
              onClick={() => handleQuickPreset(defaultUrl)}
              className="px-2.5 py-1 rounded-lg bg-[#261910] hover:bg-[#342217] border border-[rgba(224,122,63,0.2)] hover:border-[#e8a038] text-[#faede5] transition-colors"
            >
              Portafolio
            </button>
            <button
              onClick={() => handleQuickPreset('https://www.artstation.com/kenaiichikito')}
              className="px-2.5 py-1 rounded-lg bg-[#261910] hover:bg-[#342217] border border-[rgba(224,122,63,0.2)] hover:border-[#e8a038] text-[#faede5] transition-colors"
            >
              ArtStation
            </button>
            <button
              onClick={() => handleQuickPreset('https://github.com/KenaiIchikito')}
              className="px-2.5 py-1 rounded-lg bg-[#261910] hover:bg-[#342217] border border-[rgba(224,122,63,0.2)] hover:border-[#e8a038] text-[#faede5] transition-colors"
            >
              GitHub
            </button>
            <button
              onClick={() => handleQuickPreset('https://sketchfab.com/3d-models/mask-f2675005f0c64ecaa8a70f73482f2f59')}
              className="px-2.5 py-1 rounded-lg bg-[#261910] hover:bg-[#342217] border border-[rgba(224,122,63,0.2)] hover:border-[#e8a038] text-[#faede5] transition-colors"
            >
              Sketchfab
            </button>
          </div>
        </div>

        {/* Customization & Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center bg-[#140c07] border border-[rgba(224,122,63,0.2)] rounded-2xl p-5">
          {/* Options */}
          <div className="space-y-4">
            <div>
              <span className="font-mono text-xs text-[#bda89b] block mb-2 font-semibold">
                Estilo Visual del Código:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setQrTheme('autumn')}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-medium border transition-all ${
                    qrTheme === 'autumn'
                      ? 'bg-[#e07a3f] text-[#140c07] border-[#e07a3f] font-bold shadow-sm'
                      : 'bg-[#261910] text-[#faede5] border-[rgba(224,122,63,0.2)] hover:border-[#e8a038]'
                  }`}
                >
                  Otoño Cálido
                </button>
                <button
                  type="button"
                  onClick={() => setQrTheme('classic')}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-medium border transition-all ${
                    qrTheme === 'classic'
                      ? 'bg-[#faede5] text-[#140c07] border-[#faede5] font-bold shadow-sm'
                      : 'bg-[#261910] text-[#faede5] border-[rgba(224,122,63,0.2)] hover:border-[#e8a038]'
                  }`}
                >
                  Blanco / Negro
                </button>
                <button
                  type="button"
                  onClick={() => setQrTheme('dark')}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-medium border transition-all ${
                    qrTheme === 'dark'
                      ? 'bg-[#342217] text-[#faede5] border-[#e8a038] font-bold shadow-sm'
                      : 'bg-[#261910] text-[#faede5] border-[rgba(224,122,63,0.2)] hover:border-[#e8a038]'
                  }`}
                >
                  Modo Oscuro
                </button>
              </div>
            </div>

            <div>
              <span className="font-mono text-xs text-[#bda89b] block mb-2 font-semibold">
                Resolución:
              </span>
              <div className="flex gap-2">
                {[200, 300, 450].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setQrSize(sz)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                      qrSize === sz
                        ? 'bg-[#85994b] text-[#140c07] border-[#85994b] font-bold'
                        : 'bg-[#261910] text-[#bda89b] border-[rgba(224,122,63,0.2)] hover:text-[#faede5]'
                    }`}
                  >
                    {sz}×{sz} px
                  </button>
                ))}
              </div>
            </div>

            {/* Content summary */}
            <div className="pt-2 text-xs font-mono text-[#7f6a5e] break-all">
              <span className="text-[#bda89b]">Destino:</span> {activeQrUrl}
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="flex flex-col items-center justify-center p-3 bg-[#261910] border border-[#e8a038]/30 rounded-2xl shadow-md">
            <div
              className={`p-3 rounded-xl border border-[rgba(224,122,63,0.25)] ${
                qrTheme === 'dark' ? 'bg-[#140c07]' : 'bg-[#faede5]'
              }`}
            >
              <img
                src={qrImageSrc}
                alt="QR generado en vivo"
                width={160}
                height={160}
                className="w-40 h-40 object-contain rounded"
              />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-[#faede5] bg-[#261910] hover:bg-[#342217] border border-[rgba(224,122,63,0.3)] hover:border-[#e07a3f] px-5 py-3 rounded-xl transition-all"
          >
            {copied ? <CheckCircle className="w-4 h-4 text-[#85994b]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '¡URL Copiada!' : 'Copiar URL'}</span>
          </button>

          <button
            onClick={handleDownloadQr}
            disabled={downloading}
            className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-[#140c07] bg-[#e8a038] hover:bg-[#f59e0b] px-6 py-3 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? 'Descargando...' : 'Descargar QR (PNG)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
