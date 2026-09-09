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

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
          <span>{PORTFOLIO_CONFIG.footer}</span>
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
    </div>
  );
}
