import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import AnnouncementTicker from './AnnouncementTicker';

export default function Header() {
  const { cartCount, openSearch, user } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { 
      name: "Categories", 
      isDropdown: true,
      subItems: [
        { name: "All Catalog", path: "/collections/all" },
        { name: "T-shirts", path: "/collections/tshirts" },
        { name: "Hoodies", path: "/collections/hoodies" },
        { name: "Bottomwear", path: "/collections/bottomwear" },
      ]
    },
    { name: "T-shirts", path: "/collections/tshirts" },
    { name: "Hoodies", path: "/collections/hoodies" },
    { name: "Bottomwear", path: "/collections/bottomwear" },
    { name: "Catalog", path: "/collections/all" },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-zinc-200">
      {/* Top Announcement Ticker */}
      <AnnouncementTicker />

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-zinc-900 hover:text-black focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Left / Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-sans font-medium text-zinc-700">
            {navLinks.map((link) => {
              if (link.isDropdown) {
                return (
                  <div 
                    key={link.name} 
                    className="relative group"
                    onMouseEnter={() => setCategoriesDropdownOpen(true)}
                    onMouseLeave={() => setCategoriesDropdownOpen(false)}
                  >
                    <button className="flex items-center gap-1 py-2 text-zinc-700 hover:text-black transition">
                      <span>{link.name}</span>
                      <ChevronDown className="w-3.5 h-3.5 transition group-hover:rotate-180" />
                    </button>
                    {categoriesDropdownOpen && (
                      <div className="absolute top-full left-0 w-48 bg-white border border-zinc-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        {link.subItems.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            onClick={() => setCategoriesDropdownOpen(false)}
                            className="block px-4 py-2.5 text-xs font-sans text-zinc-700 hover:text-black hover:bg-zinc-50 transition"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`py-2 transition hover:text-black ${
                    isActive ? 'font-semibold text-black border-b-2 border-black' : 'text-zinc-600'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Center Brand Wordmark */}
          <div className="text-center">
            <Link to="/" className="inline-block">
              <span className="text-2xl sm:text-3xl font-heading font-bold tracking-tight text-black uppercase hover:opacity-90 transition">
                SAUR HAUL
              </span>
            </Link>
          </div>

          {/* Right Action Icons: Search, Account, Cart */}
          <div className="flex items-center space-x-4 sm:space-x-5 text-zinc-800">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="p-2 text-zinc-800 hover:text-black transition"
              aria-label="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Link */}
            <Link
              to={user ? "/account" : "/account/login"}
              className="p-2 text-zinc-800 hover:text-black transition"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Link with Live Count */}
            <Link
              to="/cart"
              className="relative p-2 text-zinc-800 hover:text-black transition flex items-center"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-black text-white text-[10px] font-mono font-medium flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

        </div>
      </div>

      {/* Responsive Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-zinc-200">
                <span className="text-xl font-heading font-bold tracking-tight text-black uppercase">
                  SAUR HAUL
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-zinc-500 hover:text-black"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="py-6 space-y-3 font-sans text-sm font-medium">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-zinc-900 border-b border-zinc-100"
                >
                  Home
                </Link>
                <Link
                  to="/collections/all"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-zinc-900 border-b border-zinc-100"
                >
                  Catalog
                </Link>
                <Link
                  to="/collections/tshirts"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-zinc-900 border-b border-zinc-100"
                >
                  T-Shirts
                </Link>
                <Link
                  to="/collections/hoodies"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-zinc-900 border-b border-zinc-100"
                >
                  Hoodies
                </Link>
                <Link
                  to="/collections/bottomwear"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-zinc-900 border-b border-zinc-100"
                >
                  Bottomwear
                </Link>
                <Link
                  to={user ? "/account" : "/account/login"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-zinc-900 border-b border-zinc-100"
                >
                  {user ? "My Account" : "Login / Register"}
                </Link>
                <Link
                  to="/pages/returns"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-zinc-900 border-b border-zinc-100"
                >
                  Returns & Exchange
                </Link>
                <Link
                  to="/pages/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-zinc-900 border-b border-zinc-100"
                >
                  Contact Support
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-200 text-xs font-sans text-zinc-500 space-y-1">
              <p>Free Pan-India delivery on orders over ₹1,999</p>
              <p className="text-[11px] font-mono text-zinc-400">JODHPUR STUDIO // EST. 2024</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
