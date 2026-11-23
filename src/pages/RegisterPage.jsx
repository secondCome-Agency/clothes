import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function RegisterPage() {
  const { register } = useShop();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError("All required fields must be completed");
      return;
    }
    register(formData.name, formData.email, formData.password, formData.phone);
    navigate('/account');
  };

  return (
    <div className="w-full bg-[#fafafa] min-h-[75vh] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md bg-white border border-zinc-300 p-8 shadow-sm">
        
        <div className="text-center mb-8">
          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
            New Customer
          </span>
          <h1 className="text-2xl font-heading font-semibold text-zinc-900 tracking-tight">
            Create an Account
          </h1>
          <p className="text-xs font-sans text-zinc-500 mt-2">
            Join the inner circle for streamlined orders, exchanges, and private drops.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-sans">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
          <div>
            <label className="block font-medium text-zinc-700 mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Aaditya Varma"
              className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-300 focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block font-medium text-zinc-700 mb-1">Email Address *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="aaditya@example.com"
              className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-300 focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block font-medium text-zinc-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 99829 08861"
              className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-300 focus:outline-none focus:border-black font-mono"
            />
          </div>

          <div>
            <label className="block font-medium text-zinc-700 mb-1">Password *</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-300 focus:outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-black hover:bg-zinc-800 text-white font-medium text-xs transition"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-zinc-200 text-center font-sans text-xs text-zinc-500">
          <span>Already have an account? </span>
          <Link to="/account/login" className="text-black font-medium underline">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}
