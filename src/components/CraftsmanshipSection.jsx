import React from 'react';
import { Shield, Sparkles, Feather, Scissors, RefreshCw, Layers } from 'lucide-react';

export default function CraftsmanshipSection() {
  const specs = [
    {
      icon: Feather,
      title: "240 – 450 GSM COTTON",
      subtitle: "HEAVYWEIGHT FRENCH TERRY",
      description: "Custom spun yarn with high-tension looping. Provides an authoritative, structured drape that holds its shape throughout the day without sagging or clinging."
    },
    {
      icon: Layers,
      title: "HIGH-DENSITY PUFF PRINT",
      subtitle: "TACTILE 3D APPLICATION",
      description: "Our signature screen printing employs heat-expanded discharge inks that rise above the fabric surface for a deep sculptural hand-feel that never cracks or flakes."
    },
    {
      icon: Scissors,
      title: "BOXY ARCHITECTURAL CUT",
      subtitle: "DROP-SHOULDER GEOMETRY",
      description: "Elongated shoulder seams paired with a cropped torso proportion create the definitive contemporary streetwear silhouette designed to layer effortlessly."
    },
    {
      icon: RefreshCw,
      title: "SILICON ENZYME WASH",
      subtitle: "ZERO POST-WASH SHRINKAGE",
      description: "Every cut undergoes a rigorous double bio-wash process. This eliminates fiber fuzz, pre-shrinks the garment completely, and delivers butter-soft tactile comfort."
    }
  ];

  return (
    <section id="craftsmanship" className="w-full py-24 bg-black border-b border-zinc-800 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-rose-950/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-rose-400 uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE ANATOMY OF SAUR HAUL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            ENGINEERED WITHOUT COMPROMISE.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed font-sans">
            We don’t produce fast-fashion blanks. Every Saur Haul silhouette is architected in our Jodhpur laboratory using proprietary heavy-loop textiles, precision puff techniques, and calculated boxy proportions.
          </p>
        </div>

        {/* 4-Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 hover:border-zinc-700 transition duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-rose-400 mb-6 group-hover:scale-110 group-hover:bg-rose-950/50 group-hover:border-rose-800/60 transition">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-[10px] font-mono text-rose-500 uppercase tracking-widest">
                    {item.subtitle}
                  </div>
                  <h3 className="text-lg font-display font-bold text-white mt-1 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-900 text-[10px] font-mono text-zinc-600 uppercase flex items-center justify-between">
                  <span>SPEC 0{idx + 1}</span>
                  <span className="text-zinc-500">LAB CERTIFIED</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Material Callout Banner */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/60 to-zinc-950 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-display font-bold text-white">
              LOOKING FOR THE PRECISE MEASUREMENTS?
            </h4>
            <p className="text-xs text-zinc-400 mt-1">
              Every body is unique. Review our detailed garment dimensions across chest, length, and drop-shoulder span.
            </p>
          </div>
          <a
            href="#catalog"
            className="px-6 py-3 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold uppercase tracking-wider transition whitespace-nowrap shadow-lg"
          >
            EXPLORE THE COMPLETE DROP
          </a>
        </div>

      </div>
    </section>
  );
}
