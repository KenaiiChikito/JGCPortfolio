import { useState } from 'react';
import { PortfolioConfig, SkillItem } from '../types';
import { Backpack, Sparkles, Star } from 'lucide-react';

interface World04SkillsProps {
  inventario: PortfolioConfig['inventario'];
}

export function World04Skills({ inventario }: World04SkillsProps) {
  const [activeItem, setActiveItem] = useState<SkillItem | null>(null);

  return (
    <section id="skills" className="relative z-10 py-24 md:py-32 border-t border-[rgba(224,122,63,0.2)]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="font-pixel text-xs text-[#e8a038] tracking-widest flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#e8a038] rotate-45 inline-block shadow-[0_0_8px_#e8a038]" />
              MUNDO 04
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#faede5]">
              Inventario de Habilidades
            </h2>
            <p className="text-[#bda89b] text-base mt-2 max-w-xl font-body">
              Equipamiento técnico y maestría en herramientas nativas de desarrollo y modelado. Haz clic o pasa el cursor por cada casilla para inspeccionar atributos.
            </p>
          </div>

          <div className="bg-[#1c120b] border border-[rgba(224,122,63,0.2)] rounded-xl px-4 py-2 flex items-center gap-2 text-xs font-mono text-[#e8a038] self-start sm:self-auto">
            <Backpack className="w-4 h-4 text-[#e07a3f]" />
            <span>SLOTS: {Object.values(inventario).reduce((acc, cat) => acc + cat.length, 0)}/64</span>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-10">
          {Object.entries(inventario).map(([categoria, items]) => (
            <div key={categoria} className="space-y-4">
              <h3 className="font-mono text-sm text-[#e8a038] uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-[rgba(224,122,63,0.15)]">
                <Sparkles className="w-4 h-4 text-[#e07a3f]" />
                {categoria}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
                {items.map((item) => {
                  const isSelected = activeItem?.label === item.label;
                  return (
                    <div
                      key={item.label}
                      onClick={() => setActiveItem(item)}
                      onMouseEnter={() => setActiveItem(item)}
                      className={`group relative bg-[#1c120b] border rounded-xl p-3.5 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 select-none ${
                        isSelected
                          ? 'border-[#e8a038] bg-[#261910] -translate-y-1 shadow-[0_8px_20px_-6px_rgba(232,160,56,0.4)]'
                          : 'border-[rgba(224,122,63,0.25)] hover:border-[#e07a3f] hover:bg-[#261910]'
                      }`}
                    >
                      {/* Slot Icon */}
                      <div className="text-2xl sm:text-3xl mb-1.5 transition-transform group-hover:scale-110">
                        {item.icon}
                      </div>

                      {/* Label */}
                      <span className="font-mono text-xs font-semibold text-[#faede5] group-hover:text-[#e8a038] transition-colors leading-tight">
                        {item.label}
                      </span>

                      {/* Tier Tag */}
                      {item.nivel && (
                        <span className="font-mono text-[9px] text-[#85994b] mt-1 bg-[#140c07] border border-[#85994b]/30 px-1.5 py-0.5 rounded">
                          {item.nivel}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Selected item inspector box (RPG Item details card) */}
        <div className="mt-12 bg-[#1c120b] border border-[#e8a038]/40 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="w-16 h-16 rounded-xl bg-[#261910] border border-[#e8a038] flex items-center justify-center text-3xl shrink-0 shadow-md">
            {activeItem ? activeItem.icon : '✨'}
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="font-display font-bold text-lg text-[#faede5]">
                {activeItem ? activeItem.label : 'Inspeccionar Habilidad'}
              </span>
              {activeItem?.nivel && (
                <span className="font-mono text-xs text-[#140c07] bg-[#e8a038] px-2 py-0.5 rounded font-bold">
                  NIVEL: {activeItem.nivel}
                </span>
              )}
            </div>

            <p className="text-sm text-[#bda89b] font-body">
              {activeItem
                ? activeItem.descripcion || 'Herramienta de desarrollo y producción configurada en el perfil del héroe.'
                : 'Pasa el cursor o presiona cualquier ranura del inventario para conocer detalles técnicos del stack.'}
            </p>
          </div>

          <div className="text-xs font-mono text-[#7f6a5e] flex items-center gap-1.5 shrink-0 bg-[#140c07] px-3 py-2 rounded-lg border border-[rgba(224,122,63,0.15)]">
            <Star className="w-3.5 h-3.5 text-[#e8a038]" />
            <span>Game Dev Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
}
