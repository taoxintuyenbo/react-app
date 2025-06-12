import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import necessary hooks and components
import ConfigService from "../../../services/ConfigService"; // Import ConfigService to interact with API

const CreateConfig = () => {
  const [config, setConfig] = useState({
    site_name: "",
    email: "",
    phones: "",
    address: "",
    hotline: "",
    zalo: "",
    facebook: "",
    status: 1, // Default status to "Hiển thị"
  });
  const [errors, setErrors] = useState({}); // Validation errors
  const [error, setError] = useState(""); // General error message
  const navigate = useNavigate();

  // Handle input changes for the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig({
      ...config,
      [name]: value,
    });
  };

  // Handle form submission to create the config
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(config);
      console.log(await ConfigService.store(config)); // Create config with form data
      navigate("/admin/config"); // Redirect to config list after successful creation
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors); // Set validation errors
      } else {
        setError("Error creating config. Please try again.");
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Thêm Cấu hình Mới</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Site Name */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="site_name">
                  Tên trang web
                </label>
                <input
                  type="text"
                  id="site_name"
                  name="site_name"
                  value={config.site_name}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.site_name ? "border-red-500" : ""
                  }`}
                />
                {errors.site_name && (
                  <span className="text-red-500 text-sm">
                    {errors.site_name}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={config.email}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>

              {/* Phones */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="phones">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  id="phones"
                  name="phones"
                  value={config.phones}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.phones ? "border-red-500" : ""
                  }`}
                />
                {errors.phones && (
                  <span className="text-red-500 text-sm">{errors.phones}</span>
                )}
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="address">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={config.address}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.address ? "border-red-500" : ""
                  }`}
                />
                {errors.address && (
                  <span className="text-red-500 text-sm">{errors.address}</span>
                )}
              </div>

              {/* Hotline */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="hotline">
                  Hotline
                </label>
                <input
                  type="text"
                  id="hotline"
                  name="hotline"
                  value={config.hotline}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.hotline ? "border-red-500" : ""
                  }`}
                />
                {errors.hotline && (
                  <span className="text-red-500 text-sm">{errors.hotline}</span>
                )}
              </div>

              {/* Zalo */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="zalo">
                  Zalo
                </label>
                <input
                  type="text"
                  id="zalo"
                  name="zalo"
                  value={config.zalo}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.zalo ? "border-red-500" : ""
                  }`}
                />
                {errors.zalo && (
                  <span className="text-red-500 text-sm">{errors.zalo}</span>
                )}
              </div>

              {/* Facebook */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="facebook">
                  Facebook
                </label>
                <input
                  type="url"
                  id="facebook"
                  name="facebook"
                  value={config.facebook}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.facebook ? "border-red-500" : ""
                  }`}
                />
                {errors.facebook && (
                  <span className="text-red-500 text-sm">
                    {errors.facebook}
                  </span>
                )}
              </div>

              {/* Status */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Trạng thái</label>
                <select
                  name="status"
                  value={config.status}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full"
                >
                  <option value={1}>Hiển thị</option>
                  <option value={2}>Ẩn</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-4 mt-4">
              <button
                type="submit"
                className="btn bg-green-500 text-white py-2 px-4 rounded"
              >
                Thêm Cấu hình
              </button>
              <Link
                to="/admin/config"
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

export default CreateConfig;
