import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Kitten } from '../types/kitten';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

interface KittenCardProps {
  kitten: Kitten;
}

const KittenCard: React.FC<KittenCardProps> = ({ kitten }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(kitten);
    toast.success(`${kitten.name} agregado al carrito! 🐱`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={kitten.image}
          alt={kitten.name}
          className="w-full h-64 object-cover"
        />
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
          <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
        </button>
        {!kitten.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">No Disponible</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{kitten.name}</h3>
          <span className="text-2xl font-bold text-purple-600">${kitten.price}</span>
        </div>
        
        <p className="text-gray-600 mb-2">{kitten.breed}</p>
        
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
          <span>{kitten.age} meses</span>
          <span className="capitalize">{kitten.gender === 'male' ? 'Macho' : 'Hembra'}</span>
          {kitten.vaccinated && (
            <span className="text-green-600 font-medium">✓ Vacunado</span>
          )}
        </div>
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{kitten.description}</p>
        
        <button
          onClick={handleAddToCart}
          disabled={!kitten.available}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          {kitten.available ? 'Agregar al Carrito' : 'No Disponible'}
        </button>
      </div>
    </div>
  );
};

export default KittenCard;