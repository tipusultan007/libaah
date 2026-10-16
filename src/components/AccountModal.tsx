import React, { useState } from 'react';
import { 
  X, 
  User, 
  Package, 
  ShieldCheck, 
  Ruler, 
  Heart, 
  HelpCircle, 
  ExternalLink, 
  CheckCircle2, 
  MapPin, 
  LogOut 
} from 'lucide-react';
import { Currency } from '../types/store';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  onOpenSizeGuide: () => void;
  onOpenWishlist: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  currency,
  onOpenSizeGuide,
  onOpenWishlist,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'privacy'>('orders');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/55 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E8E1D5] overflow-hidden my-8 z-10 max-h-[88vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#26392D] text-[#FAF7F2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#364D3D] border border-[#C08272]/50 flex items-center justify-center text-white">
              <User className="w-5 h-5 text-[#C08272]" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-medium" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
                My Account
              </h3>
              <p className="text-xs text-[#DFB5A8]">
                Confidential &amp; Discreet Profile
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-5 pt-3 border-b border-[#E8E1D5] flex gap-2 bg-[#F4EFE7]">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-2.5 px-3 text-xs font-semibold transition-all relative ${
              activeTab === 'orders'
                ? 'text-[#26392D]'
                : 'text-[#778B7D] hover:text-[#26392D]'
            }`}
          >
            <span>My Orders &amp; Tracking</span>
            {activeTab === 'orders' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C08272]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2.5 px-3 text-xs font-semibold transition-all relative ${
              activeTab === 'profile'
                ? 'text-[#26392D]'
                : 'text-[#778B7D] hover:text-[#26392D]'
            }`}
          >
            <span>Saved Details</span>
            {activeTab === 'profile' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C08272]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-2.5 px-3 text-xs font-semibold transition-all relative ${
              activeTab === 'privacy'
                ? 'text-[#26392D]'
                : 'text-[#778B7D] hover:text-[#26392D]'
            }`}
          >
            <span>Privacy Pledge</span>
            {activeTab === 'privacy' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C08272]" />
            )}
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-[#E8E1D5] shadow-2xs space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-[#E8E1D5]">
                  <div>
                    <span className="font-bold text-[#26392D]">Order #LIB-98421</span>
                    <span className="text-[11px] text-[#718576] block">Placed 2 days ago</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#E4EFE6] text-[#2F613B] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#2F613B]" />
                    <span>Out for Discreet Delivery</span>
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-[#526557]">
                  <div className="flex justify-between">
                    <span>Item:</span>
                    <span className="font-semibold text-[#26392D]">Luna Zero-Wire Bra (34C, Almond Nude)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Packaging:</span>
                    <span className="text-[#C08272] font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> 100% Plain Unmarked Box
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment:</span>
                    <span className="font-medium text-[#26392D]">Cash on Delivery ({currency === 'BDT' ? '৳4,200' : '$42'})</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] text-[11px] text-[#697C6E] flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#C08272] shrink-0" />
                  <span>Courier label reads: &quot;A. Logistics - Fulfillment&quot; (Zero intimate branding)</span>
                </div>
              </div>

              {/* Quick links inside Account */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenSizeGuide();
                  }}
                  className="p-3 rounded-xl bg-white border border-[#E8E1D5] hover:border-[#C08272] text-xs font-semibold text-[#26392D] flex items-center gap-2 transition-colors"
                >
                  <Ruler className="w-4 h-4 text-[#C08272]" />
                  <span>My Bra Calculator</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenWishlist();
                  }}
                  className="p-3 rounded-xl bg-white border border-[#E8E1D5] hover:border-[#C08272] text-xs font-semibold text-[#26392D] flex items-center gap-2 transition-colors"
                >
                  <Heart className="w-4 h-4 text-[#C08272]" />
                  <span>Saved Wishlist</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-white border border-[#E8E1D5] space-y-3">
                <div className="font-semibold text-sm text-[#26392D]">Default Delivery Address</div>
                <div className="text-[#596D5E] space-y-1">
                  <div className="font-medium text-[#26392D]">Fatima Rahman</div>
                  <div>House 42, Road 11, Banani</div>
                  <div>Dhaka 1213, Bangladesh</div>
                  <div className="text-[11px] text-[#869A8C] pt-1">Phone: +880 1700-000000</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E8E1D5] space-y-2">
                <div className="font-semibold text-[#26392D] flex items-center gap-1.5">
                  <Ruler className="w-4 h-4 text-[#C08272]" />
                  <span>Saved Fit Profile</span>
                </div>
                <p className="text-[#596D5E]">
                  Outerwear Apparel: <strong>M (Medium)</strong> · Bra Fit: <strong>34C / Sister Size 36B</strong>
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenSizeGuide();
                  }}
                  className="text-[#C08272] hover:underline font-semibold text-[11px] block pt-1"
                >
                  Recalculate Measurements
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: PRIVACY PLEDGE */}
          {activeTab === 'privacy' && (
            <div className="space-y-3 text-xs text-[#526557] leading-relaxed">
              <div className="p-4 rounded-2xl bg-[#F0EAE1] border border-[#DFD5C7] space-y-2">
                <div className="font-bold text-[#26392D] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C08272]" />
                  <span>Our 100% Discreet Packaging Pledge</span>
                </div>
                <p>
                  Every parcel leaving our fulfillment center is packed in plain, brown or white unbranded corrugated boxes. Courier labels never list &quot;bra&quot;, &quot;lingerie&quot;, &quot;panties&quot;, or intimate keywords.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E8E1D5] space-y-2">
                <div className="font-bold text-[#26392D]">Sanitary Hygiene Protection</div>
                <p>
                  All intimate wear is heat-sealed in tamper-evident protective sleeves to ensure you receive virgin, unhandled garments with complete sanitary hygiene assurance.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#E8E1D5] flex items-center justify-between text-xs text-[#6E8173]">
          <span>Need help? WhatsApp: +880 1800-LIBAAH</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#26392D] text-white font-semibold rounded-xl hover:bg-[#344B3C]"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
