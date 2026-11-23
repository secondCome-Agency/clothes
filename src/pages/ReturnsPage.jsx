import React, { useState } from 'react';
import { RefreshCw, Check, ArrowRight } from 'lucide-react';

export default function ReturnsPage() {
  const [formData, setFormData] = useState({
    orderNumber: '',
    email: '',
    phone: '',
    itemName: 'PHANTOM OVERSIZED FLEECE HOODIE',
    exchangeReason: 'Need smaller size',
    requestedSize: 'M',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-white min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-zinc-200">
          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
            Client Assurance
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-zinc-900 tracking-tight">
            Return & Exchange Policy
          </h1>
          <p className="text-sm font-sans text-zinc-600 mt-2 leading-relaxed">
            Our goal is to ensure you achieve the ideal streetwear drape. Review our structured exchange guidelines and submit an exchange ticket below.
          </p>
        </div>

        {/* Policy Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 font-sans text-xs">
          <div className="p-4 bg-zinc-50 border border-zinc-200">
            <span className="font-heading font-semibold text-zinc-900 block mb-1 uppercase tracking-wider">3-Day Window</span>
            <p className="text-zinc-600 leading-relaxed">Exchange requests must be submitted within 3 days of product delivery.</p>
          </div>
          <div className="p-4 bg-zinc-50 border border-zinc-200">
            <span className="font-heading font-semibold text-zinc-900 block mb-1 uppercase tracking-wider">₹150 Courier Fee</span>
            <p className="text-zinc-600 leading-relaxed">A flat reverse & forward courier fee of ₹150 applies to size swaps.</p>
          </div>
          <div className="p-4 bg-zinc-50 border border-zinc-200">
            <span className="font-heading font-semibold text-zinc-900 block mb-1 uppercase tracking-wider">Unworn Condition</span>
            <p className="text-zinc-600 leading-relaxed">Garments must be unwashed, unworn, and retain all original tags.</p>
          </div>
        </div>

        {/* Exchange Request Form */}
        <div className="bg-[#fafafa] border border-zinc-300 p-6 sm:p-10">
          <h2 className="text-base font-heading font-semibold text-zinc-900 mb-6 pb-3 border-b border-zinc-200">
            Submit Size Exchange Request
          </h2>

          {submitted ? (
            <div className="text-center py-10 space-y-3 font-sans text-xs">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-base font-heading font-semibold text-zinc-900">
                Exchange Ticket Registered
              </h3>
              <p className="text-zinc-600 max-w-md mx-auto leading-relaxed">
                We have received your exchange request for Order #{formData.orderNumber}. Our reverse logistics partner will contact you within 24 hours to schedule pickup.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-zinc-700 mb-1">Order Number (e.g. SH-84920) *</label>
                  <input
                    type="text"
                    required
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                    placeholder="SH-84920"
                    className="w-full px-3 py-2.5 bg-white border border-zinc-300 focus:outline-none focus:border-black font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="block font-medium text-zinc-700 mb-1">Registered Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="karan@example.com"
                    className="w-full px-3 py-2.5 bg-white border border-zinc-300 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-zinc-700 mb-1">Reason for Exchange</label>
                  <select
                    value={formData.exchangeReason}
                    onChange={(e) => setFormData({ ...formData, exchangeReason: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-zinc-300 focus:outline-none focus:border-black cursor-pointer"
                  >
                    <option value="Need smaller size">Need smaller size</option>
                    <option value="Need larger size">Need larger size</option>
                    <option value="Different style preference">Swap for equivalent style</option>
                    <option value="Damaged / Defect">Defective on arrival (free replacement)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-zinc-700 mb-1">New Size Requested</label>
                  <select
                    value={formData.requestedSize}
                    onChange={(e) => setFormData({ ...formData, requestedSize: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-zinc-300 focus:outline-none focus:border-black cursor-pointer"
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-zinc-700 mb-1">Additional Comments</label>
                <textarea
                  rows="3"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Specify any preferences or notes for our Jodhpur fulfillment desk..."
                  className="w-full px-3 py-2.5 bg-white border border-zinc-300 focus:outline-none focus:border-black text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-black hover:bg-zinc-800 text-white font-medium text-xs transition"
              >
                Submit Exchange Request
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
