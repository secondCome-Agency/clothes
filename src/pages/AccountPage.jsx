import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, User, MapPin, LogOut, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function AccountPage() {
  const { user, logout, orders } = useShop();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <h2 className="text-xl font-display font-bold uppercase text-black">YOU ARE NOT SIGNED IN</h2>
        <p className="text-xs font-mono text-zinc-500 mt-2">Sign in to review your order history, tracking, and saved delivery addresses.</p>
        <div className="flex gap-4 mt-6 font-mono text-xs">
          <Link to="/account/login" className="px-6 py-3 bg-black text-white font-bold uppercase">
            SIGN IN
          </Link>
          <Link to="/account/register" className="px-6 py-3 border border-black text-black font-bold uppercase">
            CREATE ACCOUNT
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-10 border-b border-zinc-200 gap-4">
          <div>
            <div className="text-xs font-sans text-zinc-500 mb-1">
              Customer Dashboard
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-zinc-900 tracking-tight">
              Welcome, {user.name}
            </h1>
            <p className="text-xs font-sans text-zinc-500 mt-1">
              {user.email} • {user.phone}
            </p>
          </div>

          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="flex items-center gap-1.5 px-4 py-2 border border-zinc-300 hover:border-black text-xs font-sans font-medium text-zinc-700 hover:text-black transition w-fit"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Orders Card */}
          <div className="p-6 bg-zinc-50 border border-zinc-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-heading font-semibold uppercase tracking-wider text-zinc-500">Order History</span>
                <Package className="w-5 h-5 text-black" />
              </div>
              <div className="text-3xl font-mono font-medium text-zinc-900">
                {orders.length}
              </div>
              <p className="text-xs font-sans text-zinc-500 mt-1">
                Total recorded shipments & drops
              </p>
            </div>

            <Link
              to="/account/orders"
              className="mt-6 inline-flex items-center gap-1 text-xs font-sans font-medium text-zinc-900 hover:underline"
            >
              <span>View Order Status</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Delivery Address Card */}
          <div className="p-6 bg-zinc-50 border border-zinc-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-heading font-semibold uppercase tracking-wider text-zinc-500">Saved Address</span>
                <MapPin className="w-5 h-5 text-black" />
              </div>
              <div className="font-sans text-xs text-zinc-700 space-y-1">
                <div className="font-medium text-black">{user.name}</div>
                <div>{user.address?.street || "No address saved"}</div>
                <div>{user.address?.city} {user.address?.state} {user.address?.postalCode}</div>
                <div>India</div>
              </div>
            </div>

            <span className="mt-6 text-[11px] font-sans text-zinc-400">
              Used for 1-click checkout
            </span>
          </div>

          {/* Customer Care Card */}
          <div className="p-6 bg-zinc-50 border border-zinc-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-heading font-semibold uppercase tracking-wider text-zinc-500">Exchange & Support</span>
                <User className="w-5 h-5 text-black" />
              </div>
              <p className="text-xs font-sans text-zinc-600 leading-relaxed">
                Need to swap sizes or have questions regarding your order? Our Jodhpur concierge desk is available Monday through Saturday.
              </p>
            </div>

            <Link
              to="/pages/returns"
              className="mt-6 inline-flex items-center gap-1 text-xs font-sans font-medium text-zinc-900 hover:underline"
            >
              <span>Request 3-Day Size Exchange</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
