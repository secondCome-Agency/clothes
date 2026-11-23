import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data/products';
import { SlidersHorizontal, Grid, ArrowUpDown } from 'lucide-react';

export default function ProductCatalog({ 
  selectedCategory = 'all', 
  onSelectCategory,
  onQuickView, 
  onAddToCart,
  onOpenSizeGuide 
}) {
  const [sortOption, setSortOption] = useState('featured');
  const [columns, setColumns] = useState(4); // 2, 3, or 4 columns

  const categories = [
    { id: 'all', name: 'ALL ARCHIVE' },
    { id: 'tees', name: 'OVERSIZED TEES' },
    { id: 'hoodies', name: 'HEAVYWEIGHT HOODIES' },
    { id: 'bottomwear', name: 'TACTICAL BOTTOMWEAR' },
    { id: 'accessories', name: 'ACCESSORIES' }
  ];

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (sortOption === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, sortOption]);

  return (
    <section id="catalog" className="w-full py-20 bg-[#09090b] border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-rose-500 uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>THE COMPLETE ARCHIVE // DROP 01</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              STATEMENT STREETWEAR
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-xl">
              Heavyweight cotton knits, architectural silhouettes, and high-density puff prints. Tailored for comfort, presence, and timeless longevity.
            </p>
          </div>

          {/* Catalog Count Indicator */}
          <div className="text-xs font-mono text-zinc-500 uppercase">
            SHOWING <span className="text-white font-bold">{filteredProducts.length}</span> PIECES
          </div>
        </div>

        {/* Filter Tabs & Sort Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-zinc-800/80">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-white text-black font-bold shadow-lg'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort Dropdown & Layout Buttons */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
              <span>SORT:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-zinc-900 text-white border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-rose-500 cursor-pointer"
              >
                <option value="featured">FEATURED CURATION</option>
                <option value="price-low">PRICE: LOW TO HIGH</option>
                <option value="price-high">PRICE: HIGH TO LOW</option>
                <option value="rating">TOP CUSTOMER RATED</option>
              </select>
            </div>
          </div>

        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              onOpenSizeGuide={onOpenSizeGuide}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
