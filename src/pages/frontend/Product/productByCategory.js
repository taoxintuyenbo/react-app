import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../../../services/ProductService";
import ProductCard from "../../../components/ProductCard";
import ProductCardListView from "../../../components/ProductCardListView";
import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";

const ProductByCategory = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await ProductService.productByCat(slug, currentPage);
        setCategory(response.category || []);
        setProducts(response.products.data || []);
        setTotalPages(response.products.last_page || 1); // Assuming response contains total pages
      } catch (error) {
        console.error("Error fetching products by category:", error);
        setError("Failed to load products");
      }
    };
    fetchProductsByCategory();
  }, [slug, currentPage]);

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-center text-2xl font-bold mt-4 mb-8">
        San pham thuoc {category.name}
      </h1>
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="flex justify-end mb-4">
        <button onClick={toggleViewMode} className="px-2">
          {viewMode === "grid" ? (
            <ListIcon fontSize="large" className="text-blue-500" />
          ) : (
            <GridViewIcon fontSize="large" className="text-blue-500" />
          )}
        </button>
      </div>

      <div className="w-full">
        <div
          className={
            viewMode === "grid"
              ? "products-grid grid grid-cols-2 md:grid-cols-3 gap-8"
              : "products-list space-y-4"
          }
        >
          {products.length > 0 ? (
            products.map((product) =>
              viewMode === "grid" ? (
                <ProductCard key={product.id} product={product} />
              ) : (
                <ProductCardListView key={product.id} product={product} />
              )
            )
          ) : (
            <p className="text-center col-span-full text-red-500">
              No products found.
            </p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="pagination mt-8 flex justify-center space-x-2">
          <button
            className="px-4 py-2 border rounded bg-gray-200"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`px-4 py-2 border rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="px-4 py-2 border rounded bg-gray-200"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductByCategory;
