import React, { useState } from 'react';
import { Product, Category, ColorOption, Currency } from '../types/store';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, Sparkles, RefreshCw, ShieldAlert, ArrowUpDown } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
  currency?: Currency;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color: ColorOption, size: string) => void;
  onQuickView: (product: Product) => void;
  onProductClick?: (product: Product) => void;
  onOpenSizeGuide: () => void;
  activeFilterSize?: string | null;
  onClearSizeFilter?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  currency = 'BDT',
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  onProductClick,
  onOpenSizeGuide,
  activeFilterSize,
  onClearSizeFilter,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [exchangeOnlyFilter, setExchangeOnlyFilter] = useState<boolean>(false);

  // Filter products by category
  let filtered = products.filter((p) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'new-arrivals') return p.featured;
    return p.category === activeCategory;
  });

  // Filter by size if active
  if (activeFilterSize) {
    filtered = filtered.filter((p) => p.sizes.includes(activeFilterSize));
  }

  // Filter by exchange policy
  if (exchangeOnlyFilter) {
    filtered = filtered.filter((p) => !p.isHygieneFinalSale);
  }

  // Sort products
  filtered.sort((a, b) => {
    if (sortBy === 'price-low') {
      const priceA = currency === 'BDT' ? a.priceBDT : a.priceUSD;
      const priceB = currency === 'BDT' ? b.priceBDT : b.priceUSD;
      return priceA - priceB;
    }
    if (sortBy === 'price-high') {
      const priceA = currency === 'BDT' ? a.priceBDT : a.priceUSD;
      const priceB = currency === 'BDT' ? b.priceBDT : b.priceUSD;
      return priceB - priceA;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'All Essentials' },
    { id: 'tops', label: 'Tops & Tees' },
    { id: 'skirts', label: 'Skirts & Bottoms' },
    { id: 'leggings', label: 'Leggings & Active' },
    { id: 'intimates', label: 'Bras & Intimates' },
    { id: 'new-arrivals', label: 'New Arrivals' },
  ];

  return (
    <section id="collection-grid" className="py-12 sm:py-16 bg-[#FAF7F2] border-t border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Category Pills Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C08272] mb-1">
              Shop The Wardrobe
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#26392D]" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
              Designed For Daily Ease
            </h2>
          </div>

          {/* Interactive Category Segmented Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EFE8DE] rounded-xl overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#26392D] text-white shadow-xs font-semibold'
                    : 'text-[#4F6253] hover:text-[#26392D]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar: Filters & Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 mb-8 border-y border-[#E8E1D5] text-xs text-[#526557]">
          
          {/* Active Filter Indicators */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-semibold text-[#26392D]">
              Showing {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
            </span>

            {activeFilterSize && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#26392D] text-white text-[11px]">
                <span>Size: {activeFilterSize}</span>
                <button
                  onClick={onClearSizeFilter}
                  className="hover:text-[#C08272] ml-0.5"
                  title="Remove size filter"
                >
                  ×
                </button>
              </span>
            )}

            {/* Exchange Policy Quick Toggle */}
            <button
              onClick={() => setExchangeOnlyFilter(!exchangeOnlyFilter)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-colors ${
                exchangeOnlyFilter
                  ? 'bg-[#26392D] text-white border-[#26392D]'
                  : 'bg-white text-[#4A5D4F] border-[#DFD5C7] hover:bg-[#FAF7F2]'
              }`}
            >
              <RefreshCw className="w-3 h-3 text-[#C08272]" />
              <span>7-Day Exchangeable Only</span>
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[#76897B] flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#DFD5C7] rounded-lg px-2.5 py-1.5 text-xs text-[#26392D] focus:outline-none focus:border-[#26392D]"
            >
              <option value="featured">Featured Essentials</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>

        </div>

        {/* Product Cards Grid */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <h4 className="font-serif text-2xl text-[#26392D]">No items found</h4>
            <p className="text-xs text-[#6F8273]">
              Try removing the selected size or policy filters.
            </p>
            {activeFilterSize && (
              <button
                onClick={onClearSizeFilter}
                className="px-4 py-2 bg-[#26392D] text-white text-xs font-semibold rounded-xl"
              >
                Clear Size Filter
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                isWishlisted={wishlist.some((w) => w.id === product.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                onProductClick={onProductClick}
                onOpenSizeGuide={onOpenSizeGuide}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
