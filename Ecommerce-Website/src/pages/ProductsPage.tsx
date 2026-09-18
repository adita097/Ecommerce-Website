import React, { useEffect, useState } from 'react';
import type { Product } from '../types/product';
import { ProductCard } from '../components/ProductCard';

interface ProductsPageProps {
  searchTerm: string;
  onAddToCart: (product: Product) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  searchTerm,
  onAddToCart,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Communicates with backend Express API: GET /api/products
      const response = await fetch('/api/products');

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      // Handle either { products: [...] } or direct [...] array
      const productList: Product[] = Array.isArray(data)
        ? data
        : data.products || [];

      setProducts(productList);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to connect to the backend server. Please verify the API is running.';
      console.error('Error fetching products:', err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Compute unique categories dynamically from fetched products
  const categories = [
    'All',
    ...Array.from(new Set(products.map((p) => p.category))).filter(Boolean),
  ];

  // Filter products by selected category and search input
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="products-page-container">
      {/* Page Header / Hero Banner */}
      <section className="page-hero">
        <div className="hero-content">
          <span className="hero-pill">✨ New Arrivals & Handpicked Goods</span>
          <h1 className="hero-title">Explore Our Curated Catalog</h1>
          <p className="hero-subtitle">
            Discover top-tier electronics, modern apparel, timeless books, and everyday accessories.
          </p>
        </div>
      </section>

      {/* Category Navigation Filter Pills */}
      {!loading && !error && categories.length > 1 && (
        <section className="category-bar" aria-label="Product Categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`category-pill ${
                selectedCategory === category ? 'active' : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
              {category === 'All' ? (
                <span className="category-count">({products.length})</span>
              ) : (
                <span className="category-count">
                  (
                  {
                    products.filter((p) => p.category === category).length
                  }
                  )
                </span>
              )}
            </button>
          ))}
        </section>
      )}

      {/* Main Content Area */}
      <section className="products-section">
        {/* Loading Skeleton State */}
        {loading && (
          <div className="products-grid loading-grid" aria-label="Loading products">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="product-card skeleton-card">
                <div className="skeleton skeleton-image" />
                <div className="skeleton-body">
                  <div className="skeleton skeleton-tag" />
                  <div className="skeleton skeleton-title" />
                  <div className="skeleton skeleton-text" />
                  <div className="skeleton-footer">
                    <div className="skeleton skeleton-price" />
                    <div className="skeleton skeleton-btn" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="state-card error-card" role="alert">
            <div className="state-icon">⚠️</div>
            <h2 className="state-title">Failed to Load Products</h2>
            <p className="state-message">{error}</p>
            <p className="state-hint">
              Ensure your backend Express server is running (e.g., <code>npm run server</code>).
            </p>
            <button
              type="button"
              className="retry-btn"
              onClick={fetchProducts}
            >
              🔄 Try Again
            </button>
          </div>
        )}

        {/* Empty / No Matches State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="state-card empty-card">
            <div className="state-icon">🔍</div>
            <h2 className="state-title">No Products Found</h2>
            <p className="state-message">
              {searchTerm
                ? `No products match your search query "${searchTerm}".`
                : 'No products are currently available in the selected category.'}
            </p>
            {searchTerm && (
              <button
                type="button"
                className="retry-btn"
                onClick={() => setSelectedCategory('All')}
              >
                Reset Filters
              </button>
            )}
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && filteredProducts.length > 0 && (
          <>
            <div className="products-results-info">
              <span>
                Showing <strong>{filteredProducts.length}</strong> of{' '}
                <strong>{products.length}</strong> items
              </span>
            </div>
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
};
