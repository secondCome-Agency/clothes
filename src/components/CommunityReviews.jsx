import React from 'react';
import { REVIEWS } from '../data/products';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export default function CommunityReviews() {
  return (
    <section className="w-full py-20 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-mono text-rose-500 uppercase tracking-widest mb-2">
              VERIFIED BUYER DIARIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              THE STREET COLLECTIVE.
            </h2>
          </div>
          <div className="text-xs font-mono text-zinc-400">
            ★ <span className="text-white font-bold">4.9 / 5.0 OVERALL</span> ACROSS 450+ VERIFIED DROPS
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex flex-col justify-between hover:border-zinc-700 transition"
            >
              <div>
                {/* Rating stars & verified pill */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                    <ShieldCheck className="w-3 h-3" />
                    <span>VERIFIED</span>
                  </div>
                </div>

                {/* Product reference */}
                <div className="text-[11px] font-mono text-zinc-500 uppercase mb-2">
                  ITEM: {rev.product}
                </div>

                {/* Quote */}
                <p className="text-sm text-zinc-300 leading-relaxed font-sans mb-4">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Fit Advice */}
              <div className="pt-4 border-t border-zinc-800/80">
                <div className="text-xs font-bold text-white font-display">
                  {rev.name}
                  <span className="text-zinc-500 font-mono font-normal ml-2">({rev.city})</span>
                </div>
                <div className="text-[11px] font-mono text-rose-400 mt-0.5">
                  {rev.fitFeedback}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
