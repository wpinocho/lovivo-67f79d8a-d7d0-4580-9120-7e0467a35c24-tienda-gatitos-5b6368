import React from 'react';
import { ShoppingCart, Heart, Search } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  onCartClick: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, searchTerm, onSearchChange }) => {
  const { getItemCount } = useCart();

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🐱</span>
            <h1 className="text-2xl font-bold text-purple-600">Gatitos Adorables</h1>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar gatitos..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
              <Heart className="w-6 h-6" />
            </button>
            
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;