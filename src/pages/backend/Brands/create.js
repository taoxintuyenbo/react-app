import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import BrandService from "../../../services/BrandService";

const CreateBrand = () => {
  const [brand, setBrand] = useState({
    name: "",
    slug: "",
    description: "",
    status: 1, // Default status to "Active"
  });

  const [selectedImage, setSelectedImage] = useState(null); // For image file
  const [errors, setErrors] = useState({}); // For form validation errors
  const [error, setError] = useState(""); // General error state
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrand({
      ...brand,
      [name]: value,
    });
  };

  // Handle image file selection
  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]); // Store the selected image file
  };

  // Handle form submission to create a new brand
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Create FormData object for file upload

    formData.append("name", brand.name);
    formData.append("slug", brand.slug);
    formData.append("description", brand.description);
    formData.append("status", brand.status);

    if (selectedImage) {
      formData.append("image", selectedImage); // Append image if selected
    }

    try {
      await BrandService.store(formData); // Create the brand with the form data
      navigate("/admin/brand"); // Redirect to brand list on success
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors); // Handle validation errors
      } else {
        setError("Error adding brand. Please try again.");
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <div className="flex justify-between mb-4">
            <h1 className="text-3xl font-semibold mb-4">Thêm Thương hiệu</h1>
            <Link
              to="/admin/brand"
              className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4"
            >
              Quay lại
            </Link>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

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
                  value={brand.name}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>

              {/* Slug */}
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
                  value={brand.description}
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

              {/* Status Dropdown */}

              {/* Image Upload */}
              <div className="mb-4 md:col-span-2">
                <label className="block text-gray-700 mb-1" htmlFor="image">
                  Hình ảnh
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleFileChange}
                  className="border border-gray-300 p-2 w-full"
                />
                {errors.image && (
                  <span className="text-red-500 text-sm">{errors.image}</span>
                )}

                {/* Preview selected image */}
                {selectedImage && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn bg-green-500 text-white py-2 px-4 rounded mt-4"
            >
              Thêm Thương hiệu
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateBrand;
