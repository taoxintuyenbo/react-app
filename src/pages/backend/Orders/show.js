import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // For routing
import OrderService from "../../../services/OrderService"; // Ensure this path is correct

const ShowOrder = () => {
  const { id } = useParams(); // Get order ID from URL parameters
  const [order, setOrder] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const result = await OrderService.show(id); // Fetch order data
        setOrder(result.order);
      } catch (err) {
        setError("Failed to load order data.");
        console.error(err);
      }
    };

    fetchOrder();
  }, [id]);

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Chi tiết Đơn hàng</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Order Details */}
        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-2">Thông tin đơn hàng</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>ID:</strong> {order.id}
            </p>
            <p>
              <strong>User ID:</strong> {order.user_id}
            </p>
            <p>
              <strong>Tên:</strong> {order.name}
            </p>
            <p>
              <strong>Email:</strong> {order.email}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {order.phone}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {order.address}
            </p>
            <p>
              <strong>Người cập nhật:</strong> {order.updated_by}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {order.status === 1 ? "Hiển thị" : "Ẩn"}
            </p>
            <p>
              <strong>Ngày tạo:</strong>{" "}
              {new Date(order.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Ngày cập nhật:</strong>{" "}
              {new Date(order.updated_at).toLocaleString()}
            </p>
          </div>
        </div>

        <Link
          to="/admin/orders"
          className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block"
        >
          Quay lại
        </Link>
      </div>
    </section>
  );
};

export default ShowOrder;
