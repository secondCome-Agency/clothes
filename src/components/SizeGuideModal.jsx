import React, { useState } from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';

export default function SizeGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [unit, setUnit] = useState('inches'); // 'inches' or 'cm'

  const tShirtSizes = [
    { size: 'S', chestIn: '42', chestCm: '107', lengthIn: '28', lengthCm: '71', shoulderIn: '21', shoulderCm: '53' },
    { size: 'M', chestIn: '44', chestCm: '112', lengthIn: '29', lengthCm: '74', shoulderIn: '22', shoulderCm: '56' },
    { size: 'L', chestIn: '46', chestCm: '117', lengthIn: '30', lengthCm: '76', shoulderIn: '23', shoulderCm: '58' },
    { size: 'XL', chestIn: '48', chestCm: '122', lengthIn: '31', lengthCm: '79', shoulderIn: '24', shoulderCm: '61' },
    { size: 'XXL', chestIn: '50', chestCm: '127', lengthIn: '32', lengthCm: '81', shoulderIn: '25', shoulderCm: '64' },
  ];

  const hoodieSizes = [
    { size: 'S', chestIn: '44', chestCm: '112', lengthIn: '27', lengthCm: '69', sleeveIn: '24', sleeveCm: '61' },
    { size: 'M', chestIn: '46', chestCm: '117', lengthIn: '28', lengthCm: '71', sleeveIn: '24.5', sleeveCm: '62' },
    { size: 'L', chestIn: '48', chestCm: '122', lengthIn: '29', lengthCm: '74', sleeveIn: '25', sleeveCm: '63.5' },
    { size: 'XL', chestIn: '50', chestCm: '127', lengthIn: '30', lengthCm: '76', sleeveIn: '25.5', sleeveCm: '65' },
    { size: 'XXL', chestIn: '52', chestCm: '132', lengthIn: '31', lengthCm: '79', sleeveIn: '26', sleeveCm: '66' },
  ];

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />

      <div className="min-h-screen px-4 text-center flex items-center justify-center p-0">
        <div 
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 text-left my-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-rose-500" />
              <h3 className="text-xl font-display font-extrabold text-white">
                OFFICIAL FIT & SIZE CHART
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center justify-between my-6">
            <p className="text-xs text-zinc-400 font-mono">
              * MEASUREMENTS REPRESENT GARMENT DIMENSIONS, NOT BODY SIZE.
            </p>
            <div className="flex items-center rounded-lg bg-zinc-900 border border-zinc-800 p-0.5 text-xs font-mono">
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 rounded-md transition ${unit === 'inches' ? 'bg-white text-black font-bold' : 'text-zinc-400'}`}
              >
                INCHES
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 rounded-md transition ${unit === 'cm' ? 'bg-white text-black font-bold' : 'text-zinc-400'}`}
              >
                CM
              </button>
            </div>
          </div>

          {/* Table: Oversized Tees */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider mb-2">
                OVERSIZED TEES & WAFFLE KNITS (BOX FIT)
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-500">
                      <th className="py-2 px-3">SIZE</th>
                      <th className="py-2 px-3">CHEST ({unit.toUpperCase()})</th>
                      <th className="py-2 px-3">LENGTH ({unit.toUpperCase()})</th>
                      <th className="py-2 px-3">DROP SHOULDER ({unit.toUpperCase()})</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tShirtSizes.map((row) => (
                      <tr key={row.size} className="border-b border-zinc-900 text-zinc-300 hover:bg-zinc-900/50">
                        <td className="py-2.5 px-3 font-bold text-white">{row.size}</td>
                        <td className="py-2.5 px-3">{unit === 'inches' ? row.chestIn : row.chestCm}</td>
                        <td className="py-2.5 px-3">{unit === 'inches' ? row.lengthIn : row.lengthCm}</td>
                        <td className="py-2.5 px-3">{unit === 'inches' ? row.shoulderIn : row.shoulderCm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table: Heavyweight Hoodies */}
            <div>
              <h4 className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider mb-2">
                HEAVYWEIGHT FLEECE HOODIES (450 GSM)
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-500">
                      <th className="py-2 px-3">SIZE</th>
                      <th className="py-2 px-3">CHEST ({unit.toUpperCase()})</th>
                      <th className="py-2 px-3">LENGTH ({unit.toUpperCase()})</th>
                      <th className="py-2 px-3">SLEEVE LENGTH ({unit.toUpperCase()})</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hoodieSizes.map((row) => (
                      <tr key={row.size} className="border-b border-zinc-900 text-zinc-300 hover:bg-zinc-900/50">
                        <td className="py-2.5 px-3 font-bold text-white">{row.size}</td>
                        <td className="py-2.5 px-3">{unit === 'inches' ? row.chestIn : row.chestCm}</td>
                        <td className="py-2.5 px-3">{unit === 'inches' ? row.lengthIn : row.lengthCm}</td>
                        <td className="py-2.5 px-3">{unit === 'inches' ? row.sleeveIn : row.sleeveCm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sizing Recommendation Tip */}
          <div className="mt-6 p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 space-y-1">
            <div className="text-white font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>STREET FIT PHILOSOPHY</span>
            </div>
            <p>
              Take your true size for our designed dramatic boxy streetwear drape. If you prefer a closer standard fit, size down one size.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
