import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Instagram, Youtube, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="relative w-full bg-[#FAFAF8] text-[#080808] border-t border-[#BDBDBD] overflow-hidden select-none">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

        {/* ========================================================= */}
        {/* TOP SECTION: Two-column layout with vertical divider      */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 pt-16 sm:pt-20 pb-14 sm:pb-16 items-stretch">

          {/* LEFT COLUMN: Brand Identity */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:pr-12 xl:pr-16">
            <div className="space-y-4">
              <Link to="/" className="inline-block">
                <span className="text-3xl sm:text-4xl md:text-[44px] font-heading font-black tracking-tight text-[#080808] uppercase leading-none inline-flex items-start">
                  SAUR HAUL
                  <span className="text-xs sm:text-sm font-sans font-bold ml-1 -mt-0.5">®</span>
                </span>
              </Link>

              <p className="text-[11px] font-mono tracking-[0.2em] text-[#080808] uppercase font-medium">
                EST. 2024 // JODHPUR, RAJASTHAN
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <p className="text-sm sm:text-base font-sans text-[#080808] leading-relaxed font-normal">
                " For the misfits, the dreamers, and the ones who find art in chaos. "
              </p>

              <div className="flex items-start gap-2.5 text-xs sm:text-[13px] font-sans text-[#555555] leading-relaxed max-w-md">
                <span className="text-[#080808] font-bold select-none shrink-0">—</span>
                <p>
                  Independent streetwear label developing high-specification heavyweight garments engineered for presence, permanence, and street expression.
                </p>
              </div>
            </div>
          </div>

          {/* VERTICAL DIVIDER */}
          <div className="hidden lg:block lg:col-span-1 flex justify-center">
            <div className="w-px h-full bg-[#BDBDBD]" />
          </div>

          {/* RIGHT COLUMN: Newsletter & Metallic Chrome Star */}
          <div className="lg:col-span-6 flex flex-col justify-center relative lg:pl-4 xl:pl-8">

            {/* Outlined Pill Label */}
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full border border-[#BDBDBD] text-[10px] font-mono tracking-widest text-[#080808] uppercase font-medium">
                STAY CONNECTED
              </span>
            </div>

            {/* Heading */}
            <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-heading font-semibold text-[#080808] tracking-tight leading-[1.12] mt-4 mb-2">
              Get the latest drops<br className="hidden sm:inline" /> and updates.
            </h3>

            {/* Subtext */}
            <p className="text-xs sm:text-[13px] font-sans text-[#555555] mb-6 max-w-md leading-relaxed">
              Be the first to know about new collections, exclusive drops, and more.
            </p>

            {/* Long rounded email input with unified button */}
            <form onSubmit={handleSubscribe} className="relative flex items-center w-full max-w-md rounded-full border border-[#BDBDBD] p-1 bg-transparent focus-within:border-[#080808] transition">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 min-w-0 bg-transparent px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-sans text-[#080808] placeholder-[#777777] focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-black hover:bg-neutral-800 text-white text-xs sm:text-sm font-sans font-medium px-4 sm:px-6 py-2.5 flex items-center gap-2 transition shrink-0"
              >
                {subscribed ? (
                  <>
                    <span>Joined</span>
                    <Check className="w-3.5 h-3.5 text-white" />
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Decorative Metallic Star Graphic & Fine Swoop Line on right */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute right-0 top-0 lg:top-1/2 lg:-translate-y-1/2 pointer-events-none select-none w-48 lg:w-60 h-56 lg:h-64"
            >
              <svg viewBox="0 0 280 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
                <defs>
                  {/* Chrome gradient definitions for the 4 facets */}
                  <linearGradient id="facetTopLeft" x1="140" y1="130" x2="50" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#EDEDED" />
                    <stop offset="45%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#8A8A8A" />
                  </linearGradient>
                  <linearGradient id="facetTopRight" x1="140" y1="130" x2="230" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#4A4A4A" />
                    <stop offset="45%" stopColor="#C4C4C4" />
                    <stop offset="100%" stopColor="#1E1E1E" />
                  </linearGradient>
                  <linearGradient id="facetBottomRight" x1="140" y1="130" x2="225" y2="215" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1E1E1E" />
                    <stop offset="55%" stopColor="#555555" />
                    <stop offset="100%" stopColor="#0A0A0A" />
                  </linearGradient>
                  <linearGradient id="facetBottomLeft" x1="140" y1="130" x2="50" y2="210" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#CCCCCC" />
                    <stop offset="35%" stopColor="#F5F5F5" />
                    <stop offset="70%" stopColor="#3A3A3A" />
                    <stop offset="100%" stopColor="#777777" />
                  </linearGradient>
                  <linearGradient id="trailGrad" x1="140" y1="215" x2="270" y2="260" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#777777" />
                    <stop offset="100%" stopColor="#BDBDBD" />
                  </linearGradient>
                </defs>

                {/* Fine curved swooping wire trail extending toward bottom-right border */}
                <path d="M 140 215 C 142 245 185 255 275 260" stroke="url(#trailGrad)" strokeWidth="1" fill="none" />

                {/* Small upper sparkle star */}
                <path d="M 224 20 C 224 25.5 228.5 30 234 30 C 228.5 30 224 34.5 224 40 C 224 34.5 219.5 30 214 30 C 219.5 30 224 25.5 224 20 Z" fill="#080808" />

                {/* Main 4-point Liquid Chrome Star */}
                <g>
                  {/* Top-Left facet */}
                  <path d="M 140 130 L 140 45 C 141 95 105 129 55 130 Z" fill="url(#facetTopLeft)" />
                  {/* Top-Right facet */}
                  <path d="M 140 130 L 140 45 C 139 95 175 129 225 130 Z" fill="url(#facetTopRight)" />
                  {/* Bottom-Right facet */}
                  <path d="M 140 130 L 225 130 C 175 131 139 165 140 215 Z" fill="url(#facetBottomRight)" />
                  {/* Bottom-Left facet */}
                  <path d="M 140 130 L 55 130 C 105 131 141 165 140 215 Z" fill="url(#facetBottomLeft)" />

                  {/* Sharp specular ridge lines */}
                  <line x1="140" y1="45" x2="140" y2="215" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.9" />
                  <line x1="55" y1="130" x2="225" y2="130" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.9" />

                  {/* Subtle rim stroke */}
                  <path d="M 140 45 C 141 95 105 129 55 130 C 105 131 141 165 140 215 C 139 165 175 131 225 130 C 175 129 139 95 140 45 Z" stroke="#333333" strokeWidth="0.5" fill="none" opacity="0.3" />
                </g>
              </svg>
            </div>

          </div>

        </div>

        {/* ========================================================= */}
        {/* MIDDLE SECTION: 4 Navigation Columns                      */}
        {/* ========================================================= */}
        <div className="border-t border-[#BDBDBD] py-12 sm:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-xs sm:text-[13px] font-sans">

            {/* COLUMN 1: Collections */}
            <div>
              <h4 className="font-heading font-semibold text-base text-[#080808] mb-5 tracking-tight">
                Collections
              </h4>
              <ul className="space-y-3 text-[#555555]">
                <li>
                  <Link to="/collections/all" className="hover:text-[#080808] transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link to="/collections/tshirts" className="hover:text-[#080808] transition-colors">
                    Oversized T-Shirts
                  </Link>
                </li>
                <li>
                  <Link to="/collections/hoodies" className="hover:text-[#080808] transition-colors">
                    Heavy Hoodies
                  </Link>
                </li>
                <li>
                  <Link to="/collections/bottomwear" className="hover:text-[#080808] transition-colors">
                    Bottomwear
                  </Link>
                </li>
              </ul>
            </div>

            {/* COLUMN 2: Help & Policies */}
            <div>
              <h4 className="font-heading font-semibold text-base text-[#080808] mb-5 tracking-tight">
                Help & Policies
              </h4>
              <ul className="space-y-3 text-[#555555]">
                <li>
                  <Link to="/pages/returns" className="hover:text-[#080808] transition-colors">
                    Return & Exchange
                  </Link>
                </li>
                <li>
                  <Link to="/pages/shipping" className="hover:text-[#080808] transition-colors">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link to="/pages/privacy-policy" className="hover:text-[#080808] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/pages/terms" className="hover:text-[#080808] transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/pages/faq" className="hover:text-[#080808] transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* COLUMN 3: Customer */}
            <div>
              <h4 className="font-heading font-semibold text-base text-[#080808] mb-5 tracking-tight">
                Customer
              </h4>
              <ul className="space-y-3 text-[#555555]">
                <li>
                  <Link to="/account" className="hover:text-[#080808] transition-colors">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link to="/account/orders" className="hover:text-[#080808] transition-colors">
                    Orders & Returns
                  </Link>
                </li>
                <li>
                  <Link to="/pages/contact" className="hover:text-[#080808] transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/pages/our-story" className="hover:text-[#080808] transition-colors">
                    Our Story
                  </Link>
                </li>
              </ul>
            </div>

            {/* COLUMN 4: Studio */}
            <div>
              <h4 className="font-heading font-semibold text-base text-[#080808] mb-5 tracking-tight">
                Studio
              </h4>
              <ul className="space-y-3 text-[#555555]">
                <li className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#080808] shrink-0" />
                  <span>Jodhpur, Rajasthan</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#080808] shrink-0" />
                  <a href="mailto:info.saurhaul@gmail.com" className="hover:text-[#080808] transition-colors">
                    info.saurhaul@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#080808] shrink-0" />
                  <a href="tel:+919982908861" className="hover:text-[#080808] transition-colors">
                    +91 99829 08861
                  </a>
                </li>
                <li className="flex items-center gap-2 pt-0.5">
                  <Instagram className="w-3.5 h-3.5 text-[#080808] shrink-0" />
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#080808] transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM SECTION: Copyright & Feature Bar with Social Icons */}
        {/* ========================================================= */}
        <div className="border-t border-[#BDBDBD] py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-[#555555] relative z-10">

          {/* Copyright notice */}
          <div>
            <p>© 2024 SAUR HAUL. All rights reserved.</p>
          </div>

          {/* Features and Monochrome Social Icons */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 sm:gap-4 text-[10.5px] sm:text-[11px] font-mono uppercase tracking-wider text-[#080808]">
            <span className="text-[#BDBDBD] font-light">|</span>
            <span>PREPAID DISCOUNTS</span>
            <span className="text-[#BDBDBD] font-light">|</span>
            <span>FAST DISPATCH</span>
            <span className="text-[#BDBDBD] font-light">|</span>
            <span>AUTHENTIC FABRIC</span>
            <span className="text-[#BDBDBD] font-light">|</span>

            {/* Social Icons */}
            <div className="flex items-center gap-3 ml-1 sm:ml-2 text-[#080808]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="hover:opacity-60 transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="hover:opacity-60 transition"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="hover:opacity-60 transition inline-flex items-center"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
