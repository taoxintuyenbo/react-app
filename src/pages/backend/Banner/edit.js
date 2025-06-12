import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Import necessary hooks and components
import BannerService from "../../../services/BannerService"; // Import your service

const EditBanner = () => {
  const { id } = useParams(); // Get banner ID from URL parameters
  const [banner, setBanner] = useState({
    name: "",
    link: "",
    description: "",
    position: "slideshow", // Default position
    sort_order: 0,
    status: 1, // Default status
  });
  const [selectedImage, setSelectedImage] = useState(null); // Image file state
  const [errors, setErrors] = useState({}); // Validation errors
  const [error, setError] = useState(""); // General error message
  const navigate = useNavigate(); // Navigate for redirect

  // Fetch banner details when the component mounts
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const result = await BannerService.show(id); // Fetch banner data
        setBanner(result.banner);
      } catch (err) {
        setError("Failed to load banner data.");
      }
    };

    fetchBanner();
  }, [id]);

  // Handle input changes for the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBanner({
      ...banner,
      [name]: value,
    });
  };

  // Handle image file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setSelectedImage(file);
  };

  // Handle form submission to update the banner
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", banner.name);
    formData.append("link", banner.link);
    formData.append("description", banner.description);
    formData.append("position", banner.position);
    formData.append("sort_order", banner.sort_order);
    formData.append("status", banner.status);
    if (selectedImage) {
      formData.append("image", selectedImage); // Append image file if selected
    }

    try {
      await BannerService.update(id, formData); // Update banner with form data
      navigate("/admin/banner"); // Redirect to banner list after successful update
      window.location.reload(); // Reload the page
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors); // Set validation errors
      } else {
        setError("Error updating banner. Please try again.");
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Chỉnh sửa Banner</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="name">
                  Tên Banner
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={banner.name || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>

              {/* Link */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="link">
                  Link Banner
                </label>
                <input
                  type="text"
                  id="link"
                  name="link"
                  value={banner.link || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.link ? "border-red-500" : ""
                  }`}
                />
                {errors.link && (
                  <span className="text-red-500 text-sm">{errors.link}</span>
                )}
              </div>

              {/* Position Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="position">
                  Vị trí
                </label>
                <select
                  id="position"
                  name="position"
                  value={banner.position || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.position ? "border-red-500" : ""
                  }`}
                >
                  <option value="slideshow">Slideshow</option>
                  <option value="ads">Ads</option>
                </select>
                {errors.position && (
                  <span className="text-red-500 text-sm">
                    {errors.position}
                  </span>
                )}
              </div>

              {/* Status Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Trạng thái</label>
                <select
                  name="status"
                  value={banner.status}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full"
                >
                  <option value={1}>Hiển thị</option>
                  <option value={2}>Ẩn</option>
                </select>
              </div>

              {/* Sort Order */}

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
                {banner.image && (
                  <div className="mt-4">
                    <img
                      src={banner.image}
                      alt="Banner"
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
                  value={banner.description || ""}
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
                Cập nhật Banner
              </button>
              <Link
                to="/admin/banner"
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

export default EditBanner;
