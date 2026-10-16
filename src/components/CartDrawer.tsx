import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2,
  Lock
} from 'lucide-react';
import { CartItem } from '../types/store';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isDiscreetPackagingChecked, setIsDiscreetPackagingChecked] = useState(true);

  if (!isOpen) return null;

  const freeShippingThreshold = 5000;

  // Subtotal in BDT
  const subtotal = items.reduce((acc, item) => {
    return acc + item.product.priceBDT * item.quantity;
  }, 0);

  const discountAmount = (subtotal * discountPercent) / 100;
  const isFreeShipping = subtotal >= freeShippingThreshold || items.length === 0;
  const shippingCost = isFreeShipping ? 0 : 60;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const formatBDT = (amount: number) => `৳${Math.round(amount).toLocaleString()}`;

  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'COMFORT10' || code === 'LUNA10') {
      setDiscountPercent(10);
      setPromoSuccess('10% Comfort discount applied!');
    } else if (code === 'LIBAAH20') {
      setDiscountPercent(20);
      setPromoSuccess('20% Modest Essentials discount applied!');
    } else {
      setPromoError('Invalid coupon. Try "COMFORT10" or "LIBAAH20"');
    }
  };

  const handleCheckoutClick = () => {
    onClose();
    onProceedToCheckout();
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
              <ShoppingBag className="w-5 h-5 text-[#26392D]" />
              <h3 className="font-serif text-2xl text-[#26392D]" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
                Shopping Bag ({items.reduce((sum, item) => sum + item.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#4C5E51] hover:text-[#26392D] rounded-full hover:bg-[#EFE8DE] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Free Shipping Progress Meter */}
            <div className="p-4 rounded-2xl bg-[#F2ECE3] border border-[#E3D9CC] space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#26392D]">
                <span>
                  {subtotal >= freeShippingThreshold ? (
                    <span className="text-[#366341] flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-[#366341]" />
                      You qualify for Free Discreet Shipping!
                    </span>
                  ) : (
                    <span>
                      Add {formatBDT(freeShippingThreshold - subtotal)} more for Free Shipping
                    </span>
                  )}
                </span>
                <span className="text-[11px] text-[#718576]">
                  Threshold: ৳5,000
                </span>
              </div>
              
              <div className="w-full bg-[#E4DCcf] h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#26392D] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>

            {/* Empty State */}
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EFE8DE] flex items-center justify-center mx-auto text-[#728577]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-xl text-[#26392D]">Your shopping bag is empty</h4>
                <p className="text-xs text-[#6E8173] max-w-xs mx-auto">
                  Explore our modest essentials, seamless wireless bras, and ribbed tops designed for all-day comfort.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#26392D] text-white text-xs font-semibold rounded-xl hover:bg-[#344B3C]"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              /* Items List */
              <div className="space-y-4">
                {items.map((item) => (
                  <div 
                    key={item.id}
                    className="flex gap-4 p-3 bg-white rounded-2xl border border-[#E8E1D5] shadow-2xs"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover rounded-xl bg-[#FAF7F2] shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-semibold text-[#26392D] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[#96A79B] hover:text-rose-600 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        
                        {/* Variant Attributes */}
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-[#697D6E]">
                          <span className="flex items-center gap-1">
                            <span 
                              className="w-2.5 h-2.5 rounded-full border border-black/15 inline-block"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            <span>{item.selectedColor.name}</span>
                          </span>
                          <span>·</span>
                          <span>Size: <strong className="text-[#26392D]">{item.selectedSize}</strong></span>
                        </div>

                        {/* Hygiene Tag note */}
                        {item.product.isHygieneFinalSale && (
                          <div className="text-[10px] text-[#A06050] font-medium mt-0.5">
                            Intimate · Sealed for Hygiene
                          </div>
                        )}
                      </div>

                      {/* Quantity and Price in BDT */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-[#E2D8CA] rounded-lg bg-[#FAF7F2]">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-[#4F6253] hover:text-[#26392D]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-[#26392D] tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-[#4F6253] hover:text-[#26392D]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-[#26392D] tabular-nums">
                          {formatBDT(item.product.priceBDT * item.quantity)}
                        </span>
                      </div>

                    </div>
                  </div>
                ))}

                {/* Discreet Packaging Pledge Box */}
                <div className="p-3.5 rounded-2xl bg-[#F0EAE1] border border-[#DDD3C4] space-y-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isDiscreetPackagingChecked}
                      onChange={(e) => setIsDiscreetPackagingChecked(e.target.checked)}
                      className="mt-0.5 accent-[#26392D] rounded"
                    />
                    <div className="text-xs">
                      <span className="font-semibold text-[#26392D] flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#C08272]" />
                        100% Discreet Packaging (Complimentary)
                      </span>
                      <p className="text-[11px] text-[#5C6F61] mt-0.5">
                        Delivered in a plain, unmarked box with zero brand, underwear, or apparel references on exterior labels.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Promo Code Input */}
                <div className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. COMFORT10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-white border border-[#E3DBD0] rounded-xl focus:outline-none focus:border-[#26392D] uppercase"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-4 py-2 bg-[#26392D] text-white text-xs font-semibold rounded-xl hover:bg-[#344B3C]"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && <p className="text-[11px] text-rose-600 px-1">{promoError}</p>}
                  {promoSuccess && <p className="text-[11px] text-emerald-700 px-1 font-medium">{promoSuccess}</p>}
                </div>

              </div>
            )}

          </div>

          {/* Footer & Checkout Trigger */}
          {items.length > 0 && (
            <div className="p-6 bg-[#FAF7F2] border-t border-[#E8E1D5] space-y-3">
              <div className="space-y-1.5 text-xs text-[#596C5E]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#26392D] tabular-nums">{formatBDT(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#C08272] font-medium">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="tabular-nums">-{formatBDT(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery (Inside Dhaka)</span>
                  <span className="font-semibold text-[#26392D] tabular-nums">
                    {isFreeShipping ? 'FREE' : formatBDT(shippingCost)}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E8E1D5] flex justify-between text-sm font-bold text-[#26392D]">
                  <span>Total</span>
                  <span className="tabular-nums font-mono text-base">{formatBDT(grandTotal)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 bg-[#26392D] hover:bg-[#344D3D] text-[#FAF7F2] font-semibold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Lock className="w-4 h-4 text-[#C08272]" />
                <span>Go to Checkout Page</span>
                <ArrowRight className="w-4 h-4 text-[#C08272]" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
