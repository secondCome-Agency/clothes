import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  Menu, 
  X, 
  ArrowUpRight,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';

export default function Navbar({ 
  cartCount = 0, 
  onOpenCart, 
  onSearchClick,
  onNavigateCategory 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "LATEST DROPS", category: "all", highlight: true },
    { name: "OVERSIZED TEES", category: "tees" },
    { name: "HEAVY HOODIES", category: "hoodies" },
    { name: "BOTTOMWEAR", category: "bottomwear" },
    { name: "ACCESSORIES", category: "accessories" },
    { name: "LOOKBOOK", href: "#lookbook" },
    { name: "THE CRAFT", href: "#craftsmanship" }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-zinc-800/80 py-3 shadow-2xl' 
          : 'bg-gradient-to-b from-black/90 to-transparent py-4 sm:py-5 border-b border-zinc-900/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Mobile Menu Toggle + Desktop Nav Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <nav className="hidden lg:flex items-center space-x-6 text-xs font-mono uppercase tracking-wider">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    if (link.category) onNavigateCategory(link.category);
                    else if (link.href) {
                      const el = document.querySelector(link.href);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`relative py-1 transition group ${
                    link.highlight 
                      ? 'text-white font-bold' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {link.highlight && <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />}
                    {link.name}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>
          </div>

          {/* Center: Iconic SAUR HAUL Brand Mark */}
          <div className="text-center cursor-pointer select-none" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-2xl sm:text-3xl font-display font-extrabold tracking-tighter text-white hover:text-zinc-200 transition">
                SAUR HAUL
              </span>
            </div>
            <p className="text-[9px] font-mono tracking-[0.25em] text-zinc-500 uppercase -mt-0.5">
              EST. 2024 // JODHPUR
            </p>
          </div>

          {/* Right: Search, Wishlist & Cart Bag */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Search Trigger */}
            <button
              onClick={onSearchClick}
              className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-full transition"
              aria-label="Search Collection"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Currency Pill */}
            <span className="hidden sm:inline-block px-2 py-0.5 rounded border border-zinc-800 bg-zinc-900 text-[10px] font-mono text-zinc-300">
              INR ₹
            </span>

            {/* Shopping Bag Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-white hover:bg-zinc-200 text-black transition active:scale-95 shadow-md font-mono text-xs font-bold"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>BAG</span>
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-rose-600 text-white text-[11px] font-extrabold">
                {cartCount}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" 
          />

          {/* Drawer Menu */}
          <div className="fixed top-0 bottom-0 left-0 w-5/6 max-w-sm bg-zinc-950 border-r border-zinc-800 p-6 flex flex-col justify-between z-10 shadow-2xl animate-in slide-in-from-left duration-300">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                <div>
                  <h3 className="text-xl font-display font-extrabold text-white">SAUR HAUL</h3>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    ARCHIVE & CATALOG
                  </p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-6 space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (link.category) onNavigateCategory(link.category);
                      else if (link.href) {
                        const el = document.querySelector(link.href);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-full flex items-center justify-between text-left py-2 text-sm font-mono uppercase tracking-wider text-zinc-300 hover:text-rose-400 border-b border-zinc-900 transition"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-600" />
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Details */}
            <div className="pt-6 border-t border-zinc-800 space-y-3 font-mono text-xs text-zinc-500">
              <div className="text-zinc-400 font-bold">
                SUPPORT // ENQUIRIES
              </div>
              <div>hello@saurhaul.com</div>
              <div>+91 99829 08861</div>
              <div className="pt-2 text-[10px]">
                © 2025 SAUR HAUL STREETWEAR. ALL RIGHTS RESERVED.
              </div>
            </div>

          </div>
        </div>
      )}

    </header>
  );
}
