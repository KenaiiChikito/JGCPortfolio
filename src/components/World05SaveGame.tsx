import { useState, useEffect } from 'react';
import { PortfolioConfig } from '../types';
import {
  Clock,
  Download,
  Mail,
  MapPin,
  QrCode,
  Save,
  Send,
  CheckCircle,
  Copy,
  History,
  Lock,
  ExternalLink,
} from 'lucide-react';
import { SecretQrModal } from './SecretQrModal';

interface World05SaveGameProps {
  contacto: PortfolioConfig['contacto'];
  qrUrl: string;
  historialActualizaciones: PortfolioConfig['historialActualizaciones'];
}

export function World05SaveGame({
  contacto,
  qrUrl: portfolioQrUrl,
  historialActualizaciones,
}: World05SaveGameProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPortfolioUrl, setCopiedPortfolioUrl] = useState(false);
  const [showSecretModal, setShowSecretModal] = useState(false);

  // Keyboard shortcut (Ctrl+Q or Alt+Q) or URL hash (#qr) to open secret QR generator
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.altKey || e.metaKey) && (e.key === 'q' || e.key === 'Q')) {
        e.preventDefault();
        setShowSecretModal((prev) => !prev);
      }
    };

    if (window.location.hash === '#qr' || window.location.search.includes('qr=')) {
      setShowSecretModal(true);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contacto.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleCopyPortfolioUrl = () => {
    navigator.clipboard.writeText(portfolioQrUrl);
    setCopiedPortfolioUrl(true);
    setTimeout(() => setCopiedPortfolioUrl(false), 2400);
  };

  // Static QR Code for this portfolio
  const encodedPortfolioUrl = encodeURIComponent(portfolioQrUrl);
  const qrImageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&color=14-0c-07&bgcolor=fa-ed-e5&data=${encodedPortfolioUrl}`;

  return (
    <section id="contacto" className="relative z-10 py-24 md:py-32 border-t border-[rgba(224,122,63,0.2)]">
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        
        {/* Header */}
        <div>
          <div className="font-pixel text-xs text-[#e8a038] tracking-widest flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-[#e8a038] rotate-45 inline-block shadow-[0_0_8px_#e8a038]" />
            MUNDO 05
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#faede5]">
            Guardar Partida
          </h2>
          <p className="text-[#bda89b] text-base mt-2 max-w-2xl font-body">
            Punto de guardado del viaje. Guarda el contacto para futuros proyectos, comparte la partida o revisa las notas de actualización recientes.
          </p>
        </div>

        {/* Main Save Screen Frame */}
        <div className="bg-[#1c120b] border border-[rgba(224,122,63,0.3)] rounded-3xl p-7 sm:p-10 lg:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14 items-center">
            
            {/* Left: Contact Info & Action CTAs */}
            <div className="space-y-8">
              <div className="space-y-3">
                <button
                  onClick={() => setShowSecretModal(true)}
                  className="inline-flex items-center gap-2 font-mono text-xs text-[#e8a038] hover:text-[#f59e0b] bg-[#261910] hover:bg-[#342217] px-3 py-1 rounded-full border border-[rgba(224,122,63,0.25)] transition-all cursor-pointer text-left"
                  title="Save Point Activo (Atajo: Ctrl + Q)"
                >
                  <Save className="w-3.5 h-3.5 text-[#e07a3f]" />
                  <span>SAVE POINT ACTIVO · SLOT #1</span>
                </button>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#faede5]">
                  ¿Continuamos la historia?
                </h3>
                <p className="text-[#bda89b] text-base font-body leading-relaxed">
                  {contacto.intro}
                </p>
              </div>

              {/* Details List */}
              <div className="space-y-3.5 font-mono text-sm">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#261910]/70 border border-[rgba(224,122,63,0.18)] text-[#bda89b]">
                  <Mail className="w-4 h-4 text-[#e07a3f] shrink-0" />
                  <span className="text-[#faede5] font-semibold select-all break-all">
                    {contacto.email}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="ml-auto p-1.5 hover:text-[#e8a038] text-[#7f6a5e] transition-colors"
                    title="Copiar email"
                  >
                    {copiedEmail ? <CheckCircle className="w-4 h-4 text-[#85994b]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#261910]/70 border border-[rgba(224,122,63,0.18)] text-[#bda89b]">
                  <MapPin className="w-4 h-4 text-[#e8a038] shrink-0" />
                  <span className="text-[#faede5] font-medium">{contacto.ubicacion}</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#261910]/70 border border-[rgba(224,122,63,0.18)] text-[#bda89b]">
                  <Clock className="w-4 h-4 text-[#85994b] shrink-0" />
                  <span className="text-[#faede5] font-medium">{contacto.disponibilidad}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3.5 pt-2">
                <a
                  href={`mailto:${contacto.email}`}
                  className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-[#140c07] bg-[#e8a038] hover:bg-[#f59e0b] px-6 py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  <span>✉ Escribir un Email</span>
                </a>

                <a
                  href={contacto.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-[#faede5] hover:text-[#e8a038] bg-[#261910] hover:bg-[#342217] border border-[rgba(224,122,63,0.3)] hover:border-[#e07a3f] px-6 py-3.5 rounded-xl transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar CV</span>
                </a>
              </div>
            </div>

            {/* Right: Static Portfolio QR Code Box (Public) */}
            <div className="bg-[#261910] border border-[rgba(224,122,63,0.25)] rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center shadow-lg">
              <div className="font-mono text-xs text-[#e8a038] font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
                <QrCode className="w-4 h-4 text-[#e07a3f]" />
                ESCANEA PARA COMPARTIR PARTIDA
              </div>

              {/* QR Image Container (Static to Portfolio) */}
              <div className="p-3 bg-[#faede5] rounded-2xl shadow-md mb-4 border border-[#e8a038]/40 transition-transform hover:scale-105 duration-200">
                <img
                  src={qrImageSrc}
                  alt="Código QR del portafolio"
                  width={180}
                  height={180}
                  className="rounded-lg w-44 h-44 object-contain"
                />
              </div>

              <p className="font-mono text-[11px] text-[#bda89b] max-w-xs mb-4 leading-relaxed">
                Apunta con la cámara de tu móvil para abrir este portafolio en cualquier dispositivo.
              </p>

              {/* Copy link button for visitors */}
              <div className="w-full flex flex-col gap-2">
                <button
                  onClick={handleCopyPortfolioUrl}
                  className="w-full bg-[#140c07] hover:bg-[#342217] border border-[rgba(224,122,63,0.3)] hover:border-[#e8a038] text-[#faede5] hover:text-[#e8a038] px-3.5 py-2.5 rounded-xl font-mono text-xs font-medium transition-all flex items-center justify-center gap-2"
                >
                  {copiedPortfolioUrl ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-[#85994b]" />
                      <span className="text-[#85994b] font-bold">¡Enlace Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#e07a3f]" />
                      <span>Copiar Enlace del Portafolio</span>
                    </>
                  )}
                </button>

                {/* Discreet footer row with subtle creator lock button */}
                <div className="flex items-center justify-between pt-2 px-1 text-[10px] font-mono text-[#7f6a5e]">
                  <a
                    href={portfolioQrUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate max-w-[190px] hover:text-[#e8a038] transition-colors flex items-center gap-1"
                  >
                    <span>{portfolioQrUrl.replace('https://', '')}</span>
                    <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-60" />
                  </a>

                  {/* Secret button camouflaged as a subtle lock icon */}
                  <button
                    onClick={() => setShowSecretModal(true)}
                    className="p-1 rounded text-[#7f6a5e]/50 hover:text-[#e8a038] hover:bg-[#140c07] transition-colors"
                    title="Herramienta privada de Códigos QR (Atajo: Ctrl + Q)"
                    aria-label="Abrir generador privado de QR"
                  >
                    <Lock className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            HISTORIAL DE ACTUALIZACIONES (SAVE LOGS)
            ========================================================================= */}
        <div className="bg-[#1c120b] border border-[rgba(224,122,63,0.25)] rounded-3xl p-7 sm:p-10 shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(224,122,63,0.2)]">
            <div>
              <div className="font-pixel text-[10px] text-[#85994b] tracking-widest flex items-center gap-2 mb-1">
                <History className="w-3.5 h-3.5 text-[#85994b]" />
                REGISTRO DE GUARDADO Y PARCHES
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#faede5]">
                Historial de Actualizaciones
              </h3>
            </div>
            <div className="font-mono text-xs text-[#7f6a5e] bg-[#261910] px-3.5 py-1.5 rounded-full border border-[rgba(224,122,63,0.2)] flex items-center gap-2 self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-[#85994b]" />
              <span>Último autoguardado activo</span>
            </div>
          </div>

          <div className="space-y-4">
            {historialActualizaciones.map((update, idx) => {
              const badgeStyles = {
                nuevo: 'bg-[#e07a3f]/15 text-[#e07a3f] border-[#e07a3f]/40',
                mejora: 'bg-[#85994b]/15 text-[#85994b] border-[#85994b]/40',
                correccion: 'bg-[#e8a038]/15 text-[#e8a038] border-[#e8a038]/40',
                hito: 'bg-[#c2522b]/15 text-[#c2522b] border-[#c2522b]/40',
              }[update.tipo];

              return (
                <div
                  key={idx}
                  className="group bg-[#261910]/60 hover:bg-[#261910] border border-[rgba(224,122,63,0.18)] hover:border-[#e8a038] rounded-2xl p-5 transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-pixel text-[10px] text-[#faede5] bg-[#140c07] px-2.5 py-1 rounded border border-[rgba(224,122,63,0.3)]">
                        {update.version}
                      </span>
                      <span className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${badgeStyles}`}>
                        {update.tipo}
                      </span>
                      <h4 className="font-display text-base sm:text-lg font-bold text-[#faede5] group-hover:text-[#e8a038] transition-colors">
                        {update.titulo}
                      </h4>
                    </div>
                    <span className="font-mono text-xs text-[#7f6a5e] shrink-0">
                      {update.fecha}
                    </span>
                  </div>

                  <p className="text-sm text-[#bda89b] font-body leading-relaxed pl-1">
                    {update.descripcion}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Secret Creator QR Generator Modal (Only accessible by you) */}
      <SecretQrModal
        isOpen={showSecretModal}
        onClose={() => setShowSecretModal(false)}
        defaultUrl={portfolioQrUrl}
      />
    </section>
  );
}
