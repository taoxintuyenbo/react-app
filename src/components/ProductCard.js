// import React from "react";
// import { Link } from "react-router-dom";
// const ProductCard = ({ product }) => {
//   return (
//     <Link
//       to={`/san-pham/${product.slug}`}
//       className="product-card border p-4 rounded-lg shadow-lg"
//     >
//       <img
//         src={product.images[0]?.thumbnail || "/path/to/default-image.jpg"}
//         alt={product.name}
//         className="w-full h-48 object-contain mb-4"
//       />
//       <h2 className="text-lg font-bold text-center">{product.name}</h2>
//       <p className="text-center text-gray-500">Gia: {product.price} VND</p>
//     </Link>
//   );
// };

// export default ProductCard;
import React from "react";
import { Link } from "react-router-dom";
import "./ProductList.css"; // Adjust the path according to the location of the file
import "./SharedAnimations.css"; // Adjust the path according to the location of the file

const ProductCard = ({ product, className = "" }) => {
  // Format price with commas
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Calculate discount percentage
  const calculateDiscount = () => {
    if (product.sale_price && product.price) {
      const discount =
        ((product.price - product.sale_price) / product.price) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Sale badge with animated effect */}
      {product.sale_price && product.sale_price < product.price && (
        <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs font-bold py-1.5 px-3 rounded-full shadow-lg transform rotate-2 group-hover:scale-110 transition-transform">
          <span className="inline-flex items-center">
            <svg
              className="w-3 h-3 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            {calculateDiscount()}%
          </span>
        </div>
      )}

      {/* Bestseller badge */}
      {product.is_featured && (
        <div className="bestseller-badge">Best Seller</div>
      )}

      {/* New product badge */}
      {product.created_at &&
        new Date(product.created_at) >
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
          <div className="new-badge">Mới</div>
        )}

      {/* Product card link container */}
      <Link
        to={`/san-pham/${product.slug}`}
        className="product-card group border border-gray-100 p-4 rounded-xl shadow-sm block hover:shadow-lg"
      >
        {/* Image container with shimmer effect */}
        <div className="overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 mb-4 p-2 transition-colors group-hover:from-orange-50 group-hover:to-gray-100">
          <img
            src={product.images[0]?.thumbnail || "/path/to/default-image.jpg"}
            alt={product.name}
            className="w-full h-48 object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Product title with hover effect */}
        <h2 className="text-lg font-bold text-center line-clamp-2 min-h-[3.5rem] group-hover:text-orange-500 transition-colors">
          {product.name}
        </h2>

        {/* Price section */}
        <div className="flex flex-col justify-center items-center mt-3">
          {product.sale_price && product.sale_price < product.price ? (
            <>
              <span className="original-price mb-1">
                {formatPrice(product.price)} VND
              </span>
              <span className="price relative z-10 before:absolute before:-z-10 before:content-[''] before:left-0 before:bottom-1 before:bg-orange-100 before:h-[8px] before:w-full before:opacity-60">
                {formatPrice(product.sale_price)} VND
              </span>
            </>
          ) : (
            <p className="price relative z-10 before:absolute before:-z-10 before:content-[''] before:left-0 before:bottom-1 before:bg-orange-100 before:h-[8px] before:w-full before:opacity-60">
              {formatPrice(product.price)} VND
            </p>
          )}

          {/* Divider with animation */}
          <div className="mt-4 w-full h-0 border-t border-dashed border-gray-200 group-hover:border-orange-200 transition-colors"></div>

          {/* Button with hover animation */}
          <button className="mt-4 bg-white hover:bg-orange-50 text-gray-700 hover:text-orange-500 border border-gray-200 hover:border-orange-200 rounded-full px-5 py-1.5 text-sm transition-all duration-300 flex items-center justify-center group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100">
            <span>Xem chi tiết</span>
            <svg
              className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </button>
        </div>
      </Link>
    </div>
  );
};

// Add a loading skeleton for product cards
export const ProductCardSkeleton = () => {
  return (
    <div className="product-card-skeleton animate-pulse border border-gray-100 p-4 rounded-xl">
      <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
      <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
      <div className="h-5 bg-gray-200 rounded w-3/5 mx-auto mb-3"></div>
      <div className="h-8 bg-gray-200 rounded-full w-1/2 mx-auto mt-4"></div>
    </div>
  );
};

export default ProductCard;
