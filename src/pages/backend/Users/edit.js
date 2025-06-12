import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // For routing and navigation
import UserService from "../../../services/UserService"; // Ensure this path is correct

const EditUser = () => {
  const { id } = useParams(); // Get user ID from URL parameters
  const [user, setUser] = useState({
    name: "",
    // username: "",
    fullname: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    // password: "",
    roles: "",
    status: 1,
    thumbnail: "",
  });
  const [selectedImage, setSelectedImage] = useState(null); // Image file state
  const [errors, setErrors] = useState({}); // Validation errors
  const [error, setError] = useState(""); // General error message
  const navigate = useNavigate();

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await UserService.show(id); // Fetch user data
        setUser(result.user);
      } catch (err) {
        setError("Failed to load user data.");
      }
    };

    fetchUser();
  }, [id]);

  // Handle input changes for the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handle image file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setSelectedImage(file);
  };

  // Handle form submission to update the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", user.name);
    // formData.append("username", user.username);
    formData.append("fullname", user.fullname);
    formData.append("gender", user.gender);
    formData.append("phone", user.phone);
    formData.append("email", user.email);
    formData.append("address", user.address);
    // formData.append("password", user.password);
    formData.append("roles", user.roles);
    formData.append("status", user.status);
    if (selectedImage) {
      formData.append("thumbnail", selectedImage); // Append image file if selected
    }

    try {
      const response = await UserService.update(id, formData); // Update user with form data
      console.log(response);
      navigate("/admin/user"); // Redirect to users list after successful update
      window.location.reload(); // Reload the page
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors); // Set validation errors
      } else {
        setError("Error updating user. Please try again.");
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Chỉnh sửa Người dùng</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="name">
                  Tên
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>

              {/* Fullname */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="fullname">
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={user.fullname || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.fullname ? "border-red-500" : ""
                  }`}
                />
                {errors.fullname && (
                  <span className="text-red-500 text-sm">
                    {errors.fullname}
                  </span>
                )}
              </div>

              {/* Gender */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Giới tính</label>
                <select
                  name="gender"
                  value={user.gender}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full"
                >
                  <option value={1}>Nam</option>
                  <option value={0}>Nữ</option>
                </select>
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="phone">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={user.phone || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">{errors.phone}</span>
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
                  value={user.email || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>

              {/* Address */}
              <div className="mb-4 md:col-span-2">
                <label className="block text-gray-700 mb-1" htmlFor="address">
                  Địa chỉ
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={user.address || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.address ? "border-red-500" : ""
                  }`}
                />
                {errors.address && (
                  <span className="text-red-500 text-sm">{errors.address}</span>
                )}
              </div>

              {/* <div className="mb-4 md:col-span-2">
                <label className="block text-gray-700 mb-1" htmlFor="address">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  value={user.password || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password}
                  </span>
                )}
              </div> */}
              {/* Roles */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="roles">
                  Vai trò
                </label>
                <select
                  id="roles"
                  name="roles"
                  value={user.roles || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.roles ? "border-red-500" : ""
                  }`}
                >
                  <option value="" disabled>
                    Chọn vai trò
                  </option>
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.roles && (
                  <span className="text-red-500 text-sm">{errors.roles}</span>
                )}
              </div>

              {/* Status */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Trạng thái</label>
                <select
                  name="status"
                  value={user.status}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full"
                >
                  <option value={1}>Hiển thị</option>
                  <option value={2}>Ẩn</option>
                </select>
              </div>

              {/* Image Upload */}
              <div className="mb-4 md:col-span-2">
                <label className="block text-gray-700 mb-1" htmlFor="thumbnail">
                  Ảnh đại diện
                </label>
                <input
                  type="file"
                  id="thumbnail"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border border-gray-300 p-2 w-full"
                />
                {user.thumbnail && (
                  <div className="mt-4">
                    <img
                      src={user.thumbnail}
                      alt="User"
                      className="w-32 h-32 object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-4 mt-4">
              <button
                type="submit"
                className="btn bg-green-500 text-white py-2 px-4 rounded"
              >
                Cập nhật Người dùng
              </button>
              <Link
                to="/admin/user"
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

export default EditUser;
