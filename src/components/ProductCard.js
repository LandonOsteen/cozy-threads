// src/components/ProductCard.js
import React from 'react';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="p-8 rounded-md text-white">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-90 object-cover"
      />
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <p>{product.description}</p>
      <p className="text-2xl font-bold text-blue-200">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-sm"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
