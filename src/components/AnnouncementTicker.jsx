import React from 'react';

export default function AnnouncementTicker() {
  const tickerItems = [
    "FAST DISPATCH WITHIN 24–48 HOURS",
    "PAN-INDIA EXPRESS DELIVERY IN 2–5 BUSINESS DAYS",
    "FREE SHIPPING ON PREPAID ORDERS OVER ₹1,999",
    "USE CODE: HAUL100 FOR ₹100 OFF",
    "100% 240–450 GSM FRENCH TERRY HEAVYWEIGHT COTTON",
    "3-DAY SEAMLESS SIZE EXCHANGE POLICY"
  ];

  return (
    <div className="w-full bg-black text-white py-2 overflow-hidden select-none border-b border-zinc-800">
      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="inline-flex animate-marquee items-center text-xs font-sans font-medium tracking-wide uppercase text-zinc-200">
          {tickerItems.map((item, i) => (
            <span key={i} className="inline-flex items-center mx-6">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-3" />
              <span>{item}</span>
            </span>
          ))}
        </div>
        <div className="inline-flex animate-marquee items-center text-xs font-sans font-medium tracking-wide uppercase text-zinc-200" aria-hidden="true">
          {tickerItems.map((item, i) => (
            <span key={`dup-${i}`} className="inline-flex items-center mx-6">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-3" />
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
