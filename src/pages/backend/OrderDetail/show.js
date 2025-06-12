import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import useParams for routing
import OrderDetailService from "../../../services/OrderDetailService"; // Import your service

const ShowOrderDetail = () => {
  const { id } = useParams(); // Get order detail ID from URL parameters
  const [orderDetail, setOrderDetail] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const result = await OrderDetailService.show(id); // Fetch order detail data
        setOrderDetail(result.orderDetail);
      } catch (err) {
        setError("Failed to load order detail data.");
      }
    };

    fetchOrderDetail();
  }, [id]);

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Chi tiết Đơn hàng</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="border border-gray-300 p-4">
          <h2 className="text-xl font-bold">Thông tin đơn hàng</h2>
          <p>
            <strong>ID:</strong> {orderDetail.id}
          </p>
          <p>
            <strong>Sản phẩm ID:</strong> {orderDetail.product_id}
          </p>
          <p>
            <strong>Số lượng:</strong> {orderDetail.qty}
          </p>
          <p>
            <strong>Giá:</strong> {orderDetail.price}
          </p>
          <p>
            <strong>Người tạo:</strong> {orderDetail.created_by}
          </p>
          <p>
            <strong>Trạng thái:</strong>{" "}
            {orderDetail.status === 1 ? "Hiển thị" : "Ẩn"}
          </p>
        </div>

        <Link
          to="/admin/order-detail"
          className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          Quay lại
        </Link>
      </div>
    </section>
  );
};

export default ShowOrderDetail;
