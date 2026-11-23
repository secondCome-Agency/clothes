import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { MORE_PRODUCTS } from '../data/products';

export default function MoreProducts() {
  return (
    <section className="w-full py-16 sm:py-24 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10 pb-4 border-b border-zinc-200">
          <div>
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
              Expanded Catalog // Archive
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-zinc-900 tracking-tight">
              More Products
            </h2>
          </div>

          <Link
            to="/collections/all"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-zinc-900 hover:underline"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {MORE_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}
