import React, { useState } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { Product, Currency } from '../types/store';
import { PRODUCTS } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  currency,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = PRODUCTS.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.colors.some((c) => c.name.toLowerCase().includes(q))
    );
  });

  const suggestions = [
    'Wireless Bra',
    'Pleated Skirt',
    'Ribbed Top',
    'Seamless Leggings',
    'Bamboo Modal',
    'Modest Co-ord',
  ];

  const formatPrice = (priceUSD: number, priceBDT: number) => {
    return currency === 'BDT' ? `৳${priceBDT.toLocaleString()}` : `$${priceUSD.toFixed(0)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E8E1D5] overflow-hidden z-10 flex flex-col">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#E8E1D5] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#C08272] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search tops, skirts, wire-free bras, fabrics, colors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm sm:text-base bg-transparent focus:outline-none text-[#26392D] placeholder:text-[#91A497]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#869A8D] hover:text-[#26392D]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 text-[#4E6253] hover:text-[#26392D] rounded-full hover:bg-[#F2ECE3]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Search Suggestions */}
        <div className="px-6 py-3 bg-[#F4EFE7] border-b border-[#E8E1D5] flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[#869A8D] font-medium shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#C08272]" /> Popular:
          </span>
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(s)}
              className="px-2.5 py-1 bg-white hover:bg-[#FAF7F2] text-[#26392D] font-medium rounded-full border border-[#DFD5C7] shrink-0 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-3">
          <div className="text-xs font-semibold text-[#869A8D] uppercase tracking-wider px-1">
            {filtered.length} {filtered.length === 1 ? 'Product found' : 'Products found'}
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#6F8273]">
              No pieces matching &quot;{query}&quot;. Try searching for &quot;Bra&quot;, &quot;Skirt&quot;, or &quot;Modal&quot;.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="p-3 bg-white hover:bg-[#F4EFE8] rounded-2xl border border-[#E8E1D5] hover:border-[#C08272]/50 cursor-pointer flex gap-3 transition-all group"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-20 rounded-xl object-cover bg-[#FAF7F2] shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#869A8D] block">
                        {product.categoryLabel}
                      </span>
                      <h4 className="text-xs font-semibold text-[#26392D] group-hover:text-[#C08272] transition-colors truncate">
                        {product.name}
                      </h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#26392D]">
                        {formatPrice(product.priceUSD, product.priceBDT)}
                      </span>
                      <span className="text-[10px] text-[#C08272] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
