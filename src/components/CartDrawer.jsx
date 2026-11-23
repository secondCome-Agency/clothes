import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  Tag, 
  Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  items = [], 
  onUpdateQty, 
  onRemoveItem,
  onClearCart 
}) {
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Subtotal calculation
  const subtotal = items.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const freeShippingThreshold = 2000;
  const freeShippingMet = subtotal >= freeShippingThreshold || subtotal === 0;
  const shippingFee = freeShippingMet ? 0 : 150;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const total = Math.max(0, subtotal - discountAmount + (items.length > 0 ? shippingFee : 0));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();

    if (code === 'HAUL100') {
      setDiscountAmount(100);
      setCouponApplied(true);
    } else if (code === 'SAUR10') {
      setDiscountAmount(Math.round(subtotal * 0.1));
      setCouponApplied(true);
    } else {
      setCouponError('Invalid or expired code. Try "HAUL100"');
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);
    
    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      onClearCart();
    }, 1800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-zinc-800/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-rose-500" />
                <h3 className="text-lg font-display font-extrabold text-white">
                  SHOPPING BAG
                </h3>
                <span className="text-xs font-mono text-zinc-500">
                  ({items.reduce((acc, i) => acc + (i.quantity || 1), 0)} ITEMS)
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
                aria-label="Close Shopping Bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="mt-4 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                <span className={freeShippingMet ? "text-emerald-400 font-bold" : "text-zinc-300"}>
                  {freeShippingMet 
                    ? "✓ FREE PAN-INDIA DELIVERY UNLOCKED!" 
                    : `ADD ₹${(freeShippingThreshold - subtotal).toLocaleString()} MORE FOR FREE DELIVERY`}
                </span>
                <span className="text-zinc-500">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    freeShippingMet ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {orderComplete ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-display font-bold text-white">
                  ORDER DISPATCH CONFIRMED!
                </h4>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto font-mono">
                  Your limited-drop package is scheduled for hand-packing at our Jodhpur laboratory. Tracking updates sent to your registered phone.
                </p>
                <button
                  onClick={() => {
                    setOrderComplete(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-mono font-bold uppercase"
                >
                  CONTINUE BROWSING
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mx-auto text-zinc-600">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <p className="text-sm font-mono text-zinc-400">
                  YOUR SHOPPING BAG IS EMPTY.
                </p>
                <button
                  onClick={onClose}
                  className="text-xs font-mono text-rose-400 hover:text-rose-300 underline underline-offset-4 font-bold"
                >
                  EXPLORE DROP 01 ARCHIVE →
                </button>
              </div>
            ) : (
              items.map((item, index) => (
                <div 
                  key={`${item.id}-${item.selectedSize}-${index}`}
                  className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex gap-4 items-center justify-between"
                >
                  <img
                    src={item.images ? item.images[0] : item.image}
                    alt={item.name}
                    className="w-18 h-22 object-cover rounded-lg bg-zinc-800 border border-zinc-700/60 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-display font-bold text-white truncate">
                      {item.name}
                    </h5>
                    <div className="text-[11px] font-mono text-zinc-400 mt-0.5 space-x-2">
                      <span>SIZE: {item.selectedSize || 'L'}</span>
                      {item.selectedColor && <span>• {item.selectedColor}</span>}
                    </div>
                    <div className="text-xs font-mono font-bold text-white mt-1">
                      ₹{item.price.toLocaleString()}
                    </div>

                    {/* Quantity modifier */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center rounded-lg bg-zinc-950 border border-zinc-800 text-xs">
                        <button
                          onClick={() => onUpdateQty(item.id, item.selectedSize, (item.quantity || 1) - 1)}
                          className="p-1 hover:text-rose-400 transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-mono text-[11px]">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.selectedSize, (item.quantity || 1) + 1)}
                          className="p-1 hover:text-rose-400 transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id, item.selectedSize)}
                        className="text-zinc-500 hover:text-rose-400 p-1 text-xs"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Panel */}
          {items.length > 0 && !orderComplete && (
            <div className="p-6 border-t border-zinc-800 bg-zinc-950/90 space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="PROMO CODE (e.g. HAUL100)"
                    disabled={couponApplied}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono uppercase text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500 disabled:opacity-50"
                  />
                  <Tag className="w-3.5 h-3.5 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  disabled={couponApplied || !couponCode.trim()}
                  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white text-xs font-mono uppercase transition font-bold"
                >
                  {couponApplied ? "APPLIED" : "APPLY"}
                </button>
              </form>

              {couponError && (
                <div className="text-[11px] font-mono text-rose-500">
                  {couponError}
                </div>
              )}

              {couponApplied && (
                <div className="text-[11px] font-mono text-emerald-400 flex items-center justify-between">
                  <span>PROMO DISCOUNT APPLIED</span>
                  <span>-₹{discountAmount.toLocaleString()}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs font-mono text-zinc-400 pt-2 border-t border-zinc-900">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="text-white">₹{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>DISCOUNT</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>ESTIMATED DELIVERY</span>
                  <span className={shippingFee === 0 ? "text-emerald-400" : "text-white"}>
                    {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-800">
                  <span>TOTAL DUE</span>
                  <span className="text-rose-400 font-display text-base">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-4 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-60 text-white font-display font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition shadow-xl active:scale-[0.99]"
              >
                {isCheckingOut ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>PROCESSING SECURE ORDER...</span>
                  </div>
                ) : (
                  <>
                    <span>PROCEED TO SECURE CHECKOUT</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-500 uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>UPI • CARDS • NETBANKING • COD AVAILABLE</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
