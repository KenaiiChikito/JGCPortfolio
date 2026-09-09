import { useState, useEffect } from 'react';
import { PORTFOLIO_CONFIG } from './portfolioConfig';
import { AutumnCanvas } from './components/AutumnCanvas';
import { WorldMapNav, WORLD_SECTIONS } from './components/WorldMapNav';
import { HeroSection } from './components/HeroSection';
import { World01About } from './components/World01About';
import { World02Projects } from './components/World02Projects';
import { WorldFeaturedProgramming } from './components/WorldFeaturedProgramming';
import { World03Creative3D } from './components/World03Creative3D';
import { WorldFeaturedCreative } from './components/WorldFeaturedCreative';
import { World04Skills } from './components/World04Skills';
import { World05SaveGame } from './components/World05SaveGame';
import { VideoModal } from './components/VideoModal';
import { AchievementToast } from './components/AchievementToast';
import { SecretQrModal } from './components/SecretQrModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showAdminQrModal, setShowAdminQrModal] = useState(false);
  const [footerClicks, setFooterClicks] = useState(0);

  // Global listener for secret Admin shortcuts (Ctrl+Shift+Q, Ctrl+Alt+A, Ctrl+Q) and URL triggers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret Admin Key combinations
      if ((e.ctrlKey || e.metaKey) && (e.shiftKey || e.altKey) && (e.key === 'q' || e.key === 'Q')) {
        e.preventDefault();
        setShowAdminQrModal((prev) => !prev);
      } else if ((e.ctrlKey || e.metaKey) && (e.altKey) && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setShowAdminQrModal((prev) => !prev);
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'q' || e.key === 'Q')) {
        e.preventDefault();
        setShowAdminQrModal((prev) => !prev);
      }
    };

    // Check if visiting with #admin or #qr or ?admin in the URL
    if (
      window.location.hash === '#admin' ||
      window.location.hash === '#qr' ||
      window.location.search.includes('admin')
    ) {
      setShowAdminQrModal(true);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Stealth Easter Egg: clicking 5 times rapidly on the footer copyright unlocks the Admin Terminal
  const handleFooterSecretClick = () => {
    setFooterClicks((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        setShowAdminQrModal(true);
        return 0;
      }
      return next;
    });
    setTimeout(() => setFooterClicks(0), 3000);
  };

  // Active section tracker on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      const sectionElements = WORLD_SECTIONS.map((sec) => ({
        id: sec.id,
        el: document.getElementById(sec.id),
      })).filter((item) => item.el !== null);

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && item.el.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePressStart = () => {
    scrollTo('about');
    setToastMessage('¡Mundo 01 desbloqueado! Comienza la aventura de Juan Gómez.');
  };

  return (
    <div className="min-h-screen bg-[#140c07] text-[#faede5] relative overflow-x-hidden selection:bg-[#e07a3f] selection:text-[#140c07]">
      {/* Interactive Autumn leaves canvas animation */}
      <AutumnCanvas />

      {/* World Map Navigation Sidebar */}
      <WorldMapNav activeSection={activeSection} onSelectSection={scrollTo} />

      {/* Hero Section (World 00) */}
      <HeroSection
        config={PORTFOLIO_CONFIG.hero}
        socials={PORTFOLIO_CONFIG.socials}
        onPressStart={handlePressStart}
      />

      <main className="relative z-10">
        {/* World 01: Sobre Mí */}
        <World01About
          avatar={PORTFOLIO_CONFIG.avatar}
          bio={PORTFOLIO_CONFIG.bio}
          stats={PORTFOLIO_CONFIG.stats}
          fichaRpg={PORTFOLIO_CONFIG.fichaRpg}
        />

        {/* World 02: Proyectos de Programación (Apagado temporalmente en portfolioConfig.ts) */}
        {PORTFOLIO_CONFIG.seccionesVisibles?.mundo02Programacion && (
          <World02Projects
            proyectos={PORTFOLIO_CONFIG.proyectosProgramacion}
            onOpenVideo={(vid) => setActiveVideo(vid)}
          />
        )}

        {/* World 02-B: Proyecto Destacado C# Photon PUN2 (Apagado temporalmente en portfolioConfig.ts) */}
        {PORTFOLIO_CONFIG.seccionesVisibles?.mundo02Destacado && PORTFOLIO_CONFIG.proyectoProgramacionDestacado && (
          <WorldFeaturedProgramming
            proyecto={PORTFOLIO_CONFIG.proyectoProgramacionDestacado}
            onOpenVideo={(vid) => setActiveVideo(vid)}
          />
        )}

        {/* World 03: Modelado 3D */}
        <World03Creative3D
          modeladoData={PORTFOLIO_CONFIG.modelado3D}
        />

        {/* World 03-B: Proyecto Creativo Destacado */}
        <WorldFeaturedCreative
          proyecto={PORTFOLIO_CONFIG.proyectoCreativoDestacado}
        />

        {/* World 04: Inventario de Habilidades */}
        <World04Skills
          inventario={PORTFOLIO_CONFIG.inventario}
        />

        {/* World 05: Guardar Partida & Contacto */}
        <World05SaveGame
          contacto={PORTFOLIO_CONFIG.contacto}
          qrUrl={PORTFOLIO_CONFIG.qrUrl}
          historialActualizaciones={PORTFOLIO_CONFIG.historialActualizaciones}
        />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[rgba(224,122,63,0.2)] bg-[#0d0704] py-8 text-center text-xs font-mono text-[#7f6a5e]">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            onClick={handleFooterSecretClick}
            className="cursor-default select-none transition-colors hover:text-[#bda89b]"
            title={footerClicks > 0 ? `Verificando identidad... (${footerClicks}/5)` : undefined}
          >
            {PORTFOLIO_CONFIG.footer}
          </span>
          <button
            onClick={() => scrollTo('inicio')}
            className="text-[#e8a038] hover:text-[#faede5] transition-colors"
          >
            ↑ VOLVER AL INICIO
          </button>
        </div>
      </footer>

      {/* Video Modal */}
      {activeVideo && (
        <VideoModal videoId={activeVideo} onClose={() => setActiveVideo(null)} />
      )}

      {/* Achievement Toast */}
      <AchievementToast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      {/* Private Creator QR Generator (Gated by Admin Password in portfolioConfig.ts) */}
      <SecretQrModal
        isOpen={showAdminQrModal}
        onClose={() => setShowAdminQrModal(false)}
        defaultUrl={PORTFOLIO_CONFIG.qrUrl}
      />
    </div>
  );
}
