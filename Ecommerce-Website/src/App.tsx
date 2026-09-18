import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProductsPage } from './pages/ProductsPage';
import type { Product } from './types/product';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-wrapper">
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        cartCount={totalCartCount}
      />
      <ProductsPage
        searchTerm={searchTerm}
        onAddToCart={handleAddToCart}
      />
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Aura Market. All rights reserved.</p>
        <p className="footer-sub">Crafted with React, Express, and MongoDB.</p>
      </footer>
    </div>
  );
}

export default App;
