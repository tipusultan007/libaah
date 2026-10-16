import React from 'react';
import { BrandLogo } from './BrandLogo';
import { ShieldCheck, RefreshCw, Feather, Lock, Heart } from 'lucide-react';
import { Category } from '../types/store';

interface FooterProps {
  onSelectCategory: (category: Category) => void;
  onOpenSizeGuide: () => void;
  onOpenAccount?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenSizeGuide,
  onOpenAccount,
}) => {
  return (
    <footer className="bg-[#26392D] text-[#FAF7F2] border-t border-[#344B3C]">
      {/* Top Value Assurance Ribbon */}
      <div className="border-b border-[#344B3C] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
            
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-[#344B3C] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#C08272]" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-white">100% Plain Packaging</div>
                <div className="text-[#8FA194]">Zero intimate branding on outer boxes</div>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-[#344B3C] flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5 text-[#C08272]" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-white">7-Day Free Exchange</div>
                <div className="text-[#8FA194]">On all outerwear tops, skirts &amp; sets</div>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-[#344B3C] flex items-center justify-center shrink-0">
                <Feather className="w-5 h-5 text-[#C08272]" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-white">Lenzing™ Bamboo Modal</div>
                <div className="text-[#8FA194]">Ultra-breathable second-skin touch</div>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-[#344B3C] flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-[#C08272]" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-white">Cash on Delivery &amp; Cards</div>
                <div className="text-[#8FA194]">Safe, verified doorstep handover</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links & Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex justify-start">
              <BrandLogo size="md" showSubtitle={true} lightMode={true} />
            </div>
            <p className="text-xs sm:text-sm text-[#9BB0A1] max-w-sm leading-relaxed">
              LIBAAH reimagines women&apos;s daily comfort through the lens of modesty, dignity, and anatomical ease. Featuring our signature zero-wire intimate collection and breathable everyday wardrobe essentials.
            </p>
            <div className="text-xs text-[#C08272] flex items-center gap-1 font-medium">
              <span>Comfort · Privacy · Dignity · Trust</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#C08272]">
              Collections
            </div>
            <ul className="space-y-2 text-xs text-[#9BB0A1]">
              <li>
                <button onClick={() => onSelectCategory('tops')} className="hover:text-white transition-colors">
                  Tops &amp; Ribbed Tees
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('skirts')} className="hover:text-white transition-colors">
                  Skirts &amp; Co-ords
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('leggings')} className="hover:text-white transition-colors">
                  Active Seamless Leggings
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('intimates')} className="hover:text-white transition-colors">
                  Bras &amp; Intimates
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('new-arrivals')} className="hover:text-white transition-colors">
                  New Season Arrivals
                </button>
              </li>
            </ul>
          </div>

          {/* Sizing & Care */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#C08272]">
              Care &amp; Sizing
            </div>
            <ul className="space-y-2 text-xs text-[#9BB0A1]">
              <li>
                <button onClick={onOpenSizeGuide} className="hover:text-white transition-colors">
                  Bra Size Calculator
                </button>
              </li>
              <li>
                <button onClick={onOpenSizeGuide} className="hover:text-white transition-colors">
                  Outerwear Size Chart
                </button>
              </li>
              <li>
                <span className="opacity-90">Modal Fabric Care</span>
              </li>
              <li>
                <span className="opacity-90">Sanitary Hygiene Guide</span>
              </li>
              <li>
                <span className="opacity-90">Discreet Packing Policy</span>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#C08272]">
              Private Customer Care
            </div>
            <p className="text-xs text-[#9BB0A1] leading-relaxed">
              Need discreet sizing assistance or exchange support? Our dedicated female consultants are ready to assist you.
            </p>
            <div className="text-xs text-white space-y-2">
              <div>Email: <span className="text-[#DFB5A8]">care@libaah.com</span></div>
              <div>Support: Available 9:00 AM – 9:00 PM</div>
              {onOpenAccount && (
                <div className="pt-1">
                  <button
                    onClick={onOpenAccount}
                    className="text-xs font-semibold text-[#DFB5A8] hover:text-white underline underline-offset-4 flex items-center gap-1 transition-colors"
                  >
                    <span>Go to Customer Panel &amp; Orders &rarr;</span>
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-[#344B3C] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7B8F80] gap-4">
          <div>
            &copy; {new Date().getFullYear()} LIBAAH Essentials. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>Hygiene Protocol</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
