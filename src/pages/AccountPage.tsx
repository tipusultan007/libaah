import React, { useState } from 'react';
import { 
  User, 
  Package, 
  MapPin, 
  Ruler, 
  ShieldCheck, 
  Settings, 
  Heart, 
  CheckCircle2, 
  Truck, 
  ChevronRight, 
  ExternalLink, 
  Phone, 
  Mail, 
  Plus, 
  Trash2, 
  ArrowLeft, 
  FileText, 
  ShieldAlert,
  RotateCcw
} from 'lucide-react';
import { Product } from '../types/store';

export type AccountSubPage = 
  | 'dashboard' 
  | 'orders' 
  | 'addresses' 
  | 'measurements' 
  | 'privacy' 
  | 'settings';

interface OrderItem {
  name: string;
  category: string;
  size: string;
  color: string;
  priceBDT: number;
  qty: number;
  image: string;
  isHygieneFinalSale?: boolean;
}

interface Order {
  id: string;
  date: string;
  status: 'In Transit' | 'Delivered' | 'Processing';
  statusColor: string;
  courier: string;
  trackingNumber: string;
  items: OrderItem[];
  subtotalBDT: number;
  shippingBDT: number;
  totalBDT: number;
  paymentMethod: string;
  discreetPackaging: boolean;
  deliveryAddress: string;
  estimatedDelivery?: string;
}

interface SavedAddress {
  id: string;
  title: string;
  recipientName: string;
  phone: string;
  address: string;
  district: string;
  isDefault: boolean;
  notes?: string;
}

