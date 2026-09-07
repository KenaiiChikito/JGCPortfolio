import { useEffect, useState } from 'react';
import { PortfolioConfig } from '../types';
import { Shield, Sparkles, User } from 'lucide-react';

interface World01AboutProps {
  avatar: PortfolioConfig['avatar'];
  bio: PortfolioConfig['bio'];
  stats: PortfolioConfig['stats'];
}

export function World01About({ avatar, bio, stats }: World01AboutProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation slightly after mount
    const t = setTimeout(() => setAnimated(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="about" className="relative z-10 py-24 md:py-32 border-t border-[rgba(224,122,63,0.2)]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Level Header */}
        <div className="flex items-baseline gap-4 mb-14 flex-wrap">
          <span className="font-pixel text-xs text-[#e8a038] tracking-widest flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#e8a038] rotate-45 inline-block shadow-[0_0_8px_#e8a038]" />
            MUNDO 01
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#faede5]">
            Sobre mí
          </h2>
          <span className="font-mono text-xs text-[#7f6a5e] ml-auto flex items-center gap-1.5 bg-[#1c120b] px-3 py-1 rounded-full border border-[rgba(224,122,63,0.2)]">
            <Shield className="w-3.5 h-3.5 text-[#e07a3f]" />
            Ficha de Personaje RPG
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 lg:gap-14 items-start">
          {/* Avatar card with retro level frame */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="relative group w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden border-2 border-[rgba(224,122,63,0.35)] bg-[#261910] shadow-xl">
              <img
                src={avatar.src}
                alt="Foto de perfil o avatar de personaje"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // Fallback if image link fails
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80';
                }}
              />
              {/* Scanline overlay */}
              <div className="absolute inset-0 scanlines opacity-40" />

              {/* LVL Badge */}
              <div className="absolute bottom-3 left-3 bg-[#140c07]/90 backdrop-blur-sm border border-[#e8a038] text-[#e8a038] font-mono text-xs px-3 py-1 rounded-md flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-[#e8a038]" />
                <span className="font-bold">{avatar.badge}</span>
              </div>
            </div>

            {/* RPG Quick Stats Pill */}
            <div className="w-full max-w-[288px] bg-[#1c120b] border border-[rgba(224,122,63,0.2)] rounded-xl p-3.5 font-mono text-xs text-[#bda89b] flex flex-col gap-1.5">
              <div className="flex justify-between">
                <span className="text-[#7f6a5e]">Rol Principal:</span>
                <span className="text-[#faede5] font-medium">Programador / 3D</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7f6a5e]">Motor Favorito:</span>
                <span className="text-[#e8a038]">C++ & Unity / Unreal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7f6a5e]">Stamina Creativa:</span>
                <span className="text-[#85994b]">100% (Café Activo)</span>
              </div>
            </div>
          </div>

          {/* Bio text & Stat Sheet */}
          <div className="space-y-8">
            <div className="space-y-4 text-base sm:text-lg text-[#bda89b] leading-relaxed font-body">
              {bio.map((paragraph, idx) => (
                <p key={idx} className="border-l-2 border-[#e07a3f]/40 pl-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Stat Sheet Bars */}
            <div className="bg-[#1c120b] border border-[rgba(224,122,63,0.22)] rounded-2xl p-6 sm:p-7 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[rgba(224,122,63,0.15)] font-mono text-xs text-[#e8a038] uppercase tracking-wider">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#e07a3f]" /> Atributos de Habilidad
                </span>
                <span>Base / 100</span>
              </div>

              <div className="space-y-4 pt-1">
                {stats.map((stat) => (
                  <div key={stat.label} className="grid grid-cols-[1fr_auto] gap-2 items-center">
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-[#faede5] font-medium">{stat.label}</span>
                      <span className="text-[#e8a038]">{stat.value}</span>
                    </div>
                    <div className="col-span-2 h-2.5 bg-[#261910] rounded-full overflow-hidden border border-[rgba(224,122,63,0.2)] p-[1px]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#c2522b] via-[#e07a3f] to-[#e8a038] transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(224,122,63,0.4)]"
                        style={{
                          width: animated ? `${stat.value}%` : '0%',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
