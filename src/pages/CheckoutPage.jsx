import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Lock, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function CheckoutPage() {
  const { cart, cartSubtotal, shippingFee, discountAmount, cartTotal, placeOrder, user } = useShop();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || 'Rajasthan',
    postalCode: user?.address?.postalCode || '',
    paymentMethod: 'Prepaid UPI'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = "Valid email is required";
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = "Valid 10-digit phone number is required";
    if (!formData.address.trim()) errs.address = "Street address is required";
    if (!formData.city.trim()) errs.city = "City is required";
    if (!formData.postalCode.trim() || formData.postalCode.length < 6) errs.postalCode = "Valid 6-digit PIN code is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (cart.length === 0) {
      alert("Your cart is empty.");
      navigate('/collections/all');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const order = placeOrder(formData);
      setIsSubmitting(false);
      navigate('/account/orders');
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <h2 className="text-xl font-display font-bold uppercase text-black">NO ITEMS TO CHECKOUT</h2>
        <p className="text-xs font-mono text-zinc-500 mt-2">Add pieces to your bag before proceeding to checkout.</p>
        <Link to="/collections/all" className="mt-6 px-6 py-3 bg-black text-white text-xs font-mono font-bold uppercase">
          EXPLORE CATALOG
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#fafafa] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Checkout Header */}
        <div className="mb-10 pb-6 border-b border-zinc-200">
          <div className="text-xs font-sans text-zinc-500 mb-1">
            <Link to="/cart" className="hover:underline">Cart</Link> / Secure Checkout
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-zinc-900 tracking-tight">
            Checkout & Dispatch
          </h1>
        </div>

        {/* Two-Column Form & Order Summary */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Customer & Delivery Info (7 Cols) */}
          <div className="lg:col-span-7 space-y-8 bg-white border border-zinc-300 p-6 sm:p-8">
            
            {/* 1. Customer Information */}
            <div>
              <h2 className="text-xs font-heading font-semibold uppercase tracking-wider text-zinc-900 pb-3 border-b border-zinc-200">
                1. Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 font-sans text-xs">
                <div>
                  <label className="block font-medium text-zinc-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Karan Singhania"
                    className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-300 focus:outline-none focus:border-black"
                  />
                  {errors.name && <span className="text-rose-600 text-[11px] mt-1 block">{errors.name}</span>}
                </div>

                <div>
                  <label className="block font-medium text-zinc-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="karan@example.com"
                    className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-300 focus:outline-none focus:border-black"
                  />
                  {errors.email && <span className="text-rose-600 text-[11px] mt-1 block">{errors.email}</span>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-medium text-zinc-700 mb-1">Phone Number (For SMS / WhatsApp Dispatch Tracking) *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 99829 08861"
                    className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-300 focus:outline-none focus:border-black font-mono"
                  />
                  {errors.phone && <span className="text-rose-600 text-[11px] mt-1 block">{errors.phone}</span>}
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div>
              <h2 className="text-xs font-heading font-semibold uppercase tracking-wider text-zinc-900 pb-3 border-b border-zinc-200">
                2. Shipping Destination
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 font-sans text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-medium text-zinc-700 mb-1">Street Address / Flat / Building *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Plot 164, Chopasni, Shankar Nagar"
                    className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-300 focus:outline-none focus:border-black"
                  />
                  {errors.address && <span className="text-rose-600 text-[11px] mt-1 block">{errors.address}</span>}
                </div>

                <div>
                  <label className="block font-medium text-zinc-700 mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Jodhpur"
                    className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-300 focus:outline-none focus:border-black"
                  />
                  {errors.city && <span className="text-rose-600 text-[11px] mt-1 block">{errors.city}</span>}
                </div>

                <div>
                  <label className="block font-medium text-zinc-700 mb-1">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Rajasthan"
                    className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-300 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block font-medium text-zinc-700 mb-1">PIN Code *</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="342008"
                    className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-300 focus:outline-none focus:border-black font-mono"
                  />
                  {errors.postalCode && <span className="text-rose-600 text-[11px] mt-1 block">{errors.postalCode}</span>}
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div>
              <h2 className="text-xs font-heading font-semibold uppercase tracking-wider text-zinc-900 pb-3 border-b border-zinc-200">
                3. Payment Preference
              </h2>
              
              <div className="space-y-3 mt-4 font-sans text-xs">
                {['Prepaid UPI', 'Credit / Debit Card (Razorpay)', 'NetBanking', 'Cash on Delivery (COD)'].map((method) => (
                  <label
                    key={method}
                    className={`flex items-center justify-between p-3.5 border cursor-pointer transition ${
                      formData.paymentMethod === method
                        ? 'border-black bg-zinc-50 font-medium'
                        : 'border-zinc-300 bg-white hover:border-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={formData.paymentMethod === method}
                        onChange={handleChange}
                        className="text-black focus:ring-0"
                      />
                      <span>{method}</span>
                    </div>
                    {method === 'Prepaid UPI' && (
                      <span className="text-[10px] font-mono text-emerald-600 uppercase font-medium">Fastest Dispatch</span>
                    )}
                  </label>
                ))}
              </div>

              {/* Verified Integration Disclaimer */}
              <div className="mt-4 p-3.5 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-sans leading-relaxed">
                <span className="font-semibold block mb-1">Notice: Payment Gateway Integration</span>
                Production payment gateways require verified merchant credentials and backend secret verification. Orders submitted here will be recorded with status <span className="font-medium">Pending Gateway Authorization</span>.
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-zinc-300 p-6 sm:p-8 space-y-6 sticky top-28">
              
              <h3 className="text-base font-heading font-semibold text-zinc-900 pb-3 border-b border-zinc-200">
                Package Contents ({cart.length} {cart.length === 1 ? 'piece' : 'pieces'})
              </h3>

              {/* Items in Checkout */}
              <div className="max-h-64 overflow-y-auto divide-y divide-zinc-100 pr-1 space-y-3">
                {cart.map((item, i) => (
                  <div key={i} className="pt-3 flex gap-3 items-center justify-between text-xs font-sans">
                    <img src={item.frontImage} alt={item.name} className="w-12 h-14 object-cover border border-zinc-200" />
                    <div className="flex-1 min-w-0">
                      <span className="font-heading font-medium text-zinc-900 truncate block">{item.name}</span>
                      <span className="text-zinc-500 text-[11px] font-mono">QTY: {item.quantity} • SIZE: {item.size}</span>
                    </div>
                    <span className="font-mono font-medium text-zinc-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-4 border-t border-zinc-200 text-xs font-sans">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span className="font-mono text-zinc-900">₹{cartSubtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span className="font-mono font-medium">-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-600">
                  <span>Shipping</span>
                  <span className={shippingFee === 0 ? "text-emerald-600 font-mono font-medium" : "text-zinc-900 font-mono"}>
                    {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-heading font-semibold text-zinc-900 pt-3 border-t border-zinc-300">
                  <span>Final Total</span>
                  <span className="font-mono">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-black hover:bg-zinc-800 disabled:opacity-50 text-white text-xs font-sans font-medium flex items-center justify-center gap-2 transition shadow-sm"
              >
                {isSubmitting ? (
                  <span>Recording Order Dispatch...</span>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Confirm & Place Order — ₹{cartTotal.toLocaleString()}</span>
                  </>
                )}
              </button>

              <div className="text-[11px] font-sans text-zinc-500 text-center">
                Free 3-Day Size Exchange Across All Metros
              </div>

            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
