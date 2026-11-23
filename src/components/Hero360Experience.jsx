import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  RotateCw, 
  Play, 
  Pause, 
  Eye, 
  Layers, 
  Check, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RefreshCw,
  Sparkles,
  Maximize2
} from 'lucide-react';
import Mannequin360Canvas from './Mannequin360Canvas';
import ThreeMannequinScene from './ThreeMannequinScene';
import { HERO_LOOK } from '../data/products';

export default function Hero360Experience({ onAddToCart, onOpenSizeGuide, onOpenQuickView }) {
  // Interaction states
  const [angle, setAngle] = useState(0); // in radians
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [renderMode, setRenderMode] = useState('canvas'); // 'canvas' or 'webgl'
  const [selectedColor, setSelectedColor] = useState('pitch-black');
  const [selectedSize, setSelectedSize] = useState('L');
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [showWireframe, setShowWireframe] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Drag physics refs
  const containerRef = useRef(null);
  const lastPointerX = useRef(0);
  const velocity = useRef(0);
  const animFrameId = useRef(null);

  // Auto-rotation & inertia animation loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (!isDragging) {
        if (isAutoRotating) {
          // Slow steady editorial orbit
          setAngle((prev) => (prev + 0.35 * dt) % (2 * Math.PI));
        } else if (Math.abs(velocity.current) > 0.001) {
          // Inertia damping
          setAngle((prev) => (prev + velocity.current) % (2 * Math.PI));
          velocity.current *= 0.92; // Friction decay
        }
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameId.current);
  }, [isDragging, isAutoRotating]);

  // Pointer Drag Handlers
  const handlePointerDown = useCallback((e) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    lastPointerX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    velocity.current = 0;
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = currentX - lastPointerX.current;
    lastPointerX.current = currentX;

    // Calibrated rotation sensitivity
    const deltaAngle = deltaX * 0.008;
    velocity.current = deltaAngle;
    setAngle((prev) => (prev + deltaAngle) % (2 * Math.PI));
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Quick preset angles
  const setPresetAngle = (deg) => {
    setIsAutoRotating(false);
    velocity.current = 0;
    setAngle((deg * Math.PI) / 180);
  };

  // Convert current radian angle to degrees [0 - 360]
  const currentDeg = Math.round((((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) * (180 / Math.PI));

  // Determine current perspective label
  let perspectiveLabel = "FRONT 0°";
  if (currentDeg >= 45 && currentDeg < 135) perspectiveLabel = "RIGHT PROFILE 90°";
  else if (currentDeg >= 135 && currentDeg < 225) perspectiveLabel = "REAR BACKPRINT 180°";
  else if (currentDeg >= 225 && currentDeg < 315) perspectiveLabel = "LEFT PROFILE 270°";

  // Color options
  const colorOptions = [
    { id: 'pitch-black', name: 'Pitch Black', hex: '#0a0a0c', border: 'border-zinc-700' },
    { id: 'concrete-slate', name: 'Concrete Slate', hex: '#334155', border: 'border-slate-500' },
    { id: 'bone-white', name: 'Bone White', hex: '#e2e8f0', border: 'border-slate-300' },
  ];

  const handleBuyNow = () => {
    const itemToAdd = {
      ...HERO_LOOK,
      selectedColor: colorOptions.find(c => c.id === selectedColor)?.name || "Pitch Black",
      selectedSize: selectedSize
    };
    onAddToCart(itemToAdd);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section className="relative w-full min-h-[92vh] pt-24 pb-16 bg-[#09090b] overflow-hidden border-b border-zinc-800">
      {/* Background Editorial Watermark / Subtle Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-display font-extrabold text-zinc-900/60 select-none pointer-events-none tracking-tighter leading-none whitespace-nowrap">
        SAUR HAUL
      </div>

      {/* Hero Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neutral-700/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Editorial Eyebrow */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-800/80">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-950/60 text-rose-400 border border-rose-800/40 text-[11px] font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              DROP 01 // LIVE NOW
            </span>
            <span className="text-xs font-mono text-zinc-400">
              AUTUMN/WINTER ARCHIVE 2025
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span>ROTATION:</span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 text-rose-400 border border-zinc-700 font-bold">
              {currentDeg}°
            </span>
            <span className="text-zinc-500 uppercase">[{perspectiveLabel}]</span>
          </div>
        </div>

        {/* MAIN HERO SPLIT CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* LEFT COLUMN: Editorial Spec & Story (3 Cols on Desktop) */}
          <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col justify-between space-y-6">
            <div>
              <p className="text-xs font-mono text-rose-500 uppercase tracking-widest mb-1.5">
                // SPECIFICATION 01
              </p>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight leading-none mb-3">
                THE PHANTOM CUT.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Sculpted architectural volume. An uncompromising 450 GSM French Terry drape that retains structural drop shoulders without clinging. Designed for individuals who treat street attire as sculptural art.
              </p>
            </div>

            {/* Micro Feature Matrix */}
            <div className="space-y-3 pt-2">
              <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition">
                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">FABRIC WEIGHT</div>
                <div className="text-sm font-semibold text-white mt-0.5">450 GSM Heavy French Terry</div>
                <div className="text-xs text-zinc-400 mt-0.5">Diagonal loop backing, silicon pre-washed</div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition">
                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">PRINT PROCESS</div>
                <div className="text-sm font-semibold text-white mt-0.5">High-Density 3D Puff Ink</div>
                <div className="text-xs text-zinc-400 mt-0.5">Anti-crack, heat-cured matte finish</div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition">
                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">SILHOUETTE</div>
                <div className="text-sm font-semibold text-white mt-0.5">Exaggerated Drop-Shoulder Boxy</div>
                <div className="text-xs text-zinc-400 mt-0.5">Seamless front drape with double pleats</div>
              </div>
            </div>

            {/* Quick View Trigger Button */}
            <button
              onClick={() => onOpenQuickView(HERO_LOOK)}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 text-xs font-mono uppercase tracking-wider transition group"
            >
              <Eye className="w-4 h-4 text-rose-400 group-hover:scale-110 transition" />
              Inspect Full Technical Specs
            </button>
          </div>

          {/* CENTER COLUMN: 360° INTERACTIVE MANNEQUIN CENTERPIECE (6 Cols on Desktop) */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-center">
            
            {/* Mannequin Container */}
            <div 
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUp}
              className={`relative w-full max-w-[480px] h-[520px] sm:h-[600px] flex items-center justify-center rounded-2xl bg-gradient-to-b from-zinc-900/70 via-zinc-950/90 to-black border border-zinc-800/80 shadow-2xl overflow-hidden select-none ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
            >
              {/* Studio Backdrop Lighting Gradient */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.06),transparent_65%)] pointer-events-none" />
              
              {/* Hotspot Floating Markers */}
              {/* Hotspot: Chest Graphic (visible front) */}
              {Math.cos(angle) > 0.3 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(activeHotspot === 'chest' ? null : 'chest');
                  }}
                  style={{
                    left: `calc(50% + ${Math.sin(angle) * 60}px)`,
                    top: '32%'
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                >
                  <span className="relative flex h-6 w-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-rose-600 border-2 border-white items-center justify-center text-[10px] font-bold text-white shadow-lg">
                      +
                    </span>
                  </span>
                </button>
              )}

              {/* Hotspot: Rear Statement Spine (visible back) */}
              {Math.cos(angle) < -0.3 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(activeHotspot === 'back' ? null : 'back');
                  }}
                  style={{
                    left: `calc(50% + ${Math.sin(angle) * 50}px)`,
                    top: '36%'
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                >
                  <span className="relative flex h-6 w-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-rose-600 border-2 border-white items-center justify-center text-[10px] font-bold text-white shadow-lg">
                      +
                    </span>
                  </span>
                </button>
              )}

              {/* Hotspot: Tactical Cargo Pockets (visible sides) */}
              {Math.abs(Math.sin(angle)) > 0.4 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(activeHotspot === 'cargo' ? null : 'cargo');
                  }}
                  style={{
                    left: `calc(50% + ${(Math.sin(angle) > 0 ? 1 : -1) * 80}px)`,
                    top: '68%'
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                >
                  <span className="relative flex h-6 w-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-rose-600 border-2 border-white items-center justify-center text-[10px] font-bold text-white shadow-lg">
                      +
                    </span>
                  </span>
                </button>
              )}

              {/* Active Hotspot Popover Card */}
              {activeHotspot && (
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-16 left-4 right-4 z-30 p-3.5 rounded-xl bg-zinc-900/95 border border-zinc-700 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-200"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-mono text-rose-400 uppercase tracking-widest">
                        {activeHotspot === 'chest' && "TACTILE DETAIL // FRONT PUFF"}
                        {activeHotspot === 'back' && "OVERSIZED REAR PRINT // SPRAYED INK"}
                        {activeHotspot === 'cargo' && "TACTICAL UTILITY // CARGO BELLOWS"}
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5">
                        {activeHotspot === 'chest' && "High-Density Matte 3D Puff Typography"}
                        {activeHotspot === 'back' && "Iconic 'CHAOS & ART' Jodhpur Coordinates Statement"}
                        {activeHotspot === 'cargo' && "Articulated Double Knee Darts & Tension Pull Straps"}
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-1">
                        {activeHotspot === 'chest' && "Engineered with zero bleed and exceptional stretch memory."}
                        {activeHotspot === 'back' && "Curated narrative backprint for street presence from every angle."}
                        {activeHotspot === 'cargo' && "Engineered to drape seamlessly over chunky sneakers without drag."}
                      </div>
                    </div>
                    <button 
                      onClick={() => setActiveHotspot(null)}
                      className="text-zinc-500 hover:text-white p-1 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {/* Mannequin Renderer Mode */}
              {renderMode === 'canvas' ? (
                <Mannequin360Canvas 
                  angle={angle} 
                  color={selectedColor} 
                  isDragging={isDragging}
                  showWireframe={showWireframe}
                />
              ) : (
                <ThreeMannequinScene 
                  angle={angle} 
                  color={selectedColor} 
                  isDragging={isDragging}
                />
              )}

              {/* Drag to Rotate Indicator Banner */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-700/60 backdrop-blur-sm text-[11px] font-mono text-zinc-300 uppercase tracking-wider shadow-lg">
                <RotateCw className="w-3.5 h-3.5 text-rose-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>DRAG HORIZONTALLY TO ROTATE 360°</span>
              </div>

              {/* Live Degree Floating Pill */}
              <div className="absolute bottom-4 left-4 pointer-events-none flex items-center gap-2 px-2.5 py-1 rounded bg-black/70 border border-zinc-800 text-[10px] font-mono text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>{currentDeg}° YAW</span>
              </div>

              {/* Mode indicator */}
              <div className="absolute bottom-4 right-4 pointer-events-none text-[10px] font-mono text-zinc-500 uppercase">
                {renderMode === 'canvas' ? 'HIGH-RES 360°' : '3D WEBGL STUDIO'}
              </div>
            </div>

            {/* 360 Controls & Perspective Jump Bar */}
            <div className="w-full max-w-[480px] mt-4 flex flex-col gap-2.5">
              
              {/* Presets & Play / Pause Button */}
              <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPresetAngle(0)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase transition ${
                      currentDeg >= 345 || currentDeg <= 15 ? 'bg-rose-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    FRONT 0°
                  </button>
                  <button
                    onClick={() => setPresetAngle(90)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase transition ${
                      currentDeg >= 75 && currentDeg <= 105 ? 'bg-rose-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    SIDE 90°
                  </button>
                  <button
                    onClick={() => setPresetAngle(180)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase transition ${
                      currentDeg >= 165 && currentDeg <= 195 ? 'bg-rose-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    BACK 180°
                  </button>
                  <button
                    onClick={() => setPresetAngle(270)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase transition ${
                      currentDeg >= 255 && currentDeg <= 285 ? 'bg-rose-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    SIDE 270°
                  </button>
                </div>

                {/* Auto Rotate Play / Pause Toggle */}
                <button
                  onClick={() => setIsAutoRotating(!isAutoRotating)}
                  className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 font-mono transition ${
                    isAutoRotating ? 'bg-zinc-800 text-rose-400 border-zinc-700' : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                  }`}
                  title={isAutoRotating ? "Pause Orbit" : "Play Orbit"}
                >
                  {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span className="text-[10px] hidden sm:inline">{isAutoRotating ? 'ORBIT' : 'IDLE'}</span>
                </button>
              </div>

              {/* Sub-toolbar: Switch Render Engine & Wireframe */}
              <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase">ENGINE:</span>
                  <button
                    onClick={() => setRenderMode('canvas')}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition ${
                      renderMode === 'canvas' ? 'bg-zinc-800 text-white border border-zinc-700' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    EDITORIAL 360°
                  </button>
                  <button
                    onClick={() => setRenderMode('webgl')}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition ${
                      renderMode === 'webgl' ? 'bg-zinc-800 text-white border border-zinc-700' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    3D STUDIO GL
                  </button>
                </div>

                <button
                  onClick={() => setShowWireframe(!showWireframe)}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono transition ${
                    showWireframe ? 'text-rose-400 bg-rose-950/40 border border-rose-900' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span>CAD MESH</span>
                </button>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: Featured Outfit Purchase Card (3 Cols on Desktop) */}
          <div className="lg:col-span-3 order-3 flex flex-col justify-between space-y-6">
            
            {/* Outfit Title & Price Box */}
            <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-xl space-y-4">
              <div>
                <span className="inline-block px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-mono uppercase tracking-widest mb-2 font-bold">
                  ★ FEATURED OUTFIT // DROP 01
                </span>
                <h3 className="text-xl font-display font-bold text-white tracking-tight leading-snug">
                  {HERO_LOOK.name}
                </h3>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-2xl font-display font-extrabold text-white">
                    ₹{HERO_LOOK.price.toLocaleString()}
                  </span>
                  <span className="text-sm font-mono text-zinc-500 line-through">
                    ₹{HERO_LOOK.originalPrice.toLocaleString()}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 text-[10px] font-mono font-bold">
                    {HERO_LOOK.discount}
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400 mt-1 font-mono">
                  Inclusive of all taxes. Free Pan-India Delivery.
                </div>
              </div>

              {/* Colorway Selection */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-zinc-400 uppercase">COLORWAY:</span>
                  <span className="text-white font-medium">
                    {colorOptions.find(c => c.id === selectedColor)?.name}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {colorOptions.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColor(c.id)}
                      className={`relative w-8 h-8 rounded-full border-2 transition ${
                        selectedColor === c.id ? 'border-rose-500 scale-110 shadow-lg' : 'border-zinc-700 hover:border-zinc-500'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor === c.id && (
                        <Check className={`w-3.5 h-3.5 absolute inset-0 m-auto ${c.id === 'bone-white' ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-zinc-400 uppercase">SELECT SIZE:</span>
                  <button 
                    onClick={onOpenSizeGuide}
                    className="text-rose-400 hover:text-rose-300 underline underline-offset-2 text-[11px]"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {HERO_LOOK.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 text-xs font-mono font-bold rounded-lg border transition ${
                        selectedSize === s
                          ? 'bg-white text-black border-white shadow-md'
                          : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-zinc-400 mt-2 font-mono">
                  * Tailored for relaxed oversized fit. Size down for standard fit.
                </p>
              </div>

              {/* Actions: Add to Bag & Buy Now */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleBuyNow}
                  className={`w-full py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-display font-bold tracking-wide transition shadow-lg ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 hover:bg-rose-500 text-white active:scale-[0.98]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>ADDED TO BAG</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO BAG — ₹{HERO_LOOK.price.toLocaleString()}</span>
                    </>
                  )}
                </button>

                <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                  <span>PREPAID OFFER:</span>
                  <span className="text-rose-400 font-bold">₹100 OFF AT CHECKOUT</span>
                </div>
              </div>

              {/* Service Badges */}
              <div className="pt-2 border-t border-zinc-800/80 space-y-2 text-[11px] text-zinc-400 font-mono">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Ships in 24-48 hrs from Jodhpur, Rajasthan</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
                  <span>3-Day Hassle-Free Size Exchange policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                  <span>100% Verified Heavyweight French Terry Cotton</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
