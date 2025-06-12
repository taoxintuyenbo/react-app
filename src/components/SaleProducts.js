import React, { useState, useEffect } from "react";
import ProductService from "../services/ProductService";
import ProductCardListView from "./ProductCardListView";
const SaleProducts = () => {
  const [saleProducts, setSaleProducts] = useState([]);

  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        const result = await ProductService.getSaleProducts(8); // Fetch 8 sale products
        setSaleProducts(result.products);
      } catch (error) {
        console.error("Error fetching sale products:", error);
      }
    };
    fetchSaleProducts();
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl uppercase mb-8 mt-8">
        Sản phẩm khuyến mãi
      </h1>
      <ul className="space-y-6">
        {saleProducts.map((product) => (
          <ProductCardListView key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default SaleProducts;
