import React, { useState } from 'react';
import { X, Check, Star, ShieldCheck, Truck, RefreshCw, ShoppingBag } from 'lucide-react';

export default function ProductDetailModal({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart,
  onOpenSizeGuide 
}) {
  if (!isOpen || !product) return null;

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0]?.name : 'Default');
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 'L');
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart({
      ...product,
      selectedColor,
      selectedSize
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" 
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center p-0">
        <div 
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl text-left my-8 animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-zinc-400 hover:text-white border border-zinc-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Gallery Column */}
            <div className="p-6 bg-zinc-900/60 flex flex-col justify-between">
              {/* Main large preview */}
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 mb-4">
                <img
                  src={product.images ? product.images[selectedImgIndex] : product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded bg-black/80 text-white text-[10px] font-mono tracking-widest uppercase border border-zinc-700">
                      {product.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails list */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImgIndex(i)}
                      className={`relative w-16 h-20 rounded-lg overflow-hidden border-2 transition ${
                        selectedImgIndex === i ? 'border-rose-500' : 'border-zinc-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Specifications & Purchase Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1.5">
                  <span>{product.subtitle}</span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="text-zinc-300 font-bold">{product.rating}</span>
                    <span className="text-zinc-500">({product.reviewsCount})</span>
                  </div>
                </div>

                <h3 className="text-2xl font-display font-extrabold text-white tracking-tight">
                  {product.name}
                </h3>

                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-2xl font-display font-extrabold text-white">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm font-mono text-zinc-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.discount && (
                    <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 text-[10px] font-mono font-bold">
                      {product.discount}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-4">
                  {product.description}
                </p>

                {/* Bullet details */}
                {product.details && (
                  <div className="mt-4 space-y-1.5">
                    {product.details.map((d, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Color & Size selection */}
              <div className="space-y-4 pt-4 border-t border-zinc-800">
                
                {/* Color Selector */}
                {product.colors && (
                  <div>
                    <div className="text-xs font-mono text-zinc-400 uppercase mb-2">
                      COLOR: <span className="text-white font-bold">{selectedColor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          className={`w-7 h-7 rounded-full border-2 transition ${
                            selectedColor === c.name ? 'border-rose-500 scale-110' : 'border-zinc-700'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-zinc-400 uppercase">SELECT SIZE:</span>
                    <button
                      onClick={onOpenSizeGuide}
                      className="text-rose-400 hover:text-rose-300 underline underline-offset-2 text-[11px]"
                    >
                      Size Chart
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg border transition ${
                          selectedSize === s
                            ? 'bg-white text-black border-white'
                            : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add to Bag CTA */}
                <button
                  onClick={handleAdd}
                  className={`w-full py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-display font-bold uppercase tracking-wider transition ${
                    isAdded ? 'bg-emerald-600 text-white' : 'bg-rose-600 hover:bg-rose-500 text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>ADDED TO SHOPPING BAG</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO BAG — ₹{product.price.toLocaleString()}</span>
                    </>
                  )}
                </button>

                {/* Micro guarantees */}
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-500 pt-2">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Free Shipping Pan-India</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
                    <span>3-Day Size Exchange</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