interface AccountPageProps {
  wishlist: Product[];
  onOpenWishlist: () => void;
  onOpenSizeGuide: () => void;
  onBackToShop: () => void;
  onProductClick: (product: Product) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  wishlist,
  onOpenWishlist,
  onOpenSizeGuide,
  onBackToShop,
}) => {
  const [activeTab, setActiveTab] = useState<AccountSubPage>('dashboard');
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<Order | null>(null);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  // Customer Profile State
  const [profile, setProfile] = useState({
    name: 'Fatima Rahman',
    phone: '+880 1712-345678',
    email: 'fatima.rahman@example.com',
    memberSince: 'October 2024',
    customerId: 'LIB-BD-9042',
    discreetSmsEnabled: true,
  });

  // Saved Addresses State
  const [addresses, setAddresses] = useState<SavedAddress[]>([
    {
      id: 'addr-1',
      title: 'Home (Default)',
      recipientName: 'Fatima Rahman',
      phone: '+880 1712-345678',
      address: 'House 42, Road 11, Block D, Banani',
      district: 'Dhaka - 1213',
      isDefault: true,
      notes: 'Call 10 minutes before delivery. 100% plain packaging requested.',
    },
    {
      id: 'addr-2',
      title: 'Office',
      recipientName: 'Fatima Rahman',
      phone: '+880 1712-345678',
      address: 'Level 7, Lotus Kamal Tower, Gulshan-1',
      district: 'Dhaka - 1212',
      isDefault: false,
      notes: 'Reception desk drop-off.',
    },
  ]);

  // Orders State with real discreet e-commerce details
  const [orders] = useState<Order[]>([
    {
      id: 'LIB-2024-9102',
      date: '14 Oct 2026',
      status: 'In Transit',
      statusColor: 'bg-[#E4EFE6] text-[#2F613B]',
      courier: 'Steadfast Express Logistics',
      trackingNumber: 'STEAD-DH-849201',
      estimatedDelivery: 'Today by 6:00 PM',
      subtotalBDT: 6950,
      shippingBDT: 0, // Free shipping over 5000
      totalBDT: 6950,
      paymentMethod: 'Cash on Delivery (Discreet Packaging)',
      discreetPackaging: true,
      deliveryAddress: 'House 42, Road 11, Block D, Banani, Dhaka',
      items: [
        {
          name: 'Luna Zero-Wire Sculpting Bra',
          category: 'Intimates',
          size: '34C',
          color: 'Almond Nude',
          priceBDT: 4200,
          qty: 1,
          image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=400&q=80',
          isHygieneFinalSale: true,
        },
        {
          name: 'Aria Silk-Touch Modest Tank',
          category: 'Tops',
          size: 'M',
          color: 'Soft Ecru',
          priceBDT: 2750,
          qty: 1,
          image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&q=80',
          isHygieneFinalSale: false,
        },
      ],
    },
    {
      id: 'LIB-2024-8740',
      date: '28 Sep 2026',
      status: 'Delivered',
      statusColor: 'bg-[#F0EAE1] text-[#26392D]',
      courier: 'Pathao Courier BD',
      trackingNumber: 'PTH-BAN-11029',
      subtotalBDT: 4600,
      shippingBDT: 60,
      totalBDT: 4660,
      paymentMethod: 'bKash Online Payment',
      discreetPackaging: true,
      deliveryAddress: 'House 42, Road 11, Block D, Banani, Dhaka',
      items: [
        {
          name: 'Zephyr High-Waisted Modal Skirt',
          category: 'Skirts',
          size: 'M',
          color: 'Dusty Rose',
          priceBDT: 4600,
          qty: 1,
          image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=400&q=80',
          isHygieneFinalSale: false,
        },
      ],
    },
    {
      id: 'LIB-2024-7621',
      date: '12 Aug 2026',
      status: 'Delivered',
      statusColor: 'bg-[#F0EAE1] text-[#26392D]',
      courier: 'RedX Express Fulfillment',
      trackingNumber: 'RDX-DHK-99402',
      subtotalBDT: 3400,
      shippingBDT: 60,
      totalBDT: 3460,
      paymentMethod: 'Cash on Delivery',
      discreetPackaging: true,
      deliveryAddress: 'Level 7, Lotus Kamal Tower, Gulshan-1, Dhaka',
      items: [
        {
          name: 'Serene Seamless Support Bralette',
          category: 'Intimates',
          size: '34C',
          color: 'Sage Mist',
          priceBDT: 3400,
          qty: 1,
          image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80',
          isHygieneFinalSale: true,
        },
      ],
    },
  ]);

  // Sizing Profile State
  const sizingProfile = {
    underbust: '30 inches',
    fullBust: '35 inches',
    calculatedBraSize: '34C',
    sisterSizes: ['32D (Snug fit)', '36B (Relaxed fit)'],
    apparelSize: 'M (Medium)',
    skirtSize: 'M (Waist 28-30")',
  };

  // New Address Form State
  const [newAddressForm, setNewAddressForm] = useState({
    title: 'Home',
    recipientName: profile.name,
    phone: profile.phone,
    address: '',
    district: 'Dhaka',
    notes: 'Discreet unmarked packaging requested.',
  });

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressForm.address.trim()) return;

    const newAddr: SavedAddress = {
      id: `addr-${Date.now()}`,
      title: newAddressForm.title,
      recipientName: newAddressForm.recipientName,
      phone: newAddressForm.phone,
      address: newAddressForm.address,
      district: newAddressForm.district,
      isDefault: addresses.length === 0,
      notes: newAddressForm.notes,
    };
    setAddresses([...addresses, newAddr]);
    setIsAddAddressOpen(false);
    setNewAddressForm({
      title: 'Home',
      recipientName: profile.name,
      phone: profile.phone,
      address: '',
      district: 'Dhaka',
      notes: 'Discreet unmarked packaging requested.',
    });
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(addresses.map(a => ({
      ...a,
      isDefault: a.id === id,
    })));
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  const formatBDT = (amount: number) => `৳${amount.toLocaleString()}`;

  const navMenuItems = [
    { id: 'dashboard' as AccountSubPage, label: 'Overview', icon: User, count: undefined },
    { id: 'orders' as AccountSubPage, label: 'Orders & Tracking', icon: Package, count: orders.length },
    { id: 'addresses' as AccountSubPage, label: 'Saved Addresses', icon: MapPin, count: addresses.length },
    { id: 'measurements' as AccountSubPage, label: 'Fit Profile & Sizes', icon: Ruler, count: undefined },
    { id: 'privacy' as AccountSubPage, label: 'Privacy & Packaging', icon: ShieldCheck, count: undefined },
    { id: 'settings' as AccountSubPage, label: 'Account Settings', icon: Settings, count: undefined },
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-[85vh] py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#E8E1D5]">
          <div className="flex items-center gap-2 text-xs text-[#6F8274]">
            <button 
              onClick={onBackToShop}
              className="hover:text-[#26392D] transition-colors flex items-center gap-1 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Shop</span>
            </button>
            <span>/</span>
            <span className="text-[#26392D] font-bold">Customer Panel</span>
            <span>/</span>
            <span className="capitalize font-medium text-[#C08272]">{activeTab}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#26392D] text-white">
              <ShieldCheck className="w-3 h-3 text-[#C08272]" />
              <span>Discreet Customer ID: {profile.customerId}</span>
            </span>
          </div>
        </div>

        {/* Customer Header Banner */}
        <div className="my-6 rounded-2xl bg-gradient-to-r from-[#26392D] to-[#344D3D] text-[#FAF7F2] p-5 sm:p-7 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#1C2C23] border-2 border-[#C08272]/50 flex items-center justify-center text-white shrink-0 shadow-inner">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF7F2]">
                {profile.name.charAt(0)}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                  {profile.name}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C08272] text-white">
                  Privé Member
                </span>
              </div>
              <p className="text-xs text-[#D8E4DA] mt-1 flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#C08272]" /> {profile.phone}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-[#C08272]" /> {profile.email}
                </span>
              </p>
              <div className="text-[11px] text-[#A6C0AE] mt-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C08272]" />
                <span>All purchases shipped in 100% unmarked, plain confidential packaging</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => onOpenSizeGuide()}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center gap-1.5"
            >
              <Ruler className="w-3.5 h-3.5 text-[#C08272]" />
              <span>Bra Calculator</span>
            </button>
            <button
              onClick={() => onOpenWishlist()}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#C08272] hover:bg-[#A86E60] text-white transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Wishlist ({wishlist.length})</span>
            </button>
          </div>
        </div>

        {/* Dedicated Customer Panel Layout (Sidebar + Content) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Sub-Nav / Sidebar Navigation */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-[#E8E1D5] p-3 shadow-xs">
            <div className="px-3 py-2 text-[11px] uppercase tracking-widest font-bold text-[#8A9E8F] border-b border-[#F0EAE1]">
              Customer Panel
            </div>
            
            <nav className="mt-2 space-y-1">
              {navMenuItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all text-left ${
                      isActive
                        ? 'bg-[#26392D] text-white shadow-xs'
                        : 'text-[#3E5243] hover:bg-[#FAF7F2] hover:text-[#26392D]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#C08272]' : 'text-[#7D9183]'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.count !== undefined ? (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-[#C08272] text-white' : 'bg-[#F0EAE1] text-[#26392D]'
                      }`}>
                        {item.count}
                      </span>
                    ) : (
                      <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${isActive ? 'text-[#FAF7F2]' : 'text-[#8EA294]'}`} />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Confidentiality Reminder Card */}
            <div className="mt-4 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] text-[11px] text-[#55695A] space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-[#26392D]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C08272]" />
                <span>Discreet Protection</span>
              </div>
              <p className="leading-snug">
                Card &amp; MFS transactions show as &quot;LB Commerce&quot;. No intimate item labels on cartons.
              </p>
            </div>
          </aside>

          {/* Main Sub-Page Content Area */}
          <section className="lg:col-span-9 bg-white rounded-2xl border border-[#E8E1D5] p-5 sm:p-8 shadow-xs min-h-[500px]">
            
            {/* ==============================================================
                1. SUB-PAGE: DASHBOARD / OVERVIEW
               ============================================================== */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-[#26392D] font-medium">
                    Account Overview
                  </h2>
                  <p className="text-xs text-[#708475] mt-1">
                    Manage your confidential orders, addresses, and saved body fit profiles.
                  </p>
                </div>

                {/* 4 Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5]">
                    <span className="text-[11px] text-[#718577] block font-medium">Active Deliveries</span>
                    <span className="text-xl sm:text-2xl font-bold text-[#26392D] mt-1 block">1 In Transit</span>
                    <span className="text-[10px] text-[#2F613B] font-semibold flex items-center gap-1 mt-1">
                      <Truck className="w-3 h-3" /> Steadfast Express
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5]">
                    <span className="text-[11px] text-[#718577] block font-medium">Total Orders</span>
                    <span className="text-xl sm:text-2xl font-bold text-[#26392D] mt-1 block">{orders.length}</span>
                    <span className="text-[10px] text-[#718577] mt-1 block">All fulfilled discreetly</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5]">
                    <span className="text-[11px] text-[#718577] block font-medium">Saved Fit</span>
                    <span className="text-xl sm:text-2xl font-bold text-[#26392D] mt-1 block">{sizingProfile.calculatedBraSize}</span>
                    <span className="text-[10px] text-[#C08272] font-semibold mt-1 block">Sister Size 36B</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5]">
                    <span className="text-[11px] text-[#718577] block font-medium">Saved Wishlist</span>
                    <span className="text-xl sm:text-2xl font-bold text-[#26392D] mt-1 block">{wishlist.length}</span>
                    <button 
                      onClick={onOpenWishlist}
                      className="text-[10px] text-[#C08272] hover:underline font-semibold mt-1 block"
                    >
                      View Saved Items &rarr;
                    </button>
                  </div>
                </div>

                {/* Active Shipment Banner */}
                <div className="p-5 rounded-2xl bg-[#F4EFE7] border border-[#DFD6C8] space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#26392D] text-white flex items-center justify-center">
                        <Truck className="w-4 h-4 text-[#C08272]" />
                      </div>
                      <div>
                        <span className="font-bold text-sm text-[#26392D]">
                          Order #{orders[0].id} is Out for Delivery
                        </span>
                        <span className="text-[11px] text-[#697D6F] block">
                          Expected arrival: Today by 6:00 PM • Courier: {orders[0].courier}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedOrderForTracking(orders[0]);
                        setActiveTab('orders');
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-[#26392D] text-white text-xs font-semibold hover:bg-[#344B3C] transition-colors"
                    >
                      Track Shipment
                    </button>
                  </div>

                  {/* Visual Tracker Bar */}
                  <div className="pt-2">
                    <div className="w-full bg-[#E5DDCF] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#26392D] h-full rounded-full w-4/5 transition-all duration-500" />
                    </div>
                    <div className="flex justify-between text-[10px] text-[#76897C] font-semibold mt-2">
                      <span>Order Confirmed</span>
                      <span>Sealed Discreetly</span>
                      <span>Dispatched Dhaka Hub</span>
                      <span className="text-[#26392D] font-bold">Out for Delivery</span>
                      <span>Delivered</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div 
                    onClick={() => setActiveTab('addresses')}
                    className="p-4 rounded-xl border border-[#E8E1D5] hover:border-[#26392D] hover:bg-[#FAF7F2] transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] group-hover:bg-white border border-[#E8E1D5] flex items-center justify-center text-[#26392D]">
                        <MapPin className="w-4 h-4 text-[#C08272]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#26392D]">Manage Addresses</h4>
                        <p className="text-[11px] text-[#718577]">{addresses.length} Saved Locations in Dhaka</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#8FA295] group-hover:translate-x-0.5 transition-transform" />
                  </div>

                  <div 
                    onClick={() => setActiveTab('measurements')}
                    className="p-4 rounded-xl border border-[#E8E1D5] hover:border-[#26392D] hover:bg-[#FAF7F2] transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] group-hover:bg-white border border-[#E8E1D5] flex items-center justify-center text-[#26392D]">
                        <Ruler className="w-4 h-4 text-[#C08272]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#26392D]">Body Fit Calculator</h4>
                        <p className="text-[11px] text-[#718577]">Recorded Bra Fit: {sizingProfile.calculatedBraSize}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#8FA295] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

              </div>
            )}

            {/* ==============================================================
                2. SUB-PAGE: ORDERS & TRACKING
               ============================================================== */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-2xl text-[#26392D] font-medium">
                      My Orders &amp; Discreet Tracking
                    </h2>
                    <p className="text-xs text-[#708475] mt-1">
                      Track parcels in real time across Bangladesh. All shipments are packaged anonymously.
                    </p>
                  </div>
                </div>

                {/* Orders List */}
                <div className="space-y-5">
                  {orders.map((order) => (
                    <div 
                      key={order.id}
                      className="rounded-2xl border border-[#E8E1D5] p-5 hover:shadow-sm transition-all space-y-4 bg-white"
                    >
                      {/* Top Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F0EAE1]">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#26392D]">
                              Order #{order.id}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${order.statusColor}`}>
                              {order.status === 'In Transit' ? (
                                <Truck className="w-3 h-3" />
                              ) : (
                                <CheckCircle2 className="w-3 h-3" />
                              )}
                              <span>{order.status}</span>
                            </span>
                          </div>
                          <span className="text-[11px] text-[#718577] mt-0.5 block">
                            Placed on {order.date} • {order.paymentMethod}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-bold text-[#26392D]">
                            {formatBDT(order.totalBDT)}
                          </span>
                          <span className="text-[10px] text-[#718577] block">
                            {order.shippingBDT === 0 ? 'Free Delivery' : `+${formatBDT(order.shippingBDT)} Courier`}
                          </span>
                        </div>
                      </div>

                      {/* Discreet Tracking Notice */}
                      <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] text-xs text-[#526658] flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-[#C08272] shrink-0" />
                          <span>
                            Courier Tracking: <strong className="text-[#26392D]">{order.trackingNumber}</strong> ({order.courier})
                          </span>
                        </div>
                        <span className="text-[10px] text-[#C08272] font-semibold">
                          Label reads: &quot;A. Logistics - Fulfillment&quot;
                        </span>
                      </div>

                      {/* Items List */}
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-12 h-14 object-cover rounded-lg bg-[#FAF7F2] border border-[#E8E1D5] shrink-0"
                              />
                              <div>
                                <h4 className="text-xs font-bold text-[#26392D]">
                                  {item.name}
                                </h4>
                                <p className="text-[11px] text-[#728577]">
                                  Size: <span className="font-semibold text-[#26392D]">{item.size}</span> • Color: {item.color} • Qty: {item.qty}
                                </p>
                                {item.isHygieneFinalSale && (
                                  <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-[#8C5D53] mt-0.5">
                                    <ShieldAlert className="w-2.5 h-2.5" /> Hygiene Sealed Packaging
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-semibold text-[#26392D]">
                                {formatBDT(item.priceBDT * item.qty)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#F0EAE1]">
                        <span className="text-[11px] text-[#718577]">
                          Delivering to: <strong className="text-[#26392D]">{order.deliveryAddress}</strong>
                        </span>

                        <div className="flex items-center gap-2">
                          {order.status === 'In Transit' ? (
                            <button
                              onClick={() => setSelectedOrderForTracking(order)}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#26392D] text-white hover:bg-[#344B3C] transition-colors flex items-center gap-1"
                            >
                              <Truck className="w-3.5 h-3.5" />
                              <span>View Live Courier Progress</span>
                            </button>
                          ) : (
                            <button
                              onClick={onBackToShop}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FAF7F2] hover:bg-[#F0EAE1] text-[#26392D] border border-[#E8E1D5] transition-colors flex items-center gap-1"
                            >
                              <RotateCcw className="w-3.5 h-3.5 text-[#C08272]" />
                              <span>Reorder Items</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Expanded Tracking Modal / Timeline if selected */}
                      {selectedOrderForTracking?.id === order.id && (
                        <div className="p-4 rounded-xl bg-[#F7F3EC] border border-[#DFD6C8] space-y-3 animate-in fade-in">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-[#26392D] flex items-center gap-1.5">
                              <Truck className="w-4 h-4 text-[#C08272]" />
                              <span>Live Courier Dispatch Timeline</span>
                            </span>
                            <button 
                              onClick={() => setSelectedOrderForTracking(null)}
                              className="text-[11px] text-[#C08272] hover:underline font-semibold"
                            >
                              Close Tracker
                            </button>
                          </div>

                          <div className="space-y-3 text-xs pl-2 border-l-2 border-[#26392D] ml-2">
                            <div className="relative">
                              <span className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-[#26392D]" />
                              <div className="font-bold text-[#26392D]">Out for Delivery • Banani, Dhaka</div>
                              <div className="text-[11px] text-[#718577]">Rider: Steadfast Express (Arriving by 6:00 PM)</div>
                            </div>
                            <div className="relative">
                              <span className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-[#26392D]" />
                              <div className="font-bold text-[#26392D]">Sorted at Tejgaon Hub</div>
                              <div className="text-[11px] text-[#718577]">14 Oct, 08:30 AM</div>
                            </div>
                            <div className="relative">
                              <span className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-[#26392D]" />
                              <div className="font-bold text-[#26392D]">Sealed in Plain Unmarked Protective Carton</div>
                              <div className="text-[11px] text-[#718577]">13 Oct, 04:15 PM • Libaah Fulfillment Center</div>
                            </div>
                            <div className="relative">
                              <span className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-[#26392D]" />
                              <div className="font-bold text-[#26392D]">Order Verified &amp; Confirmed</div>
                              <div className="text-[11px] text-[#718577]">13 Oct, 02:00 PM</div>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* ==============================================================
                3. SUB-PAGE: SAVED ADDRESSES
               ============================================================== */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-2xl text-[#26392D] font-medium">
                      Saved Delivery Addresses
                    </h2>
                    <p className="text-xs text-[#708475] mt-1">
                      Courier delivery instructions are printed without intimates branding.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddAddressOpen(true)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#26392D] text-white hover:bg-[#344B3C] transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#C08272]" />
                    <span>Add New Address</span>
                  </button>
                </div>

                {/* Add Address Form Modal / Box */}
                {isAddAddressOpen && (
                  <form onSubmit={handleSaveNewAddress} className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-4">
                    <h3 className="font-bold text-sm text-[#26392D]">Add New Delivery Location</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-[#526557] font-semibold mb-1">Address Label</label>
                        <input
                          type="text"
                          required
                          value={newAddressForm.title}
                          onChange={(e) => setNewAddressForm({ ...newAddressForm, title: e.target.value })}
                          placeholder="Home, Office, Sister's Place"
                          className="w-full p-2.5 rounded-xl border border-[#DCD5C9] bg-white focus:outline-none focus:border-[#26392D]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#526557] font-semibold mb-1">Recipient Name</label>
                        <input
                          type="text"
                          required
                          value={newAddressForm.recipientName}
                          onChange={(e) => setNewAddressForm({ ...newAddressForm, recipientName: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-[#DCD5C9] bg-white focus:outline-none focus:border-[#26392D]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#526557] font-semibold mb-1">Phone Number (+880)</label>
                        <input
                          type="text"
                          required
                          value={newAddressForm.phone}
                          onChange={(e) => setNewAddressForm({ ...newAddressForm, phone: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-[#DCD5C9] bg-white focus:outline-none focus:border-[#26392D]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#526557] font-semibold mb-1">District / City</label>
                        <select
                          value={newAddressForm.district}
                          onChange={(e) => setNewAddressForm({ ...newAddressForm, district: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-[#DCD5C9] bg-white focus:outline-none focus:border-[#26392D]"
                        >
                          <option value="Dhaka">Dhaka (Inside Dhaka ৳60)</option>
                          <option value="Chattogram">Chattogram (Outside Dhaka ৳120)</option>
                          <option value="Sylhet">Sylhet (Outside Dhaka ৳120)</option>
                          <option value="Rajshahi">Rajshahi (Outside Dhaka ৳120)</option>
                          <option value="Khulna">Khulna (Outside Dhaka ৳120)</option>
                          <option value="Barishal">Barishal (Outside Dhaka ৳120)</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[#526557] font-semibold mb-1">Street Address, House &amp; Road No.</label>
                        <input
                          type="text"
                          required
                          value={newAddressForm.address}
                          onChange={(e) => setNewAddressForm({ ...newAddressForm, address: e.target.value })}
                          placeholder="e.g. House 14, Road 5, Block B, Dhanmondi"
                          className="w-full p-2.5 rounded-xl border border-[#DCD5C9] bg-white focus:outline-none focus:border-[#26392D]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[#526557] font-semibold mb-1">Special Courier Instructions</label>
                        <input
                          type="text"
                          value={newAddressForm.notes}
                          onChange={(e) => setNewAddressForm({ ...newAddressForm, notes: e.target.value })}
                          placeholder="e.g. Call before delivery, 100% plain packaging"
                          className="w-full p-2.5 rounded-xl border border-[#DCD5C9] bg-white focus:outline-none focus:border-[#26392D]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#26392D] text-white rounded-xl text-xs font-semibold hover:bg-[#344B3C]"
                      >
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddAddressOpen(false)}
                        className="px-4 py-2 bg-transparent text-[#718577] hover:text-[#26392D] text-xs font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Addresses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div 
                      key={addr.id}
                      className={`p-5 rounded-2xl border transition-all space-y-3 relative ${
                        addr.isDefault 
                          ? 'border-[#26392D] bg-[#FAF7F2]' 
                          : 'border-[#E8E1D5] bg-white hover:border-[#D4CAC0]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#26392D]">
                            {addr.title}
                          </span>
                          {addr.isDefault && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#26392D] text-white">
                              Default Shipping
                            </span>
                          )}
                        </div>

                        {addresses.length > 1 && (
                          <button
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="p-1 text-[#8C9F92] hover:text-[#C08272] transition-colors"
                            title="Delete Address"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="text-xs text-[#526658] space-y-1">
                        <div className="font-semibold text-[#26392D]">{addr.recipientName}</div>
                        <div>{addr.address}</div>
                        <div>{addr.district}</div>
                        <div className="text-[#728577] pt-1">Phone: {addr.phone}</div>
                        {addr.notes && (
                          <div className="text-[11px] text-[#C08272] italic pt-1">
                            Note: {addr.notes}
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t border-[#E8E1D5] flex items-center justify-between">
                        {!addr.isDefault ? (
                          <button
                            onClick={() => handleSetDefaultAddress(addr.id)}
                            className="text-xs text-[#26392D] font-semibold hover:underline"
                          >
                            Set as Default
                          </button>
                        ) : (
                          <span className="text-[11px] text-[#2F613B] font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Used for 1-Click Checkout
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* ==============================================================
                4. SUB-PAGE: FIT & MEASUREMENTS PROFILE
               ============================================================== */}
            {activeTab === 'measurements' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-[#26392D] font-medium">
                    Saved Body Fit Profile
                  </h2>
                  <p className="text-xs text-[#708475] mt-1">
                    Your personal dimensions are stored privately so you never have to guess sizes across bras, tops, and skirts.
                  </p>
                </div>

                {/* Sizing Card */}
                <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E8E1D5]">
                    <div>
                      <span className="text-xs uppercase tracking-wider font-bold text-[#899D8F]">
                        Primary Bra Recommendation
                      </span>
                      <div className="font-serif text-3xl font-bold text-[#26392D] mt-0.5">
                        {sizingProfile.calculatedBraSize}
                      </div>
                      <span className="text-xs text-[#C08272] font-semibold">
                        Snug Underband: {sizingProfile.underbust} • Bust Apex: {sizingProfile.fullBust}
                      </span>
                    </div>

                    <button
                      onClick={onOpenSizeGuide}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#26392D] text-white hover:bg-[#344B3C] transition-colors flex items-center gap-1.5"
                    >
                      <Ruler className="w-3.5 h-3.5 text-[#C08272]" />
                      <span>Recalculate Measurements</span>
                    </button>
                  </div>

                  {/* Sister Sizes */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#26392D] block">
                      Sister Sizes for Maximum Comfort
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {sizingProfile.sisterSizes.map((sister, i) => (
                        <div key={i} className="p-3 rounded-xl bg-white border border-[#E8E1D5] text-xs flex items-center justify-between">
                          <span className="font-semibold text-[#26392D]">{sister}</span>
                          <span className="text-[10px] text-[#718577]">Alternative Fit</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Apparel Sizes */}
                  <div className="pt-2 border-t border-[#E8E1D5] grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-white border border-[#E8E1D5] text-xs space-y-1">
                      <span className="font-bold text-[#26392D] block">Modest Tops &amp; Outerwear</span>
                      <span className="text-base font-bold text-[#26392D] block">{sizingProfile.apparelSize}</span>
                      <span className="text-[11px] text-[#718577]">Relaxed modest drape</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-[#E8E1D5] text-xs space-y-1">
                      <span className="font-bold text-[#26392D] block">Skirts &amp; Bottoms</span>
                      <span className="text-base font-bold text-[#26392D] block">{sizingProfile.skirtSize}</span>
                      <span className="text-[11px] text-[#718577]">High-waisted elastic comfort</span>
                    </div>
                  </div>

                </div>

                {/* Hygiene & Return Policy Reminder */}
                <div className="p-4 rounded-xl bg-[#F0EAE1] border border-[#DFD5C7] text-xs text-[#526557] space-y-1.5">
                  <div className="font-bold text-[#26392D] flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-[#C08272]" />
                    <span>Intimate Hygiene Guarantee</span>
                  </div>
                  <p className="leading-relaxed">
                    Under intimate hygiene guidelines, sealed bras and intimate sets are final sale once opened. Outerwear tops and skirts include our 7-day hassle-free doorstep exchange policy.
                  </p>
                </div>

              </div>
            )}

            {/* ==============================================================
                5. SUB-PAGE: PRIVACY & PACKAGING PLEDGE
               ============================================================== */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-[#26392D] font-medium">
                    100% Discreet Packaging Pledge
                  </h2>
                  <p className="text-xs text-[#708475] mt-1">
                    How Libaah guarantees complete confidentiality from our fulfillment center to your doorstep in Bangladesh.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#26392D] text-white flex items-center justify-center">
                      <Package className="w-4 h-4 text-[#C08272]" />
                    </div>
                    <h3 className="font-bold text-sm text-[#26392D]">Unmarked Outer Cartons</h3>
                    <p className="text-xs text-[#596E5F] leading-relaxed">
                      Every order is shipped in plain, brown or white unbranded corrugated boxes. No graphics, lingerie logos, or product photos appear on the exterior box.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#26392D] text-white flex items-center justify-center">
                      <FileText className="w-4 h-4 text-[#C08272]" />
                    </div>
                    <h3 className="font-bold text-sm text-[#26392D]">Discreet Courier Labels</h3>
                    <p className="text-xs text-[#596E5F] leading-relaxed">
                      The shipping label given to Steadfast, Pathao, or RedX couriers displays only &quot;A. Logistics - Fulfillment&quot;. Product descriptions read simply &quot;Apparel Goods&quot;.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#26392D] text-white flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-[#C08272]" />
                    </div>
                    <h3 className="font-bold text-sm text-[#26392D]">Tamper-Evident Hygiene Seals</h3>
                    <p className="text-xs text-[#596E5F] leading-relaxed">
                      Garments are vacuum-sealed inside opaque, tamper-evident protective sleeves to ensure you receive 100% unworn, sterile items.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#26392D] text-white flex items-center justify-center">
                      <Phone className="w-4 h-4 text-[#C08272]" />
                    </div>
                    <h3 className="font-bold text-sm text-[#26392D]">Private SMS Updates</h3>
                    <p className="text-xs text-[#596E5F] leading-relaxed">
                      Order notification SMS messages sent to your phone never name intimate items or bra categories, preventing privacy leaks on shared family phones.
                    </p>
                  </div>
                </div>

                {/* Customer Service Contact */}
                <div className="p-4 rounded-xl bg-[#F4EFE7] border border-[#E3D9CC] flex items-center justify-between text-xs text-[#526658]">
                  <span>Confidential queries? Chat directly with our female support specialists.</span>
                  <a 
                    href="https://wa.me/8801800542224" 
                    target="_blank" 
                    rel="noreferrer"
                    className="font-bold text-[#26392D] hover:underline flex items-center gap-1"
                  >
                    <span>WhatsApp Concierge</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>
            )}

            {/* ==============================================================
                6. SUB-PAGE: ACCOUNT SETTINGS
               ============================================================== */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-[#26392D] font-medium">
                    Account &amp; Security Settings
                  </h2>
                  <p className="text-xs text-[#708475] mt-1">
                    Update personal profile details and customize notification preferences.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-4">
                  <h3 className="font-bold text-sm text-[#26392D]">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-[#526557] font-semibold mb-1">Full Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-[#DCD5C9] bg-white focus:outline-none focus:border-[#26392D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#526557] font-semibold mb-1">Phone Number (Bangladesh)</label>
                      <input
                        type="text"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-[#DCD5C9] bg-white focus:outline-none focus:border-[#26392D]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[#526557] font-semibold mb-1">Email Address</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-[#DCD5C9] bg-white focus:outline-none focus:border-[#26392D]"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => {
                        setSaveFeedback('Profile saved successfully!');
                        setTimeout(() => setSaveFeedback(null), 2500);
                      }}
                      className="px-4 py-2 bg-[#26392D] text-white rounded-xl text-xs font-semibold hover:bg-[#344B3C] transition-colors"
                    >
                      Save Changes
                    </button>
                    {saveFeedback && (
                      <span className="text-xs text-[#2F613B] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {saveFeedback}
                      </span>
                    )}
                  </div>
                </div>

                {/* Privacy Preferences */}
                <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-3">
                  <h3 className="font-bold text-sm text-[#26392D]">Notification Privacy</h3>
                  
                  <label className="flex items-center gap-3 text-xs text-[#4F6354] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.discreetSmsEnabled}
                      onChange={(e) => setProfile({ ...profile, discreetSmsEnabled: e.target.checked })}
                      className="w-4 h-4 accent-[#26392D] rounded"
                    />
                    <span>
                      <strong>Discreet SMS delivery alerts:</strong> Mask product names and sender identity on all delivery texts.
                    </span>
                  </label>
                </div>

              </div>
            )}

          </section>

        </div>

      </div>
    </div>
  );
};
