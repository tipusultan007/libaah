import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product, Currency, ColorOption } from '../types/store';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  currency: Currency;
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color: ColorOption, size: string) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  currency,
  onRemoveFromWishlist,
  onAddToCart,
  onQuickView,
}) => {
  if (!isOpen) return null;

  const formatPrice = (priceUSD: number, priceBDT: number) => {
    return currency === 'BDT' ? `৳${priceBDT.toLocaleString()}` : `$${priceUSD.toFixed(0)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl border-l border-[#E8E1D5] flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 bg-[#FAF7F2] border-b border-[#E8E1D5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#C08272] fill-[#C08272]" />
              <h3 className="font-serif text-2xl text-[#26392D]" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
                Saved Favorites ({wishlist.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#4C5E51] hover:text-[#26392D] rounded-full hover:bg-[#EFE8DE] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#EFE8DE] flex items-center justify-center mx-auto text-[#76897B]">
                  <Heart className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl text-[#26392D]">No saved pieces yet</h4>
                <p className="text-xs text-[#6F8273] max-w-xs mx-auto">
                  Click the heart icon on any product to save your favorite modest essentials.
                </p>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-white rounded-2xl border border-[#E8E1D5] shadow-2xs group"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-20 h-24 object-cover rounded-xl bg-[#FAF7F2] shrink-0 cursor-pointer"
                    onClick={() => {
                      onQuickView(product);
                      onClose();
                    }}
                  />
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#869A8C]">
                          {product.categoryLabel}
                        </span>
                        <button
                          onClick={() => onRemoveFromWishlist(product)}
                          className="text-[#96A79B] hover:text-rose-600 transition-colors p-1"
                          title="Remove from favorites"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 
                        onClick={() => {
                          onQuickView(product);
                          onClose();
                        }}
                        className="text-xs font-semibold text-[#26392D] group-hover:text-[#C08272] cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h4>

                      <div className="text-xs font-bold text-[#26392D] mt-1">
                        {formatPrice(product.priceUSD, product.priceBDT)}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onAddToCart(product, product.colors[0], product.sizes[0] || 'M');
                        onRemoveFromWishlist(product);
                      }}
                      className="mt-2 w-full py-1.5 px-3 bg-[#26392D] hover:bg-[#344B3C] text-white text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3 text-[#C08272]" />
                      <span>Move to Shopping Bag</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
