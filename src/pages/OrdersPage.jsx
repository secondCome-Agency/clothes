import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, ArrowRight, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function OrdersPage() {
  const { orders } = useShop();

  return (
    <div className="w-full bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-xs font-sans text-zinc-500 mb-4">
          <Link to="/account" className="hover:underline">Account</Link> / Orders
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-10 border-b border-zinc-200 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-zinc-900 tracking-tight">
              Orders & Shipments
            </h1>
            <p className="text-xs font-sans text-zinc-500 mt-1">
              Review order status, tracking numbers, and dispatch details.
            </p>
          </div>

          <Link
            to="/collections/all"
            className="px-5 py-2.5 bg-black text-white text-xs font-sans font-medium hover:bg-zinc-800 transition"
          >
            Shop New Drop
          </Link>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50 border border-zinc-200 max-w-xl mx-auto">
            <Package className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
            <h3 className="text-base font-display font-bold text-black uppercase">NO ORDERS PLACED YET</h3>
            <p className="text-xs font-mono text-zinc-500 mt-1">Once you confirm an order, its dispatch updates will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, idx) => (
              <div key={idx} className="bg-white border border-zinc-300 p-6 sm:p-8 space-y-6">
                
                {/* Order Top Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-200 gap-2 font-mono text-xs">
                  <div>
                    <span className="font-bold text-black text-sm">ORDER #{order.orderNumber}</span>
                    <span className="text-zinc-500 ml-3">PLACED ON {order.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-zinc-100 border border-zinc-300 text-black font-bold uppercase text-[10px]">
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="divide-y divide-zinc-100">
                  {order.items.map((item, i) => (
                    <div key={i} className="py-3 flex items-center justify-between font-mono text-xs">
                      <div className="flex items-center gap-3">
                        {item.image && (
                          <img src={item.image} alt={item.name} className="w-12 h-14 object-cover border border-zinc-200" />
                        )}
                        <div>
                          <span className="font-bold text-black block uppercase">{item.name}</span>
                          <span className="text-zinc-500 text-[10px]">SIZE: {item.size} • QTY: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-black">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Order Summary & Tracking Footer */}
                <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                  <div className="space-y-1 text-zinc-600">
                    <div>TRACKING: <span className="font-bold text-black">{order.trackingNumber || "PENDING"}</span></div>
                    <div>PAYMENT: <span className="text-black">{order.paymentMethod}</span></div>
                    {order.paymentStatus && <div className="text-[10px] text-amber-700">STATUS: {order.paymentStatus}</div>}
                  </div>

                  <div className="text-right">
                    <span className="text-zinc-500 text-[11px] block">TOTAL AMOUNT</span>
                    <span className="text-lg font-bold text-black">₹{order.total.toLocaleString()}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
