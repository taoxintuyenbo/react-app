// src/pages/backend/Order/TrashOrder.js

import React, { useState, useEffect } from "react";
import OrderService from "../../../services/OrderService"; // Ensure this path is correct
import { Link } from "react-router-dom"; // For navigation
import { FaUndo, FaTrashAlt } from "react-icons/fa"; // For icons

const TrashOrder = () => {
  const [trashedOrders, setTrashedOrders] = useState([]);

  useEffect(() => {
    const fetchTrashedOrders = async () => {
      try {
        const result = await OrderService.trash(); // Fetch trashed orders
        setTrashedOrders(result.trashedOrders);
      } catch (error) {
        console.error("Error fetching trashed orders:", error);
      }
    };

    fetchTrashedOrders();
  }, []);

  const restoreOrder = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn khôi phục đơn hàng này?")) {
      try {
        await OrderService.restore(id); // Restore order
        setTrashedOrders(trashedOrders.filter((order) => order.id !== id));
      } catch (error) {
        console.error("Error restoring order:", error);
      }
    }
  };

  const deletePermanent = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn đơn hàng này?")) {
      try {
        await OrderService.deletePermanent(id); // Permanently delete order
        setTrashedOrders(trashedOrders.filter((order) => order.id !== id));
      } catch (error) {
        console.error("Error deleting order permanently:", error);
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Thùng rác Đơn hàng</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">
                  Tên người dùng
                </th>
                <th className="border border-gray-300 px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {trashedOrders.length > 0 ? (
                trashedOrders.map((order, index) => (
                  <tr key={order.id} className="hover:bg-gray-100">
                    <td className="text-center">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => restoreOrder(order.id)}
                        className="btn bg-blue-500 text-white py-1 px-2 rounded mr-2"
                      >
                        <FaUndo /> Khôi phục
                      </button>
                      <button
                        onClick={() => deletePermanent(order.id)}
                        className="btn bg-red-500 text-white py-1 px-2 rounded"
                      >
                        <FaTrashAlt /> Xóa vĩnh viễn
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    Không có đơn hàng nào trong thùng rác.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Link
          to="/admin/order"
          className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          Quay lại
        </Link>
      </div>
    </section>
  );
};

export default TrashOrder;
