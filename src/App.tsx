/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CatalogSection } from './components/CatalogSection';
import { BrandPhilosophy } from './components/BrandPhilosophy';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { Toast } from './components/Toast';

const StoreContent: React.FC = () => {
  const { selectedProduct, setSelectedProduct } = useStore();

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-stone-800 selection:text-white">
      {/* 1. Slim Promotional Notification */}
      <AnnouncementBar />

      {/* 2. Top Bar Contract Header */}
      <Header onNavigateSection={scrollToCatalog} />

      {/* 3. Main Storefront Content */}
      <main className="flex-1">
        {/* Campaign Hero with Adjacency Proof Strip */}
        <HeroSection onExploreClick={scrollToCatalog} />

        {/* Catalog Section with Category Filters, Search & 3-Column Grid */}
        <CatalogSection />

        {/* Brand Story & Artisanal Craftsmanship */}
        <BrandPhilosophy />
      </main>

      {/* 4. Footer with Showroom Locations & Newsletter */}
      <Footer />

      {/* Overlays, Drawers & Modals */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <OrderTrackingModal />
      <WishlistDrawer />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  );
}
