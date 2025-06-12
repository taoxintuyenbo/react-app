import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderService from "../../../services/OrderService";

const EditOrder = () => {
  const { id } = useParams(); // Get order ID from URL parameters
  const [order, setOrder] = useState({
    user_id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    updated_by: "",
    status: 1, // Default to active
    created_at: "",
    updated_at: "",
  });

  const [errors, setErrors] = useState({}); // For validation errors
  const [error, setError] = useState(""); // General error state
  const navigate = useNavigate(); // For redirecting

  // Fetch order data when the component mounts
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const result = await OrderService.show(id); // Fetch the order data by ID
        setOrder(result.order); // Set the order data to state
      } catch (err) {
        setError("Failed to load order data.");
        console.error(err);
      }
    };

    fetchOrder();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await OrderService.update(id, order); // Update the order
      navigate("/admin/orders"); // Redirect to order list on success
      window.location.reload(); // Reload the page
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors); // Handle validation errors
      } else {
        setError("Error updating order. Please try again.");
        console.error(err);
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Chỉnh sửa Đơn hàng</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* User ID */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="user_id">
                User ID
              </label>
              <input
                type="text"
                id="user_id"
                name="user_id"
                value={order.user_id || ""}
                readOnly // Make this field read-only
                className="border border-gray-300 p-2 w-full bg-gray-100"
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
                value={order.name || ""}
                onChange={handleChange}
                className={`border border-gray-300 p-2 w-full ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
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
                value={order.email || ""}
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
                value={order.phone || ""}
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
                value={order.address || ""}
                onChange={handleChange}
                className={`border border-gray-300 p-2 w-full ${
                  errors.address ? "border-red-500" : ""
                }`}
              />
              {errors.address && (
                <span className="text-red-500 text-sm">{errors.address}</span>
              )}
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
                <option value={2}>Ẩn</option>
              </select>
              {errors.status && (
                <span className="text-red-500 text-sm">{errors.status}</span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-4">
            <button
              type="submit"
              className="btn bg-yellow-500 text-white py-2 px-4 rounded"
            >
              Cập nhật Đơn hàng
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/orders")}
              className="btn bg-blue-500 text-white py-2 px-4 rounded"
            >
              Quay lại
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditOrder;
