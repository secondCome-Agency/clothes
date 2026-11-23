# SAUR HAUL — Premium Fashion & Streetwear E-Commerce Platform

A production-grade, complete fashion e-commerce website architected for **SAUR HAUL**, modeled after the editorial street aesthetic and section hierarchy of [haux.in](https://www.haux.in/).

---

## 1. Primary Design System & Aesthetic (HAUX-Aligned)
- **Visual Atmosphere:** Clean, minimalist, high-fashion editorial aesthetic with crisp off-white/white backgrounds (`#ffffff` / `#fafafa`), stark black typography, clean 1px border lines, and generous whitespace.
- **Zero Distractions:** No generic purple gradients, no glassmorphism, no neon dashboard widgets, no heavy drop shadows, no artificial cartoon graphics.
- **Typography:** `Syne` for bold statement headings, `Inter` for clean body typography, and `Space Mono` for technical garment specifications and coordinates.

---

## 2. Complete Storefront Structure

### A. Homepage (`/`)
1. **Header & Navigation:**
   - SAUR HAUL wordmark
   - Nav links: *Home*, *Categories* (with dropdown: *T-shirts*, *Hoodies*, *Bottomwear*, *Catalog*), *T-shirts*, *Hoodies*, *Bottomwear*, *Catalog*
   - Action triggers: Search modal, Account portal, Shopping Bag with live item counter
   - Responsive mobile navigation drawer
2. **Announcement Ticker:**
   - Smooth continuous infinite loop with fast dispatch, Pan-India delivery, and promotional messages
3. **Hero Fashion Presentation (Signature Centerpiece):**
   - **Automatic 360-degree rotating turntable video** displaying a realistic fashion mannequin wearing the complete outfit
   - Autoplay, muted, loop, playsinline, with poster image while loading
   - Seamless 360-degree rotation showing front, profile, and back views
4. **Latest Drop:**
   - Responsive horizontal product carousel with previous/next scroll arrows
   - Clean product cards displaying name, category, price, discount badge, and "Discover More" link
5. **Brand Statement:**
   - Editorial storytelling: *"FOR THE MISFITS, THE DREAMERS, AND THE ONES WHO FIND ART IN CHAOS."*
6. **Product Features:**
   - 4-pillar quality grid: 240–450 GSM French Terry Cotton, Oversized Boxy Silhouette, 3D Puff Print Quality, and Pre-Shrunk Bio-Washed Construction
7. **Front/Back Garment Flip Presentation:**
   - Interactive product showcase with functional **"SHOW FRONT"** / **"SHOW BACK"** controls
   - Direct size selector and Add to Cart integration
8. **More Products:**
   - Curated grid of additional products with consistent product cards
9. **Promotional Ticker:**
   - Secondary promotional marquee strip
10. **Footer:**
    - Multi-column layout with Brand Identity, Help, Orders & Returns, Policies, FAQ, Studio details, Social links, and Newsletter subscription

---

### B. Category & Collection Pages
- `/collections/all` — Complete streetwear catalog
- `/collections/tshirts` — 240–260 GSM oversized tees & waffle knits
- `/collections/hoodies` — 450–480 GSM heavyweight brushed & loop-back fleece hoodies
- `/collections/bottomwear` — Tactical pleated cargos & street trousers
- **Features:** Size filtering (S, M, L, XL, XXL), price range filtering, sorting (Featured, Price: Low-High, Price: High-Low, Top Rated), empty states, and responsive grids.

---

### C. Product Detail Page (`/products/:slug`)
- Large product gallery with thumbnail switcher (front, back, alternate details)
- Product name, price, original price, discount
- **Required Size Selector** with validation before cart actions
- Color selector
- Quantity increment / decrement
- **"ADD TO CART"** with real-time feedback
- **"BUY NOW"** direct checkout navigation
- Comprehensive fabric specifications, care instructions, and sizing chart modal
- Accordion for Pan-India dispatch (24–48 hrs) and 3-Day Size Exchange policy
- Curated "You May Also Like" related products

---

### D. Shopping Cart (`/cart`)
- Persistent in `localStorage` across page refreshes
- Line items with product image, name, size, color, unit price, quantity modifiers, and remove action
- **Free Delivery Progress Bar** (Free over ₹1,999)
- Coupon code engine (`HAUL100` for ₹100 off, `SAUR10` for 10% off)
- Itemized summary: Subtotal, Shipping, Discount, Estimated Total
- Direct link to Checkout

---

### E. Checkout (`/checkout`)
- Clean two-column layout
- Contact info & Shipping destination form with complete field validation
- Payment preference selector: Prepaid UPI, Cards, NetBanking, COD
- Transparent integration disclaimer: Identified as gateway placeholder without falsely marking orders as paid
- Submits order to persistent order history in `ShopContext` and navigates to Orders page

---

### F. Customer Account & Orders
- `/account` — Customer profile, contact details, saved address, logout
- `/account/login` — Customer login
- `/account/register` — Customer registration
- `/account/orders` — Complete order history with order number, items, tracking number, status, and payment details

---

### G. Client Services & Policy Pages
- `/pages/contact` — Studio address, operational hours, and functional inquiry form
- `/pages/returns` — 3-day exchange policy, eligibility rules, and functional exchange ticket submission form
- `/pages/shipping` — Dispatch timeline, logistics partners, and delivery fees
- `/pages/privacy-policy` — Data protection and security commitments
- `/pages/terms` — Terms of service
- `/pages/faq` — Frequently asked questions
- `/pages/our-story` — The Saur Haul brand manifesto

---

## 3. Tech Stack
- **Framework:** React 18 + React Router Dom (v7)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (Minimal Editorial Theme)
- **Icons:** Lucide React
- **Media:** 360° Rotating Mannequin Turntable MP4 (`public/assets/videos/mannequin-360.mp4`) + Poster Image (`public/assets/images/mannequin-poster.jpg`)

---

## 4. How to Run
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
