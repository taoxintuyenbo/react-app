import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderDetailService from "../../../services/OrderDetailService"; // Import your service

const EditOrderDetail = () => {
  const { id } = useParams(); // Get order detail ID from URL parameters
  const [orderDetail, setOrderDetail] = useState({
    product_id: "",
    qty: "",
    price: "",
    status: 1, // Default status to "Hiển thị"
  });
  const [errors, setErrors] = useState({}); // For validation errors
  const [error, setError] = useState(""); // General error state
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  // Fetch order detail data when the component mounts
  useEffect(() => {
    const fetchOrderDetail = async () => {
      setLoading(true); // Start loading
      try {
        const result = await OrderDetailService.show(id); // Fetch the order detail data by ID
        setOrderDetail(result.orderDetail); // Set the fetched data to state
      } catch (err) {
        setError("Failed to load order detail data.");
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchOrderDetail();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetail({
      ...orderDetail,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading during submission
    try {
      await OrderDetailService.update(id, orderDetail); // Update the order detail
      navigate(`/admin/orderdetail/${id}`); // Redirect to the order list after update
      window.location.reload(); // Reload the page
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors); // Handle validation errors
      } else {
        setError("Error updating order detail. Please try again.");
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched or updated
  }

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">
          Chỉnh sửa Chi tiết Đơn hàng
        </h1>
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
              value={orderDetail.product_id || ""}
              onChange={handleChange}
              readOnly
              className={`border border-gray-300 p-2 w-full ${
                errors.product_id ? "border-red-500" : ""
              }`}
            />
            {errors.product_id && (
              <span className="text-red-500 text-sm">{errors.product_id}</span>
            )}
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
              value={orderDetail.qty || ""}
              onChange={handleChange}
              required
              className={`border border-gray-300 p-2 w-full ${
                errors.qty ? "border-red-500" : ""
              }`}
            />
            {errors.qty && (
              <span className="text-red-500 text-sm">{errors.qty}</span>
            )}
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
              value={orderDetail.price || ""}
              onChange={handleChange}
              readOnly
              className={`border border-gray-300 p-2 w-full ${
                errors.price ? "border-red-500" : ""
              }`}
            />
            {errors.price && (
              <span className="text-red-500 text-sm">{errors.price}</span>
            )}
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
              <option value={2}>Ẩn</option>
            </select>
            {errors.status && (
              <span className="text-red-500 text-sm">{errors.status}</span>
            )}
          </div>

          <div className="flex space-x-4 mt-4">
            {/* Submit Button */}
            <button
              type="submit"
              className="btn bg-green-500 text-white py-2 px-4 rounded"
            >
              Cập nhật Chi tiết Đơn hàng
            </button>

            {/* Back Button */}
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

export default EditOrderDetail;
