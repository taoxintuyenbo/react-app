import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import BrandService from "../../../services/BrandService";

const EditBrand = () => {
  const { id } = useParams(); // Get brand ID from URL parameters
  const [brand, setBrand] = useState({
    name: "",
    slug: "",
    description: "",
    status: 1, // Default status to "Active"
    image: "",
  });
  const [selectedImage, setSelectedImage] = useState(null); // Image file state
  const [errors, setErrors] = useState({}); // Validation errors
  const [error, setError] = useState(""); // General error message
  const navigate = useNavigate();

  // Fetch brand data when the component mounts
  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const result = await BrandService.show(id); // Fetch brand data
        setBrand(result.brand);
      } catch (err) {
        setError("Failed to load brand data.");
      }
    };

    fetchBrand();
  }, [id]);

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrand({
      ...brand,
      [name]: value,
    });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setSelectedImage(file);
  };

  // Handle form submission to update the brand
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", brand.name);
    formData.append("slug", brand.slug || brand.name); // Use name as default for slug if empty
    formData.append("description", brand.description);
    formData.append("status", brand.status);
    if (selectedImage) {
      formData.append("image", selectedImage); // Append image file if selected
    }

    try {
      await BrandService.update(id, formData); // Update the brand with form data
      navigate("/admin/brand"); // Redirect to brand list on success
      window.location.reload(); // Reload the page
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors); // Set validation errors
      } else {
        setError("Error updating brand. Please try again.");
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Chỉnh sửa Thương hiệu</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Brand Name */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="name">
                  Tên Thương hiệu
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={brand.name || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name[0]}</span>
                )}
              </div>

              {/* Slug */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="slug">
                  Đường dẫn
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={brand.slug || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.slug ? "border-red-500" : ""
                  }`}
                />
                {errors.slug && (
                  <span className="text-red-500 text-sm">{errors.slug[0]}</span>
                )}
              </div>

              {/* Status */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Trạng thái</label>
                <select
                  name="status"
                  value={brand.status}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full"
                >
                  <option value={1}>Hiển thị</option>
                  <option value={2}>Ẩn</option>
                </select>
              </div>

              {/* Image Upload */}
              <div className="mb-4 md:col-span-2">
                <label className="block text-gray-700 mb-1" htmlFor="image">
                  Hình ảnh
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border border-gray-300 p-2 w-full"
                />
                {brand.image && !selectedImage && (
                  <div className="mt-4">
                    <img
                      src={brand.image} // Show the current image from brand data
                      alt="Brand"
                      className="w-32 h-32 object-cover"
                    />
                  </div>
                )}

                {selectedImage && (
                  <div className="mt-4">
                    <img
                      src={URL.createObjectURL(selectedImage)} // Preview selected image before upload
                      alt="Selected Brand"
                      className="w-32 h-32 object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Description */}
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
                  value={brand.description || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.description ? "border-red-500" : ""
                  }`}
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    {errors.description[0]}
                  </span>
                )}
              </div>
            </div>

            <div className="flex space-x-4 mt-4">
              <button
                type="submit"
                className="btn bg-green-500 text-white py-2 px-4 rounded"
              >
                Cập nhật Thương hiệu
              </button>
              <Link
                to="/admin/brand"
                className="btn bg-blue-500 text-white py-2 px-4 rounded"
              >
                Quay lại
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditBrand;
