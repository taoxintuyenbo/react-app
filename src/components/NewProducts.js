import React, { useState, useEffect } from "react";
import ProductService from "../services/ProductService";
import ProductCard from "./ProductCard";
const NewProducts = () => {
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const result = await ProductService.getNewProducts(8); // Fetch 8 new products
        setNewProducts(result.products);
        // console.log(result.products);
      } catch (error) {
        console.error("Error fetching new products:", error);
      }
    };
    fetchNewProducts();
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl uppercase mb-8 ">Sản phẩm mới</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {newProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewProducts;
