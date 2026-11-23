import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function PolicyPage() {
  const location = useLocation();
  const path = location.pathname;

  let title = "INFORMATION";
  let content = null;

  if (path.includes('shipping')) {
    title = "Shipping & Dispatch Policy";
    content = (
      <div className="space-y-6 font-sans text-sm text-zinc-700 leading-relaxed">
        <section>
          <h2 className="text-base font-heading font-semibold text-zinc-900 mb-2">1. Dispatch Origin & Timeline</h2>
          <p>All Saur Haul orders are packaged and dispatched directly from our studio fulfillment laboratory in Jodhpur, Rajasthan within 24 to 48 hours of order confirmation (Monday through Friday).</p>
        </section>
        <section>
          <h2 className="text-base font-heading font-semibold text-zinc-900 mb-2">2. Pan-India Delivery Speeds</h2>
          <p>Orders ship via reputable logistics partners (Bluedart, Delhivery, DTDC). Metro deliveries typically arrive within 2–4 business days. Regional and remote destinations may take up to 5–6 business days.</p>
        </section>
        <section>
          <h2 className="text-base font-heading font-semibold text-zinc-900 mb-2">3. Shipping Charges</h2>
          <p>Free Pan-India shipping is provided automatically on all orders over ₹1,999. For orders below this threshold, a flat delivery fee of ₹150 is applied at checkout.</p>
        </section>
      </div>
    );
  } else if (path.includes('privacy-policy')) {
    title = "Privacy Policy";
    content = (
      <div className="space-y-6 font-sans text-sm text-zinc-700 leading-relaxed">
        <section>
          <h2 className="text-base font-heading font-semibold text-zinc-900 mb-2">1. Information Collection</h2>
          <p>We collect essential customer information solely to fulfill orders, facilitate delivery notifications, and handle size exchanges. This includes your name, email, phone number, and physical shipping address.</p>
        </section>
        <section>
          <h2 className="text-base font-heading font-semibold text-zinc-900 mb-2">2. Data Security</h2>
          <p>We do not store complete credit card or payment credentials on our servers. All financial transactions are securely processed through PCI-DSS compliant payment gateways.</p>
        </section>
      </div>
    );
  } else if (path.includes('terms')) {
    title = "Terms & Conditions";
    content = (
      <div className="space-y-6 font-sans text-sm text-zinc-700 leading-relaxed">
        <section>
          <h2 className="text-base font-heading font-semibold text-zinc-900 mb-2">1. Limited Releases</h2>
          <p>Saur Haul operates on intentional limited drops. Products are manufactured in small batches and are subject to immediate stock depletion.</p>
        </section>
        <section>
          <h2 className="text-base font-heading font-semibold text-zinc-900 mb-2">2. Product Representation</h2>
          <p>We strive to accurately display the heavyweight drape, 3D puff texture, and color profile of our garments. Minimal variations may occur due to individual screen calibration and natural fabric dyes.</p>
        </section>
      </div>
    );
  } else if (path.includes('faq')) {
    title = "Frequently Asked Questions";
    content = (
      <div className="space-y-6 font-sans text-sm text-zinc-700 leading-relaxed">
        <section>
          <h2 className="text-base font-heading font-semibold text-zinc-900 mb-2">How does the oversized fit run?</h2>
          <p>All silhouettes feature intentional oversized proportions with wide drop shoulders and a generous chest width. For an exaggerated street drape, choose your true size. For a regular fit, size down one size.</p>
        </section>
        <section>
          <h2 className="text-base font-heading font-semibold text-zinc-900 mb-2">How do I track my drop?</h2>
          <p>Once dispatched, tracking details with a real-time link are transmitted to your registered phone number via SMS and WhatsApp.</p>
        </section>
      </div>
    );
  } else if (path.includes('our-story')) {
    title = "Our Story · The Saur Haul Manifesto";
    content = (
      <div className="space-y-6 font-sans text-sm text-zinc-700 leading-relaxed">
        <p className="text-lg font-heading font-semibold text-zinc-900 leading-snug">
          "For the misfits, the dreamers, and the ones who find art in chaos."
        </p>
        <p>Founded in 2024 in Jodhpur, Rajasthan, SAUR HAUL was conceived as an antidote to disposable fast-fashion culture. We treat streetwear as an architectural canvas — combining heavyweight 240–450 GSM French Terry with sculptural boxy proportions.</p>
        <p>Every piece is crafted in limited numbers, pre-shrunk, bio-washed, and printed using high-density puff inks that maintain their tactile texture wash after wash.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-xs font-sans text-zinc-500 mb-4">
          <Link to="/" className="hover:underline">Home</Link> / Policies
        </div>

        <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-zinc-900 tracking-tight mb-8 pb-6 border-b border-zinc-200">
          {title}
        </h1>

        <div className="prose prose-zinc max-w-none">
          {content}
        </div>

      </div>
    </div>
  );
}
