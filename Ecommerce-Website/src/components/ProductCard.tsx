import React, { useState } from 'react';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const isOutOfStock = product.stock <= 0;

  const fallbackImage =
    'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&auto=format&fit=crop&q=80';

  return (
    <article className="product-card">
      <div className="product-card-image-wrap">
        {!imageLoaded && !imageError && (
          <div className="image-skeleton" aria-hidden="true" />
        )}
        <img
          src={imageError || !product.image ? fallbackImage : product.image}
          alt={product.name}
          className={`product-card-image ${imageLoaded ? 'loaded' : ''}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />
        <span className="product-category-badge">{product.category}</span>
        {isOutOfStock ? (
          <span className="product-stock-badge out-of-stock">Sold Out</span>
        ) : product.stock < 5 ? (
          <span className="product-stock-badge low-stock">
            Only {product.stock} left!
          </span>
        ) : (
          <span className="product-stock-badge in-stock">In Stock</span>
        )}
      </div>

      <div className="product-card-body">
        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>
        <p className="product-description" title={product.description}>
          {product.description}
        </p>

        <div className="product-card-footer">
          <div className="product-price-box">
            <span className="currency-symbol">$</span>
            <span className="price-amount">{product.price.toFixed(2)}</span>
          </div>

          <button
            type="button"
            className="add-to-cart-btn"
            disabled={isOutOfStock}
            onClick={() => onAddToCart && onAddToCart(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  );
};
