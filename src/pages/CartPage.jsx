import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function CartPage() {
  const { 
    cart, 
    cartCount, 
    cartSubtotal, 
    shippingFee, 
    freeShippingThreshold, 
    isFreeShipping,
    coupon, 
    discountAmount, 
    cartTotal,
    removeFromCart, 
    updateQuantity,
    applyCoupon,
    removeCoupon
  } = useShop();

  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState(null);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
  };

  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  return (
    <div className="w-full bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10 pb-6 border-b border-zinc-200">
          <div className="text-xs font-sans text-zinc-500 mb-1">
            <Link to="/" className="hover:underline">Home</Link> / Shopping Bag
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-zinc-900 tracking-tight">
            Shopping Bag
          </h1>
          <p className="text-xs sm:text-sm font-sans text-zinc-500 mt-1">
            {cartCount} {cartCount === 1 ? 'piece' : 'pieces'} in your bag
          </p>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-24 border border-zinc-200 bg-zinc-50 max-w-2xl mx-auto">
            <div className="w-14 h-14 bg-black text-white flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-display font-bold text-black uppercase">
              YOUR CART IS CURRENTLY EMPTY
            </h2>
            <p className="text-xs font-mono text-zinc-500 mt-2 max-w-sm mx-auto">
              You haven't added any pieces to your bag yet. Explore our latest drop and limited archive.
            </p>
            <Link
              to="/collections/all"
              className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-zinc-800 transition"
            >
              <span>DISCOVER LATEST DROP</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Cart Grid: Items on Left, Order Summary on Right */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Cart Items (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Free Delivery Progress Bar */}
              <div className="p-4 bg-zinc-50 border border-zinc-200 font-sans text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className={isFreeShipping ? "text-emerald-700 font-medium" : "text-zinc-700"}>
                    {isFreeShipping 
                      ? "✓ Free Pan-India express delivery unlocked!" 
                      : `Add ₹${(freeShippingThreshold - cartSubtotal).toLocaleString()} more for free delivery`}
                  </span>
                  <span className="text-zinc-500 font-mono">{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-200">
                  <div 
                    className="h-full bg-black transition-all duration-500" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
                {cart.map((item, idx) => (
                  <div key={`${item.id}-${item.size}-${item.color}-${idx}`} className="py-6 flex gap-4 sm:gap-6 items-start">
                    
                    {/* Item Thumbnail */}
                    <Link to={`/products/${item.slug}`} className="w-20 sm:w-24 aspect-[3/4] bg-zinc-100 border border-zinc-200 overflow-hidden flex-shrink-0 block">
                      <img src={item.frontImage} alt={item.name} className="w-full h-full object-cover" />
                    </Link>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/products/${item.slug}`} className="text-sm font-heading font-medium text-zinc-900 hover:underline truncate block">
                        {item.name}
                      </Link>
                      
                      <div className="text-xs font-sans text-zinc-500 mt-1 space-x-2">
                        <span>Size: {item.size}</span>
                        {item.color && <span>• {item.color}</span>}
                      </div>

                      <div className="text-xs font-mono font-medium text-zinc-900 mt-2">
                        ₹{item.price.toLocaleString()}
                      </div>

                      {/* Quantity & Delete Controls */}
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center border border-zinc-300 font-sans text-xs">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                            className="px-2.5 py-1 hover:bg-zinc-100"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 font-mono">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                            className="px-2.5 py-1 hover:bg-zinc-100"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id, item.size, item.color)}
                          className="text-xs font-sans text-zinc-500 hover:text-black flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Line Total */}
                    <div className="text-sm font-mono font-medium text-zinc-900">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>

                  </div>
                ))}
              </div>

              {/* Continue Shopping Link */}
              <div className="pt-2">
                <Link
                  to="/collections/all"
                  className="text-xs font-sans text-zinc-700 hover:text-black font-medium inline-flex items-center gap-1.5 hover:underline"
                >
                  ← Continue Shopping
                </Link>
              </div>

            </div>

            {/* Right Column: Order Summary (4 Cols) */}
            <div className="lg:col-span-4">
              <div className="p-6 bg-[#fafafa] border border-zinc-300 space-y-6">
                
                <h3 className="text-base font-heading font-semibold text-zinc-900 pb-3 border-b border-zinc-200">
                  Order Summary
                </h3>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon code (e.g. HAUL100)"
                      className="flex-1 px-3 py-2 bg-white border border-zinc-300 text-xs font-sans uppercase focus:outline-none focus:border-black"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-black text-white text-xs font-sans font-medium hover:bg-zinc-800 transition"
                    >
                      Apply
                    </button>
                  </div>

                  {couponFeedback && (
                    <div className={`text-[11px] font-sans ${couponFeedback.success ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {couponFeedback.message}
                    </div>
                  )}

                  {coupon && (
                    <div className="flex items-center justify-between text-xs font-sans text-emerald-700 bg-emerald-50 p-2 border border-emerald-200">
                      <span>Code: {coupon.code} applied</span>
                      <button onClick={removeCoupon} className="text-xs underline font-medium">Remove</button>
                    </div>
                  )}
                </form>

                {/* Pricing Line Items */}
                <div className="space-y-2.5 text-xs pt-4 border-t border-zinc-200">
                  <div className="flex justify-between text-zinc-600 font-sans">
                    <span>Subtotal</span>
                    <span className="text-zinc-900 font-mono font-medium">₹{cartSubtotal.toLocaleString()}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-sans">
                      <span>Discount</span>
                      <span className="font-mono font-medium">-₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-zinc-600 font-sans">
                    <span>Estimated Delivery</span>
                    <span className={shippingFee === 0 ? "text-emerald-600 font-mono font-medium" : "text-zinc-900 font-mono font-medium"}>
                      {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-heading font-semibold text-zinc-900 pt-3 border-t border-zinc-300">
                    <span>Estimated Total</span>
                    <span className="font-mono">₹{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-3.5 bg-black hover:bg-zinc-800 text-white text-xs font-sans font-medium flex items-center justify-center gap-2 transition shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] font-sans text-zinc-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" />
                  <span>Secure Pan-India Delivery & Size Exchange</span>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
