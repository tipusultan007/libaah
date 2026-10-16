import React from 'react';
import { Home, LayoutGrid, ShoppingBag, User } from 'lucide-react';
import { Category } from '../types/store';

interface BottomNavBarProps {
  currentPage?: 'home' | 'shop' | 'product' | 'checkout' | 'account';
  activeCategory?: Category;
  cartCount: number;
  onGoHome: () => void;
  onOpenShop: () => void;
  onOpenCart: () => void;
  onOpenAccount: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentPage = 'home',
  cartCount,
  onGoHome,
  onOpenShop,
  onOpenCart,
  onOpenAccount,
}) => {
  const isHomeActive = currentPage === 'home';
  const isShopActive = currentPage === 'shop' || currentPage === 'product';
  const isAccountActive = currentPage === 'account';

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E8E1D5] px-2 py-1.5 lg:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.04)]"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 items-center">
        
        {/* 1. Home */}
        <button
          onClick={onGoHome}
          className={`flex flex-col items-center justify-center py-1.5 px-2 active:scale-95 transition-all focus:outline-none ${
            isHomeActive ? 'text-[#26392D]' : 'text-[#6A7E70] hover:text-[#26392D]'
          }`}
        >
          <Home className={`w-5 h-5 ${isHomeActive ? 'text-[#26392D]' : 'text-[#6A7E70]'}`} />
          <span className={`text-[10px] tracking-tight mt-1 ${isHomeActive ? 'font-bold text-[#26392D]' : 'font-medium'}`}>
            Home
          </span>
        </button>

        {/* 2. Shop */}
        <button
          onClick={onOpenShop}
          className={`flex flex-col items-center justify-center py-1.5 px-2 active:scale-95 transition-all focus:outline-none ${
            isShopActive ? 'text-[#26392D]' : 'text-[#6A7E70] hover:text-[#26392D]'
          }`}
        >
          <LayoutGrid className={`w-5 h-5 ${isShopActive ? 'text-[#26392D]' : 'text-[#6A7E70]'}`} />
          <span className={`text-[10px] tracking-tight mt-1 ${isShopActive ? 'font-bold text-[#26392D]' : 'font-medium'}`}>
            Shop
          </span>
        </button>

        {/* 3. Carts */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center justify-center py-1.5 px-2 text-[#6A7E70] hover:text-[#26392D] active:scale-95 transition-all focus:outline-none"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-[#6A7E70]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[17px] h-[17px] px-1 bg-[#26392D] text-white text-[9.5px] font-bold rounded-full flex items-center justify-center border-2 border-[#FAF7F2]">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-1 text-[#6A7E70]">
            Carts
          </span>
        </button>

        {/* 4. Account */}
        <button
          onClick={onOpenAccount}
          className={`flex flex-col items-center justify-center py-1.5 px-2 active:scale-95 transition-all focus:outline-none ${
            isAccountActive ? 'text-[#26392D]' : 'text-[#6A7E70] hover:text-[#26392D]'
          }`}
        >
          <User className={`w-5 h-5 ${isAccountActive ? 'text-[#26392D]' : 'text-[#6A7E70]'}`} />
          <span className={`text-[10px] tracking-tight mt-1 ${isAccountActive ? 'font-bold text-[#26392D]' : 'font-medium text-[#6A7E70]'}`}>
            Account
          </span>
        </button>

      </div>
    </nav>
  );
};
