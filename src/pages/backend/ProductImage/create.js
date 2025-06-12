import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import ProductImageService from "../../../services/ProductImageService"; // Ensure this path is correct
import ProductService from "../../../services/ProductService"; // Import ProductService to fetch product data
import { Link } from "react-router-dom";
const CreateProductImage = () => {
  const [productImage, setProductImage] = useState({
    product_id: "",
    thumbnail: null, // For file upload
    status: 1, // Default to "Active"
  });

  const [products, setProducts] = useState([]); // State to store the product list
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Fetch products for the dropdown when the component loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await ProductService.index(); // Assuming ProductService.index() fetches all products
        setProducts(result.products);
      } catch (err) {
        setError("Failed to load products.");
        console.error("Product fetching error:", err);
      }
    };

    fetchProducts();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail") {
      setProductImage({
        ...productImage,
        thumbnail: files[0],
      });
    } else {
      setProductImage({
        ...productImage,
        [name]: value,
      });
    }
  };

  // Handle form submission to create a new product image
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("product_id", productImage.product_id);
    formData.append("thumbnail", productImage.thumbnail);
    formData.append("status", productImage.status);

    try {
      await ProductImageService.store(formData); // Create product image
      navigate("/admin/product_image"); // Redirect to product image list after successful submission
    } catch (err) {
      setError("Error creating product image. Please try again.");
      console.error("Creation error:", err);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Thêm Hình ảnh Sản phẩm</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Product Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="product_id">
              Chọn Sản phẩm
            </label>
            <select
              id="product_id"
              name="product_id"
              value={productImage.product_id}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full"
            >
              <option value="">Chọn sản phẩm</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} (ID: {product.id})
                </option>
              ))}
            </select>
          </div>

          {/* Thumbnail */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="thumbnail">
              Hình ảnh
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              accept="image/*"
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full"
            />
          </div>

          {/* Status */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Trạng thái</label>
            <select
              name="status"
              value={productImage.status}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
            >
              <option value={1}>Hiển thị</option>
              <option value={2}>Ẩn</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn bg-green-500 text-white py-2 px-4 rounded"
          >
            Thêm Hình ảnh
          </button>
          <Link
            to="/admin/product_image"
            className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block mx-3"
          >
            Quay lại
          </Link>
        </form>
      </div>
    </section>
  );
};

export default CreateProductImage;
