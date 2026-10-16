import React from 'react';
import { ArrowUpRight, ShieldAlert, Sparkles } from 'lucide-react';
import { Category } from '../types/store';

interface CategoryGridProps {
  onSelectCategory: (category: Category) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-12 sm:py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C08272] mb-1.5">
              Curated Wardrobe
            </div>
            <h2 
              className="font-serif text-3xl sm:text-4xl text-[#26392D] font-normal tracking-tight"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
            >
              Essential Categories
            </h2>
          </div>
          <p className="text-sm text-[#5B6F61] max-w-md mt-2 md:mt-0">
            Tailored specifically for everyday modesty, tactile comfort, and sculpted support from dawn to dusk.
          </p>
        </div>

        {/* Editorial Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Card 1: Tops & Tees (Span 7 cols) */}
          <div
            onClick={() => onSelectCategory('tops')}
            className="md:col-span-7 group relative h-[320px] sm:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 border border-[#E8E1D5]"
          >
            <img
              src="/src/assets/images/product_ribbed_top_1792047207971.jpg"
              alt="Tops & Ribbed T-Shirts"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent transition-opacity" />
            
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-widest uppercase font-medium bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  Everyday Essentials
                </span>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#C08272] transition-colors">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal mb-1.5">
                  Tops &amp; Ribbed Tees
                </h3>
                <p className="text-xs sm:text-sm text-[#FAF7F2]/80 max-w-md leading-relaxed">
                  Ultra-soft modal crewnecks, ribbed long-sleeve tops, and relaxed modest silhouettes.
                </p>
                <div className="mt-3 text-xs font-semibold text-[#DFB5A8] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore Tops (7-Day Exchange)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Skirts & Co-ords (Span 5 cols) */}
          <div
            onClick={() => onSelectCategory('skirts')}
            className="md:col-span-5 group relative h-[320px] sm:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 border border-[#E8E1D5]"
          >
            <img
              src="/src/assets/images/product_pleated_skirt_1792047209845.jpg"
              alt="Skirts & Modest Co-ords"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent transition-opacity" />

            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-widest uppercase font-medium bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  Modest Silhouettes
                </span>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#C08272] transition-colors">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal mb-1.5">
                  Skirts &amp; Co-ords
                </h3>
                <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed">
                  Accordion pleated midis, washed linen skirts with discreet side pockets.
                </p>
                <div className="mt-3 text-xs font-semibold text-[#DFB5A8] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Shop Flowing Skirts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Seamless Active Leggings (Span 5 cols) */}
          <div
            onClick={() => onSelectCategory('leggings')}
            className="md:col-span-5 group relative h-[320px] sm:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 border border-[#E8E1D5]"
          >
            <img
              src="/src/assets/images/product_sage_leggings_1792047209860.jpg"
              alt="Seamless Active Leggings"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent transition-opacity" />

            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-widest uppercase font-medium bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  Squat-Proof Comfort
                </span>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#C08272] transition-colors">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal mb-1.5">
                  Seamless Leggings
                </h3>
                <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed">
                  Buttery compression with wide high-rise waistbands and zero front seam discomfort.
                </p>
                <div className="mt-3 text-xs font-semibold text-[#DFB5A8] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore Active Leggings</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Intimates & Shapewear (Span 7 cols) with Discreet Hygiene Policy Tag */}
          <div
            onClick={() => onSelectCategory('intimates')}
            className="md:col-span-7 group relative h-[320px] sm:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 border border-[#E8E1D5]"
          >
            <img
              src="/src/assets/images/product_seamless_bra_1792047209651.jpg"
              alt="Intimates & Seamless Wireless Bras"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity" />

            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs tracking-widest uppercase font-medium bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C08272]" />
                  <span>Luna Collection</span>
                </span>
                
                {/* Hygiene Policy Badge */}
                <span className="text-[11px] font-medium bg-[#26392D]/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1.5 text-[#F5EFE6]">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#C08272]" />
                  <span>Sanitary Hygiene Shielded · Final Sale</span>
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal mb-1.5">
                  Intimates &amp; Wireless Bras
                </h3>
                <p className="text-xs sm:text-sm text-[#FAF7F2]/80 max-w-lg leading-relaxed">
                  Zero-underwire support that smooths without constriction. Molded foam cups and ultra-fine modal anti-chafing slip shorts.
                </p>
                <div className="mt-3 text-xs font-semibold text-[#DFB5A8] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Find Your Bra Size &amp; Browse</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
