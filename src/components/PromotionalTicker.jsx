import React from 'react';

export default function PromotionalTicker() {
  const promos = [
    "LIMITED EDITION DROPS // NO RESTOCKS",
    "JODHPUR DESIGN LAB // EXPERIMENTAL STREETWEAR",
    "FREE EXCHANGES WITHIN 3 DAYS OF DELIVERY",
    "HEAVYWEIGHT 240–450 GSM COTTON",
    "SECURE RAZORPAY & CASH ON DELIVERY SUPPORT",
    "DESIGNED FOR THE ONES WHO FIND ART IN CHAOS"
  ];

  return (
    <div className="w-full bg-[#f4f4f5] border-b border-zinc-300 py-3 overflow-hidden select-none">
      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="inline-flex animate-marquee-fast items-center text-xs font-sans font-medium tracking-wide uppercase text-zinc-700">
          {promos.map((p, i) => (
            <span key={i} className="inline-flex items-center mx-8">
              <span className="text-rose-600 mr-3">✦</span>
              <span>{p}</span>
            </span>
          ))}
        </div>
        <div className="inline-flex animate-marquee-fast items-center text-xs font-sans font-medium tracking-wide uppercase text-zinc-700" aria-hidden="true">
          {promos.map((p, i) => (
            <span key={`dup-${i}`} className="inline-flex items-center mx-8">
              <span className="text-rose-600 mr-3">✦</span>
              <span>{p}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
