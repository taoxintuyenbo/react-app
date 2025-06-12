import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link for navigation
import CategoryService from "../../../services/CategoryService"; // Import your service

const CreateCategory = () => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
    parent_id: "", // Assuming a parent category ID for nested categories
    status: 1, // Default status to "Active"
  });

  const [categories, setCategories] = useState([]); // List of categories for the dropdown
  const [selectedImage, setSelectedImage] = useState(null); // State for image file
  const [errors, setErrors] = useState({}); // State for validation errors
  const [error, setError] = useState(""); // General error state
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Fetch parent categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await CategoryService.index(); // Fetch all categories for the parent category dropdown
        setCategories(result.categories);
      } catch (err) {
        setError("Failed to load categories.");
      }
    };

    fetchCategories();
  }, []);

  // Handle input changes for the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };

  // Handle file selection for image upload
  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]); // Store the selected image file
  };

  // Handle form submission to create a new category
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Create a FormData object
    formData.append("name", category.name);
    formData.append("description", category.description);
    formData.append("parent_id", category.parent_id);
    formData.append("status", category.status);

    if (selectedImage) {
      formData.append("image", selectedImage); // Append the image to formData
    }

    try {
      console.log("data", formData);
      console.log(await CategoryService.store(formData)); // Create category with formData
      navigate("/admin/categories"); // Redirect to the category list after successful creation
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
        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <div className="flex justify-between mb-4">
            <h1 className="text-3xl font-semibold mb-4">Thêm Danh mục</h1>
            <Link
              to="/admin/categories"
              className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block mx-3"
            >
              Quay lại
            </Link>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category Name */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="name">
                  Tên Danh mục
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={category.name}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>

              {/* Parent Category Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="parent_id">
                  Danh mục cha
                </label>
                <select
                  id="parent_id"
                  name="parent_id"
                  value={category.parent_id}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.parent_id ? "border-red-500" : ""
                  }`}
                >
                  <option value="0">Không có</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.parent_id && (
                  <span className="text-red-500 text-sm">
                    {errors.parent_id}
                  </span>
                )}
              </div>

              {/* Status Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Trạng thái</label>
                <select
                  name="status"
                  value={category.status}
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
                  onChange={handleFileChange} // Handle file change
                  className={`border border-gray-300 p-2 w-full`}
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
                  value={category.description}
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
              className="btn bg-green-500 text-white py-2 px-4 rounded mt-4"
            >
              Thêm Danh mục
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateCategory;
