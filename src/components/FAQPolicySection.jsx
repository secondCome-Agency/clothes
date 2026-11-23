import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldAlert, Truck, RefreshCcw } from 'lucide-react';

export default function FAQPolicySection({ onOpenSizeGuide }) {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "WHAT IS THE OVERSIZED FIT PROFILE?",
      a: "All Saur Haul silhouettes feature intentional oversized proportions with wide drop shoulders, generous chest width, and a boxy drape. If you prefer a traditional baggy streetwear look, take your normal size. If you want a more tailored or standard fit, we recommend sizing down one size."
    },
    {
      q: "WHAT IS YOUR EXCHANGE POLICY?",
      a: "We offer a 3-day size exchange window from the date of delivery. If you need a different size or wish to swap for an equivalent piece, simply submit an exchange request through our portal. A nominal ₹150 courier fee applies to cover reverse and forward shipping logistics."
    },
    {
      q: "HOW LONG DOES SHIPPING TAKE FROM JODHPUR?",
      a: "Orders are dispatched directly from our fulfillment center in Jodhpur, Rajasthan within 24 to 48 hours (Monday–Friday). Standard Pan-India delivery typically takes 2 to 5 business days depending on your destination PIN code. Real-time SMS and WhatsApp tracking links are sent upon dispatch."
    },
    {
      q: "HOW SHOULD I CARE FOR HEAVYWEIGHT PUFF PRINTS?",
      a: "To preserve the 3D puff texture and heavyweight cotton fiber elasticity, always machine wash inside-out with cold water on a gentle cycle. Lay flat or hang to air dry. Never tumble dry on high heat, and never iron directly on top of printed graphics."
    },
    {
      q: "CAN I CANCEL OR AMEND MY ORDER?",
      a: "Because our fulfillment operations run on rapid small-batch dispatches, cancellations or address modifications must be requested within 2 hours of order placement by contacting our support desk via WhatsApp or email."
    }
  ];

  return (
    <section className="w-full py-20 bg-black border-b border-zinc-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-xs font-mono text-rose-500 uppercase tracking-widest mb-2 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>TRANSPARENCY & ASSURANCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            Everything you need to know regarding fits, heavyweight fabrics, dispatch timelines, and our 3-day exchange policy.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left text-sm sm:text-base font-mono uppercase tracking-wider text-zinc-200 hover:text-white transition"
                >
                  <span className="font-semibold">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-rose-500' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 pt-0 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans border-t border-zinc-900 animate-in fade-in duration-200">
                    <p className="mt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Pill */}
        <div className="mt-10 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <span>STILL HAVE SIZING QUESTIONS?</span>
          <button
            onClick={onOpenSizeGuide}
            className="text-rose-400 hover:text-rose-300 font-bold underline underline-offset-4"
          >
            VIEW COMPLETE SIZE GUIDE & MEASUREMENTS →
          </button>
        </div>

      </div>
    </section>
  );
}
