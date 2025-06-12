import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserService from "../../../services/UserService"; // Adjust path as needed

const Register = () => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    gender: "1",
    email: "",
    phone: "",
    address: "",
    roles: "",
    thumbnail: null,
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUser({ ...user, thumbnail: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setError("");

    if (user.password !== user.confirmPassword) {
      setErrors({ confirmPassword: "Passwords khong khop." });
      return;
    }

    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("name", user.name);
    formData.append("password", user.password);
    formData.append("fullname", user.fullname);
    formData.append("gender", user.gender);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    formData.append("address", user.address);
    formData.append("roles", user.roles);
    if (user.thumbnail) {
      formData.append("thumbnail", user.thumbnail);
    }

    try {
      const response = await UserService.store(formData);
      console.log(response);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/dang-nhap"), 2000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
        console.log(err.response.data.errors);
      } else {
        setError("Error registering user. Please try again.");
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Đăng ký</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="name">
                Tên nguoi dung
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
                <span className="text-red-500 text-sm">{errors.fullname}</span>
              )}
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="gender">
                Giới tính
              </label>
              <select
                id="gender"
                name="gender"
                value={user.gender}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              >
                <option value="1">Nam</option>
                <option value="0">Nữ</option>
              </select>
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

            {/* Address */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="address">
                Địa chỉ
              </label>
              <input
                type="text"
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
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="password">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password || ""}
                onChange={handleChange}
                className={`border border-gray-300 p-2 w-full ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 mb-1"
                htmlFor="confirmPassword"
              >
                Xác nhận Mật khẩu
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={user.confirmPassword || ""}
                onChange={handleChange}
                className={`border border-gray-300 p-2 w-full ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
            {/* Thumbnail */}
            <div className="mb-4">
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
            </div>

            <button
              type="submit"
              className="btn bg-green-500 text-white py-2 px-4 rounded mt-4"
            >
              Đăng ký
            </button>
          </form>

          <p className="mt-4 text-gray-600">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-blue-500">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
