import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

// 12 High-Fashion Aesthetic Apparel Visuals from Pinterest for the 3D Corridor (T-shirts, Hoodies, Pants, Lowers)
const CORRIDOR_IMAGES = [
  "https://i.pinimg.com/736x/b7/8d/3b/b78d3bf33fb5020221930276afc87e4a.jpg", // Aesthetic Streetwear T-shirt
  "https://i.pinimg.com/736x/0f/c0/c3/0fc0c34cf8c79249fc9a247ec3fb4212.jpg", // Heavyweight Fleece Hoodie
  "https://i.pinimg.com/736x/1a/d4/1b/1ad41b03eda469d17ce2805cf7b6ef1b.jpg", // Tactical Cargo Pants
  "https://i.pinimg.com/736x/93/46/12/9346129af5383f824254fbbe79808ca9.jpg", // Aesthetic Fleece Lowers
  "https://i.pinimg.com/736x/ff/ec/c6/ffecc615f46954206474605f838a6ca1.jpg", // Minimal Graphic T-Shirt
  "https://i.pinimg.com/736x/90/49/8b/90498b541f67d7eeedf6114b3a0c6859.jpg", // Brushed Cotton Zip Hoodie
  "https://i.pinimg.com/736x/04/79/81/047981984a755665bd7d237375cd6e33.jpg", // Pleated Architectural Trousers
  "https://i.pinimg.com/736x/b8/79/23/b879238e8aa3368f23924c76643e24b2.jpg", // Drawstring Track Lowers
  "https://i.pinimg.com/736x/4a/37/3c/4a373c11982d7a9e8aa1dbd7db957d2b.jpg", // Heavyweight Boxy T-Shirt
  "https://i.pinimg.com/736x/02/2d/a9/022da9af9236e8c399c6710364865a59.jpg", // French Terry Slouch Hoodie
  "https://i.pinimg.com/736x/bb/68/4d/bb684dc2a061af58ac69574cd46c7f9b.jpg", // Wide-Leg Cargo Pants
  "https://i.pinimg.com/736x/1b/c5/16/1bc5161866c3c6235999d38149f75335.jpg"  // Baggy French Terry Lowers
];

// GSAP Constants matching 21st.dev Endless component
const TOTAL_PLANES = CORRIDOR_IMAGES.length;
const Z_START = -2400;
const Z_END = 780;
const Z_DISTANCE = Z_END - Z_START;
const DURATION = 16;
const FADE_IN = 0.06;
const FADE_OUT = 0.04;

function opacityForProgress(p) {
  if (p < FADE_IN) return Math.max(0, p / FADE_IN);
  if (p > 1 - FADE_OUT) return Math.max(0, (1 - p) / FADE_OUT);
  return 1;
}

function getLayout() {
  const w = window.innerWidth;
  const planeW = w < 768 ? Math.min(w * 0.28, 200) : Math.min(w * 0.26, 440);
  return {
    planeW,
    planeH: planeW * (4 / 3),
    offsetX: w < 768 ? Math.min(w * 0.38, 190) : Math.min(w * 0.33, 480),
    angle: 24
  };
}

