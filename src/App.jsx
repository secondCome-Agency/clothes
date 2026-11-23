import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';

// Pages
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrdersPage from './pages/OrdersPage';
import ContactPage from './pages/ContactPage';
import ReturnsPage from './pages/ReturnsPage';
import PolicyPage from './pages/PolicyPage';

// Helper: Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-white text-zinc-900 font-sans selection:bg-black selection:text-white">
          
          {/* Header & Sticky Navigation */}
          <Header />

          {/* Main Route Content */}
          <main className="flex-1 relative z-0">
            <Routes>
              {/* Homepage */}
              <Route path="/" element={<HomePage />} />

              {/* Collections & Categories */}
              <Route path="/collections/:category" element={<CollectionPage />} />

              {/* Product Detail Page */}
              <Route path="/products/:slug" element={<ProductDetailPage />} />

              {/* Shopping Cart */}
              <Route path="/cart" element={<CartPage />} />

              {/* Checkout Flow */}
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* Customer Account Routes */}
              <Route path="/account" element={<AccountPage />} />
              <Route path="/account/login" element={<LoginPage />} />
              <Route path="/account/register" element={<RegisterPage />} />
              <Route path="/account/orders" element={<OrdersPage />} />

              {/* Informational & Support Pages */}
              <Route path="/pages/contact" element={<ContactPage />} />
              <Route path="/pages/returns" element={<ReturnsPage />} />
              <Route path="/pages/shipping" element={<PolicyPage />} />
              <Route path="/pages/privacy-policy" element={<PolicyPage />} />
              <Route path="/pages/terms" element={<PolicyPage />} />
              <Route path="/pages/faq" element={<PolicyPage />} />
              <Route path="/pages/our-story" element={<PolicyPage />} />

              {/* Fallback */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>

          {/* Global Search Modal */}
          <SearchModal />

          {/* Multi-Column Footer */}
          <Footer />

        </div>
      </BrowserRouter>
    </ShopProvider>
  );
}
