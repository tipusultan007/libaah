import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Check, 
  Heart, 
  ShieldCheck, 
  ShieldAlert, 
  Ruler, 
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { Product, ColorOption } from '../types/store';

interface QuickViewModalProps {
  product: Product | null;
  currency?: string;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, color: ColorOption, size: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenSizeGuide: () => void;
  onViewProductDetails?: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onOpenSizeGuide,
  onViewProductDetails,
}) => {
  if (!isOpen || !product) return null;

  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [isAddedFeedback, setIsAddedFeedback] = useState<boolean>(false);

  const formatBDT = (amount: number) => `৳${amount.toLocaleString()}`;

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/55 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E8E1D5] overflow-hidden my-8 z-10 max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#46594C] hover:text-[#26392D] rounded-full bg-white/70 hover:bg-white backdrop-blur-xs transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Image Gallery */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-[#F4EFE7]">
          <div className="aspect-4/3 md:aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-2xs border border-[#E3DBD0]">
            <img
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Thumbnail list */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIdx === idx
                      ? 'border-[#26392D] ring-2 ring-[#C08272]/50'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Discreet Shipping Badge */}
          <div className="mt-4 p-3 bg-white/70 rounded-xl border border-[#E3DBD0] flex items-center gap-2 text-xs text-[#526657]">
            <ShieldCheck className="w-4 h-4 text-[#C08272] shrink-0" />
            <span>Delivered in 100% plain, unmarked discrete packaging.</span>
          </div>
        </div>

        {/* Right Side: Details & Controls */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-4">
          
          <div className="space-y-3">
            {/* Category & Badge */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#869A8C]">
                {product.categoryLabel}
              </span>

              {product.isHygieneFinalSale ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#26392D] text-white">
                  <ShieldAlert className="w-3 h-3 text-[#C08272]" />
                  <span>Final Sale (Hygiene)</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#EAE2D5] text-[#26392D]">
                  <RefreshCw className="w-3 h-3 text-[#C08272]" />
                  <span>7-Day Size Exchange</span>
                </span>
              )}
            </div>

            {/* Product Title */}
            <h2 className="font-serif text-2xl sm:text-3xl text-[#26392D] font-medium leading-tight" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
              {product.name}
            </h2>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2 text-xs text-[#5D7062]">
              <span className="text-[#C08272]">★★★★★</span>
              <span className="font-semibold text-[#26392D]">{product.rating}</span>
              <span>·</span>
              <span>{product.reviewsCount} verified reviews</span>
            </div>

            {/* Price in BDT */}
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-2xl font-bold text-[#26392D] tabular-nums">
                {formatBDT(product.priceBDT)}
              </span>
              {product.originalPriceBDT && (
                <span className="text-sm text-[#8EA093] line-through tabular-nums">
                  {formatBDT(product.originalPriceBDT)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-[#5B6E60] leading-relaxed">
              {product.description}
            </p>

            {/* Color Swatches */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs text-[#627567]">
                <span>Color: <strong className="text-[#26392D]">{selectedColor.name}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                {product.colors.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-6 h-6 rounded-full transition-transform border ${
                        isSelected
                          ? 'scale-115 ring-2 ring-[#26392D] ring-offset-2 ring-offset-[#FAF7F2]'
                          : 'hover:scale-105 border-black/15'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  );
                })}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between items-center text-xs text-[#627567]">
                <span>Select Size: <strong className="text-[#26392D]">{selectedSize}</strong></span>
                <button
                  type="button"
                  onClick={onOpenSizeGuide}
                  className="text-xs text-[#C08272] hover:underline font-semibold flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size &amp; Fit Advisor</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {product.sizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        isSelected
                          ? 'bg-[#26392D] text-white shadow-2xs'
                          : 'bg-[#EFE8DE] text-[#4F6354] hover:bg-[#E4DCCE]'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2 border-t border-[#E8E1D5]">
            <div className="flex items-center gap-2">
              <button
                onClick={handleAdd}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  isAddedFeedback
                    ? 'bg-[#3D6448] text-white'
                    : 'bg-[#26392D] hover:bg-[#344D3D] text-[#FAF7F2] shadow-sm'
                }`}
              >
                {isAddedFeedback ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Added to Shopping Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#C08272]" />
                    <span>Add to Bag ({selectedSize})</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className="p-3 rounded-xl border border-[#DCD3C6] bg-white hover:bg-[#F2ECE3] text-[#26392D] transition-colors"
                title="Save to Wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? 'fill-[#C08272] text-[#C08272]' : 'text-[#26392D]'
                  }`}
                />
              </button>
            </div>

            {onViewProductDetails && (
              <button
                onClick={() => {
                  onClose();
                  onViewProductDetails(product);
                }}
                className="w-full py-2 text-center text-xs text-[#26392D] font-semibold hover:text-[#C08272] flex items-center justify-center gap-1 transition-colors"
              >
                <span>View Full Product Page Details</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
