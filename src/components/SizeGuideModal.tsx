import React, { useState } from 'react';
import { X, Ruler, Sparkles, CheckCircle2, Info, ArrowRight, ShieldCheck } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySizeFilter?: (size: string) => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  onApplySizeFilter,
}) => {
  const [activeTab, setActiveTab] = useState<'apparel' | 'bra'>('bra');

  // Apparel State (in inches)
  const [bust, setBust] = useState<number>(35);
  const [waist, setWaist] = useState<number>(28);
  const [hip, setHip] = useState<number>(38);

  // Bra Calculator State (in inches)
  const [underbust, setUnderbust] = useState<number>(31);
  const [overbust, setOverbust] = useState<number>(35);

  if (!isOpen) return null;

  // Predict Apparel Size (XS to 2XL)
  const predictApparelSize = (): { size: string; notes: string } => {
    if (bust <= 33 && waist <= 26 && hip <= 36) {
      return { size: 'XS', notes: 'Tailored fitted profile. Ideal for US 0-2 / UK 4-6.' };
    }
    if (bust <= 35 && waist <= 28 && hip <= 38) {
      return { size: 'S', notes: 'Graceful relaxed drape. Ideal for US 4-6 / UK 8-10.' };
    }
    if (bust <= 37 && waist <= 30 && hip <= 40) {
      return { size: 'M', notes: 'Classic comfortable modest fit. Ideal for US 8-10 / UK 12-14.' };
    }
    if (bust <= 40 && waist <= 33 && hip <= 43) {
      return { size: 'L', notes: 'Roomy comfort cut with fluid fall. Ideal for US 12-14 / UK 16-18.' };
    }
    if (bust <= 43 && waist <= 36 && hip <= 46) {
      return { size: 'XL', notes: 'Generous non-restrictive cut. Ideal for US 16-18 / UK 20.' };
    }
    return { size: '2XL', notes: 'Relaxed modest silhouette with extra ease. Ideal for US 20-22.' };
  };

  // Bra Size Calculation logic
  const calculateBraSize = () => {
    // 1. Calculate Band Size:
    // If underbust is even, add 4 (or round up to nearest even)
    const roundedUnder = Math.round(underbust);
    let band = roundedUnder % 2 === 0 ? roundedUnder : roundedUnder + 1;
    // Standard modern vanity fit: if underbust 30-31 -> 34 band, 32-33 -> 36 band
    if (band < 30) band = 32;
    if (band > 42) band = 42;

    // 2. Calculate Cup:
    const diff = Math.max(0, overbust - underbust);
    let cup = 'A';
    if (diff <= 1.5) cup = 'A';
    else if (diff <= 2.5) cup = 'B';
    else if (diff <= 3.5) cup = 'C';
    else if (diff <= 4.5) cup = 'D';
    else if (diff <= 5.5) cup = 'DD / E';
    else cup = 'DDD / F';

    const primarySize = `${band}${cup.split(' ')[0]}`;

    // Sister Sizes:
    // Tighter band -> larger cup (e.g. 34C -> 32D)
    // Looser band -> smaller cup (e.g. 34C -> 36B)
    const cupsList = ['A', 'B', 'C', 'D', 'DD'];
    const currentCupIndex = cupsList.indexOf(cup.split(' ')[0]);
    
    const sisterTighter = currentCupIndex < cupsList.length - 1 && band > 32 
      ? `${band - 2}${cupsList[currentCupIndex + 1]}` 
      : null;
    const sisterLooser = currentCupIndex > 0 && band < 40 
      ? `${band + 2}${cupsList[currentCupIndex - 1]}` 
      : null;

    return {
      band,
      cup,
      primarySize,
      sisterTighter,
      sisterLooser,
    };
  };

  const apparelResult = predictApparelSize();
  const braResult = calculateBraSize();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E8E1D5] overflow-hidden my-8 z-10">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#FAF7F2] border-b border-[#E8E1D5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#26392D] text-[#FAF7F2] flex items-center justify-center">
              <Ruler className="w-4 h-4 text-[#C08272]" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#26392D] font-normal" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
                Universal Sizing &amp; Fit Advisor
              </h3>
              <p className="text-xs text-[#6B8071]">
                Discreet, private measurement guide for modest apparel and wireless bras
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#4D6152] hover:text-[#26392D] rounded-full hover:bg-[#EFE8DE] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-4 border-b border-[#E8E1D5] flex gap-2">
          <button
            onClick={() => setActiveTab('bra')}
            className={`pb-3 px-3 text-sm font-semibold transition-all relative ${
              activeTab === 'bra'
                ? 'text-[#26392D]'
                : 'text-[#7B8E81] hover:text-[#26392D]'
            }`}
          >
            <span>Bra &amp; Intimates Calculator</span>
            {activeTab === 'bra' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C08272]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('apparel')}
            className={`pb-3 px-3 text-sm font-semibold transition-all relative ${
              activeTab === 'apparel'
                ? 'text-[#26392D]'
                : 'text-[#7B8E81] hover:text-[#26392D]'
            }`}
          >
            <span>Outerwear &amp; Apparel (XS–2XL)</span>
            {activeTab === 'apparel' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C08272]" />
            )}
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* TAB 1: BRA CALCULATOR */}
          {activeTab === 'bra' && (
            <div className="space-y-6">
              
              {/* Measuring Guide Notice */}
              <div className="p-4 rounded-2xl bg-[#F2ECE3] border border-[#E2D8C9] text-xs text-[#4E6153] flex items-start gap-3">
                <Info className="w-5 h-5 text-[#C08272] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-semibold text-[#26392D]">How to measure comfortably at home:</div>
                  <p>1. <strong>Snug Underbust:</strong> Pull measuring tape snugly right under your bust, parallel to the floor, exhaling naturally.</p>
                  <p>2. <strong>Fullest Overbust:</strong> Measure around the fullest point of your chest while wearing an unpadded bra.</p>
                </div>
              </div>

              {/* Sliders / Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Underbust */}
                <div className="p-4 rounded-xl bg-white border border-[#E8E1D5] space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#26392D]">Snug Underbust</span>
                    <span className="font-mono text-sm font-bold text-[#C08272]">{underbust}&quot;</span>
                  </div>
                  <input
                    type="range"
                    min={26}
                    max={42}
                    step={0.5}
                    value={underbust}
                    onChange={(e) => setUnderbust(parseFloat(e.target.value))}
                    className="w-full accent-[#26392D] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#869A8C]">
                    <span>26 inches</span>
                    <span>42 inches</span>
                  </div>
                </div>

                {/* Overbust */}
                <div className="p-4 rounded-xl bg-white border border-[#E8E1D5] space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#26392D]">Fullest Overbust</span>
                    <span className="font-mono text-sm font-bold text-[#C08272]">{overbust}&quot;</span>
                  </div>
                  <input
                    type="range"
                    min={underbust}
                    max={48}
                    step={0.5}
                    value={Math.max(underbust, overbust)}
                    onChange={(e) => setOverbust(parseFloat(e.target.value))}
                    className="w-full accent-[#26392D] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#869A8C]">
                    <span>{underbust}&quot; min</span>
                    <span>48 inches</span>
                  </div>
                </div>
              </div>

              {/* Result Showcase */}
              <div className="p-5 rounded-2xl bg-[#26392D] text-[#FAF7F2] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#C08272] font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Your Recommended Luna Fit</span>
                  </span>
                  <span className="text-xs text-[#FAF7F2]/70">Zero-Wire Molded Comfort</span>
                </div>

                <div className="flex items-baseline gap-4">
                  <div className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
                    {braResult.primarySize}
                  </div>
                  <div className="text-xs text-[#FAF7F2]/80 space-y-0.5">
                    <div>Band: <strong>{braResult.band}&quot;</strong> · Cup: <strong>Cup {braResult.cup}</strong></div>
                    <div className="text-[11px] text-[#DFB5A8]">Discreet, no-dig underband support</div>
                  </div>
                </div>

                {/* Sister Sizes */}
                {(braResult.sisterTighter || braResult.sisterLooser) && (
                  <div className="pt-3 border-t border-white/15 flex items-center gap-3 text-xs">
                    <span className="text-[#FAF7F2]/70">Sister Sizes:</span>
                    {braResult.sisterTighter && (
                      <span className="bg-white/10 px-2 py-0.5 rounded text-[11px]">
                        {braResult.sisterTighter} (Snugger band)
                      </span>
                    )}
                    {braResult.sisterLooser && (
                      <span className="bg-white/10 px-2 py-0.5 rounded text-[11px]">
                        {braResult.sisterLooser} (Looser band)
                      </span>
                    )}
                  </div>
                )}
              </div>

              {onApplySizeFilter && (
                <button
                  onClick={() => {
                    onApplySizeFilter(braResult.primarySize);
                    onClose();
                  }}
                  className="w-full py-3 bg-[#FAF7F2] hover:bg-[#EFE8DE] text-[#26392D] font-semibold text-xs rounded-xl border border-[#26392D]/30 flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Filter Store for Size {braResult.primarySize}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C08272]" />
                </button>
              )}
            </div>
          )}

          {/* TAB 2: APPAREL CALCULATOR */}
          {activeTab === 'apparel' && (
            <div className="space-y-6">
              
              <div className="p-4 rounded-2xl bg-[#F2ECE3] border border-[#E2D8C9] text-xs text-[#4E6153] flex items-start gap-3">
                <Info className="w-5 h-5 text-[#C08272] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-semibold text-[#26392D]">Outerwear Sizing Guidance:</div>
                  <p>Our tops and skirts are cut with generous modest length and ease. Use your measurements below to predict your standard size.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Bust */}
                <div className="p-3.5 rounded-xl bg-white border border-[#E8E1D5] space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#26392D]">Bust</span>
                    <span className="font-mono font-bold text-[#C08272]">{bust}&quot;</span>
                  </div>
                  <input
                    type="range"
                    min={30}
                    max={48}
                    step={1}
                    value={bust}
                    onChange={(e) => setBust(parseInt(e.target.value))}
                    className="w-full accent-[#26392D] cursor-pointer"
                  />
                </div>

                {/* Waist */}
                <div className="p-3.5 rounded-xl bg-white border border-[#E8E1D5] space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#26392D]">Natural Waist</span>
                    <span className="font-mono font-bold text-[#C08272]">{waist}&quot;</span>
                  </div>
                  <input
                    type="range"
                    min={24}
                    max={44}
                    step={1}
                    value={waist}
                    onChange={(e) => setWaist(parseInt(e.target.value))}
                    className="w-full accent-[#26392D] cursor-pointer"
                  />
                </div>

                {/* Hips */}
                <div className="p-3.5 rounded-xl bg-white border border-[#E8E1D5] space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#26392D]">Full Hips</span>
                    <span className="font-mono font-bold text-[#C08272]">{hip}&quot;</span>
                  </div>
                  <input
                    type="range"
                    min={32}
                    max={52}
                    step={1}
                    value={hip}
                    onChange={(e) => setHip(parseInt(e.target.value))}
                    className="w-full accent-[#26392D] cursor-pointer"
                  />
                </div>
              </div>

              {/* Result Card */}
              <div className="p-5 rounded-2xl bg-[#26392D] text-[#FAF7F2] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#C08272] font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Your Predicted Apparel Size</span>
                  </span>
                  <span className="text-xs text-[#FAF7F2]/70">7-Day Free Size Exchange</span>
                </div>

                <div className="flex items-baseline gap-4">
                  <div className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
                    {apparelResult.size}
                  </div>
                  <div className="text-xs text-[#FAF7F2]/80">
                    <p>{apparelResult.notes}</p>
                  </div>
                </div>
              </div>

              {onApplySizeFilter && (
                <button
                  onClick={() => {
                    onApplySizeFilter(apparelResult.size);
                    onClose();
                  }}
                  className="w-full py-3 bg-[#FAF7F2] hover:bg-[#EFE8DE] text-[#26392D] font-semibold text-xs rounded-xl border border-[#26392D]/30 flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Filter Store for Size {apparelResult.size}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C08272]" />
                </button>
              )}
            </div>
          )}

          {/* Privacy & Hygiene Policy Footnote */}
          <div className="pt-3 border-t border-[#E8E1D5] flex items-center justify-between text-xs text-[#6B8071]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C08272]" />
              <span>Free size exchange applies on all apparel tops, skirts &amp; leggings.</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
