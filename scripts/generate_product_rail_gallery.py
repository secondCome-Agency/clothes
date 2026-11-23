import re

with open('rail_bundle.html_script_1.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

start = text.find('const el=200')
idx_demo = text.find('function Qd(')
core_code = text[start:idx_demo]

print(f"Extracted from {start} to {idx_demo}: {len(core_code)} chars")

# 1. In Gd (Detail modal), find the front/back button group and inject price + action buttons
target_str = 'children:[R==="front"?L.front:L.back,o.jsx("span",{"aria-hidden":"true",className:`absolute inset-x-0 bottom-0 h-px origin-left bg-foreground transition-transform duration-300 motion-reduce:transition-none ${St===R?"scale-x-100":"scale-x-0"}`})]},R))})'

replacement_str = '''children:[R==="front"?L.front:L.back,o.jsx("span",{"aria-hidden":"true",className:`absolute inset-x-0 bottom-0 h-px origin-left bg-foreground transition-transform duration-300 motion-reduce:transition-none ${St===R?"scale-x-100":"scale-x-0"}`})]},R))}),
o.jsxs("div",{className:"flex items-center gap-3 justify-center md:justify-start pt-3",children:[
  o.jsx("span",{className:"text-2xl font-bold tracking-tight text-foreground font-display",children:O.tag||`₹${O.price?.toLocaleString('en-IN')}`}),
  O.originalPrice&&o.jsxs("span",{className:"text-sm text-muted-foreground line-through font-mono",children:[`₹${O.originalPrice.toLocaleString('en-IN')}`]}),
  O.discount&&o.jsx("span",{className:"rounded bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600 dark:bg-red-950 dark:text-red-400",children:O.discount})
]}),
o.jsxs("div",{className:"flex flex-col gap-2.5 pt-3",children:[
  o.jsx("button",{type:"button",onClick:()=>{jt();if(O.slug)window.location.href=`/products/${O.slug}`;},className:"w-full cursor-pointer rounded-full bg-foreground px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-background shadow-md transition-all hover:opacity-90 hover:scale-[1.01] active:scale-[0.98]",children:"View Full Product Details →"}),
  o.jsx("button",{type:"button",onClick:()=>{if(window.__saurHaulAddToCart&&O.fullProduct){window.__saurHaulAddToCart(O.fullProduct,"L",1);}},className:"w-full cursor-pointer rounded-full border border-foreground/30 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-foreground transition-all hover:bg-foreground/5",children:"Add to Bag (Size L)"})
]})'''

if target_str in core_code:
    core_code = core_code.replace(target_str, replacement_str, 1)
    print("Successfully injected price and buttons into Detail modal!")
else:
    print("Warning: target_str not found in core_code!")

header = '''// Component 2: Product Rail Gallery from 21st.dev (@dhxwhy/product-rail-gallery)
// Preserves original 1D physics simulation, spring swing, 3D hover turn, and detail modal.
import React, {
  useId, useRef, useState, useMemo, useEffect, useLayoutEffect, useCallback, Fragment
} from 'react';
import ReactDOM from 'react-dom';
import * as jsxRuntime from 'react/jsx-runtime';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

const o = jsxRuntime;
const K = React;
const Od = ReactDOM;
const c = (fn, name) => fn;

'''

footer = '''

// Map function wd to uppercase ClothingRail component so React properly instantiates it
const ClothingRail = wd;

export default function ProductRailGallery() {
  const navigate = useNavigate();
  const shop = useShop();

  // Expose addToCart globally for the portal modal dialog
  useEffect(() => {
    if (shop?.addToCart) {
      window.__saurHaulAddToCart = (prod, size = 'L', qty = 1) => {
        shop.addToCart(prod, size, qty);
      };
    }
    return () => {
      delete window.__saurHaulAddToCart;
    };
  }, [shop]);

  // Format real SAUR HAUL products into the rail items format
  const railItems = useMemo(() => {
    return PRODUCTS.map(p => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      kind: p.category === 'hoodies' ? 'hoodie' : 'tee',
      color: p.colors?.[0]?.hex || '#18181b',
      tag: `₹${p.price.toLocaleString('en-IN')}`,
      price: p.price,
      originalPrice: p.originalPrice,
      discount: p.discount,
      category: p.category,
      description: p.description,
      details: p.details?.slice(0, 3) || [],
      image: p.frontImage,
      backImage: p.backImage,
      fullProduct: p,
    }));
  }, []);

  return (
    <section id="clothing-rail" className="w-full bg-white text-zinc-900 py-16 border-b border-zinc-200">
      <ClothingRail
        items={railItems}
        hanger="wood"
        eyebrow="INTERACTIVE CLOTHING RAIL // DROP 01 ARCHIVE"
        heading="SLIDE THE RAIL · INSPECT THE CUTS"
        caption="Drag hangers along the rail, hover to reveal garment depth, or click any piece to inspect 360° front & back."
        autoplay={false}
        action={
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <button
              type="button"
              onClick={() => navigate('/collections/all')}
              className="rounded-full bg-black px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition-all hover:bg-zinc-800 hover:scale-105 active:scale-95 cursor-pointer"
            >
              Shop All Archive
            </button>
            <button
              type="button"
              onClick={() => navigate('/collections/tshirts')}
              className="rounded-full border border-zinc-300 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              View T-Shirts
            </button>
            <button
              type="button"
              onClick={() => navigate('/collections/hoodies')}
              className="rounded-full border border-zinc-300 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              View Hoodies
            </button>
          </div>
        }
      />
    </section>
  );
}
'''

full_content = header + core_code + footer

with open('src/components/ProductRailGallery.jsx', 'w', encoding='utf-8') as out:
    out.write(full_content)

print("Regenerated src/components/ProductRailGallery.jsx with ClothingRail = wd!")
