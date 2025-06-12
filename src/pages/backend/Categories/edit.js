import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import CategoryService from "../../../services/CategoryService";
import { FaSave, FaArrowLeft } from "react-icons/fa";

const EditCategory = () => {
  const { id } = useParams(); // Get category ID from URL parameters
  const [category, setCategory] = useState({
    name: "",
    description: "",
    parent_id: "",
    status: 1,
    image: "",
  });
  const [categories, setCategories] = useState([]); // List of categories for dropdown
  const [selectedImage, setSelectedImage] = useState(null); // Image file state
  const [errors, setErrors] = useState({}); // Validation errors
  const [error, setError] = useState(""); // General error message
  const navigate = useNavigate();

  // Fetch category and categories list when the component mounts
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const result = await CategoryService.show(id); // Fetch category data
        setCategory(result.category);
      } catch (err) {
        setError("Failed to load category data.");
      }
    };

    const fetchCategories = async () => {
      try {
        const result = await CategoryService.index(); // Fetch all categories for the dropdown
        setCategories(result.categories);
      } catch (err) {
        setError("Failed to load categories.");
      }
    };

    fetchCategory();
    fetchCategories();
  }, [id]);

  // Handle input changes for the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };

  // Handle image file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setSelectedImage(file);
  };

  // Handle form submission to update the category
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("description", category.description);
    formData.append("parent_id", category.parent_id || "0");
    formData.append("status", category.status);
    if (selectedImage) {
      formData.append("image", selectedImage); // Append image file if selected
    }

    try {
      const respone = await CategoryService.update(id, formData); // Update category with form data
      console.log(respone);
      navigate("/admin/categories"); // Redirect to categories list after successful update
      window.location.reload(); // Reload the page
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors); // Set validation errors
      } else {
        setError("Error updating category. Please try again.");
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Chỉnh sửa Danh mục</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="name">
                  Tên Danh mục
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={category.name || ""}
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
                  value={category.parent_id || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.parent_id ? "border-red-500" : ""
                  }`}
                >
                  <option value={0}>Không có</option>
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

              {/* Status */}
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
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border border-gray-300 p-2 w-full"
                />
                {category.image && (
                  <div className="mt-4">
                    <img
                      src={category.image}
                      alt="Category"
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
                  value={category.description || ""}
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

            <div className="flex space-x-4 mt-4">
              <button
                type="submit"
                className="btn bg-green-500 text-white py-2 px-4 rounded"
              >
                Cập nhật Danh mục
              </button>
              <Link
                to="/admin/categories"
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

export default EditCategory;
