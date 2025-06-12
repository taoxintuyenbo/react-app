import React from "react";
import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/san-pham/${product.slug}`}
      className="product-card border p-4 rounded-lg shadow-lg"
    >
      <img
        src={product.images[0]?.thumbnail || "/path/to/default-image.jpg"}
        alt={product.name}
        className="w-full h-48 object-contain mb-4"
      />
      <h2 className="text-lg font-bold text-center">{product.name}</h2>
      <p className="text-center text-gray-500">Gia: {product.price} VND</p>
    </Link>
  );
};

export default ProductCard;
