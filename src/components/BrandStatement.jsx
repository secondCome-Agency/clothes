import React from 'react';
import { BRAND_STATEMENT } from '../data/products';

export default function BrandStatement() {
  return (
    <section className="w-full py-20 sm:py-28 bg-[#fafafa] border-b border-zinc-200 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-4">
          {BRAND_STATEMENT.origin}
        </span>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-zinc-900 tracking-tight leading-snug max-w-3xl mx-auto">
          "{BRAND_STATEMENT.tagline}"
        </h2>

        <p className="mt-6 text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto font-sans">
          {BRAND_STATEMENT.subtitle}
        </p>

        <p className="mt-4 text-xs sm:text-sm text-zinc-500 max-w-xl mx-auto font-sans leading-relaxed">
          {BRAND_STATEMENT.manifesto}
        </p>

      </div>
    </section>
  );
}
