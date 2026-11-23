import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Check, ArrowRight, RefreshCw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export default function FrontBackPresentation() {
  const { addToCart } = useShop();
  // Select the Dragon Statement Waffle Tee or Altered State Tee as the feature piece
  const product = PRODUCTS[1]; // Dragon Statement Waffle Tee
  const [viewMode, setViewMode] = useState('front'); // 'front' or 'back'
  const [selectedSize, setSelectedSize] = useState('L');
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, product.colors[0]?.name, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <section className="w-full py-16 sm:py-24 bg-[#fafafa] border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
            Garment Perspective
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-zinc-900 tracking-tight">
            Front & Rear Graphic Presentation
          </h2>
          <p className="text-xs sm:text-sm font-sans text-zinc-600 mt-2 leading-relaxed">
            Every piece is designed as a wearable canvas. Toggle between the front chest branding and the oversized spine artwork.
          </p>
        </div>

        {/* Interactive Showcase Box */}
        <div className="max-w-4xl mx-auto bg-white border border-zinc-300 p-4 sm:p-8 md:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Visual Flipping Frame */}
            <div className="md:col-span-7 flex flex-col items-center">
              
              {/* Image Frame with Front / Back Flip */}
              <div className="relative w-full aspect-[4/5] bg-zinc-100 overflow-hidden border border-zinc-200">
                <img
                  src={viewMode === 'front' ? product.frontImage : product.backImage}
                  alt={`${product.name} ${viewMode} view`}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />

                {/* Perspective View Tag */}
                <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-mono uppercase px-2.5 py-1 tracking-wider font-medium">
                  {viewMode === 'front' ? 'FRONT VIEW // CHEST GRAPHIC' : 'BACK VIEW // SPINE STATEMENT'}
                </div>
              </div>

              {/* Functional SHOW FRONT / SHOW BACK Toggle Control */}
              <div className="flex items-center gap-2 mt-4 w-full">
                <button
                  onClick={() => setViewMode('front')}
                  className={`flex-1 py-2.5 text-xs font-sans font-medium border transition ${
                    viewMode === 'front'
                      ? 'bg-black text-white border-black shadow-sm'
                      : 'bg-white text-zinc-700 border-zinc-300 hover:border-black'
                  }`}
                >
                  Show Front
                </button>
                <button
                  onClick={() => setViewMode('back')}
                  className={`flex-1 py-2.5 text-xs font-sans font-medium border transition ${
                    viewMode === 'back'
                      ? 'bg-black text-white border-black shadow-sm'
                      : 'bg-white text-zinc-700 border-zinc-300 hover:border-black'
                  }`}
                >
                  Show Back
                </button>
              </div>

            </div>

            {/* Product Details & Purchase Column */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                  {product.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-semibold text-zinc-900 tracking-tight">
                  {product.name}
                </h3>

                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-xl font-mono font-medium text-zinc-900">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="px-1.5 py-0.5 bg-rose-600 text-white text-[10px] font-mono font-medium">
                    {product.discount}
                  </span>
                </div>

                <p className="text-xs font-sans text-zinc-600 mt-4 leading-relaxed">
                  {product.description}
                </p>

                <div className="mt-4 space-y-1 text-xs font-sans text-zinc-600">
                  <div>• {product.fabric}</div>
                  <div>• {product.fit}</div>
                  <div>• High-Density Discharge Puff Print</div>
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between text-xs font-sans mb-2">
                  <span className="text-zinc-700 font-medium">Select Size:</span>
                  <span className="text-zinc-400 text-[11px] font-mono">Boxy Drop Cut</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 text-xs font-sans font-medium border transition ${
                        selectedSize === s
                          ? 'bg-black text-white border-black font-semibold'
                          : 'bg-white text-zinc-800 border-zinc-300 hover:border-zinc-500'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart CTA */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3 px-6 text-xs font-sans font-medium flex items-center justify-center gap-2 transition ${
                    isAdded ? 'bg-emerald-600 text-white' : 'bg-black hover:bg-zinc-800 text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag — ₹{product.price.toLocaleString()}</span>
                    </>
                  )}
                </button>

                <Link
                  to={`/products/${product.slug}`}
                  className="w-full py-1.5 text-center text-xs font-sans font-medium text-zinc-600 hover:text-black block hover:underline"
                >
                  View Complete Product Specifications →
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
