import React from 'react';
import { Feather, Layers, Scissors, ShieldCheck } from 'lucide-react';

export default function ProductFeatures() {
  const features = [
    {
      icon: Feather,
      title: "PREMIUM FABRIC",
      subtitle: "240–450 GSM FRENCH TERRY",
      description: "Custom spun high-tension cotton loops providing a heavy, authoritative drape that holds its boxy structure all day."
    },
    {
      icon: Scissors,
      title: "OVERSIZED FIT",
      subtitle: "BOXY ARCHITECTURAL SILHOUETTE",
      description: "Elongated drop-shoulder seamlines and generous chest width tailored for contemporary streetwear comfort."
    },
    {
      icon: Layers,
      title: "PRINT QUALITY",
      subtitle: "HIGH-DENSITY 3D PUFF INK",
      description: "Heat-cured tactile inks that rise above the fabric surface for dimensional depth that never flakes or cracks."
    },
    {
      icon: ShieldCheck,
      title: "CONSTRUCTION & COMFORT",
      subtitle: "PRE-SHRUNK & BIO-WASHED",
      description: "Double enzyme washed to eliminate surface fuzz, prevent post-wash shrinkage, and deliver immediate lived-in softness."
    }
  ];

  return (
    <section className="w-full py-16 sm:py-24 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
            Uncompromising Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-zinc-900 tracking-tight">
            Product Features & Craftsmanship
          </h2>
        </div>

        {/* 4 Feature Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="p-6 bg-[#fafafa] border border-zinc-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 bg-black text-white flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                    {feat.subtitle}
                  </span>
                  <h3 className="text-base font-heading font-semibold text-zinc-900 tracking-tight mt-1 mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs font-sans text-zinc-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-zinc-200 text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  SPEC 0{idx + 1} // VERIFIED
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
