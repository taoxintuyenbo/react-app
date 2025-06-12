import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import OrderDetailService from "../../../services/OrderDetailService"; // Import your service

const CreateOrderDetail = () => {
  const [orderDetail, setOrderDetail] = useState({
    product_id: "",
    qty: "",
    price: "",
    created_by: "", // Assume this is filled in with the user's ID or name
    status: 1, // Default status to "Active"
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetail({
      ...orderDetail,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await OrderDetailService.create(orderDetail); // Create order detail
      navigate("/admin/order-detail"); // Redirect to order detail list after successful submission
    } catch (err) {
      setError("Error creating order detail. Please try again.");
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Thêm Chi tiết Đơn hàng</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          {/* Product ID */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="product_id">
              Sản phẩm ID
            </label>
            <input
              type="text"
              id="product_id"
              name="product_id"
              value={orderDetail.product_id}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full"
            />
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="qty">
              Số lượng
            </label>
            <input
              type="number"
              id="qty"
              name="qty"
              value={orderDetail.qty}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="price">
              Giá
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={orderDetail.price}
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
              value={orderDetail.status}
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
            Thêm Chi tiết Đơn hàng
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateOrderDetail;
