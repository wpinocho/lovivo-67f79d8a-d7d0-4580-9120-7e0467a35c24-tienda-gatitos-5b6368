import React from 'react';
import { ShoppingCart, X, Minus, Plus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, clearCart, getTotalPrice } = useCart();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }
    
    toast.success('¡Compra realizada con éxito! 🎉');
    clearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Carrito de Compras
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.kitten.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <img
                      src={item.kitten.image}
                      alt={item.kitten.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.kitten.name}</h3>
                      <p className="text-sm text-gray-600">{item.kitten.breed}</p>
                      <p className="font-bold text-purple-600">${item.kitten.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Cantidad: {item.quantity}</span>
                      <button
                        onClick={() => removeFromCart(item.kitten.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-2xl font-bold text-purple-600">
                    ${getTotalPrice().toLocaleString()}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Finalizar Compra
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Vaciar Carrito
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;