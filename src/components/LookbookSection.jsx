import React, { useState } from 'react';
import { LOOKBOOK_ITEMS } from '../data/products';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';

export default function LookbookSection({ onQuickView }) {
  const [activeLook, setActiveLook] = useState(0);

  return (
    <section id="lookbook" className="w-full py-24 bg-[#09090b] border-b border-zinc-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Eyebrow & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono text-rose-500 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>STREET CHRONICLES // VOL 01</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              EDITORIAL LOOKBOOK
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-lg">
              Visual diaries from the underground street scenes. Capturing raw textures, architectural folds, and uncompromising silhouettes in natural lighting.
            </p>
          </div>

          {/* Act Switcher Tabs */}
          <div className="flex items-center gap-2">
            {LOOKBOOK_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveLook(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition ${
                  activeLook === idx
                    ? 'bg-rose-600 text-white font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Full-Width Lookbook Display */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[540px]">
            
            {/* Visual Photography Frame */}
            <div className="lg:col-span-8 relative min-h-[380px] lg:min-h-[540px] overflow-hidden">
              <img
                src={LOOKBOOK_ITEMS[activeLook].image}
                alt={LOOKBOOK_ITEMS[activeLook].title}
                className="w-full h-full object-cover object-center transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent lg:hidden" />
              
              {/* Location Badge */}
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-zinc-700 text-[11px] font-mono text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{LOOKBOOK_ITEMS[activeLook].location}</span>
              </div>
            </div>

            {/* Editorial Information Column */}
            <div className="lg:col-span-4 p-8 flex flex-col justify-between bg-zinc-950 border-t lg:border-t-0 lg:border-l border-zinc-800">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest font-bold">
                    // ACT 0{activeLook + 1}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1 leading-tight">
                    {LOOKBOOK_ITEMS[activeLook].title}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mt-2 uppercase tracking-wider">
                    {LOOKBOOK_ITEMS[activeLook].subtitle}
                  </p>
                </div>

                {/* Outfit Highlights */}
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                    OUTFIT SPECIFICATIONS:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {LOOKBOOK_ITEMS[activeLook].tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Styled with raw relaxed aesthetics. Designed to blur the boundaries between utility workwear and high-end conceptual street tailoring.
                </p>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-zinc-900">
                <a
                  href="#catalog"
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg"
                >
                  <span>SHOP FEATURED SILHOUETTES</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
