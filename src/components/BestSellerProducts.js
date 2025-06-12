import React, { useState, useEffect } from "react";
import ProductService from "../services/ProductService";
import ProductCard from "./ProductCard";

const BestSellerProducts = () => {
  const [bestSellerProducts, setBestSellerProducts] = useState([]);

  useEffect(() => {
    const fetchBestSellerProducts = async () => {
      try {
        const result = await ProductService.getBestSellerProducts(8); // Fetch 8 best sellers
        setBestSellerProducts(result.products);
        // console.log(result.products);
      } catch (error) {
        console.error("Error fetching best seller products:", error);
      }
    };
    fetchBestSellerProducts();
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl uppercase mb-8 mt-8">
        Sản phẩm bán chạy
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {bestSellerProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSellerProducts;
