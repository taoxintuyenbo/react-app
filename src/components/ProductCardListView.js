import React from "react";
import { Link } from "react-router-dom";
const ProductCardListView = ({ product }) => {
  return (
    <Link
      to={`/san-pham/${product.slug}`}
      className="product-card border p-4 rounded-lg shadow-lg flex items-center space-x-4"
    >
      <img
        src={product.images[0]?.thumbnail || "/path/to/default-image.jpg"}
        alt={product.name}
        className="w-24 h-24 object-cover"
      />
      <div>
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="text-gray-500">Gia: {product.price} VND</p>
      </div>
    </Link>
  );
};

export default ProductCardListView;
