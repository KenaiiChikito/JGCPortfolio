import { PortfolioConfig } from '../types';
import { ArrowDown, Play } from 'lucide-react';
import { PlatformIcon } from './PlatformIcon';

interface HeroSectionProps {
  config: PortfolioConfig['hero'];
  socials: PortfolioConfig['socials'];
  onPressStart: () => void;
}

export function HeroSection({ config, socials, onPressStart }: HeroSectionProps) {
  return (
    <header
      id="inicio"
      className="relative z-10 min-h-[92vh] md:min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-16 max-w-5xl mx-auto"
    >
      {/* Availability badge */}
      <div className="inline-flex items-center gap-2.5 font-mono text-xs md:text-sm tracking-widest text-[#e8a038] uppercase bg-[#261910]/80 border border-[#e8a038]/30 px-4 py-1.5 rounded-full mb-8 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-[#85994b] animate-ping" />
        <span className="w-2 h-2 rounded-full bg-[#85994b] -ml-4" />
        <span>{config.tagAvailability}</span>
      </div>

      {/* Main hero name with warm autumn gradient */}
      <h1 className="font-display font-black tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none mb-6">
        <span className="bg-gradient-to-r from-[#faede5] via-[#e8a038] to-[#e07a3f] bg-clip-text text-transparent drop-shadow-sm">
          {config.nombre}
        </span>
      </h1>

      {/* Role with blinking cursor */}
      <div className="font-mono text-lg sm:text-2xl md:text-3xl text-[#e8a038] font-medium mb-6 flex items-center justify-center gap-1">
        <span>{config.rol}</span>
        <span className="text-[#e07a3f] font-bold animate-blink">_</span>
      </div>

      {/* Tagline */}
      <p className="max-w-2xl text-base sm:text-lg text-[#bda89b] leading-relaxed mb-10 font-body">
        {config.tagline}
      </p>

      {/* PRESS START Arcade Button */}
      <div className="mb-12">
        <button
          onClick={onPressStart}
          className="group relative inline-flex items-center gap-3 font-pixel text-xs sm:text-sm text-[#140c07] bg-[#e8a038] hover:bg-[#f59e0b] px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold transition-all transform hover:-translate-y-1 hover:scale-105 animate-autumn-pulse shadow-lg"
          aria-label="Comenzar recorrido del portafolio"
        >
          <Play className="w-4 h-4 fill-current transition-transform group-hover:translate-x-1" />
          <span>{config.botonPressStart}</span>
        </button>
      </div>

      {/* Social links with vector platform icons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            title={social.label}
            className="w-11 h-11 rounded-xl bg-[#261910] hover:bg-[#e07a3f] border border-[rgba(224,122,63,0.3)] hover:border-[#e07a3f] text-[#faede5] hover:text-[#140c07] flex items-center justify-center transition-all duration-200 transform hover:-translate-y-1 shadow-sm group"
          >
            <PlatformIcon name={social.label} className="w-5 h-5 transition-transform group-hover:scale-110" />
          </a>
        ))}
      </div>

      {/* Scroll indicator with animated vertical line */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[11px] tracking-widest text-[#7f6a5e]">
        <span className="flex items-center gap-1 text-[#e8a038]/80">
          SCROLL <ArrowDown className="w-3 h-3 animate-bounce" />
        </span>
        <div className="w-[1px] h-9 bg-gradient-to-b from-[#e07a3f] to-transparent" />
      </div>
    </header>
  );
}
