import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryGrid } from './components/CategoryGrid';
import { ProductGrid } from './components/ProductGrid';
import { SizeGuideModal } from './components/SizeGuideModal';
import { ChatWidget } from './components/ChatWidget';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { BottomNavBar } from './components/BottomNavBar';
import { Footer } from './components/Footer';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { PRODUCTS } from './data/products';
import { Product, CartItem, Category, ColorOption } from './types/store';

export type PageView = 'home' | 'shop' | 'product' | 'checkout' | 'account';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [activeSizeFilter, setActiveSizeFilter] = useState<string | null>(null);

  // Modals and Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart State (initialize with 1 starter item for instant interactive delight)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'libaah-bra-01-Almond Nude-34C',
      product: PRODUCTS[3], // Luna Zero-Wire Sculpting Bra
      selectedColor: PRODUCTS[3].colors[0],
      selectedSize: '34C',
      quantity: 1,
    },
  ]);

  // Wishlist State
  const [wishlist, setWishlist] = useState<Product[]>([PRODUCTS[0]]);

  // Keyboard shortcut for search (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigation handlers
  const handleNavigate = (page: PageView, category?: Category) => {
    if (category) {
      setActiveCategory(category);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToShop = () => {
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setCurrentPage('home');
    setActiveCategory('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenShop = () => {
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (product: Product, color: ColorOption, size: string, quantity: number = 1) => {
    const itemId = `${product.id}-${color.name}-${size}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity,
        },
      ];
    });
  };

  const handleBuyNow = (product: Product, color: ColorOption, size: string, quantity: number) => {
    handleAddToCart(product, color, size, quantity);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlist((prev) => prev.filter((p) => p.id !== product.id));
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#243329] selection:bg-[#C08272]/20 selection:text-[#243329] pb-16 lg:pb-0">
      
      {/* 1. Global Navigation Bar (Clean, User-Friendly, BDT-Only, No Currency Switcher) */}
      <Navbar
        currentPage={currentPage}
        activeCategory={activeCategory}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onNavigate={handleNavigate}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <main className="flex-1">
        {/* VIEW 1: HOME PAGE */}
        {currentPage === 'home' && (
          <>
            {/* Hero Section */}
            <HeroBanner
              onShopClick={() => handleNavigate('shop', 'all')}
              onFitAdvisorClick={() => setIsSizeGuideOpen(true)}
            />

            {/* Category Grid Showcase (Bento Layout) */}
            <CategoryGrid onSelectCategory={(cat) => handleNavigate('shop', cat)} />

            {/* Featured Collection Grid */}
            <ProductGrid
              products={PRODUCTS}
              activeCategory={activeCategory}
              onSelectCategory={(cat) => handleNavigate('shop', cat)}
              currency="BDT"
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={(p, c, s) => handleAddToCart(p, c, s, 1)}
              onQuickView={(p) => setQuickViewProduct(p)}
              onProductClick={handleProductClick}
              onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
              activeFilterSize={activeSizeFilter}
              onClearSizeFilter={() => setActiveSizeFilter(null)}
            />
          </>
        )}

        {/* VIEW 2: SHOP PAGE WITH FILTERS */}
        {currentPage === 'shop' && (
          <ShopPage
            products={PRODUCTS}
            initialCategory={activeCategory}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={(p, c, s) => handleAddToCart(p, c, s, 1)}
            onProductClick={handleProductClick}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          />
        )}

        {/* VIEW 3: SINGLE PRODUCT DETAIL PAGE */}
        {currentPage === 'product' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            relatedProducts={PRODUCTS.filter((p) => p.id !== selectedProduct.id)}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={(p, c, s, qty) => {
              handleAddToCart(p, c, s, qty);
              setIsCartOpen(true);
            }}
            onBuyNow={handleBuyNow}
            onProductClick={handleProductClick}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
            onBackToShop={handleBackToShop}
          />
        )}

        {/* VIEW 4: DISCREET CHECKOUT PAGE */}
        {currentPage === 'checkout' && (
          <CheckoutPage
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onBackToShop={handleBackToShop}
            onGoToAccount={() => handleNavigate('account')}
          />
        )}

        {/* VIEW 5: DEDICATED CUSTOMER PANEL */}
        {currentPage === 'account' && (
          <AccountPage
            wishlist={wishlist}
            onOpenWishlist={() => setIsWishlistOpen(true)}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
            onBackToShop={handleBackToShop}
            onProductClick={handleProductClick}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => handleNavigate('shop', cat)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenAccount={() => handleNavigate('account')}
      />

      {/* Mobile Bottom Navigation Bar (Home, Shop, Carts, Account) */}
      <BottomNavBar
        currentPage={currentPage}
        activeCategory={activeCategory}
        cartCount={totalCartCount}
        onGoHome={handleGoHome}
        onOpenShop={handleOpenShop}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAccount={() => handleNavigate('account')}
      />

      {/* 5. Universal Sizing & Fit Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        onApplySizeFilter={(size) => {
          setActiveSizeFilter(size);
          handleNavigate('shop', 'all');
        }}
      />

      {/* 6. Embedded AI Fit Advisor Chat Bubble */}
      <ChatWidget
        currency="BDT"
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onQuickView={(p) => setQuickViewProduct(p)}
        onAddToCart={(p, c, s) => handleAddToCart(p, c, s, 1)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        currency="BDT"
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(p, c, s) => handleAddToCart(p, c, s, 1)}
        onQuickView={(p) => {
          setIsWishlistOpen(false);
          handleProductClick(p);
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        currency="BDT"
        onSelectProduct={(p) => {
          setIsSearchOpen(false);
          handleProductClick(p);
        }}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        currency="BDT"
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, c, s) => handleAddToCart(p, c, s, 1)}
        isWishlisted={quickViewProduct ? wishlist.some((w) => w.id === quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenSizeGuide={() => {
          setQuickViewProduct(null);
          setIsSizeGuideOpen(true);
        }}
        onViewProductDetails={(p) => {
          setQuickViewProduct(null);
          handleProductClick(p);
        }}
      />

    </div>
  );
}
