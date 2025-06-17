import React, { useState, useEffect } from "react";
import OrderDetailService from "../../../services/OrderDetailService"; // Import your service for order details
import { Link } from "react-router-dom"; // Import Link for navigation
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import icons
import { useParams } from "react-router-dom";
const OrderDetailList = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const { id } = useParams(); // Get contact ID from URL parameters

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const result = await OrderDetailService.index(id); // Fetch order details
        setOrderDetails(result.orderDetails);
      } catch (error) {
        console.error("Failed to load order details:", error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const deleteOrderDetail = async (id) => {
    try {
      await OrderDetailService.destroy(id); // Call OrderDetailService delete method
      setOrderDetails((prevOrderDetails) =>
        prevOrderDetails.filter((detail) => detail.id !== id)
      );
    } catch (error) {
      console.error("Error deleting order detail:", error);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">
            Danh sách Chi tiết Đơn hàng
          </h1>
        </div>

        <div className="overflow-x-auto border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <table className="min-w-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">
                  Mã sản phẩm
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Mã đơn hàng
                </th>
                <th className="border border-gray-300 px-4 py-2">Số lượng</th>
                <th className="border border-gray-300 px-4 py-2">Giá</th>
                <th className="border border-gray-300 px-4 py-2">Tạo bởi</th>
                <th className="border border-gray-300 px-4 py-2">
                  Cập nhật bởi
                </th>
                <th className="border border-gray-300 px-4 py-2">Ngày tạo</th>
                <th className="border border-gray-300 px-4 py-2">
                  Ngày cập nhật
                </th>
                <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
                <th className="border border-gray-300 px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.length > 0 ? (
                orderDetails.map((detail, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {detail.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {detail.product_id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {detail.order_id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {detail.qty}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {detail.price}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {detail.created_by}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {detail.updated_by}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(detail.created_at).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(detail.updated_at).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {detail.status === 1 ? "Đang giao" : "Inactive"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex space-x-2">
                        <Link
                          to={`/admin/orderdetail/edit/${detail.id}`}
                          className="bg-yellow-500 py-1 px-3 text-white rounded-md"
                        >
                          <FaEdit className="text-xl" />
                        </Link>
                        <button
                          onClick={() => deleteOrderDetail(detail.id)}
                          className="bg-red-500 py-1 px-3 text-white rounded-md"
                        >
                          <FaTrashAlt className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="11"
                    className="text-center text-gray-500 py-4 border border-gray-300"
                  >
                    Không có chi tiết đơn hàng nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Link
            to="/admin/orders"
            className="btn bg-blue-500 text-white py-2 px-4 rounded mt-3 inline-block"
          >
            Quay lại
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OrderDetailList;
