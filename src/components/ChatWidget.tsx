import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Ruler, 
  Truck, 
  ShoppingBag,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Product, ColorOption, Currency } from '../types/store';
import { PRODUCTS } from '../data/products';

interface ChatWidgetProps {
  currency: Currency;
  onOpenSizeGuide: () => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: ColorOption, size: string) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  quickAction?: 'open_size_guide';
  recommendedProducts?: Product[];
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  currency,
  onOpenSizeGuide,
  onQuickView,
  onAddToCart,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: "As-salamu alaykum! I'm Luna, your private Fit & Comfort Consultant at LIBAAH. How can I help you discover your perfect fit today?",
      timestamp: 'Just now',
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickChips = [
    { label: '📏 Calculate My Size', query: 'Help me find my size for bras and modest tops' },
    { label: '🛡️ Return & Exchange Rules', query: 'What is your exchange and hygiene return policy?' },
    { label: '🚚 Discreet Delivery', query: 'How does your discreet packaging and shipping work?' },
    { label: '🌿 Breathable Bamboo Fabric', query: 'Tell me about your bamboo and modal fabrics' },
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText.trim();
    if (!query) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Generate intelligent contextual response
    setTimeout(() => {
      const lower = query.toLowerCase();
      let replyText = '';
      let recommended: Product[] = [];
      let quickAction: 'open_size_guide' | undefined;

      if (lower.includes('size') || lower.includes('bra') || lower.includes('measure') || lower.includes('fit') || lower.includes('calculate')) {
        replyText = "Finding the right fit in intimate apparel should be stress-free and private! We developed our Universal Sizing & Bra Calculator so you can measure snugly at home and get your exact band, cup, and sister sizes:";
        quickAction = 'open_size_guide';
        recommended = [PRODUCTS[3], PRODUCTS[0]]; // Bra & Ribbed top
      } else if (lower.includes('exchange') || lower.includes('return') || lower.includes('hygiene') || lower.includes('rule')) {
        replyText = "We offer a 7-day hassle-free exchange on all apparel (tops, skirts, co-ord sets, leggings). For sanitary hygiene safety, intimate panties, wire-free bras, and slip shorts are sealed and classified as Final Sale. We encourage using our Size Finder to confirm your exact measurements before ordering!";
      } else if (lower.includes('shipping') || lower.includes('discreet') || lower.includes('delivery') || lower.includes('package')) {
        replyText = "Privacy is one of our four core pillars. All LIBAAH orders are dispatched in 100% plain, unbranded kraft cartons with neutral courier shipping labels. There are zero intimate keywords, lingerie logos, or product descriptions on the exterior packaging.";
      } else if (lower.includes('fabric') || lower.includes('bamboo') || lower.includes('modal') || lower.includes('material')) {
        replyText = "We prioritize thermo-regulating fabrics: Austrian Lenzing™ Modal and Organic Bamboo Viscose. They are twice as breathable as standard cotton, naturally antimicrobial, silky against sensitive skin, and maintain opaque modest coverage.";
        recommended = [PRODUCTS[0], PRODUCTS[4]];
      } else if (lower.includes('skirt') || lower.includes('bottom')) {
        replyText = "Our modest midi and maxi skirts are designed with permanent fluid pleats and opaque slip linings so you never have to worry about see-through fabrics or cling:";
        recommended = [PRODUCTS[1], PRODUCTS[6]];
      } else {
        replyText = "Thank you for asking! I'm here to ensure you experience absolute comfort, privacy, and confidence. Here are our top customer-favorite essentials right now:";
        recommended = [PRODUCTS[0], PRODUCTS[3]];
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickAction,
        recommendedProducts: recommended.length > 0 ? recommended : undefined,
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#26392D] text-[#FAF7F2] shadow-xl hover:bg-[#334B3B] hover:shadow-2xl transition-all duration-300"
            aria-label="Open Luna AI Fit Advisor"
          >
            {/* Pulsing indicator ring in terracotta */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C08272] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C08272]"></span>
            </span>

            <MessageCircle className="w-5 h-5 text-[#FAF7F2]" />
            <span className="text-xs font-semibold tracking-wide">
              Luna · Fit Advisor
            </span>
          </button>
        )}
      </div>

      {/* Collapsible Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-50 w-[94vw] sm:w-[410px] h-[540px] sm:h-[580px] max-h-[80vh] sm:max-h-[85vh] bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E8E1D5] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-[#26392D] text-[#FAF7F2] p-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-[#344B3C] border border-[#C08272]/50 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#C08272]" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#26392D]" />
              </div>
              <div>
                <h4 className="font-serif text-base tracking-wide text-white" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
                  Luna · Fit &amp; Privacy Consultant
                </h4>
                <div className="text-[10px] text-[#C08272] font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Confidential &amp; Discreet</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#26392D] text-[#FAF7F2] rounded-tr-xs'
                      : 'bg-white border border-[#E8E1D5] text-[#243428] rounded-tl-xs shadow-2xs'
                  }`}
                >
                  <p>{m.text}</p>

                  {/* Quick Action Button */}
                  {m.quickAction === 'open_size_guide' && (
                    <button
                      onClick={onOpenSizeGuide}
                      className="mt-2.5 w-full py-2 px-3 bg-[#26392D] text-[#FAF7F2] font-semibold text-[11px] rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#344B3C] transition-colors"
                    >
                      <Ruler className="w-3.5 h-3.5 text-[#C08272]" />
                      <span>Launch Sizing &amp; Bra Calculator</span>
                    </button>
                  )}

                  {/* Rich Mini-Product Cards */}
                  {m.recommendedProducts && (
                    <div className="mt-3 space-y-2 pt-2 border-t border-[#E8E1D5]">
                      <div className="text-[10px] font-semibold text-[#869A8C] uppercase tracking-wider">
                        Recommended Pieces
                      </div>
                      {m.recommendedProducts.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center gap-2.5 p-2 bg-[#FAF7F2] rounded-xl border border-[#E8E1D5] hover:border-[#C08272]/50 transition-colors"
                        >
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-11 h-11 rounded-lg object-cover bg-white"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-[#26392D] truncate text-[11px]">
                              {p.name}
                            </div>
                            <div className="text-[10px] font-bold text-[#C08272]">
                              {currency === 'BDT' ? `৳${p.priceBDT}` : `$${p.priceUSD}`}
                            </div>
                          </div>
                          <button
                            onClick={() => onQuickView(p)}
                            className="p-1.5 text-[#26392D] hover:text-[#C08272]"
                            title="Quick View"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onAddToCart(p, p.colors[0], p.sizes[0] || 'M')}
                            className="p-1.5 bg-[#26392D] text-white rounded-lg hover:bg-[#344B3C]"
                            title="Add to Bag"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <span className="text-[9px] text-[#869A8C] mt-1 px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Question Chips */}
          <div className="px-3 py-2 bg-[#F2ECE3] border-t border-[#E8E1D5] flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip.query)}
                className="whitespace-nowrap px-2.5 py-1 text-[11px] font-medium bg-white text-[#26392D] rounded-full border border-[#DED4C7] hover:bg-[#FAF7F2] hover:border-[#C08272] transition-colors shrink-0"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-[#E8E1D5] flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about bra fit, fabrics, discreet shipping..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 py-2 px-3 text-xs bg-[#FAF7F2] rounded-xl border border-[#E8E1D5] focus:outline-none focus:border-[#26392D]"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim()}
              className="p-2.5 bg-[#26392D] hover:bg-[#344B3C] disabled:opacity-40 text-white rounded-xl transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-[#C08272]" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
