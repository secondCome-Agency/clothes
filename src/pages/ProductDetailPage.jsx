import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Check, ShieldCheck, Truck, RefreshCw, Ruler } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useShop();

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'L');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'shipping' | 'care'
  const [sizeModalOpen, setSizeModalOpen] = useState(false);

  // Gallery images list
  const gallery = product.gallery || [product.frontImage, product.backImage].filter(Boolean);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  // Related products from same category or general catalog
  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="w-full bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="text-xs font-sans text-zinc-500 mb-8">
          <Link to="/" className="hover:underline">Home</Link> / 
          <Link to={`/collections/${product.category}`} className="hover:underline ml-1 capitalize">
            {product.category}
          </Link> / 
          <span className="text-zinc-900 font-medium ml-1">{product.name}</span>
        </div>

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Gallery Column (7 cols on Desktop) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* Main Featured Image */}
            <div className="relative w-full aspect-[4/5] bg-zinc-100 overflow-hidden border border-zinc-200">
              <img
                src={gallery[activeImageIndex] || product.frontImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 px-2.5 py-1 bg-black text-white text-[10px] font-mono uppercase tracking-wider font-medium">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails Row */}
            <div className="grid grid-cols-4 gap-3">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-[3/4] bg-zinc-100 border overflow-hidden transition ${
                    activeImageIndex === idx ? 'border-black ring-1 ring-black' : 'border-zinc-200 hover:border-zinc-400'
                  }`}
                >
                  <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

          </div>

          {/* Product Purchase Column (5 cols on Desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                {product.subtitle || "Drop 01 Edition"}
              </span>
              <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-zinc-900 tracking-tight">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl font-mono font-medium text-zinc-900">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono text-zinc-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.discount && (
                  <span className="px-2 py-0.5 bg-rose-600 text-white text-[10px] font-mono font-medium">
                    {product.discount}
                  </span>
                )}
              </div>
              <div className="text-xs font-sans text-zinc-500 mt-1">
                Inclusive of all taxes. Free Pan-India delivery on orders over ₹1,999.
              </div>

              {/* Color Selector if applicable */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-6 pt-4 border-t border-zinc-200">
                  <div className="text-xs font-sans text-zinc-700 mb-2">
                    Color: <span className="font-medium text-zinc-900">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`px-3 py-1.5 text-xs font-sans border transition ${
                          selectedColor === c.name
                            ? 'bg-black text-white border-black font-medium'
                            : 'bg-white text-zinc-700 border-zinc-300 hover:border-black'
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              <div className="mt-6 pt-4 border-t border-zinc-200">
                <div className="flex items-center justify-between text-xs font-sans mb-2">
                  <span className="text-zinc-700 font-medium">
                    Select Size:
                  </span>
                  <button
                    onClick={() => setSizeModalOpen(true)}
                    className="flex items-center gap-1 text-zinc-900 hover:underline font-medium"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSelectedSize(s);
                        setSizeError(false);
                      }}
                      className={`py-2.5 text-xs font-sans font-medium border transition ${
                        selectedSize === s
                          ? 'bg-black text-white border-black font-semibold shadow-sm'
                          : 'bg-white text-zinc-800 border-zinc-300 hover:border-black'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {sizeError && (
                  <p className="text-xs font-sans text-rose-600 mt-2">
                    * Please select a size before adding to bag.
                  </p>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mt-6 pt-4 border-t border-zinc-200 flex items-center gap-4 font-sans text-xs">
                <span className="text-zinc-700 font-medium">Quantity:</span>
                <div className="flex items-center border border-zinc-300">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 hover:bg-zinc-100 transition"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 font-mono font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 hover:bg-zinc-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Primary Action Buttons: Add to Cart & Buy Now */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 text-xs font-sans font-medium flex items-center justify-center gap-2 transition ${
                    isAdded ? 'bg-emerald-600 text-white' : 'bg-black hover:bg-zinc-800 text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag — ₹{(product.price * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 text-xs font-sans font-medium border-2 border-black bg-white hover:bg-black hover:text-white text-black transition flex items-center justify-center gap-2"
                >
                  <span>Buy It Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Reassurances */}
              <div className="mt-8 pt-6 border-t border-zinc-200 grid grid-cols-2 gap-4 text-xs font-sans text-zinc-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-zinc-900" />
                  <span>Pan-India Dispatch in 24–48 hrs</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-zinc-900" />
                  <span>3-Day Hassle-Free Size Exchange</span>
                </div>
              </div>

              {/* Product Specifications & Tabs */}
              <div className="mt-8 pt-6 border-t border-zinc-200">
                <div className="flex border-b border-zinc-200 text-xs font-sans font-medium">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2.5 px-3 transition border-b-2 ${
                      activeTab === 'details' ? 'border-black text-black font-semibold' : 'border-transparent text-zinc-400'
                    }`}
                  >
                    Details & Fabric
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-2.5 px-3 transition border-b-2 ${
                      activeTab === 'shipping' ? 'border-black text-black font-semibold' : 'border-transparent text-zinc-400'
                    }`}
                  >
                    Shipping & Exchange
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-2.5 px-3 transition border-b-2 ${
                      activeTab === 'care' ? 'border-black text-black font-semibold' : 'border-transparent text-zinc-400'
                    }`}
                  >
                    Care Guide
                  </button>
                </div>

                <div className="pt-4 text-xs font-sans text-zinc-600 leading-relaxed">
                  {activeTab === 'details' && (
                    <div className="space-y-3 font-sans">
                      <p>{product.description}</p>
                      <ul className="space-y-1 pt-2">
                        {product.details?.map((d, i) => (
                          <li key={i}>• {d}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'shipping' && (
                    <div className="space-y-2 font-sans">
                      <p>• Dispatched directly from Jodhpur, Rajasthan within 1–2 business days.</p>
                      <p>• Standard Pan-India delivery takes 2–5 business days.</p>
                      <p>• 3-day size exchange window applies from delivery date.</p>
                    </div>
                  )}

                  {activeTab === 'care' && (
                    <div className="space-y-2 font-sans">
                      <p>• Machine wash cold inside-out with like colors.</p>
                      <p>• Do not iron directly over high-density puff print.</p>
                      <p>• Lay flat or hang to air dry. Do not tumble dry high.</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Related Products Section */}
        <div className="mt-24 pt-12 border-t border-zinc-200">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
              CURATED COMPLEMENTS
            </span>
            <h2 className="text-2xl font-display font-extrabold text-black uppercase tracking-tight">
              YOU MAY ALSO LIKE
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>

      </div>

      {/* Size Guide Modal */}
      {sizeModalOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div 
            onClick={() => setSizeModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
          />
          <div className="min-h-screen px-4 flex items-center justify-center p-0">
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-white border border-zinc-300 p-6 sm:p-8 shadow-2xl my-8 text-left"
            >
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                <h3 className="text-lg font-display font-bold uppercase text-black">
                  SIZE & MEASUREMENT GUIDE
                </h3>
                <button 
                  onClick={() => setSizeModalOpen(false)}
                  className="text-zinc-500 hover:text-black font-mono text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-4 font-mono text-xs">
                <p className="text-zinc-600 font-sans">
                  * All dimensions represent actual garment measurements in inches.
                </p>

                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-200 text-zinc-500">
                      <th className="py-2">SIZE</th>
                      <th className="py-2">CHEST</th>
                      <th className="py-2">LENGTH</th>
                      <th className="py-2">SHOULDER</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    <tr><td className="py-2 font-bold">S</td><td>42"</td><td>28"</td><td>21"</td></tr>
                    <tr><td className="py-2 font-bold">M</td><td>44"</td><td>29"</td><td>22"</td></tr>
                    <tr><td className="py-2 font-bold">L</td><td>46"</td><td>30"</td><td>23"</td></tr>
                    <tr><td className="py-2 font-bold">XL</td><td>48"</td><td>31"</td><td>24"</td></tr>
                    <tr><td className="py-2 font-bold">XXL</td><td>50"</td><td>32"</td><td>25"</td></tr>
                  </tbody>
                </table>

                <div className="p-3 bg-zinc-50 border border-zinc-200 text-zinc-700">
                  <span className="font-bold">FIT PHILOSOPHY:</span> Designed for a signature relaxed oversized silhouette. If you prefer a standard fit, size down one size.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
