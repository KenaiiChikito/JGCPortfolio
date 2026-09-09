import { useState, useEffect, FormEvent } from 'react';
import {
  QrCode,
  X,
  Download,
  Copy,
  CheckCircle,
  Sparkles,
  Lock,
  Unlock,
  RefreshCw,
  KeyRound,
  ShieldAlert,
  Github,
  LogOut,
  Eye,
  EyeOff,
} from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../portfolioConfig';

interface SecretQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultUrl: string;
}

export function SecretQrModal({ isOpen, onClose, defaultUrl }: SecretQrModalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('portfolio_admin_authorized') === 'true';
    } catch {
      return false;
    }
  });

  // Auth form states
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  // QR Generator states (active when authenticated)
  const [customInput, setCustomInput] = useState(defaultUrl);
  const [activeQrUrl, setActiveQrUrl] = useState(defaultUrl);
  const [qrTheme, setQrTheme] = useState<'autumn' | 'classic' | 'dark'>('autumn');
  const [qrSize, setQrSize] = useState<number>(300);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const adminPassword = PORTFOLIO_CONFIG.adminConfig?.claveAcceso || 'juan2026';
  const githubUser = PORTFOLIO_CONFIG.adminConfig?.githubUsername || 'KenaiIchikito';

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

  // Reset error when modal closes or opens
  useEffect(() => {
    if (isOpen) {
      setAuthError(null);
      setPasswordInput('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e?: FormEvent) => {
    if (e) e.preventDefault();
    const cleanInput = passwordInput.trim();

    if (cleanInput === adminPassword) {
      setIsAuthenticated(true);
      setAuthError(null);
      try {
        sessionStorage.setItem('portfolio_admin_authorized', 'true');
      } catch {
        // Ignore storage error
      }
    } else {
      setAuthError('Clave incorrecta. Acceso denegado.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    setAuthError(null);
    try {
      sessionStorage.removeItem('portfolio_admin_authorized');
    } catch {
      // Ignore
    }
  };

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
      // Fallback: open in new tab
      window.open(qrImageSrc, '_blank');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-2xl bg-[#1c120b] border ${
          isAuthenticated ? 'border-[#e8a038]/50' : 'border-[#c2522b]/50'
        } rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#faede5] max-h-[90vh] overflow-y-auto ${
          isShaking ? 'animate-bounce' : ''
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* =====================================================================
            HEADER
           ===================================================================== */}
        <div className="flex items-center justify-between border-b border-[rgba(224,122,63,0.2)] pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isAuthenticated
                  ? 'bg-[#85994b]/20 border border-[#85994b]/40 text-[#85994b]'
                  : 'bg-[#c2522b]/20 border border-[#c2522b]/40 text-[#e07a3f]'
              }`}
            >
              {isAuthenticated ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <div className="font-pixel text-[10px] tracking-widest flex items-center gap-2">
                <span className={isAuthenticated ? 'text-[#85994b]' : 'text-[#e07a3f]'}>
                  {isAuthenticated
                    ? '● SESIÓN DE ADMINISTRADOR ACTIVA'
                    : 'MODO PRIVADO · AUTENTICACIÓN REQUERIDA'}
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#faede5]">
                {isAuthenticated
                  ? 'Generador Privado de Códigos QR'
                  : 'Terminal de Creador / Administrador'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#261910] hover:bg-[#c2522b]/20 text-[#bda89b] hover:text-[#e07a3f] border border-[rgba(224,122,63,0.2)] text-xs font-mono transition-colors"
                title="Bloquear herramienta y cerrar sesión"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Bloquear</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#261910] hover:bg-[#342217] text-[#bda89b] hover:text-[#faede5] border border-[rgba(224,122,63,0.2)] transition-colors"
              title="Cerrar ventana (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =====================================================================
            VISTA 1: BLOQUEADA (REQUIERE CLAVE DE ADMINISTRADOR)
           ===================================================================== */}
        {!isAuthenticated ? (
          <div className="space-y-6 py-2">
            {/* Creator Identity Banner */}
            <div className="bg-[#140c07] border border-[rgba(224,122,63,0.25)] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#261910] border border-[rgba(224,122,63,0.3)] flex items-center justify-center text-[#faede5]">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-xs text-[#7f6a5e]">Usuario GitHub Asignado:</div>
                  <div className="font-mono text-sm text-[#e8a038] font-bold">
                    @{githubUser}
                  </div>
                </div>
              </div>
              <div className="font-mono text-[11px] text-[#85994b] bg-[#85994b]/10 border border-[#85994b]/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#85994b] animate-pulse" />
                <span>Autor del Portafolio</span>
              </div>
            </div>

            <p className="text-sm font-body text-[#bda89b] leading-relaxed">
              Esta herramienta de generación de Códigos QR es estrictamente privada y no está disponible para visitantes. Introduce tu clave de administrador configurada en <code className="text-[#e8a038] bg-[#140c07] px-1.5 py-0.5 rounded border border-[#e8a038]/30">portfolioConfig.ts</code> para desbloquearla.
            </p>

            {/* Password Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="font-mono text-xs text-[#e8a038] font-bold uppercase tracking-wider block">
                  Clave de Acceso:
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7f6a5e]">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (authError) setAuthError(null);
                    }}
                    placeholder="Escribe tu clave de administrador..."
                    autoFocus
                    className="w-full bg-[#140c07] border border-[rgba(224,122,63,0.3)] focus:border-[#e8a038] rounded-xl pl-10 pr-12 py-3 text-sm font-mono text-[#faede5] placeholder-[#7f6a5e] focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#7f6a5e] hover:text-[#faede5] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {authError && (
                <div className="flex items-center gap-2 text-xs font-mono text-[#e07a3f] bg-[#c2522b]/15 border border-[#c2522b]/40 p-3 rounded-xl">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="text-[11px] font-mono text-[#7f6a5e]">
                  Pista por defecto: <code className="text-[#e8a038]">{adminPassword}</code> (Modificable en tu código)
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl bg-[#261910] hover:bg-[#342217] text-[#bda89b] text-xs font-mono border border-[rgba(224,122,63,0.2)] transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#e8a038] hover:bg-[#f59e0b] text-[#140c07] text-xs font-mono font-bold shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>Desbloquear</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* =====================================================================
              VISTA 2: DESBLOQUEADA (GENERADOR DE QR PRIVADO)
             ===================================================================== */
          <div className="space-y-6">
            {/* Input area */}
            <div className="space-y-3">
              <label className="font-mono text-xs text-[#e8a038] uppercase font-bold tracking-wider block">
                Texto o URL a convertir en Código QR:
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
                  <span className="text-[#bda89b]">Destino activo:</span> {activeQrUrl}
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
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="text-[11px] font-mono text-[#7f6a5e]">
                💡 Puedes cambiar tu clave en <span className="text-[#e8a038]">portfolioConfig.ts</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-[#faede5] bg-[#261910] hover:bg-[#342217] border border-[rgba(224,122,63,0.3)] hover:border-[#e07a3f] px-4 py-2.5 rounded-xl transition-all"
                >
                  {copied ? <CheckCircle className="w-4 h-4 text-[#85994b]" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? '¡URL Copiada!' : 'Copiar URL'}</span>
                </button>

                <button
                  onClick={handleDownloadQr}
                  disabled={downloading}
                  className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-[#140c07] bg-[#e8a038] hover:bg-[#f59e0b] px-5 py-2.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloading ? 'Descargando...' : 'Descargar PNG'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
