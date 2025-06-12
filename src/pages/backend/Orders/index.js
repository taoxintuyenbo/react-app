import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import OrderService from "../../../services/OrderService"; // Ensure the path is correct
import {
  FaEdit,
  FaEye,
  FaTrashAlt,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await OrderService.index(); // Fetch orders
      setOrders(result.orders);
    })();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      await OrderService.status(id);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id
            ? { ...order, status: currentStatus === 1 ? 2 : 1 }
            : order
        )
      );
    } catch (error) {
      console.error("Error toggling order status:", error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await OrderService.delete(id); // Call OrderService delete method
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Danh sách Đơn hàng</h1>
        </div>

        <div className="overflow-x-auto border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <table className="min-w-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">
                  Tên Khách hàng
                </th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Địa chỉ</th>
                <th className="border border-gray-300 px-4 py-2">Hành động</th>
                <th className="border border-gray-300 px-4 py-2">ID</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.length > 0 &&
                orders.map((order, index) => {
                  return (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2">
                        {order.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {order.email}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {order.phone}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {order.address}
                      </td>

                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex space-x-2">
                          {/* Toggle Status Button */}
                          <button
                            onClick={() => toggleStatus(order.id, order.status)}
                            className={`btn py-1 px-3 mx-0.5 text-white rounded-md ${
                              order.status === 1 ? "bg-green-500" : "bg-red-500"
                            }`}
                          >
                            {order.status === 1 ? (
                              <FaToggleOn className="text-xl" />
                            ) : (
                              <FaToggleOff className="text-xl" />
                            )}
                          </button>

                          {/* View Order Details */}
                          <Link
                            to={`/admin/order/show/${order.id}`}
                            className="bg-blue-500 py-1 px-3 mx-0.5 text-white rounded-md"
                          >
                            <FaEye className="text-xl" />
                          </Link>

                          {/* Edit Order */}
                          <Link
                            to={`/admin/order/edit/${order.id}`}
                            className="bg-yellow-500 py-1 px-3 mx-0.5 text-white rounded-md"
                          >
                            <FaEdit className="text-xl" />
                          </Link>

                          {/* Delete Order */}
                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="bg-red-500 py-1 px-3 mx-0.5 text-white rounded-md"
                          >
                            <FaTrashAlt className="text-xl" />
                          </button>
                          <Link
                            to={`/admin/orderdetail/${order.id}`}
                            className="bg-gray-500 py-1 px-3 mx-0.5 text-white rounded-md"
                          >
                            Chi tiết
                          </Link>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {order.id}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default OrderList;
