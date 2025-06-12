import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import ProductStoreService from "../../../services/ProductStoreService"; // Ensure this path is correct
import ProductService from "../../../services/ProductService"; // To fetch available products
import { Link } from "react-router-dom";
const CreateProductStore = () => {
  const [productStore, setProductStore] = useState({
    product_id: "",
    type: "",
    price_root: "",
    qty: "",
    updated_by: "",
    status: 1, // Default to "Hiển thị"
  });

  const [products, setProducts] = useState([]); // To populate product options
  const [errors, setErrors] = useState({}); // State to handle validation errors
  const [error, setError] = useState(""); // General error state
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await ProductService.index(); // Fetch products
        setProducts(result.products);
        console.log("Fetched products:", result.products); // Log the fetched products
      } catch (err) {
        setError("Failed to load products.");
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductStore({
      ...productStore,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Response from server: ", productStore); // Log the response
      const response = await ProductStoreService.store(productStore); // Store product store
      console.log("Response from server: ", response); // Log the response
      navigate("/admin/product_store"); // Redirect to product store list after successful submission
    } catch (err) {
      // Check for validation errors
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors); // Set validation errors from the server
      } else {
        setError("Error creating product store. Please try again.");
        console.error("Creation error:", err);
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <div className="flex justify-between mb-4">
            <h1 className="text-3xl font-semibold mb-4">
              Thêm Sản phẩm Lưu kho
            </h1>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Dropdown */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-1"
                  htmlFor="product_id"
                >
                  Sản phẩm
                </label>
                <select
                  id="product_id"
                  name="product_id"
                  value={productStore.product_id}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.product_id ? "border-red-500" : ""
                  }`}
                >
                  <option value="">-- Chọn sản phẩm --</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} (ID: {product.id})
                    </option>
                  ))}
                </select>
                {errors.product_id && (
                  <span className="text-red-500 text-sm">
                    {errors.product_id}
                  </span>
                )}
              </div>

              {/* Type Dropdown: Nhập (Input) or Xuất (Output) */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="type">
                  Loại
                </label>
                <select
                  id="type"
                  name="type"
                  value={productStore.type}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.type ? "border-red-500" : ""
                  }`}
                >
                  <option value="">-- Chọn loại --</option>
                  <option value="import">Nhập</option>
                  <option value="export">Xuất</option>
                </select>
                {errors.type && (
                  <span className="text-red-500 text-sm">{errors.type}</span>
                )}
              </div>

              {/* Price */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-1"
                  htmlFor="price_root"
                >
                  Giá gốc (VNĐ)
                </label>
                <input
                  type="number"
                  id="price_root"
                  name="price_root"
                  value={productStore.price_root}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.price_root ? "border-red-500" : ""
                  }`}
                  placeholder="Nhập giá gốc"
                  min="0"
                />
                {errors.price_root && (
                  <span className="text-red-500 text-sm">
                    {errors.price_root}
                  </span>
                )}
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="qty">
                  Số lượng
                </label>
                <input
                  type="number"
                  id="qty"
                  name="qty"
                  value={productStore.qty}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.qty ? "border-red-500" : ""
                  }`}
                  placeholder="Nhập số lượng sản phẩm"
                  min="0"
                />
                {errors.qty && (
                  <span className="text-red-500 text-sm">{errors.qty}</span>
                )}
              </div>

              {/* Status */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Trạng thái</label>
                <select
                  name="status"
                  value={productStore.status}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full"
                >
                  <option value={1}>Hiển thị</option>
                  <option value={2}>Ẩn</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn bg-green-500 text-white py-2 px-4 rounded"
            >
              Thêm san pham
            </button>
            <Link
              to="/admin/product_store"
              className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block mx-3"
            >
              Quay lại
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateProductStore;
