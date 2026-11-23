import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export default function SearchModal() {
  const { isSearchOpen, closeSearch } = useShop();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }, [query]);

  const trendingTags = [
    "DRAGON WAFFLE TEE",
    "PHANTOM HOODIE",
    "TACTICAL CARGO",
    "ALTERED STATE",
    "OVERSIZED",
    "FRENCH TERRY"
  ];

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={closeSearch}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
      />

      <div className="min-h-screen px-4 flex items-start justify-center pt-20">
        <div 
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-white border border-zinc-300 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Search Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-200">
            <Search className="w-5 h-5 text-zinc-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tees, hoodies, cargos, archive..."
              className="flex-1 bg-transparent text-sm font-sans text-zinc-900 placeholder-zinc-400 focus:outline-none"
            />
            <button
              onClick={closeSearch}
              className="p-1.5 text-zinc-400 hover:text-black transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Suggestions */}
          {!query && (
            <div className="py-6">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-3">
                Trending Searches:
              </span>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 bg-zinc-50 border border-zinc-200 hover:border-black text-xs font-sans text-zinc-700 hover:text-black transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query && (
            <div className="py-4 max-h-96 overflow-y-auto space-y-2">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-3">
                Found {filtered.length} matching pieces:
              </span>

              {filtered.length === 0 ? (
                <div className="text-center py-10 text-xs font-sans text-zinc-500">
                  No products matched "{query}". Try browsing our complete catalog.
                </div>
              ) : (
                filtered.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      closeSearch();
                      navigate(`/products/${product.slug}`);
                    }}
                    className="p-3 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 flex items-center justify-between cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.frontImage}
                        alt={product.name}
                        className="w-12 h-14 object-cover bg-zinc-200 border border-zinc-300"
                      />
                      <div>
                        <div className="text-sm font-heading font-medium text-zinc-900">
                          {product.name}
                        </div>
                        <div className="text-[11px] font-mono text-zinc-400 uppercase">
                          {product.category} • {product.fabric}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-medium text-zinc-900">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <ArrowRight className="w-4 h-4 text-zinc-400" />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
