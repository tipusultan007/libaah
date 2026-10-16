import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Zap, 
  ShieldCheck, 
  RefreshCw, 
  ShieldAlert, 
  Ruler, 
  Plus, 
  Minus, 
  Check, 
  Star, 
  Truck, 
  Feather, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft,
  Share2
} from 'lucide-react';
import { Product, ColorOption } from '../types/store';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  product: Product;
  relatedProducts: Product[];
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color: ColorOption, size: string, quantity: number) => void;
  onBuyNow: (product: Product, color: ColorOption, size: string, quantity: number) => void;
  onProductClick: (product: Product) => void;
  onOpenSizeGuide: () => void;
  onBackToShop: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  relatedProducts,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onProductClick,
  onOpenSizeGuide,
  onBackToShop,
}) => {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [isAddedFeedback, setIsAddedFeedback] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<'fabric' | 'fit' | 'shipping' | null>('fabric');

  const isWishlisted = wishlist.some(w => w.id === product.id);

  const formatBDT = (amount: number) => `৳${amount.toLocaleString()}`;

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 1600);
  };

  const handleBuy = () => {
    onBuyNow(product, selectedColor, selectedSize, quantity);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6 text-xs text-[#718576]">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToShop}
              className="flex items-center gap-1 text-[#26392D] font-medium hover:text-[#C08272] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Collections</span>
            </button>
            <span>/</span>
            <span className="capitalize">{product.categoryLabel}</span>
            <span>/</span>
            <span className="text-[#26392D] font-semibold truncate max-w-xs">{product.name}</span>
          </div>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: product.name, url: window.location.href });
              }
            }}
            className="hidden sm:flex items-center gap-1.5 text-xs text-[#526557] hover:text-[#26392D]"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>

        {/* 2-Column Product Detail Layout (PDP) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* ========================================================
              LEFT COLUMN: High-Fidelity Multi-Image Gallery (Span 6)
             ======================================================== */}
          <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-28">
            {/* Primary Main Image Showcase */}
            <div className="relative aspect-4/3 sm:aspect-square w-full rounded-3xl overflow-hidden bg-white shadow-sm border border-[#E8E1D5] group">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
              />

              {/* Tag indicator overlay */}
              <div className="absolute top-4 left-4">
                {product.isHygieneFinalSale ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#26392D]/95 text-white shadow-sm border border-white/20">
                    <ShieldAlert className="w-3.5 h-3.5 text-[#C08272]" />
                    <span>Sanitary Sealed · Final Sale</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF7F2]/95 text-[#26392D] shadow-sm border border-[#D9D0C3]">
                    <RefreshCw className="w-3.5 h-3.5 text-[#C08272]" />
                    <span>7-Day Free Size Exchange</span>
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => onToggleWishlist(product)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#26392D] shadow-md backdrop-blur-xs transition-colors"
                title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isWishlisted ? 'fill-[#C08272] text-[#C08272]' : 'text-[#26392D]'
                  }`}
                />
              </button>
            </div>

            {/* Gallery Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                      activeImageIdx === idx
                        ? 'border-[#26392D] ring-2 ring-[#C08272]/40 scale-102'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Discreet Packaging Assurance Box */}
            <div className="p-4 rounded-2xl bg-[#F0EAE1] border border-[#DDD3C4] flex items-center gap-3 text-xs text-[#526557]">
              <ShieldCheck className="w-5 h-5 text-[#C08272] shrink-0" />
              <div>
                <strong className="text-[#26392D] block">100% Discreet Cardboard Delivery</strong>
                <span>Shipped in plain, unbranded packaging with neutral shipping labels.</span>
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: Stable Contiguous Purchase Module (Span 6)
             ======================================================== */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-3 pb-6 border-b border-[#E8E1D5]">
              {/* Category & Badge */}
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-bold text-[#869A8C]">
                  {product.categoryLabel}
                </span>
                <span className="text-xs text-[#869A8C]">·</span>
                <span className="text-xs text-[#C08272] font-semibold">
                  Authentic Guaranteed
                </span>
              </div>

              {/* Product Title */}
              <h1 className="font-serif text-3xl sm:text-4xl text-[#26392D] font-normal leading-tight" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 text-xs text-[#5D7062]">
                <div className="flex items-center text-[#C08272]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C08272]" />
                  ))}
                </div>
                <span className="font-bold text-[#26392D]">{product.rating}</span>
                <span>·</span>
                <span className="underline underline-offset-2">{product.reviewsCount} customer reviews</span>
              </div>

              {/* Price Block in BDT */}
              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#26392D] tabular-nums">
                  {formatBDT(product.priceBDT)}
                </span>
                {product.originalPriceBDT && (
                  <>
                    <span className="text-base text-[#8FA295] line-through tabular-nums">
                      {formatBDT(product.originalPriceBDT)}
                    </span>
                    <span className="text-xs font-bold text-[#C08272] bg-[#C08272]/15 px-2 py-0.5 rounded-full border border-[#C08272]/30">
                      Save {formatBDT(product.originalPriceBDT - product.priceBDT)}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-[#546759] leading-relaxed pt-1">
                {product.description}
              </p>
            </div>

            {/* Color Swatch Picker */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#637668]">
                <span>Selected Shade: <strong className="text-[#26392D]">{selectedColor.name}</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-7 h-7 rounded-full border transition-all ${
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

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#637668]">
                <span>Select Size: <strong className="text-[#26392D]">{selectedSize}</strong></span>
                <button
                  type="button"
                  onClick={onOpenSizeGuide}
                  className="text-xs font-semibold text-[#C08272] hover:underline flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size &amp; Bra Fit Calculator</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                        isSelected
                          ? 'bg-[#26392D] text-white shadow-xs'
                          : 'bg-[#F2ECE3] text-[#4A5E50] hover:bg-[#EAE2D7]'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & Buy Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#DFD5C7] rounded-xl bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-[#4A5E4F] hover:text-[#26392D]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 text-sm font-bold text-[#26392D] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-[#4A5E4F] hover:text-[#26392D]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3.5 px-6 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs ${
                    isAddedFeedback
                      ? 'bg-[#366141] text-white'
                      : 'bg-[#FAF7F2] border-2 border-[#26392D] text-[#26392D] hover:bg-[#F2ECE3]'
                  }`}
                >
                  {isAddedFeedback ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added ({selectedSize})</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#C08272]" />
                      <span>Add to Shopping Bag</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct Buy Now Button */}
              <button
                onClick={handleBuy}
                className="w-full py-4 px-6 bg-[#26392D] hover:bg-[#344D3D] text-[#FAF7F2] font-semibold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Zap className="w-4 h-4 text-[#C08272]" />
                <span>Buy Now · {formatBDT(product.priceBDT * quantity)} (Cash on Delivery)</span>
              </button>
            </div>

            {/* Accordions: Fabric, Fit & Shipping */}
            <div className="pt-4 border-t border-[#E8E1D5] divide-y divide-[#E8E1D5] text-xs">
              
              {/* Accordion 1: Fabric & Care */}
              <div className="py-3">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'fabric' ? null : 'fabric')}
                  className="w-full flex items-center justify-between font-bold text-[#26392D] py-1 text-left"
                >
                  <span className="flex items-center gap-2">
                    <Feather className="w-4 h-4 text-[#C08272]" />
                    <span>Fabric Composition &amp; Care</span>
                  </span>
                  {openAccordion === 'fabric' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'fabric' && (
                  <div className="pt-2 text-[#56695C] space-y-1.5 leading-relaxed">
                    <p><strong>Material:</strong> {product.fabric}</p>
                    <p><strong>Care:</strong> Machine wash cold on gentle cycle inside a laundry pouch. Do not bleach. Lay flat to air dry away from direct heat to preserve elastane recovery.</p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Modest Fit & Measurements */}
              <div className="py-3">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'fit' ? null : 'fit')}
                  className="w-full flex items-center justify-between font-bold text-[#26392D] py-1 text-left"
                >
                  <span className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-[#C08272]" />
                    <span>Modest Fit Details</span>
                  </span>
                  {openAccordion === 'fit' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'fit' && (
                  <div className="pt-2 text-[#56695C] space-y-1.5 leading-relaxed">
                    <p>{product.fitNotes}</p>
                    <p>Designed with opaque layering and non-clinging silhouettes to honor your comfort and modest styling.</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Shipping & Returns */}
              <div className="py-3">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                  className="w-full flex items-center justify-between font-bold text-[#26392D] py-1 text-left"
                >
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#C08272]" />
                    <span>Discreet Delivery &amp; Exchange Policy</span>
                  </span>
                  {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pt-2 text-[#56695C] space-y-1.5 leading-relaxed">
                    <p>• <strong>Dhaka City:</strong> 24–48 hours delivery (৳60 delivery charge, Free over ৳5,000).</p>
                    <p>• <strong>Outside Dhaka:</strong> 48–72 hours via verified courier (৳120 delivery charge, Free over ৳5,000).</p>
                    <p>• <strong>Discreet Delivery:</strong> 100% plain, unbranded parcel boxes with neutral shipper identification.</p>
                    <p>• <strong>Exchanges:</strong> {product.isHygieneFinalSale ? 'Intimate wear is sealed for personal hygiene and is Final Sale.' : '7-Day hassle-free size exchange on all apparel outerwear.'}</p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#E8E1D5]">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="text-xs uppercase tracking-widest font-semibold text-[#C08272] mb-1">
                  Complete Your Set
                </div>
                <h3 className="font-serif text-3xl text-[#26392D]" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
                  You May Also Love
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.slice(0, 4).map((rel) => (
                <div key={rel.id} onClick={() => onProductClick(rel)} className="cursor-pointer">
                  <ProductCard
                    product={rel}
                    currency="BDT"
                    isWishlisted={wishlist.some(w => w.id === rel.id)}
                    onToggleWishlist={onToggleWishlist}
                    onAddToCart={(p, c, s) => onAddToCart(p, c, s, 1)}
                    onQuickView={onProductClick}
                    onOpenSizeGuide={onOpenSizeGuide}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
