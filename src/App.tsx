import { useState, useEffect } from 'react';
import { PORTFOLIO_CONFIG } from './portfolioConfig';
import { AutumnCanvas } from './components/AutumnCanvas';
import { WorldMapNav } from './components/WorldMapNav';
import { HeroSection } from './components/HeroSection';
import { World01About } from './components/World01About';
import { World02Projects } from './components/World02Projects';
import { World03Creative3D } from './components/World03Creative3D';
import { World04Skills } from './components/World04Skills';
import { World05SaveGame } from './components/World05SaveGame';
import { AchievementToast } from './components/AchievementToast';
import { VideoModal } from './components/VideoModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [achievementMsg, setAchievementMsg] = useState<string | null>(null);
  const [unlockedWorlds, setUnlockedWorlds] = useState<Set<string>>(new Set(['inicio']));

  // Achievement names for each level
  const worldAchievements: Record<string, string> = {
    about: 'Mundo 01: Has descubierto los orígenes del héroe.',
    proyectos: 'Mundo 02: Acceso concedido a los repositorios de código.',
    modelado: 'Mundo 03: Has entrado a la forja y galería de modelos 3D.',
    skills: 'Mundo 04: Inventario desbloqueado (¡sin GDScript, JS ni Python!).',
    contacto: 'Mundo 05: Punto de guardado alcanzado e historial verificado.',
  };

  // Scroll listener to update active section in world map nav
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'about', 'proyectos', 'modelado', 'skills', 'contacto'];
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          const currentId = sections[i];
          setActiveSection(currentId);

          // Trigger achievement toast if first time visited (except hero)
          if (currentId !== 'inicio' && !unlockedWorlds.has(currentId)) {
            setUnlockedWorlds((prev) => new Set([...prev, currentId]));
            setAchievementMsg(worldAchievements[currentId] || '¡Nueva área explorada!');
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [unlockedWorlds]);

  // Auto-dismiss toast
  useEffect(() => {
    if (!achievementMsg) return;
    const timer = setTimeout(() => {
      setAchievementMsg(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [achievementMsg]);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePressStart = () => {
    scrollToSection('about');
  };

  return (
    <div className="min-h-screen bg-[#140c07] text-[#faede5] relative selection:bg-[#e07a3f] selection:text-[#140c07]">
      {/* Dynamic Autumn Leaves & Embers Ambient Canvas */}
      <AutumnCanvas />

      {/* World Map Level Navigation (Desktop side & Mobile bar) */}
      <WorldMapNav activeSection={activeSection} onSelectSection={scrollToSection} />

      {/* Hero: Everything from PRESS START preserved */}
      <HeroSection
        config={PORTFOLIO_CONFIG.hero}
        socials={PORTFOLIO_CONFIG.socials}
        onPressStart={handlePressStart}
      />

      <main className="relative z-10">
        {/* Mundo 01: Sobre mí (Avatar, Bio, RPG Stats) */}
        <World01About
          avatar={PORTFOLIO_CONFIG.avatar}
          bio={PORTFOLIO_CONFIG.bio}
          stats={PORTFOLIO_CONFIG.stats}
          fichaRpg={PORTFOLIO_CONFIG.fichaRpg}
        />

        {/* Mundo 02: Proyectos (Enfocado en Programación) */}
        <World02Projects
          proyectos={PORTFOLIO_CONFIG.proyectosProgramacion}
          onOpenVideo={(vid) => setActiveVideo(vid)}
        />

        {/* Mundo 03: Proyectos Creativos (Modelado 3D con Carrusel/Slider & Plataformas) */}
        <World03Creative3D
          modeladoData={PORTFOLIO_CONFIG.modelado3D}
        />

        {/* Mundo 04: Inventario de Habilidades (Eliminado GDScript, JavaScript y Python) */}
        <World04Skills
          inventario={PORTFOLIO_CONFIG.inventario}
        />

        {/* Mundo 05: Guardar Partida (Contacto, QR y nueva sección de Historial de Actualizaciones) */}
        <World05SaveGame
          contacto={PORTFOLIO_CONFIG.contacto}
          qrUrl={PORTFOLIO_CONFIG.qrUrl}
          historialActualizaciones={PORTFOLIO_CONFIG.historialActualizaciones}
        />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-6 border-t border-[rgba(224,122,63,0.15)] bg-[#140c07]/90 text-center font-mono text-xs text-[#7f6a5e] space-y-4">
        <div className="flex justify-center items-center gap-4 text-base">
          {PORTFOLIO_CONFIG.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#bda89b] hover:text-[#e8a038] transition-colors"
              title={s.label}
            >
              <span>{s.icon}</span>
            </a>
          ))}
        </div>
        <p className="max-w-xl mx-auto text-[#bda89b]">
          {PORTFOLIO_CONFIG.footer}
        </p>
        <p className="text-[10px] text-[#7f6a5e]">
          Tematizado en tonos otoñales cálidos: naranjas, marrones y ocres suaves.
        </p>
      </footer>

      {/* Gamification Unlocked Toast */}
      <AchievementToast
        message={achievementMsg}
        onClose={() => setAchievementMsg(null)}
      />

      {/* Video / Trailer Modal */}
      <VideoModal
        videoId={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </div>
  );
}
