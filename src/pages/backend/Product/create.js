import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import ProductService from "../../../services/ProductService";
import { Link } from "react-router-dom"; // Import Link for navigation

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    detail: "",
    price: "",
    description: "",
    category_id: "",
    brand_id: "",
    status: 1, // Default status to "Hiển thị"
  });

  const [categories, setCategories] = useState([]); // Initialize categories as an empty array
  const [brands, setBrands] = useState([]); // Initialize brands as an empty array
  const [thumbnails, setThumbnails] = useState([]); // State for image files
  const [errors, setErrors] = useState({}); // State to store validation errors
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    // Fetch categories and brands on component mount
    const fetchCategoriesAndBrands = async () => {
      try {
        const categoryResponse = await ProductService.fetchCategories();
        const brandResponse = await ProductService.fetchBrands();

        setCategories(categoryResponse.categories || []);
        setBrands(brandResponse.brands || []);
      } catch (err) {
        setErrors("Failed to load categories and brands.");
      }
    };

    fetchCategoriesAndBrands();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setThumbnails([...e.target.files]); // Save image files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append all product fields to formData
    formData.append("name", product.name);
    formData.append("detail", product.detail);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("category_id", product.category_id);
    formData.append("brand_id", product.brand_id);
    formData.append("status", product.status);

    // Append image files to formData
    thumbnails.forEach((thumbnail) => {
      formData.append("thumbnail[]", thumbnail);
    });

    try {
      const respone = await ProductService.store(formData); // Adjust this to match your API
      console.log(respone);
      navigate("/admin/product"); // Redirect to the product list after successful submission
    } catch (err) {
      // Check for validation errors
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors); // Set validation errors
      } else {
        setErrors("Error adding product. Please try again.");
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <div className="flex justify-between mb-4">
            <h1 className="text-3xl font-semibold mb-4">Thêm Sản phẩm</h1>
            <Link
              to="/admin/product"
              className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block mx-3"
            >
              Quay lại
            </Link>
          </div>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Name */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="name">
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>

              {/* Detail */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="detail">
                  Chi tiết
                </label>
                <input
                  type="text"
                  id="detail"
                  name="detail"
                  value={product.detail}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.detail ? "border-red-500" : ""
                  }`}
                />
                {errors.detail && (
                  <span className="text-red-500 text-sm">{errors.detail}</span>
                )}
              </div>

              {/* Price */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="price">
                  Giá
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.price ? "border-red-500" : ""
                  }`}
                />
                {errors.price && (
                  <span className="text-red-500 text-sm">{errors.price}</span>
                )}
              </div>

              {/* Category Dropdown */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-1"
                  htmlFor="category_id"
                >
                  Danh mục
                </label>
                <select
                  id="category_id"
                  name="category_id"
                  value={product.category_id}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.category_id ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Chọn danh mục</option>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>Không có danh mục nào</option>
                  )}
                </select>
                {errors.category_id && (
                  <span className="text-red-500 text-sm">
                    {errors.category_id}
                  </span>
                )}
              </div>

              {/* Brand Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="brand_id">
                  Thương hiệu
                </label>
                <select
                  id="brand_id"
                  name="brand_id"
                  value={product.brand_id}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.brand_id ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Chọn thương hiệu</option>
                  {brands.length > 0 ? (
                    brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>Không có thương hiệu nào</option>
                  )}
                </select>
                {errors.brand_id && (
                  <span className="text-red-500 text-sm">
                    {errors.brand_id}
                  </span>
                )}
              </div>

              {/* Status Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Trạng thái</label>
                <select
                  name="status"
                  value={product.status}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full"
                >
                  <option value={1}>Hiển thị</option>
                  <option value={2}>Ẩn</option>
                </select>
              </div>

              {/* Thumbnail Upload */}
              <div className="mb-4 md:col-span-2">
                <label className="block text-gray-700 mb-1" htmlFor="thumbnail">
                  Ảnh sản phẩm
                </label>
                <input
                  type="file"
                  id="thumbnail"
                  name="thumbnail"
                  multiple
                  onChange={handleFileChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.thumbnail ? "border-red-500" : ""
                  }`}
                />
                {errors.thumbnail && (
                  <span className="text-red-500 text-sm">
                    {errors.thumbnail}
                  </span>
                )}
              </div>

              {/* Description (Full Width) */}
              <div className="mb-4 md:col-span-2">
                <label
                  className="block text-gray-700 mb-1"
                  htmlFor="description"
                >
                  Mô tả
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.description ? "border-red-500" : ""
                  }`}
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    {errors.description}
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn bg-green-500 text-white py-2 px-4 rounded"
            >
              Thêm Sản phẩm
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
