export type Currency = 'BDT' | 'USD';

export type Category = 
  | 'all'
  | 'tops'
  | 'skirts'
  | 'leggings'
  | 'intimates'
  | 'new-arrivals';

export interface ColorOption {
  name: string;
  hex: string;
  image?: string;
}

export type ProductTag = '7-Day Exchange' | 'Final Sale (Hygiene)' | 'New Arrival' | 'Bestseller';

export interface Product {
  id: string;
  name: string;
  category: 'tops' | 'skirts' | 'leggings' | 'intimates';
  categoryLabel: string;
  priceUSD: number;
  priceBDT: number;
  originalPriceUSD?: number;
  originalPriceBDT?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  colors: ColorOption[];
  sizes: string[];
  isBra: boolean;
  tag: ProductTag;
  description: string;
  fabric: string;
  fitNotes: string;
  isHygieneFinalSale: boolean;
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique item id combining product id, color, size
  product: Product;
  selectedColor: ColorOption;
  selectedSize: string;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedProducts?: Product[];
  actionType?: 'open_size_guide' | 'view_discreet_policy' | 'browse_category';
  actionPayload?: string;
}
