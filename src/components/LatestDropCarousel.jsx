import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { LATEST_DROPS } from '../data/products';

export default function LatestDropCarousel() {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-16 sm:py-24 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-zinc-200">
          <div>
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
              Curated Releases // Drop 01
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-zinc-900 tracking-tight">
              Latest Drop
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/collections/all"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-sans font-medium text-zinc-900 hover:underline"
            >
              <span>Discover All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Scroll Navigation Arrows */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => scroll('left')}
                className="p-2 border border-zinc-200 hover:border-black text-black transition"
                aria-label="Previous products"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 border border-zinc-200 hover:border-black text-black transition"
                aria-label="Next products"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x"
        >
          {LATEST_DROPS.map((product) => (
            <div
              key={product.id}
              className="w-[260px] sm:w-[280px] flex-shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile Discover More */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            to="/collections/all"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-zinc-900 underline"
          >
            <span>Discover All Drops</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
