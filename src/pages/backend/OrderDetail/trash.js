import React, { useState, useEffect } from "react";
import OrderDetailService from "../../../services/OrderDetailService"; // Ensure this path is correct
import { Link } from "react-router-dom"; // Import Link for navigation
import { FaUndo, FaTrashAlt } from "react-icons/fa"; // Import icons

const TrashOrderDetail = () => {
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    const fetchTrashOrderDetails = async () => {
      try {
        const result = await OrderDetailService.trash(); // Fetch trashed order details
        setOrderDetails(result.orderDetails);
      } catch (err) {
        console.error("Failed to load trashed order details:", err);
      }
    };

    fetchTrashOrderDetails();
  }, []);

  const handleRestore = async (id) => {
    try {
      await OrderDetailService.restore(id); // Restore order detail
      setOrderDetails(orderDetails.filter((detail) => detail.id !== id)); // Remove restored detail from list
    } catch (err) {
      console.error("Failed to restore order detail:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await OrderDetailService.deletePermanent(id); // Permanently delete order detail
      setOrderDetails(orderDetails.filter((detail) => detail.id !== id)); // Remove deleted detail from list
    } catch (err) {
      console.error("Failed to delete order detail:", err);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">
          Thùng rác Chi tiết Đơn hàng
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">
                  Sản phẩm ID
                </th>
                <th className="border border-gray-300 px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((detail, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="text-center">{detail.id}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {detail.product_id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleRestore(detail.id)}
                      className="btn bg-blue-500 text-white py-1 px-2 rounded mr-2"
                    >
                      <FaUndo /> Khôi phục
                    </button>
                    <button
                      onClick={() => handleDelete(detail.id)}
                      className="btn bg-red-500 text-white py-1 px-2 rounded"
                    >
                      <FaTrashAlt /> Xóa vĩnh viễn
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default TrashOrderDetail;