export default function EndlessHero() {
  const worldRef = useRef(null);

  // GSAP 3D Corridor Animation Setup
  useEffect(() => {
    const worldEl = worldRef.current;
    if (!worldEl) return;

    const planes = Array.from(worldEl.querySelectorAll('.endless-plane'));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tweens = [];

    gsap.ticker.lagSmoothing(0);
    gsap.set(worldEl, { force3D: true });

    const applyLayout = () => {
      const { planeW, planeH, offsetX, angle } = getLayout();
      planes.forEach((plane, idx) => {
        const isLeft = idx % 2 === 0;
        plane.style.width = `${planeW}px`;
        plane.style.height = `${planeH}px`;
        gsap.set(plane, {
          xPercent: -50,
          yPercent: -50,
          x: isLeft ? -offsetX : offsetX,
          y: 0,
          rotationY: isLeft ? angle : -angle,
          force3D: true
        });
      });
    };

    applyLayout();

    planes.forEach((plane, idx) => {
      const img = plane.querySelector('img');
      const initialProgress = idx / TOTAL_PLANES;

      gsap.set(plane, { z: Z_START + initialProgress * Z_DISTANCE });
      if (img) img.style.opacity = String(opacityForProgress(initialProgress));
      plane.style.zIndex = String(Math.round(initialProgress * 1000));

      if (prefersReducedMotion) return;

      const tween = gsap.fromTo(
        plane,
        { z: Z_START },
        {
          z: Z_END,
          duration: DURATION,
          ease: 'none',
          repeat: -1,
          immediateRender: false,
          onUpdate() {
            const p = this.progress();
            if (img) img.style.opacity = String(opacityForProgress(p));
            plane.style.zIndex = String(Math.round(p * 1000));
          }
        }
      );

      tween.progress(initialProgress);
      tweens.push(tween);
    });

    window.addEventListener('resize', applyLayout);

    return () => {
      window.removeEventListener('resize', applyLayout);
      tweens.forEach(t => t.kill());
      gsap.killTweensOf(planes);
    };
  }, []);

  const scrollToDrop = (e) => {
    e.preventDefault();
    const el = document.getElementById('clothing-rail') || document.getElementById('latest-drop');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="endless-root" aria-label="SAUR HAUL Endless 3D Fashion Corridor">
      {/* 21st.dev Component Native CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .endless-root,
        .endless-root *,
        .endless-root *::before,
        .endless-root *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .endless-root {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background-color: #000000;
          color: #ffffff;
          font-family: inherit;
          user-select: none;
          isolation: isolate;
          z-index: 1;
        }

        .endless-root .endless-scene {
          position: absolute;
          inset: 0;
          -webkit-perspective: 1100px;
          perspective: 1100px;
          -webkit-perspective-origin: 50% 50%;
          perspective-origin: 50% 50%;
          -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
          pointer-events: none;
        }

        .endless-root .endless-world {
          position: absolute;
          inset: 0;
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
          -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
        }

        .endless-root .endless-plane {
          position: absolute;
          top: 50%;
          left: 50%;
          background-color: #000000;
          -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
          transform-origin: 50% 50%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          will-change: transform;
        }

        .endless-root .endless-plane img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
        }

        .endless-root .endless-title-container {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 10;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          pointer-events: none;
        }

        .endless-root .endless-title {
          color: #ffffff;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1;
          white-space: nowrap;
          text-transform: uppercase;
        }

        @media (min-width: 768px) {
          .endless-root .endless-title {
            font-size: 3.25rem;
            letter-spacing: -0.02em;
          }
        }

        @media (min-width: 1200px) {
          .endless-root .endless-title {
            font-size: 4.25rem;
            letter-spacing: -0.03em;
          }
        }

        .endless-root .endless-tagline {
          margin-top: 1rem;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.75);
        }

        @media (min-width: 768px) {
          .endless-root .endless-tagline {
            font-size: 0.8125rem;
          }
        }

        .endless-root .endless-cta-group {
          margin-top: 1.75rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          pointer-events: auto;
        }

        .endless-root .endless-footer {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          transform: translateX(-50%);
          color: #707070;
          pointer-events: auto;
        }

        @media (min-width: 768px) {
          .endless-root .endless-footer {
            bottom: 2rem;
          }
        }

        .endless-root .endless-globe {
          display: block;
          flex-shrink: 0;
        }

        .endless-root .endless-caption {
          color: #707070;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 400;
          letter-spacing: 0;
          line-height: 1.4;
          text-align: center;
          white-space: nowrap;
        }

        @supports (-webkit-touch-callout: none) {
          .endless-root {
            overflow: visible;
            -webkit-clip-path: inset(0);
            clip-path: inset(0);
          }
        }
      `}} />

      {/* 3D Endless Perspective Scene */}
      <div className="endless-scene">
        <div className="endless-world" ref={worldRef}>
          {CORRIDOR_IMAGES.map((src, idx) => (
            <div key={idx} className="endless-plane">
              <img 
                src={src} 
                alt={`SAUR HAUL Campaign ${idx + 1}`} 
                loading="eager" 
                decoding="async" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Center Endless Title & Brand Statement */}
      <div className="endless-title-container">
        <h1 className="endless-title">SAUR HAUL</h1>
        <p className="endless-tagline">AUTUMN / WINTER 2025 · ARCHIVE DROP 01</p>
        
        <div className="endless-cta-group">
          <a
            href="#clothing-rail"
            onClick={scrollToDrop}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-sans font-medium text-black transition-all duration-300 hover:bg-zinc-200 hover:scale-105 shadow-md"
          >
            <span>Explore Latest Drop</span>
            <ArrowDown className="size-3.5" />
          </a>

          <Link
            to="/collections/all"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-6 py-2.5 text-xs font-sans font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white/10"
          >
            <span>View Catalog</span>
          </Link>
        </div>
      </div>

      {/* Footer from 21st.dev Component */}
      <div className="endless-footer">
        <svg
          className="endless-globe"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          aria-hidden="true"
        >
          <path
            stroke="currentColor"
            strokeWidth="1"
            d="M23 12c0 -6.075 -4.925 -11 -11 -11m11 11c0 6.075 -4.925 11 -11 11m11 -11c0 2.21 -4.925 4 -11 4S1 14.21 1 12M12 1C5.925 1 1 5.925 1 12M12 1c2.761 0 5 4.925 5 11s-2.239 11 -5 11m0 -22C9.239 1 7 5.925 7 12s2.239 11 5 11M1 12c0 6.075 4.925 11 11 11"
          />
        </svg>
        <p className="endless-caption">
          Ideas that move brands forward · Jodhpur, India
        </p>
      </div>
    </section>
  );
}
