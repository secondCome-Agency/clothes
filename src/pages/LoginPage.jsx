import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function LoginPage() {
  const { login } = useShop();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please provide both email and password");
      return;
    }
    login(email, password);
    navigate('/account');
  };

  return (
    <div className="w-full bg-[#fafafa] min-h-[75vh] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md bg-white border border-zinc-300 p-8 shadow-sm">
        
        <div className="text-center mb-8">
          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
            Customer Portal
          </span>
          <h1 className="text-2xl font-heading font-semibold text-zinc-900 tracking-tight">
            Sign In to Saur Haul
          </h1>
          <p className="text-xs font-sans text-zinc-500 mt-2">
            Access your order history and saved delivery addresses.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-sans">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
          <div>
            <label className="block font-medium text-zinc-700 mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="karan@example.com"
              className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-300 focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-medium text-zinc-700">Password *</label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset link sent to registered email address."); }} className="text-[11px] text-zinc-500 hover:text-black underline">
                Forgot?
              </a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-300 focus:outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-black hover:bg-zinc-800 text-white font-medium text-xs transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-zinc-200 text-center font-sans text-xs text-zinc-500">
          <span>Don't have an account? </span>
          <Link to="/account/register" className="text-black font-medium underline">
            Create account
          </Link>
        </div>

      </div>
    </div>
  );
}
