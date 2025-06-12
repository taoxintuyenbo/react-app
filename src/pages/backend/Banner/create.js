import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import BannerService from "../../../services/BannerService";

const CreateBanner = () => {
  const [banner, setBanner] = useState({
    name: "",
    link: "",
    description: "",
    position: "slideshow", // Default to 'slideshow'
    sort_order: 0,
    status: 1, // Default status to "Active"
  });

  const [selectedImage, setSelectedImage] = useState(null); // For image file
  const [errors, setErrors] = useState({}); // For form validation errors
  const [error, setError] = useState(""); // General error state
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBanner({
      ...banner,
      [name]: value,
    });
  };

  // Handle image file selection
  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]); // Store the selected image file
  };

  // Handle form submission to create a new banner
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Create FormData object for file upload

    formData.append("name", banner.name);
    formData.append("link", banner.link);
    formData.append("description", banner.description);
    formData.append("position", banner.position);
    formData.append("sort_order", banner.sort_order);
    formData.append("status", banner.status);

    if (selectedImage) {
      formData.append("image", selectedImage); // Append image if selected
    }

    try {
      await BannerService.store(formData); // Create the banner with the form data
      navigate("/admin/banner"); // Redirect to banner list on success
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors); // Handle validation errors
      } else {
        setError("Error adding banner. Please try again.");
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <div className="flex justify-between mb-4">
            <h1 className="text-3xl font-semibold mb-4">Thêm Banner</h1>
            <Link
              to="/admin/banner"
              className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4"
            >
              Quay lại
            </Link>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Banner Name */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="name">
                  Tên Banner
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={banner.name}
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
              {/* <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="link">
                  Link Banner
                </label>
                <input
                  type="text"
                  id="link"
                  name="link"
                  value={banner.link}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.link ? "border-red-500" : ""
                  }`}
                />
                {errors.link && (
                  <span className="text-red-500 text-sm">{errors.link}</span>
                )}
              </div> */}

              {/* Description */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-1"
                  htmlFor="description"
                >
                  Mô tả
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={banner.description}
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

              {/* Position Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="position">
                  Vị trí
                </label>
                <select
                  id="position"
                  name="position"
                  value={banner.position}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full"
                >
                  <option value="slideshow">Slideshow</option>
                  <option value="ads">Ads</option>
                </select>
              </div>

              {/* Sort Order */}

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
              Thêm Banner
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateBanner;
