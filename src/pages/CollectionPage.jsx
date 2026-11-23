import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function CollectionPage() {
  const { category = 'all' } = useParams();
  const [selectedSize, setSelectedSize] = useState('ALL');
  const [selectedPrice, setSelectedPrice] = useState('ALL');
  const [sortBy, setSortBy] = useState('featured');

  const categoryTitles = {
    all: { title: "ALL PRODUCTS", subtitle: "COMPLETE SAUR HAUL STREETWEAR CATALOG" },
    tshirts: { title: "OVERSIZED T-SHIRTS", subtitle: "240–260 GSM HEAVYWEIGHT KNITS & PUFF PRINTS" },
    hoodies: { title: "HEAVYWEIGHT HOODIES", subtitle: "450–480 GSM BRUSHED & DIAGONAL LOOP FLEECE" },
    bottomwear: { title: "TACTICAL BOTTOMWEAR", subtitle: "ARCHITECTURAL CARGOS & PLEATED STREET TROUSERS" },
  };

  const currentCatInfo = categoryTitles[category] || categoryTitles.all;

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Filter by Category
    if (category !== 'all') {
      list = list.filter((p) => p.category === category);
    }

    // Filter by Size
    if (selectedSize !== 'ALL') {
      list = list.filter((p) => p.sizes.includes(selectedSize));
    }

    // Filter by Price Range
    if (selectedPrice === 'under-1500') {
      list = list.filter((p) => p.price < 1500);
    } else if (selectedPrice === '1500-2500') {
      list = list.filter((p) => p.price >= 1500 && p.price <= 2500);
    } else if (selectedPrice === 'above-2500') {
      list = list.filter((p) => p.price > 2500);
    }

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [category, selectedSize, selectedPrice, sortBy]);

  return (
    <div className="w-full bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Header */}
        <div className="mb-10 pb-6 border-b border-zinc-200">
          <div className="text-xs font-sans text-zinc-500 mb-1">
            <Link to="/" className="hover:underline">Home</Link> / Collections / {category.charAt(0).toUpperCase() + category.slice(1)}
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-zinc-900 tracking-tight">
            {currentCatInfo.title}
          </h1>
          <p className="text-xs sm:text-sm font-sans text-zinc-500 mt-1">
            {currentCatInfo.subtitle}
          </p>
        </div>

        {/* Filters and Sorting Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-zinc-200 font-sans text-xs">
          
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-4">
            
            {/* Category Quick Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {['all', 'tshirts', 'hoodies', 'bottomwear'].map((cat) => (
                <Link
                  key={cat}
                  to={`/collections/${cat}`}
                  className={`px-3 py-1.5 capitalize transition border ${
                    category === cat
                      ? 'bg-black text-white border-black font-medium'
                      : 'bg-zinc-50 text-zinc-700 border-zinc-300 hover:border-black'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </Link>
              ))}
            </div>

            {/* Size Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500">Size:</span>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="bg-white border border-zinc-300 px-2 py-1 text-xs font-sans focus:outline-none focus:border-black"
              >
                <option value="ALL">All Sizes</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500">Price:</span>
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="bg-white border border-zinc-300 px-2 py-1 text-xs font-sans focus:outline-none focus:border-black"
              >
                <option value="ALL">All Prices</option>
                <option value="under-1500">Under ₹1,500</option>
                <option value="1500-2500">₹1,500 – ₹2,500</option>
                <option value="above-2500">Above ₹2,500</option>
              </select>
            </div>

          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-zinc-300 px-2.5 py-1 text-xs font-sans focus:outline-none focus:border-black cursor-pointer"
            >
              <option value="featured">Featured Drop</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

        </div>

        {/* Product Count Indicator */}
        <div className="text-xs font-mono text-zinc-400 mb-6">
          Showing {filteredProducts.length} pieces
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 border border-zinc-200 bg-zinc-50">
            <h3 className="text-base font-display font-bold text-black uppercase">
              NO PIECES FOUND MATCHING SELECTED FILTERS
            </h3>
            <p className="text-xs font-mono text-zinc-500 mt-2">
              Try resetting your size or price filters to browse the complete collection.
            </p>
            <button
              onClick={() => {
                setSelectedSize('ALL');
                setSelectedPrice('ALL');
              }}
              className="mt-4 px-6 py-2.5 bg-black text-white text-xs font-mono font-bold uppercase tracking-wider"
            >
              RESET ALL FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
