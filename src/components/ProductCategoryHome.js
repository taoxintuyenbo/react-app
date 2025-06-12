import React, { useState, useEffect } from "react";
import ProductService from "../services/ProductService";
import ProductCard from "./ProductCard";

const ProductCategoryHome = () => {
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const result = await ProductService.getCategoryHomeProducts(8); // Fetch products based on limit
        console.log(result); // Assuming the response has 'categories' key
        setCategoryProducts(result.categories); // Assuming categories contain products array
      } catch (error) {
        console.error("Error fetching products by category:", error);
      }
    };
    fetchCategoryProducts();
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl uppercase mb-8 mt-8">
        Sản phẩm theo danh mục
      </h1>

      {/* Iterate over each category */}
      {categoryProducts.map((categoryData) => (
        <div key={categoryData.category} className="mb-12">
          <h1 className="text-center text-2xl uppercase mb-8 ">
            {" "}
            {categoryData.category}
          </h1>
          {/* Products Grid for this category */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categoryData.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCategoryHome;
