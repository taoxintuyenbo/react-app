import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { CLEAR } from "../../../redux/action/cartAction";
import { toast } from "react-toastify";
import OrderService from "../../../services/OrderService";
import OrderDetailService from "../../../services/OrderDetailService";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const cartItems = useSelector((state) => state.cart.carts);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [note, setNote] = useState("");
  const [success, setSuccess] = useState(false); // Track success state

  const clearCart = () => {
    dispatch(CLEAR());
  };
  const handleMomoPayment = async () => {
    console.log(user);
    if (!cartItems.length) {
      toast.warning("Giỏ hàng đang trống!", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    const paymentData = {
      user_id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,

      note,
      carts: cartItems.map((item) => ({
        id: item.id,
        qty: item.quantity,
        price: item.price,
      })),
    };
    try {
      const response = await OrderService.momoPayment(paymentData);
      console.log(response);

      if (response.status === true && response.payUrl) {
        window.location.href = response.payUrl;
      } else {
        toast.error(
          response.message || "Không thể tạo liên kết thanh toán MoMo.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      }
    } catch (error) {
      console.error("Lỗi khi gọi API MoMo:", error);
      toast.error("Lỗi kết nối hệ thống thanh toán.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  const handleVnpayPayment = async () => {
    if (!cartItems.length) {
      toast.warning("Giỏ hàng đang trống!", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    const paymentData = {
      user_id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      note,
      carts: cartItems.map((item) => ({
        id: item.id,
        qty: item.quantity,
        price: item.price,
      })),
    };

    try {
      const response = await OrderService.vnpayPayment(paymentData); // giả sử bạn đã có service tương ứng
      console.log("vnpay:", response);

      if (response.status === true && response.paymentUrl) {
        window.location.href = response.paymentUrl; // Chuyển sang trang thanh toán VNPAY
      } else {
        toast.error(
          response.message || "Không thể tạo liên kết thanh toán VNPAY.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      }
    } catch (error) {
      console.error("Lỗi khi gọi API VNPAY:", error);
      toast.error("Lỗi kết nối hệ thống thanh toán.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cartItems.length) {
      toast.warning("Giỏ hàng của bạn đang trống!", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    const orderData = {
      user_id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      note,
      status: "Đang chuẩn bị",
      updated_by: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      const orderResponse = await OrderService.store(orderData);
      console.log(orderResponse);
      const orderId = orderResponse.order.id;

      const orderDetails = cartItems.map((item) => ({
        order_id: orderId,
        product_id: item.id,
        qty: item.quantity,
        price: item.price,
        status: "Hoạt động",
      }));

      const detailResponses = await Promise.all(
        orderDetails.map((detail) => OrderDetailService.store(detail))
      );

      if (detailResponses.every((res) => res.status === 200)) {
        setSuccess(true);
        toast.success("Thanh toán thành công!", {
          position: "top-right",
          autoClose: 2000,
        });
        clearCart();
        setTimeout(() => {
          navigate("/thanh-toan-thanh-cong");
        }, 1000);
      }

      clearCart();
      alert(
        "Thanh toán thành công! Bạn sẽ được chuyển hướng về trang sản phẩm."
      ); // Display success alert

      navigate("/san-pham");
    } catch (error) {
      console.error("Không thể xử lý đơn hàng:", error);
      toast.error("Đã xảy ra lỗi trong quá trình thanh toán.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-green-600">
            Thanh toán thành công!
          </h3>
          <p className="text-gray-700 mt-4">
            Bạn sẽ được chuyển hướng về trang sản phẩm trong giây lát...
          </p>
        </div>
      </div>
    );
  }

  return user ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Thông tin người dùng */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Thông tin người dùng
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tên
                </label>
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={user.name}
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={user.email}
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={user.phone}
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={user.address}
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ghi chú
                </label>
                <textarea
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  rows="3"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Thêm ghi chú cho đơn hàng (không bắt buộc)"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md shadow hover:bg-indigo-700 transition"
              >
                Đặt hàng
              </button>
              <button
                type="button"
                onClick={handleMomoPayment}
                className="w-full mt-4 bg-pink-500 text-white py-2 rounded-md shadow hover:bg-yellow-600 transition"
              >
                Thanh toán với MoMo
              </button>
              <button
                type="button"
                onClick={handleVnpayPayment}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md shadow hover:bg-blue-700 transition"
              >
                Thanh toán với VNPAY
              </button>
            </form>
          </div>

          {/* Thông tin giỏ hàng */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Thông tin giỏ hàng</h3>
            <table className="w-full text-left border-collapse border border-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Sản phẩm</th>
                  <th className="border border-gray-300 px-4 py-2">Giá</th>
                  <th className="border border-gray-300 px-4 py-2">Số lượng</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {item.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.price.toFixed(2)} VND
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.quantity}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {(item.price * item.quantity).toFixed(2)} VND
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 flex justify-between items-center">
              <h4 className="text-xl font-semibold">
                Tổng cộng: {totalAmount.toFixed(2)} VND
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h4 className="text-lg font-semibold mb-4">
          Bạn cần đăng nhập trước khi thanh toán
        </h4>
        <Link
          to="/dang-nhap"
          className="bg-blue-500 text-white px-6 py-2 rounded-md shadow hover:bg-blue-600 transition"
        >
          Đăng nhập
        </Link>
      </div>
    </div>
  );
}

export default Checkout;
