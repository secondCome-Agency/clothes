import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("Please complete all required fields.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-white min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
            Client Concierge & Studio
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-zinc-900 tracking-tight">
            Contact Saur Haul
          </h1>
          <p className="text-sm font-sans text-zinc-600 mt-2 leading-relaxed">
            Have questions regarding upcoming drops, fabric specifications, or existing order dispatches? Reach out directly to our Jodhpur studio team.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#fafafa] border border-zinc-300 p-6 sm:p-10">
            {submitted ? (
              <div className="text-center py-12 space-y-4 font-sans text-xs">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-base font-heading font-semibold text-zinc-900">
                  Message Dispatched Successfully
                </h3>
                <p className="text-zinc-600 max-w-sm mx-auto">
                  Thank you for reaching out, {formData.name}. Our client relations team will respond within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                  }}
                  className="mt-4 px-6 py-2.5 bg-black text-white font-medium text-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-sans text-xs">
                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block font-medium text-zinc-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Karan Singhania"
                    className="w-full px-3.5 py-2.5 bg-white border border-zinc-300 focus:outline-none focus:border-black"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-zinc-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="karan@example.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-zinc-300 focus:outline-none focus:border-black"
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
                      className="w-full px-3.5 py-2.5 bg-white border border-zinc-300 focus:outline-none focus:border-black font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-zinc-700 mb-1">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-white border border-zinc-300 focus:outline-none focus:border-black cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Tracking">Order Dispatch Status</option>
                    <option value="Size Exchange">Size Exchange Inquiry</option>
                    <option value="Press / Collaboration">Collaboration / Press</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-zinc-700 mb-1">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what you need assistance with..."
                    className="w-full px-3.5 py-2.5 bg-white border border-zinc-300 focus:outline-none focus:border-black text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-black hover:bg-zinc-800 text-white font-medium text-xs flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Studio Information (5 cols) */}
          <div className="lg:col-span-5 space-y-8 font-sans text-xs">
            <div className="p-6 bg-white border border-zinc-300 space-y-4">
              <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-zinc-900 block">
                Atelier & Design Lab
              </span>
              <div className="space-y-3 text-zinc-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-zinc-900 block">SAUR HAUL WORKSHOP</span>
                    <span className="text-zinc-600">Plot 164, Khasra 226, Chopasni, Shankar Nagar, Jodhpur, Rajasthan - 342008</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-black flex-shrink-0" />
                  <span className="text-zinc-600">info.saurhaul@gmail.com</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-black flex-shrink-0" />
                  <span className="text-zinc-600">+91 99829 08861</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-zinc-300 space-y-2">
              <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-zinc-900 block">
                Operational Hours
              </span>
              <p className="text-zinc-600">Monday to Friday: 10:00 AM – 7:00 PM IST</p>
              <p className="text-zinc-600">Saturday: 10:00 AM – 5:00 PM IST</p>
              <p className="text-zinc-400">Sunday: Closed for drop production</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
