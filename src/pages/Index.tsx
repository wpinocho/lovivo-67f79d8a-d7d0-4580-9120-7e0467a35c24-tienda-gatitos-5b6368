import React, { useState, useMemo } from 'react';
import { CartProvider } from '../contexts/CartContext';
import Header from '../components/Header';
import Filters from '../components/Filters';
import KittenCard from '../components/KittenCard';
import Cart from '../components/Cart';
import { kittens } from '../data/kittens';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('Todos');
  const [selectedGender, setSelectedGender] = useState('Todos');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);

  console.log('Rendering Index page with filters:', { selectedBreed, selectedGender, priceRange });

  const filteredKittens = useMemo(() => {
    return kittens.filter(kitten => {
      const matchesSearch = kitten.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           kitten.breed.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBreed = selectedBreed === 'Todos' || kitten.breed === selectedBreed;
      const matchesGender = selectedGender === 'Todos' || kitten.gender === selectedGender;
      const matchesPrice = kitten.price >= priceRange[0] && kitten.price <= priceRange[1];

      return matchesSearch && matchesBreed && matchesGender && matchesPrice;
    });
  }, [searchTerm, selectedBreed, selectedGender, priceRange]);

  console.log('Filtered kittens count:', filteredKittens.length);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header
          onCartClick={() => setIsCartOpen(true)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Encuentra tu Compañero Perfecto 🐾
            </h2>
            <p className="text-xl text-gray-600">
              Gatitos adorables esperando por un hogar lleno de amor
            </p>
          </div>

          <Filters
            selectedBreed={selectedBreed}
            onBreedChange={setSelectedBreed}
            selectedGender={selectedGender}
            onGenderChange={setSelectedGender}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
          />

          {filteredKittens.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">😿</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                No se encontraron gatitos
              </h3>
              <p className="text-gray-500">
                Intenta ajustar tus filtros de búsqueda
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {filteredKittens.length} gatito{filteredKittens.length !== 1 ? 's' : ''} disponible{filteredKittens.length !== 1 ? 's' : ''}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredKittens.map(kitten => (
                  <KittenCard key={kitten.id} kitten={kitten} />
                ))}
              </div>
            </>
          )}
        </main>

        <footer className="bg-purple-600 text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold mb-4">🐱 Gatitos Adorables</h3>
            <p className="mb-4">
              Conectando gatitos con familias amorosas desde 2024
            </p>
            <div className="flex justify-center gap-6 text-sm">
              <span>📞 +1 (555) 123-4567</span>
              <span>📧 info@gatitosadorables.com</span>
              <span>📍 Ciudad de los Gatitos</span>
            </div>
          </div>
        </footer>

        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      </div>
    </CartProvider>
  );
};

export default Index;