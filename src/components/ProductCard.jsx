import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product }) {
  const { addToCart } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors?.[0]?.name, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <div 
      className="group relative flex flex-col bg-white border border-zinc-200 transition-all duration-300 hover:border-zinc-400"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <Link 
        to={`/products/${product.slug}`}
        className="relative w-full aspect-[3/4] bg-zinc-100 overflow-hidden block"
      >
        {/* Front Image */}
        <img
          src={product.frontImage}
          alt={product.name}
          loading="lazy"
          className={`w-full h-full object-cover object-center transition-opacity duration-500 ${
            isHovered && product.backImage ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Back Image on Hover */}
        {product.backImage && (
          <img
            src={product.backImage}
            alt={`${product.name} Back View`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Badge (Top Left) */}
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black text-white text-[10px] font-mono uppercase tracking-wider font-medium">
            {product.badge}
          </span>
        )}

        {/* Discount (Top Right) */}
        {product.discount && (
          <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-rose-600 text-white text-[10px] font-mono font-medium">
            {product.discount}
          </span>
        )}

        {/* Quick Add Button on Image Hover */}
        <button
          onClick={handleQuickAdd}
          className={`absolute bottom-3 left-3 right-3 py-2 bg-black text-white text-xs font-sans font-medium flex items-center justify-center gap-1.5 transition-all duration-200 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          } hover:bg-zinc-800`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added to Bag</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Quick Add</span>
            </>
          )}
        </button>
      </Link>

      {/* Product Information */}
      <div className="p-2.5 sm:p-3.5 flex flex-col justify-between flex-1">
        <div>
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
            {product.subtitle || product.category}
          </span>
          <Link 
            to={`/products/${product.slug}`}
            className="text-xs sm:text-sm font-heading font-medium sm:font-semibold text-zinc-900 tracking-tight hover:underline line-clamp-1 block"
          >
            {product.name}
          </Link>
        </div>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mt-2 pt-2 border-t border-zinc-100">
          <span className="text-xs sm:text-sm font-mono font-medium text-zinc-900">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-[11px] sm:text-xs font-mono text-zinc-400 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
