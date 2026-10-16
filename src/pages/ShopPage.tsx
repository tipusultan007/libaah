import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  X, 
  SlidersHorizontal, 
  RefreshCw, 
  ShieldAlert, 
  Search, 
  ChevronDown, 
  Sparkles,
  ArrowUpDown,
  Check
} from 'lucide-react';
import { Product, Category, ColorOption } from '../types/store';
import { ProductCard } from '../components/ProductCard';

interface ShopPageProps {
  products: Product[];
  initialCategory?: Category;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color: ColorOption, size: string) => void;
  onProductClick: (product: Product) => void;
  onOpenSizeGuide: () => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  initialCategory = 'all',
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onProductClick,
  onOpenSizeGuide,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [exchangeOnly, setExchangeOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(8000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Available filter options
  const allSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '32B', '34B', '34C', '36B', '36C', '38C', '38D'];
  const allColors = [
    { name: 'Dusty Rose', hex: '#C08272' },
    { name: 'Warm Ivory', hex: '#F5EFE6' },
    { name: 'Moss Sage', hex: '#6C7E6D' },
    { name: 'Sand Cream', hex: '#EDE6DB' },
    { name: 'Almond Nude', hex: '#CEB29F' },
    { name: 'Midnight Onyx', hex: '#262927' },
  ];

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'All Collections' },
    { id: 'tops', label: 'Tops & T-Shirts' },
    { id: 'skirts', label: 'Skirts & Bottoms' },
    { id: 'leggings', label: 'Leggings & Active' },
    { id: 'intimates', label: 'Bras & Intimates' },
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          p.name.toLowerCase().includes(q) || 
          p.description.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q);
        if (!matches) return false;
      }
      // Price filter
      if (p.priceBDT > maxPrice) {
        return false;
      }
      // Size filter
      if (selectedSize && !p.sizes.includes(selectedSize)) {
        return false;
      }
      // Color filter
      if (selectedColor && !p.colors.some(c => c.name === selectedColor)) {
        return false;
      }
      // Exchange only filter
      if (exchangeOnly && p.isHygieneFinalSale) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.priceBDT - b.priceBDT;
      if (sortBy === 'price-high') return b.priceBDT - a.priceBDT;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, maxPrice, selectedSize, selectedColor, exchangeOnly, sortBy]);

  const activeFiltersCount = 
    (selectedCategory !== 'all' ? 1 : 0) + 
    (selectedSize ? 1 : 0) + 
    (selectedColor ? 1 : 0) + 
    (exchangeOnly ? 1 : 0) + 
    (maxPrice < 8000 ? 1 : 0);

  const handleClearAll = () => {
    setSelectedCategory('all');
    setSelectedSize(null);
    setSelectedColor(null);
    setExchangeOnly(false);
    setMaxPrice(8000);
    setSearchQuery('');
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Breadcrumb & Header */}
        <div className="mb-8">
          <div className="text-xs text-[#7A8E80] flex items-center gap-2 mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-[#26392D] font-medium">Shop Collections</span>
            {selectedCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="capitalize text-[#C08272]">{selectedCategory}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#26392D] font-normal" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
                {selectedCategory === 'all' ? 'All Modest Essentials' : categories.find(c => c.id === selectedCategory)?.label}
              </h1>
              <p className="text-xs sm:text-sm text-[#5D7062] mt-1">
                Refined silhouettes crafted with bamboo modal, zero underwire, and 100% discrete shipping.
              </p>
            </div>

            {/* Mobile Filter Toggle Button */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="flex-1 py-2.5 px-4 bg-[#26392D] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#C08272]" />
                <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-2.5 px-3 bg-white border border-[#E3DBD0] rounded-xl text-xs text-[#26392D] font-medium"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout Grid: Desktop Sidebar + Product Catalog */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================
              DESKTOP FILTER SIDEBAR (Span 3)
             ======================================================== */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-3xl border border-[#E8E1D5] space-y-6 shadow-2xs sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D5]">
              <div className="flex items-center gap-2 text-sm font-bold text-[#26392D]">
                <Filter className="w-4 h-4 text-[#C08272]" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#C08272] text-white text-[11px] flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-xs text-[#C08272] hover:underline font-medium"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* 1. Category Filter */}
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#869A8C] block">
                Category
              </span>
              <div className="space-y-1">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`w-full text-left py-1.5 px-2.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedCategory === c.id
                        ? 'bg-[#26392D] text-white font-semibold'
                        : 'text-[#4A5D4F] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span>{c.label}</span>
                    <span className="text-[11px] opacity-70">
                      {c.id === 'all' ? products.length : products.filter(p => p.category === c.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Price Range Slider */}
            <div className="space-y-2 pt-2 border-t border-[#E8E1D5]">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-wider font-semibold text-[#869A8C]">
                  Max Price
                </span>
                <span className="font-bold text-[#26392D] tabular-nums">
                  ৳{maxPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={2500}
                max={8000}
                step={250}
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-[#26392D] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8C9F92]">
                <span>৳2,500</span>
                <span>৳8,000</span>
              </div>
            </div>

            {/* 3. Size Filter */}
            <div className="space-y-2 pt-2 border-t border-[#E8E1D5]">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#869A8C]">
                  Size
                </span>
                <button
                  type="button"
                  onClick={onOpenSizeGuide}
                  className="text-[11px] text-[#C08272] hover:underline font-semibold"
                >
                  Size Calculator
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {allSizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(isSelected ? null : sz)}
                      className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                        isSelected
                          ? 'bg-[#26392D] text-white shadow-2xs font-semibold'
                          : 'bg-[#F2ECE3] text-[#4A5D4E] hover:bg-[#E9E1D5]'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Color Swatches */}
            <div className="space-y-2 pt-2 border-t border-[#E8E1D5]">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#869A8C] block">
                Color
              </span>
              <div className="flex flex-wrap gap-2">
                {allColors.map((color) => {
                  const isSelected = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(isSelected ? null : color.name)}
                      className={`relative w-6 h-6 rounded-full border transition-all ${
                        isSelected
                          ? 'scale-115 ring-2 ring-[#26392D] ring-offset-2'
                          : 'border-black/15 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto drop-shadow-sm" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Policy Filter */}
            <div className="pt-2 border-t border-[#E8E1D5] space-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#4F6253]">
                <input
                  type="checkbox"
                  checked={exchangeOnly}
                  onChange={(e) => setExchangeOnly(e.target.checked)}
                  className="accent-[#26392D] rounded"
                />
                <span>7-Day Exchangeable Only</span>
              </label>
            </div>
          </aside>

          {/* ========================================================
              PRODUCTS GRID & TOOLBAR (Span 9)
             ======================================================== */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Desktop Toolbar: Search & Sort Bar */}
            <div className="bg-white p-4 rounded-2xl border border-[#E8E1D5] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              {/* Search Within Results */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-[#8C9F92] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search in collection..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] rounded-xl border border-[#E8E1D5] focus:outline-none focus:border-[#26392D] text-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-[#8C9F92] hover:text-[#26392D]"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Sorting and Count */}
              <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3">
                <span className="text-[#6C8072]">
                  <strong>{filteredProducts.length}</strong> items available
                </span>

                <div className="hidden sm:flex items-center gap-1.5">
                  <span className="text-[#8C9F92] flex items-center gap-1">
                    <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="py-1.5 px-3 bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl text-xs font-semibold text-[#26392D] focus:outline-none focus:border-[#26392D]"
                  >
                    <option value="featured">Featured Essentials</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filters Badges */}
            {activeFiltersCount > 0 && (
              <div className="flex items-center gap-2 flex-wrap text-xs text-[#526557]">
                <span className="font-semibold text-[#26392D]">Active filters:</span>
                
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#26392D] text-white text-[11px]">
                    <span>Category: {categories.find(c => c.id === selectedCategory)?.label}</span>
                    <button onClick={() => setSelectedCategory('all')}>×</button>
                  </span>
                )}

                {selectedSize && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#26392D] text-white text-[11px]">
                    <span>Size: {selectedSize}</span>
                    <button onClick={() => setSelectedSize(null)}>×</button>
                  </span>
                )}

                {selectedColor && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#26392D] text-white text-[11px]">
                    <span>Color: {selectedColor}</span>
                    <button onClick={() => setSelectedColor(null)}>×</button>
                  </span>
                )}

                {exchangeOnly && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#26392D] text-white text-[11px]">
                    <span>7-Day Exchange</span>
                    <button onClick={() => setExchangeOnly(false)}>×</button>
                  </span>
                )}

                {maxPrice < 8000 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#26392D] text-white text-[11px]">
                    <span>Under ৳{maxPrice.toLocaleString()}</span>
                    <button onClick={() => setMaxPrice(8000)}>×</button>
                  </span>
                )}

                <button
                  onClick={handleClearAll}
                  className="text-xs text-[#C08272] hover:underline font-semibold ml-2"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center bg-white rounded-3xl border border-[#E8E1D5] p-8 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#F4EFE7] flex items-center justify-center mx-auto text-[#728577]">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl text-[#26392D]">No matching items found</h3>
                <p className="text-xs text-[#6F8274] max-w-sm mx-auto">
                  Try adjusting your size, color, or price filters to discover our modest apparel and intimate collections.
                </p>
                <button
                  onClick={handleClearAll}
                  className="px-6 py-2.5 bg-[#26392D] text-white text-xs font-semibold rounded-xl hover:bg-[#344B3C]"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* Product Grid */
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
                {filteredProducts.map((p) => (
                  <div 
                    key={p.id}
                    onClick={() => onProductClick(p)}
                    className="cursor-pointer"
                  >
                    <ProductCard
                      product={p}
                      currency="BDT"
                      isWishlisted={wishlist.some(w => w.id === p.id)}
                      onToggleWishlist={onToggleWishlist}
                      onAddToCart={onAddToCart}
                      onQuickView={onProductClick}
                      onOpenSizeGuide={onOpenSizeGuide}
                    />
                  </div>
                ))}
              </div>
            )}

          </main>

        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-[#FAF7F2] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D5]">
                <h3 className="font-serif text-xl text-[#26392D]">Filter Products</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-[#26392D]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Filter Controls */}
              <div className="py-5 space-y-6 text-xs">
                {/* Categories */}
                <div>
                  <span className="font-bold text-[#26392D] block mb-2">Category</span>
                  <div className="space-y-1">
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCategory(c.id)}
                        className={`w-full text-left py-2 px-3 rounded-lg font-medium transition-colors ${
                          selectedCategory === c.id
                            ? 'bg-[#26392D] text-white font-semibold'
                            : 'text-[#4A5D4F] hover:bg-[#F2ECE3]'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Max Price */}
                <div>
                  <div className="flex justify-between font-bold text-[#26392D] mb-1">
                    <span>Max Price</span>
                    <span>৳{maxPrice.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={2500}
                    max={8000}
                    step={250}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full accent-[#26392D]"
                  />
                </div>

                {/* Sizes */}
                <div>
                  <span className="font-bold text-[#26392D] block mb-2">Size</span>
                  <div className="flex flex-wrap gap-1.5">
                    {allSizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(selectedSize === sz ? null : sz)}
                        className={`px-3 py-1.5 rounded-lg font-semibold ${
                          selectedSize === sz
                            ? 'bg-[#26392D] text-white'
                            : 'bg-white border border-[#E3DBD0] text-[#4A5D4F]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 7-Day exchange only */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-[#26392D]">
                    <input
                      type="checkbox"
                      checked={exchangeOnly}
                      onChange={(e) => setExchangeOnly(e.target.checked)}
                      className="accent-[#26392D] rounded"
                    />
                    <span>7-Day Exchangeable Only</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E1D5] flex gap-2">
              <button
                onClick={handleClearAll}
                className="flex-1 py-3 bg-[#EAE2D5] text-[#26392D] font-semibold text-xs rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 bg-[#26392D] text-white font-semibold text-xs rounded-xl"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
