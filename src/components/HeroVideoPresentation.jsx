import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, RotateCw, Sparkles } from 'lucide-react';

export default function HeroVideoPresentation() {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative w-full bg-[#f8f8f9] border-b border-zinc-200 overflow-hidden">
      
      {/* Hero Visual Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Editorial Campaign Headlines */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-zinc-300 text-black text-[11px] font-mono uppercase tracking-widest w-fit">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span>DROP 01 // AUTUMN WINTER ARCHIVE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-black uppercase leading-[1.05]">
              ARCHITECTURAL STREETWEAR.
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-sans max-w-md">
              Dense 240–450 GSM French Terry cotton tailored with exaggerated drop shoulders and deep boxy drapes. Inspect the complete silhouette from every perspective.
            </p>

            {/* Quick Specs Matrix */}
            <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
              <div className="p-3 bg-white border border-zinc-200">
                <span className="text-[10px] text-zinc-400 block uppercase">FABRIC</span>
                <span className="font-bold text-black mt-0.5 block">450 GSM Loop-Back</span>
              </div>
              <div className="p-3 bg-white border border-zinc-200">
                <span className="text-[10px] text-zinc-400 block uppercase">CUT</span>
                <span className="font-bold text-black mt-0.5 block">Boxy Drop-Shoulder</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/collections/all"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-black hover:bg-zinc-800 text-white text-xs font-mono font-bold uppercase tracking-wider transition shadow-sm"
              >
                <span>SHOP LATEST DROP</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products/phantom-oversized-fleece-hoodie"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white hover:bg-zinc-100 text-black border border-zinc-300 text-xs font-mono font-bold uppercase tracking-wider transition"
              >
                <span>VIEW HERO HOODIE</span>
              </Link>
            </div>
          </div>

          {/* Right Column: AUTOMATIC 360-DEGREE ROTATING MANNEQUIN VIDEO */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[520px] aspect-[4/5] bg-white rounded-lg border border-zinc-300 overflow-hidden shadow-sm flex items-center justify-center">
              
              {/* Rotating Turntable Video */}
              <video
                ref={videoRef}
                src="/assets/videos/mannequin-360.mp4"
                poster="/assets/images/mannequin-poster.jpg"
                autoPlay
                loop
                muted
                playsInline
                onLoadedData={() => setVideoLoaded(true)}
                className="w-full h-full object-cover object-center"
              />

              {/* Top Badge: 360 Rotating Indicator */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-zinc-200 text-black text-[10px] font-mono tracking-wider uppercase shadow-sm">
                <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                <span>AUTOMATIC 360° ROTATION</span>
              </div>

              {/* Bottom Angle Perspective Indicators */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-[10px] font-mono text-zinc-700 bg-white/90 backdrop-blur-sm px-3 py-1.5 border border-zinc-200 shadow-sm">
                <span>FRONT // PROFILE // REAR BACKPRINT</span>
                <span className="font-bold text-black">SEAMLESS LOOP</span>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
