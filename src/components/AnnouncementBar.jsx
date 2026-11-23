import React, { useState } from 'react';
import { Sparkles, ArrowRight, Volume2, VolumeX, ShieldCheck } from 'lucide-react';

export default function AnnouncementBar() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="w-full bg-black border-b border-zinc-800 text-xs font-mono select-none overflow-hidden z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        
        {/* Left: Ticker statement */}
        <div className="hidden md:flex items-center gap-2 text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span className="text-zinc-300 font-semibold uppercase tracking-wider">
            LIMITED DROP 01 LIVE // ONLY 100 PIECES PER CUT
          </span>
        </div>

        {/* Center: Running Marquee / High-Impact Promo */}
        <div className="flex-1 overflow-hidden whitespace-nowrap py-0.5">
          <div className="inline-block animate-marquee text-zinc-300 tracking-wider">
            <span className="mx-6 text-white font-bold">
              ⚡ FREE PAN-INDIA DELIVERY ON ALL ORDERS
            </span>
            <span className="mx-6 text-rose-400 font-bold">
              USE CODE: HAUL100 FOR ₹100 OFF ON PREPAID CHECKOUTS
            </span>
            <span className="mx-6 text-zinc-400">
              • 3-DAY SEAMLESS SIZE EXCHANGE
            </span>
            <span className="mx-6 text-white">
              • 240-450 GSM HEAVYWEIGHT COTTON ONLY
            </span>
            <span className="mx-6 text-zinc-400">
              • HAND-CRAFTED AT JODHPUR DESIGN LAB
            </span>
          </div>
        </div>

        {/* Right: Currency & Ambient Audio Toggle */}
        <div className="hidden sm:flex items-center gap-3 text-zinc-400">
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-bold text-zinc-200">
            INR (₹)
          </span>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center gap-1.5 hover:text-white transition text-[11px]"
            title={isMuted ? "Unmute Ambient Sound" : "Mute Sound"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-500" /> : <Volume2 className="w-3.5 h-3.5 text-rose-400 animate-pulse" />}
            <span>{isMuted ? "SOUND OFF" : "ROOM AMBIENCE"}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
