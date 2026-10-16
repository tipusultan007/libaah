import React, { useState } from 'react';
import { Heart, Eye, Check, ShieldAlert, RefreshCw, ShoppingBag } from 'lucide-react';
import { Product, ColorOption } from '../types/store';

interface ProductCardProps {
  product: Product;
  currency?: string;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color: ColorOption, size: string) => void;
  onQuickView: (product: Product) => void;
  onProductClick?: (product: Product) => void;
  onOpenSizeGuide?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  onProductClick,
  onOpenSizeGuide,
}) => {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  const formatBDT = (amount: number) => `৳${amount.toLocaleString()}`;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColor, selectedSize);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 1600);
  };

  return (
    <div className="group relative flex flex-col bg-[#FAF7F2] rounded-xl sm:rounded-2xl border border-[#E8E1D5] overflow-hidden hover:shadow-md transition-all duration-300">
      
      {/* Image Area with Actions */}
      <div 
        onClick={() => (onProductClick ? onProductClick(product) : onQuickView(product))}
        className="relative aspect-square sm:aspect-4/3 w-full overflow-hidden bg-[#F0EAE1] cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full bg-white/85 hover:bg-white text-[#26392D] backdrop-blur-xs shadow-xs transition-colors z-10"
          title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-label="Wishlist"
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
              isWishlisted
                ? 'fill-[#C08272] text-[#C08272]'
                : 'text-[#26392D] hover:text-[#C08272]'
            }`}
          />
        </button>

        {/* Policy / Hygiene Tag Indicator */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
          {product.isHygieneFinalSale ? (
            <span 
              className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-semibold bg-[#26392D]/90 text-[#FAF7F2] backdrop-blur-xs shadow-2xs border border-white/20"
              title="Intimate wear is sealed for hygiene and cannot be returned."
            >
              <ShieldAlert className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#C08272]" />
              <span className="hidden xs:inline">Final Sale</span>
              <span className="xs:hidden">Hygiene</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-semibold bg-[#FAF7F2]/90 text-[#26392D] backdrop-blur-xs shadow-2xs border border-[#D9D0C3]">
              <RefreshCw className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#C08272]" />
              <span>7-Day Exch.</span>
            </span>
          )}
        </div>

        {/* Quick View Button on Desktop Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="hidden sm:flex absolute inset-x-4 bottom-3 py-2 px-3 bg-[#FAF7F2]/95 hover:bg-white text-[#26392D] text-xs font-semibold rounded-xl shadow-md backdrop-blur-xs items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0"
        >
          <Eye className="w-3.5 h-3.5 text-[#C08272]" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Card Content */}
      <div className="p-2.5 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
        
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-[#708475] mb-0.5 sm:mb-1">
            <span className="uppercase tracking-wider font-medium text-[9px] sm:text-[11px] truncate max-w-[65%]">
              {product.categoryLabel}
            </span>
            <span className="font-medium text-[#26392D] shrink-0 text-[10px] sm:text-xs">
              ★ {product.rating}
            </span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => (onProductClick ? onProductClick(product) : onQuickView(product))}
            className="font-serif text-sm sm:text-lg text-[#26392D] hover:text-[#C08272] transition-colors cursor-pointer line-clamp-1 font-medium leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Price strictly in BDT */}
          <div className="mt-1 flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-xs sm:text-base font-bold text-[#26392D] tabular-nums">
              {formatBDT(product.priceBDT)}
            </span>
            {product.originalPriceBDT && (
              <span className="text-[10px] sm:text-xs text-[#899D8E] line-through tabular-nums">
                {formatBDT(product.originalPriceBDT)}
              </span>
            )}
          </div>
        </div>

        {/* Color Swatch Selector */}
        <div className="space-y-1 pt-0.5">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#697D6E]">
            <span className="truncate">Color: <strong className="text-[#26392D]">{selectedColor.name}</strong></span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
            {product.colors.map((color) => {
              const isSelected = selectedColor.name === color.name;
              return (
                <button
                  key={color.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(color);
                  }}
                  className={`w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full transition-transform border ${
                    isSelected
                      ? 'scale-120 ring-1.5 sm:ring-2 ring-[#26392D] ring-offset-1 ring-offset-[#FAF7F2] border-black/20'
                      : 'hover:scale-110 border-black/10'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Select ${color.name}`}
                />
              );
            })}
          </div>
        </div>

        {/* Multi-Size Selector */}
        <div className="space-y-1 pt-0.5">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#697D6E]">
            <span>Size</span>
            {product.isBra && onOpenSizeGuide && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenSizeGuide();
                }}
                className="text-[9px] sm:text-[10px] text-[#C08272] hover:underline font-medium"
              >
                Fit Guide
              </button>
            )}
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            {product.sizes.map((sz) => {
              const isSelected = selectedSize === sz;
              return (
                <button
                  key={sz}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(sz);
                  }}
                  className={`px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded sm:rounded-md transition-all ${
                    isSelected
                      ? 'bg-[#26392D] text-white shadow-2xs'
                      : 'bg-[#EFE8DE] text-[#4F6354] hover:bg-[#E5DDCF]'
                  }`}
                >
                  {sz}
                </button>
              );
            })}
          </div>
        </div>

        {/* Add to Bag Button with Micro-Animation */}
        <div className="pt-1 sm:pt-2">
          <button
            onClick={handleAdd}
            className={`w-full py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all ${
              isAddedFeedback
                ? 'bg-[#3E6548] text-white scale-[0.98]'
                : 'bg-[#26392D] hover:bg-[#344D3D] text-[#FAF7F2] shadow-2xs'
            }`}
          >
            {isAddedFeedback ? (
              <>
                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                <span className="truncate">Added ({selectedSize})</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C08272]" />
                <span className="truncate">Add to Bag</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
