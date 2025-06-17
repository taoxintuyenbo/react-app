import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductService from "../../../services/ProductService";
import ProductCard from "../../../components/ProductCard";
import ProductCardListView from "../../../components/ProductCardListView";
import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery().get("query") || "";
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query) {
      setProducts([]);
      setError("Không có từ khóa tìm kiếm.");
      return;
    }
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        // You need to implement this endpoint in ProductService and backend
        const response = await ProductService.searchProducts(
          query,
          currentPage
        );
        setProducts(response.products.data || []);
        setTotalPages(response.products.last_page || 1);
      } catch (err) {
        setError("Không tìm thấy sản phẩm phù hợp.");
        setProducts([]);
      }
      setLoading(false);
    };
    fetchSearchResults();
  }, [query, currentPage]);

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-center text-2xl font-bold mt-4 mb-8">
        Kết quả tìm kiếm cho: <span className="text-blue-600">{query}</span>
      </h1>
      {error && <p className="text-center text-red-500">{error}</p>}
      {loading && (
        <p className="text-center text-gray-600">Đang tải kết quả...</p>
      )}

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
          {products.length > 0
            ? products.map((product) =>
                viewMode === "grid" ? (
                  <ProductCard key={product.id} product={product} />
                ) : (
                  <ProductCardListView key={product.id} product={product} />
                )
              )
            : !loading && (
                <p className="text-center col-span-full text-red-500">
                  Không có sản phẩm nào phù hợp.
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
            Trước
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
            Tiếp
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
