import React from 'react';
import { Sparkles, Shield, Heart, Handshake, Feather, ArrowRight, Ruler, CheckCircle2 } from 'lucide-react';
import { HERO_BANNER_IMAGE } from '../data/products';

interface HeroBannerProps {
  onShopClick: () => void;
  onFitAdvisorClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onShopClick,
  onFitAdvisorClick,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FBF9F5] border-b border-[#E8E2D8]">
      {/* Editorial Hero Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Story & Call to Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-6">
            
            {/* Gentle Brand Tagline */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#C08272]">
              <span className="w-6 h-[1.5px] bg-[#C08272]" />
              <span>Modest Elegance · Second-Skin Comfort</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#26392D] font-normal tracking-tight leading-[1.12]" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
              Comfort crafted for <span className="italic font-light text-[#C08272]">dignity</span>, fit, and everyday ease.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#516355] leading-relaxed max-w-xl font-normal">
              From zero-wire molded intimates and seamless active leggings to breathable ribbed modal tops and fluid pleated skirts. Tailored to honor your comfort and modesty with 100% discreet packaging.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onShopClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#26392D] text-[#FAF7F2] font-medium text-sm hover:bg-[#344B3C] shadow-sm hover:shadow transition-all group"
              >
                <span>Shop New Collection</span>
                <ArrowRight className="w-4 h-4 text-[#C08272] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onFitAdvisorClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FAF7F2] text-[#26392D] font-medium text-sm border border-[#26392D]/25 hover:bg-[#F2ECE3] hover:border-[#26392D]/50 transition-all"
              >
                <Ruler className="w-4 h-4 text-[#C08272]" />
                <span>Find Your Perfect Fit</span>
              </button>
            </div>

            {/* Highlighted Micro-Trust Features */}
            <div className="pt-4 border-t border-[#EAE3D8] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#5E7263]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C08272]" />
                <span>Discreet Plain Packaging</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C08272]" />
                <span>Free 7-Day Size Exchange (Apparel)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C08272]" />
                <span>Pure Breathable Fibers</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Fidelity Campaign Banner Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-[#E8E2D8] group">
              <img
                src={HERO_BANNER_IMAGE}
                alt="LIBAAH Organic Comfort & Modest Essentials Collection"
                className="w-full h-[360px] sm:h-[460px] lg:h-[500px] object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                loading="eager"
              />

              {/* Subtle ambient lighting vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />

              {/* Float badge in banner corner */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#FAF7F2]/90 backdrop-blur-md border border-white/60 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-[#8C9E91]">
                      New Season Harmony
                    </div>
                    <div className="text-sm font-semibold text-[#26392D]">
                      Bamboo Modal &amp; Natural Earth Tones
                    </div>
                  </div>
                  <button
                    onClick={onShopClick}
                    className="text-xs font-semibold text-[#C08272] hover:text-[#A86E5E] flex items-center gap-1 underline underline-offset-4"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Brand Core Pillars directly matching the uploaded hero banner */}
        <div className="mt-14 pt-10 border-t border-[#EAE3D8]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Pillar 1: COMFORT */}
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#F6F2EB]/60 border border-[#EAE3D8] hover:bg-[#F6F2EB] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E0D8CB] flex items-center justify-center text-[#26392D] mb-3 shadow-2xs">
                <Feather className="w-5 h-5 text-[#C08272]" />
              </div>
              <h4 className="font-serif text-lg text-[#26392D] tracking-wide mb-1" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
                Comfort
              </h4>
              <p className="text-xs text-[#637768] leading-relaxed">
                Buttery soft Lenzing™ modal and breathable organic weaves designed for all-day skin breathability.
              </p>
            </div>

            {/* Pillar 2: PRIVACY */}
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#F6F2EB]/60 border border-[#EAE3D8] hover:bg-[#F6F2EB] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E0D8CB] flex items-center justify-center text-[#26392D] mb-3 shadow-2xs">
                <Shield className="w-5 h-5 text-[#C08272]" />
              </div>
              <h4 className="font-serif text-lg text-[#26392D] tracking-wide mb-1" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
                Privacy
              </h4>
              <p className="text-xs text-[#637768] leading-relaxed">
                Guaranteed 100% discrete packaging. Plain unmarked boxes with zero visible lingerie or apparel logos.
              </p>
            </div>

            {/* Pillar 3: DIGNITY */}
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#F6F2EB]/60 border border-[#EAE3D8] hover:bg-[#F6F2EB] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E0D8CB] flex items-center justify-center text-[#26392D] mb-3 shadow-2xs">
                <Heart className="w-5 h-5 text-[#C08272]" />
              </div>
              <h4 className="font-serif text-lg text-[#26392D] tracking-wide mb-1" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
                Dignity
              </h4>
              <p className="text-xs text-[#637768] leading-relaxed">
                Thoughtfully tailored modest cuts, opaque fabrics, and non-clingy drape that honors your personal style.
              </p>
            </div>

            {/* Pillar 4: TRUST */}
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#F6F2EB]/60 border border-[#EAE3D8] hover:bg-[#F6F2EB] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E0D8CB] flex items-center justify-center text-[#26392D] mb-3 shadow-2xs">
                <Handshake className="w-5 h-5 text-[#C08272]" />
              </div>
              <h4 className="font-serif text-lg text-[#26392D] tracking-wide mb-1" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
                Trust
              </h4>
              <p className="text-xs text-[#637768] leading-relaxed">
                7-day easy size exchanges on all apparel and authentic quality verification on every stitched piece.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
