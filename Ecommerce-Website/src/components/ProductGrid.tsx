import React from 'react';
import type { Product } from '../types/product';
import { ProductCard } from './ProductCard';

export interface ProductGridProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToCart,
}) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
