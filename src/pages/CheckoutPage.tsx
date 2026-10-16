import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  Package, 
  Truck, 
  CreditCard, 
  Smartphone, 
  Wallet,
  ShoppingBag,
  Info,
  Printer
} from 'lucide-react';
import { CartItem } from '../types/store';

interface CheckoutPageProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onBackToShop: () => void;
  onGoToAccount?: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  onClearCart,
  onBackToShop,
  onGoToAccount,
}) => {
  // Form state
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [district, setDistrict] = useState('Dhaka');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'card'>('cod');
  const [discreetPackaging, setDiscreetPackaging] = useState(true);

  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMsg, setPromoMsg] = useState<{ text: string; isError: boolean } | null>(null);

  // Order state
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [placedOrderDetails, setPlacedOrderDetails] = useState<any>(null);

  const subtotal = items.reduce((sum, item) => sum + item.product.priceBDT * item.quantity, 0);
  const isFreeDelivery = subtotal >= 5000;
  const shippingCost = isFreeDelivery ? 0 : district === 'Dhaka' ? 60 : 120;
  const discountAmount = (subtotal * discountPercent) / 100;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const formatBDT = (amount: number) => `৳${Math.round(amount).toLocaleString()}`;

  const handleApplyPromo = () => {
    setPromoMsg(null);
    const code = promoCode.trim().toUpperCase();
    if (code === 'COMFORT10' || code === 'LUNA10') {
      setDiscountPercent(10);
      setPromoMsg({ text: '10% Modest Comfort discount applied!', isError: false });
    } else if (code === 'LIBAAH20') {
      setDiscountPercent(20);
      setPromoMsg({ text: '20% Special collection discount applied!', isError: false });
    } else {
      setPromoMsg({ text: 'Invalid coupon code. Try "COMFORT10" or "LIBAAH20"', isError: true });
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber || !deliveryAddress) {
      alert('Please complete your name, phone number, and delivery address.');
      return;
    }

    const orderNumber = `LIB-${Math.floor(100000 + Math.random() * 900000)}`;
    setPlacedOrderDetails({
      orderNumber,
      fullName,
      phoneNumber,
      emailAddress,
      district,
      deliveryAddress,
      paymentMethod,
      items: [...items],
      subtotal,
      shippingCost,
      discountAmount,
      grandTotal,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    });

    setIsOrderPlaced(true);
    onClearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If order is placed, show confirmation receipt
  if (isOrderPlaced && placedOrderDetails) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#E8E1D5] shadow-xl p-6 sm:p-10 space-y-6">
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#E6F0E8] text-[#2F613B] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9 text-[#2F613B]" />
            </div>
            
            <h1 className="font-serif text-3xl sm:text-4xl text-[#26392D]" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
              Order Confirmed
            </h1>
            <p className="text-xs sm:text-sm text-[#5C7061]">
              Thank you for choosing LIBAAH. Your parcel will be packaged in 100% plain, unmarked discrete packaging.
            </p>
            <div className="inline-block px-3 py-1 bg-[#FAF7F2] rounded-full text-xs font-bold text-[#26392D] border border-[#E8E1D5]">
              Receipt #{placedOrderDetails.orderNumber}
            </div>
          </div>

          {/* Privacy Guarantee Note */}
          <div className="p-4 rounded-2xl bg-[#F0EAE1] border border-[#DDD3C4] flex items-center gap-3 text-xs text-[#526557]">
            <ShieldCheck className="w-5 h-5 text-[#C08272] shrink-0" />
            <div>
              <strong className="text-[#26392D] block">Discreet Packaging Promise</strong>
              <span>Courier outer label reads: &quot;A. Logistics - Apparel&quot; with zero intimate wording.</span>
            </div>
          </div>

          {/* Customer & Shipping Summary */}
          <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-2.5 text-xs text-[#4F6254]">
            <div className="flex justify-between border-b border-[#E8E1D5] pb-2">
              <span className="text-[#7E9183]">Customer:</span>
              <strong className="text-[#26392D]">{placedOrderDetails.fullName} ({placedOrderDetails.phoneNumber})</strong>
            </div>
            <div className="flex justify-between border-b border-[#E8E1D5] pb-2">
              <span className="text-[#7E9183]">Delivery Address:</span>
              <strong className="text-[#26392D] text-right">{placedOrderDetails.deliveryAddress}, {placedOrderDetails.district}</strong>
            </div>
            <div className="flex justify-between border-b border-[#E8E1D5] pb-2">
              <span className="text-[#7E9183]">Payment Method:</span>
              <strong className="text-[#26392D]">
                {placedOrderDetails.paymentMethod === 'cod' ? 'Cash on Delivery (Pay at Doorstep)' : 'bKash / Card (Paid Online)'}
              </strong>
            </div>
            <div className="flex justify-between border-b border-[#E8E1D5] pb-2">
              <span className="text-[#7E9183]">Estimated Delivery:</span>
              <strong className="text-[#26392D]">
                {placedOrderDetails.district === 'Dhaka' ? '24–48 Hours (Dhaka City)' : '48–72 Hours (Courier Delivery)'}
              </strong>
            </div>
            <div className="flex justify-between pt-2 text-sm font-bold text-[#26392D]">
              <span>Grand Total:</span>
              <span className="text-base text-[#C08272] font-mono">{formatBDT(placedOrderDetails.grandTotal)}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="flex-1 py-3 bg-white border border-[#26392D]/30 hover:bg-[#F2ECE3] text-[#26392D] font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4 text-[#C08272]" />
              <span>Print Receipt</span>
            </button>

            {onGoToAccount && (
              <button
                onClick={onGoToAccount}
                className="flex-1 py-3 bg-[#FAF7F2] border border-[#26392D] hover:bg-[#F0EAE1] text-[#26392D] font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Package className="w-4 h-4 text-[#C08272]" />
                <span>Track in Customer Panel</span>
              </button>
            )}

            <button
              onClick={onBackToShop}
              className="flex-1 py-3 bg-[#26392D] hover:bg-[#344B3C] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <span>Continue Shopping</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // If cart is empty
  if (items.length === 0) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen py-20 px-4 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#EFE8DE] flex items-center justify-center mx-auto text-[#728577]">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-3xl text-[#26392D]">Your shopping bag is empty</h2>
          <p className="text-xs text-[#627568]">
            Please add items to your shopping bag before proceeding to checkout.
          </p>
          <button
            onClick={onBackToShop}
            className="px-6 py-3 bg-[#26392D] text-white text-xs font-semibold rounded-xl hover:bg-[#344B3C]"
          >
            Explore Collections
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Back Link */}
        <div className="mb-6">
          <button
            onClick={onBackToShop}
            className="flex items-center gap-1.5 text-xs text-[#26392D] font-semibold hover:text-[#C08272] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C08272]" />
            <span>Return to Shopping</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ========================================================
              LEFT COLUMN: Customer & Delivery Details Form (Span 7)
             ======================================================== */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E1D5] shadow-xs space-y-6">
            
            <div className="border-b border-[#E8E1D5] pb-4">
              <h1 className="font-serif text-2xl sm:text-3xl text-[#26392D] font-normal" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
                Discreet Express Checkout
              </h1>
              <p className="text-xs text-[#6F8274] mt-1">
                Enter your delivery details. Cash on delivery available across all 64 districts in Bangladesh.
              </p>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-6">
              
              {/* Section 1: Customer Contact */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider font-bold text-[#869A8C] block">
                  1. Contact Information
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-[#26392D] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fatima Rahman"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#E3DBD0] rounded-xl focus:outline-none focus:border-[#26392D]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#26392D] mb-1">Phone Number (For Delivery Handover) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="01700-000000"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#E3DBD0] rounded-xl focus:outline-none focus:border-[#26392D]"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-semibold text-[#26392D] mb-1">Email Address (For Invoice Copy - Optional)</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#E3DBD0] rounded-xl focus:outline-none focus:border-[#26392D]"
                  />
                </div>
              </div>

              {/* Section 2: Delivery Destination */}
              <div className="space-y-3 pt-3 border-t border-[#E8E1D5]">
                <span className="text-xs uppercase tracking-wider font-bold text-[#869A8C] block">
                  2. Shipping Address
                </span>

                <div className="text-xs">
                  <label className="block font-semibold text-[#26392D] mb-1">District / Region *</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#E3DBD0] rounded-xl focus:outline-none focus:border-[#26392D] font-medium text-[#26392D]"
                  >
                    <option value="Dhaka">Dhaka City (৳60 / 24–48h Delivery)</option>
                    <option value="Chittagong">Chittagong (৳120 Courier)</option>
                    <option value="Sylhet">Sylhet (৳120 Courier)</option>
                    <option value="Khulna">Khulna (৳120 Courier)</option>
                    <option value="Rajshahi">Rajshahi (৳120 Courier)</option>
                    <option value="Barisal">Barisal (৳120 Courier)</option>
                    <option value="Rangpur">Rangpur (৳120 Courier)</option>
                    <option value="Mymensingh">Mymensingh (৳120 Courier)</option>
                    <option value="Other">Other Districts in Bangladesh (৳120 Courier)</option>
                  </select>
                </div>

                <div className="text-xs">
                  <label className="block font-semibold text-[#26392D] mb-1">Detailed Street Address *</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House / Apartment number, Road name, Area / Thana"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#E3DBD0] rounded-xl focus:outline-none focus:border-[#26392D]"
                  />
                </div>

                <div className="text-xs">
                  <label className="block font-semibold text-[#26392D] mb-1">Special Delivery Notes (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Please call before arrival, leave with security"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#E3DBD0] rounded-xl focus:outline-none focus:border-[#26392D]"
                  />
                </div>
              </div>

              {/* Section 3: Payment Method */}
              <div className="space-y-3 pt-3 border-t border-[#E8E1D5]">
                <span className="text-xs uppercase tracking-wider font-bold text-[#869A8C] block">
                  3. Payment Method
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* COD */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 rounded-2xl border text-xs font-semibold text-left transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#26392D] bg-[#26392D] text-white shadow-xs'
                        : 'border-[#E3DBD0] bg-[#FAF7F2] text-[#26392D] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Truck className="w-4 h-4 text-[#C08272]" />
                      <span>Cash on Delivery</span>
                    </div>
                    <div className={`text-[10px] ${paymentMethod === 'cod' ? 'text-white/80' : 'text-[#7A8E80]'}`}>
                      Pay in cash at delivery
                    </div>
                  </button>

                  {/* bKash / Nagad */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-3.5 rounded-2xl border text-xs font-semibold text-left transition-all ${
                      paymentMethod === 'bkash'
                        ? 'border-[#26392D] bg-[#26392D] text-white shadow-xs'
                        : 'border-[#E3DBD0] bg-[#FAF7F2] text-[#26392D] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Smartphone className="w-4 h-4 text-[#C08272]" />
                      <span>bKash / Nagad</span>
                    </div>
                    <div className={`text-[10px] ${paymentMethod === 'bkash' ? 'text-white/80' : 'text-[#7A8E80]'}`}>
                      Instant Mobile Wallet
                    </div>
                  </button>

                  {/* Cards */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 rounded-2xl border text-xs font-semibold text-left transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#26392D] bg-[#26392D] text-white shadow-xs'
                        : 'border-[#E3DBD0] bg-[#FAF7F2] text-[#26392D] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <CreditCard className="w-4 h-4 text-[#C08272]" />
                      <span>Debit / Credit Card</span>
                    </div>
                    <div className={`text-[10px] ${paymentMethod === 'card' ? 'text-white/80' : 'text-[#7A8E80]'}`}>
                      Visa, MasterCard, Amex
                    </div>
                  </button>
                </div>
              </div>

              {/* Discreet Packaging Assurance Checkbox */}
              <div className="p-4 rounded-2xl bg-[#F0EAE1] border border-[#DDD3C4]">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={discreetPackaging}
                    onChange={(e) => setDiscreetPackaging(e.target.checked)}
                    className="mt-0.5 accent-[#26392D] rounded"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-[#26392D] flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#C08272]" />
                      100% Plain Discreet Cardboard Packaging (Free)
                    </span>
                    <p className="text-[11px] text-[#5C7062] mt-0.5">
                      Your privacy is protected. Packages have zero intimate wear logos, branding, or product descriptions on the exterior.
                    </p>
                  </div>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 px-6 bg-[#26392D] hover:bg-[#344D3D] text-[#FAF7F2] font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-[#C08272]" />
                <span>Confirm Order · {formatBDT(grandTotal)}</span>
              </button>

            </form>

          </div>

          {/* ========================================================
              RIGHT COLUMN: Order Summary & Coupon (Span 5)
             ======================================================== */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E8E1D5] shadow-xs space-y-5">
              
              <h2 className="font-serif text-2xl text-[#26392D] pb-3 border-b border-[#E8E1D5]">
                Order Summary ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>

              {/* Items List */}
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 py-2 border-b border-[#FAF7F2] text-xs">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-14 h-16 object-cover rounded-xl bg-[#FAF7F2] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#26392D] truncate">
                        {item.product.name}
                      </h3>
                      <div className="text-[11px] text-[#718576] mt-0.5 flex items-center gap-1.5">
                        <span 
                          className="w-2.5 h-2.5 rounded-full border border-black/15 inline-block"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <span>{item.selectedColor.name}</span>
                        <span>·</span>
                        <span>Size: <strong>{item.selectedSize}</strong></span>
                      </div>
                      <div className="flex justify-between items-center mt-1.5">
                        <span className="text-[#899D8F]">Qty: {item.quantity}</span>
                        <span className="font-bold text-[#26392D] tabular-nums">
                          {formatBDT(item.product.priceBDT * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code Input */}
              <div className="space-y-1.5 pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon (e.g. COMFORT10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E3DBD0] rounded-xl focus:outline-none focus:border-[#26392D] uppercase font-medium"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-[#26392D] text-white text-xs font-semibold rounded-xl hover:bg-[#344B3C]"
                  >
                    Apply
                  </button>
                </div>
                {promoMsg && (
                  <p className={`text-[11px] font-medium px-1 ${promoMsg.isError ? 'text-rose-600' : 'text-emerald-700'}`}>
                    {promoMsg.text}
                  </p>
                )}
              </div>

              {/* Totals Breakdown */}
              <div className="space-y-2 pt-3 border-t border-[#E8E1D5] text-xs text-[#526557]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#26392D] tabular-nums">{formatBDT(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#C08272] font-semibold">
                    <span>Coupon Discount ({discountPercent}%)</span>
                    <span className="tabular-nums">-{formatBDT(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Delivery ({district})</span>
                  <span className="font-semibold text-[#26392D] tabular-nums">
                    {isFreeDelivery ? 'FREE (Orders over ৳5,000)' : formatBDT(shippingCost)}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#E8E1D5] flex justify-between text-base font-bold text-[#26392D]">
                  <span>Total Payable:</span>
                  <span className="text-xl text-[#26392D] font-mono tabular-nums">{formatBDT(grandTotal)}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
