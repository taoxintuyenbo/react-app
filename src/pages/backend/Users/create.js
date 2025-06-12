// src/pages/backend/User/CreateUser.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import UserService from "../../../services/UserService"; // Ensure this path is correct

const CreateUser = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    fullname: "",
    gender: 1, // 1: Nam, 0: Nữ
    thumbnail: "",
    email: "",
    phone: "",
    address: "",
    roles: "",
    created_by: "",
    updated_by: "",
    status: 1, // Default to "Active"
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail") {
      setUser({
        ...user,
        [name]: files[0],
      });
    } else {
      setUser({
        ...user,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic Frontend Validation
    if (
      !user.name ||
      !user.username ||
      !user.password ||
      !user.fullname ||
      !user.email ||
      !user.created_by ||
      !user.updated_by
    ) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Prepare FormData for file upload
    const formData = new FormData();
    for (const key in user) {
      formData.append(key, user[key]);
    }

    try {
      await UserService.create(formData); // Create user
      navigate("/admin/user"); // Redirect to user list after successful submission
    } catch (err) {
      console.error("Creation error:", err);
      setError("Lỗi khi tạo người dùng. Vui lòng thử lại.");
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Thêm Người dùng</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="name">
              Tên
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full"
              placeholder="Nhập tên người dùng"
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full"
              placeholder="Nhập username"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full"
              placeholder="Nhập mật khẩu"
            />
          </div>

          {/* Fullname */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="fullname">
              Họ tên
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={user.fullname}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full"
              placeholder="Nhập họ tên đầy đủ"
            />
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
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
            />
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
              value={user.email}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full"
              placeholder="Nhập email"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="phone">
              Số điện thoại
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
              placeholder="Nhập số điện thoại"
            />
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
              value={user.address}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
              placeholder="Nhập địa chỉ"
            />
          </div>

          {/* Roles */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="roles">
              Vai trò
            </label>
            <input
              type="text"
              id="roles"
              name="roles"
              value={user.roles}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
              placeholder="Ví dụ: Admin, Editor"
            />
          </div>

          {/* Created By */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="created_by">
              Người tạo
            </label>
            <input
              type="text"
              id="created_by"
              name="created_by"
              value={user.created_by}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full"
              placeholder="Nhập tên người tạo"
            />
          </div>

          {/* Updated By */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="updated_by">
              Người cập nhật
            </label>
            <input
              type="text"
              id="updated_by"
              name="updated_by"
              value={user.updated_by}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full"
              placeholder="Nhập tên người cập nhật"
            />
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
              <option value={0}>Ẩn</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn bg-green-500 text-white py-2 px-4 rounded"
          >
            Thêm Người dùng
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateUser;
