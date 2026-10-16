import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Ruler, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  User
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { Category } from '../types/store';

interface NavbarProps {
  currentPage: 'home' | 'shop' | 'product' | 'checkout' | 'account';
  activeCategory: Category;
  cartCount: number;
  wishlistCount: number;
  onNavigate: (page: 'home' | 'shop' | 'checkout' | 'account', category?: Category) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenSizeGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  activeCategory,
  cartCount,
  wishlistCount,
  onNavigate,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenSizeGuide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock background scroll when mobile offcanvas is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems: { label: string; action: () => void; isActive: boolean }[] = [
    {
      label: 'Home',
      action: () => onNavigate('home', 'all'),
      isActive: currentPage === 'home',
    },
    {
      label: 'Shop All',
      action: () => onNavigate('shop', 'all'),
      isActive: currentPage === 'shop' && activeCategory === 'all',
    },
    {
      label: 'Tops',
      action: () => onNavigate('shop', 'tops'),
      isActive: currentPage === 'shop' && activeCategory === 'tops',
    },
    {
      label: 'Skirts',
      action: () => onNavigate('shop', 'skirts'),
      isActive: currentPage === 'shop' && activeCategory === 'skirts',
    },
    {
      label: 'Leggings',
      action: () => onNavigate('shop', 'leggings'),
      isActive: currentPage === 'shop' && activeCategory === 'leggings',
    },
    {
      label: 'Intimates',
      action: () => onNavigate('shop', 'intimates'),
      isActive: currentPage === 'shop' && activeCategory === 'intimates',
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E1D5] transition-all">
        {/* Top Announcement Bar (All BDT) */}
        <div className="bg-[#26392D] text-[#FAF7F2] text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-3">
          <span className="flex items-center gap-1.5 opacity-90">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C08272]" />
            <span>100% Discreet Packaging: Plain, Unmarked Box for Complete Privacy</span>
          </span>
          <span className="hidden md:inline opacity-40">·</span>
          <span className="hidden md:inline opacity-90">
            Free Delivery over ৳5,000 across Bangladesh
          </span>
        </div>

        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ==============================================================
              MOBILE HEADER (Below topbar):
              - Logo on LEFT side
              - Search bar before navbar icon on RIGHT side
              - Navbar (hamburger) icon on far right
             ============================================================== */}
          <div className="flex lg:hidden items-center justify-between h-20 gap-3">
            
            {/* Mobile Left: Brand Logo */}
            <div className="flex items-center justify-start flex-1 min-w-0">
              <button
                onClick={() => onNavigate('home', 'all')}
                className="text-left focus-visible:outline-none flex items-center py-1"
                title="LIBAAH - Home"
              >
                <BrandLogo size="md" />
              </button>
            </div>

            {/* Mobile Right: Search Bar followed by Navbar Icon */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Search Bar Button before Navbar Icon */}
              <button
                onClick={onOpenSearch}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0EAE1] hover:bg-[#EAE2D7] text-[#55695B] border border-[#E3DBD0] transition-colors text-xs font-medium"
                title="Search products"
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-[#C08272]" />
                <span className="text-[11px] hidden xs:inline text-[#708476]">Search...</span>
              </button>

              {/* Navbar (Hamburger) Icon on the Far Right */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -mr-1 text-[#26392D] hover:text-[#C08272] rounded-xl hover:bg-[#F0EAE1] transition-colors focus-visible:outline-none"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

          </div>

          {/* ==============================================================
              DESKTOP HEADER:
              - Left: Brand Logo
              - Center: Simplified Navigation (Home, Shop All, Tops, Skirts, etc.)
              - Right: Search, Wishlist, Cart (No Currency Switcher)
             ============================================================== */}
          <div className="hidden lg:flex items-center justify-between h-22 sm:h-24 lg:h-26 gap-6">
            
            {/* Desktop Left: Brand Logo */}
            <div className="flex items-center">
              <button
                onClick={() => onNavigate('home', 'all')}
                className="text-left group transition-transform hover:scale-102 focus-visible:outline-none flex items-center py-1"
                title="LIBAAH - Home"
              >
                <BrandLogo size="md" />
              </button>
            </div>

            {/* Desktop Center: Navigation Menu */}
            <nav className="flex items-center space-x-7 xl:space-x-8 text-sm font-medium">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className={`relative py-2.5 whitespace-nowrap text-sm tracking-wide transition-colors ${
                    item.isActive
                      ? 'text-[#26392D] font-bold'
                      : 'text-[#4F6354] hover:text-[#26392D]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#26392D] rounded-full" />
                  )}
                </button>
              ))}

              {/* Discreet Sizing Assistant Pill */}
              <button
                onClick={onOpenSizeGuide}
                className="flex items-center gap-1.5 text-xs text-[#C08272] hover:text-[#A7695A] font-semibold tracking-wide px-3 py-1.5 rounded-full bg-[#C08272]/10 hover:bg-[#C08272]/20 border border-[#C08272]/30 transition-all whitespace-nowrap"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide</span>
              </button>
            </nav>

            {/* Desktop Right: Utility Actions (Search, Wishlist, Bag) */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Instant Search Bar Trigger */}
              <button
                onClick={onOpenSearch}
                className="p-2.5 text-[#26392D] hover:text-[#C08272] hover:bg-[#F2ECE3] rounded-full transition-colors"
                title="Search products (⌘K)"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Button */}
              <button
                onClick={onOpenWishlist}
                className="p-2.5 text-[#26392D] hover:text-[#C08272] hover:bg-[#F2ECE3] rounded-full transition-colors relative"
                title="View Wishlist"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#C08272] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag Drawer Trigger */}
              <button
                onClick={onOpenCart}
                className="p-2.5 text-[#26392D] hover:text-[#C08272] hover:bg-[#F2ECE3] rounded-full transition-colors relative"
                title="Open Shopping Bag"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-[#26392D] text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-[#FAF7F2]">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Dedicated Customer Account Panel Trigger */}
              <button
                onClick={() => onNavigate('account')}
                className={`p-2.5 rounded-full transition-colors relative ${
                  currentPage === 'account'
                    ? 'bg-[#26392D] text-white shadow-xs'
                    : 'text-[#26392D] hover:text-[#C08272] hover:bg-[#F2ECE3]'
                }`}
                title="Customer Panel / My Account"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>
      </header>

      {/* Mobile Offcanvas Drawer rendered via Portal */}
      {typeof document !== 'undefined' && mobileMenuOpen && createPortal(
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Offcanvas Sliding Panel */}
          <div className="fixed inset-y-0 left-0 w-[85vw] max-w-[340px] h-full bg-[#FAF7F2] shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300 z-10 border-r border-[#E8E1D5]">
            
            {/* Header with Larger Logo & Close Button */}
            <div className="p-5 border-b border-[#E8E1D5] bg-[#FAF7F2] sticky top-0 z-10 flex items-center justify-between">
              <button 
                onClick={() => {
                  onNavigate('home', 'all');
                  setMobileMenuOpen(false);
                }}
                className="text-left"
              >
                <BrandLogo size="md" />
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#26392D] hover:text-[#C08272] rounded-full hover:bg-[#F0EAE1] transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 p-5 space-y-5 overflow-y-auto">
              
              {/* Search button in drawer */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#F0EAE1] border border-[#E3DBD0] text-xs font-semibold text-[#26392D]"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#C08272]" />
                  <span>Search Products...</span>
                </span>
                <span className="text-[10px] text-[#718576]">Quick Finder</span>
              </button>

              {/* Navigation Links */}
              <div>
                <span className="text-[11px] uppercase tracking-widest font-bold text-[#8C9E91] block px-1 mb-2">
                  Menu
                </span>
                
                <div className="space-y-1.5">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        item.action();
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-between transition-all ${
                        item.isActive
                          ? 'bg-[#26392D] text-white shadow-xs'
                          : 'text-[#26392D] hover:bg-[#F0EAE1]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className={`w-4 h-4 ${item.isActive ? 'text-[#C08272]' : 'text-[#96A79B]'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Guide Trigger */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSizeGuide();
                }}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-[#26392D] bg-[#F2ECE3] hover:bg-[#EAE2D7] border border-[#E3D9CC] flex items-center justify-between shadow-2xs transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#26392D] flex items-center justify-center text-white">
                    <Ruler className="w-3.5 h-3.5 text-[#C08272]" />
                  </div>
                  <span>Bra &amp; Apparel Size Guide</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#C08272]" />
              </button>

              {/* Wishlist Shortcut */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWishlist();
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#26392D] hover:bg-[#F0EAE1] flex items-center justify-between transition-colors border border-[#E8E1D5]"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#C08272]" />
                  <span>My Saved Wishlist</span>
                </div>
                {wishlistCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#C08272] text-white text-[10px] font-bold">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Dedicated Customer Panel Shortcut */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('account');
                }}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors border ${
                  currentPage === 'account'
                    ? 'bg-[#26392D] text-white border-[#26392D]'
                    : 'text-[#26392D] hover:bg-[#F0EAE1] border-[#E8E1D5]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <User className={`w-4 h-4 ${currentPage === 'account' ? 'text-[#C08272]' : 'text-[#26392D]'}`} />
                  <span>Customer Panel &amp; Orders</span>
                </div>
                <span className="text-[10px] opacity-75">View &rarr;</span>
              </button>

            </div>

            {/* Footer Trust Note */}
            <div className="p-5 border-t border-[#E8E1D5] bg-[#F4EFE7]/80 space-y-2 text-xs text-[#526557]">
              <div className="flex items-center gap-2 font-semibold text-[#26392D]">
                <ShieldCheck className="w-4 h-4 text-[#C08272] shrink-0" />
                <span>100% Discreet Packaging</span>
              </div>
              <p className="text-[11px] text-[#718475] leading-relaxed">
                Cash on delivery available across all districts in Bangladesh.
              </p>
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  );
};
