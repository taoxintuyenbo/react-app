// src/pages/backend/Order/CreateOrder.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import OrderService from "../../../services/OrderService"; // Ensure this path is correct

const CreateOrder = () => {
  const [order, setOrder] = useState({
    user_id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    updated_by: "", // Typically handled by backend or current user
    status: 1, // Default status to "Active"
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await OrderService.create(order); // Create order
      navigate("/admin/order"); // Redirect to order list after successful submission
    } catch (err) {
      setError("Error creating order. Please try again.");
      console.error(err);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Thêm Đơn hàng</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          {/* User ID */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="user_id">
              User ID
            </label>
            <input
              type="text"
              id="user_id"
              name="user_id"
              value={order.user_id}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full"
            />
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="name">
              Tên
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={order.name}
              onChange={handleChange}
              required
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
              value={order.email}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full"
            />
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
              value={order.phone}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full"
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
              value={order.address}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full"
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
              value={order.updated_by}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full"
            />
          </div>

          {/* Status */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Trạng thái</label>
            <select
              name="status"
              value={order.status}
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
            Thêm Đơn hàng
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateOrder;
