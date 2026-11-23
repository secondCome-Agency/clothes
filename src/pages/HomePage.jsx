import React from 'react';
import EndlessHero from '../components/EndlessHero';
import ProductRailGallery from '../components/ProductRailGallery';
import LatestDropCarousel from '../components/LatestDropCarousel';
import BrandStatement from '../components/BrandStatement';
import ProductFeatures from '../components/ProductFeatures';
import FrontBackPresentation from '../components/FrontBackPresentation';
import MoreProducts from '../components/MoreProducts';
import PromotionalTicker from '../components/PromotionalTicker';

export default function HomePage() {
  return (
    <div className="w-full bg-white text-zinc-900">
      {/* 21ST.DEV COMPONENT 1: Endless 3D Fashion Corridor Hero */}
      <EndlessHero />

      {/* 21ST.DEV COMPONENT 2: Interactive 1D Physics Clothing Rail Gallery (New Section) */}
      <ProductRailGallery />

      {/* Section 4: Curated Latest Drop Carousel */}
      <LatestDropCarousel />

      {/* Section 5: Brand statement */}
      <BrandStatement />

      {/* Section 6: Product features */}
      <ProductFeatures />

      {/* Section 7: Front/back product presentation */}
      <FrontBackPresentation />

      {/* Section 8: More Products */}
      <MoreProducts />

      {/* Section 9: Promotional ticker */}
      <PromotionalTicker />
    </div>
  );
}
