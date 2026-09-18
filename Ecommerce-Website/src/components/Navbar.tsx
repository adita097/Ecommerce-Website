import React from 'react';

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchTerm,
  onSearchChange,
  cartCount,
}) => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-icon">🛍️</div>
          <div className="brand-text">
            <span className="brand-title">AURA</span>
            <span className="brand-tag">MARKET</span>
          </div>
        </div>

        <div className="navbar-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            id="product-search-input"
            className="search-input"
            placeholder="Search products, brands, or categories..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchTerm && (
            <button
              className="clear-search-btn"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className="navbar-actions">
          <div className="cart-button" title="Cart">
            <span className="cart-icon">🛒</span>
            <span className="cart-label">Cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
        </div>
      </div>
    </header>
  );
};
