import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import UserService from "../../../services/UserService"; // Ensure this path is correct
import OrderService from "../../../services/OrderService";

const UserProfile = () => {
  const [user, setUser] = useState(null); // Initially set to null
  const [selectedImage, setSelectedImage] = useState(null); // Image file state
  const [errors, setErrors] = useState({}); // Validation errors
  const [error, setError] = useState(""); // General error message
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]); // Store user's order history
  const [selectedOrder, setSelectedOrder] = useState(null); // Selected order for details

  // Fetch user data from sessionStorage when the component mounts
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // Set the user from sessionStorage
      fetchUserOrders(storedUser.id); // Fetch order history
    } else {
      setError("User not found.");
    }
    // console.log("user", storedUser);
  }, []);

  const fetchUserOrders = async (userId) => {
    try {
      const response = await OrderService.getOrdersByUserId(userId);
      console.log(response);
      setOrders(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load order history.");
    }
  };

  // Handle input changes for the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setSelectedImage(file);
  };

  // Handle form submission to update the user profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("fullname", user.fullname);
    formData.append("gender", user.gender);
    formData.append("phone", user.phone);
    formData.append("password", user.password);
    formData.append("role", "customer");
    formData.append("email", user.email);
    formData.append("address", user.address);
    if (selectedImage) {
      formData.append("thumbnail", selectedImage); // Append image file if selected
    }

    try {
      const response = await UserService.update(user.id, formData); // Update user profile
      sessionStorage.setItem("user", JSON.stringify(response.user));
      navigate("/"); // Redirect to profile page after successful update
      window.location.reload();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        console.log(err);
        setErrors(err.response.data.errors); // Set validation errors
      } else {
        setError("Error updating user. Please try again.");
      }
    }
  };

  // const handleLogout = () => {
  //   // Remove user data from sessionStorage and reset state
  //   sessionStorage.removeItem("user");
  //   setUser(null);
  //   navigate("/login"); // Redirect to login page after logout
  // };

  if (!user) {
    return (
      <section className="content">
        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-semibold mb-4">User Profile</h1>
          <div className="text-red-500">{error || "Loading..."}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Chỉnh sửa Hồ sơ</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="name">
                  Tên
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>

              {/* Fullname */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="fullname">
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={user.fullname || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.fullname ? "border-red-500" : ""
                  }`}
                />
                {errors.fullname && (
                  <span className="text-red-500 text-sm">
                    {errors.fullname}
                  </span>
                )}
              </div>

              {/* Gender */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Giới tính</label>
                <select
                  name="gender"
                  value={user.gender || ""}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full"
                >
                  <option value="1">Nam</option>
                  <option value="0">Nữ</option>
                </select>
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
                  value={user.phone || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">{errors.phone}</span>
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
                  value={user.email || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>

              {/* Address */}
              <div className="mb-4 md:col-span-2">
                <label className="block text-gray-700 mb-1" htmlFor="address">
                  Địa chỉ
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={user.address || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.address ? "border-red-500" : ""
                  }`}
                />
                {errors.address && (
                  <span className="text-red-500 text-sm">{errors.address}</span>
                )}
              </div>
              <div className="mb-4 md:col-span-2">
                <label className="block text-gray-700 mb-1" htmlFor="address">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password}
                  </span>
                )}
              </div>
              {/* Image Upload */}
              <div className="mb-4 md:col-span-2">
                <label className="block text-gray-700 mb-1" htmlFor="thumbnail">
                  Ảnh đại diện
                </label>
                <input
                  type="file"
                  id="thumbnail"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border border-gray-300 p-2 w-full"
                />
                {user.thumbnail && (
                  <div className="mt-4">
                    <img
                      src={`http://127.0.0.1:8000/images/users/${user.thumbnail}`}
                      alt="User"
                      className="w-32 h-32 object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-4 mt-4">
              <button
                type="submit"
                className="btn bg-green-500 text-white py-2 px-4 rounded"
              >
                Cập nhật Hồ sơ
              </button>
              <button
                type="button"
                className="btn bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => navigate("/")}
              >
                Quay lại
              </button>
            </div>
          </form>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Lịch sử Đơn Hàng</h2>
          {orders.length > 0 ? (
            <table className="w-full text-left border-collapse border border-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">
                    Mã Đơn Hàng
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Ngày Đặt</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Trạng Thái
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Tổng Tiền
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const totalMoney = order.order_details.reduce(
                    (acc, item) => acc + item.qty * item.price,
                    0
                  );
                  return (
                    <tr key={order.id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2">
                        {order.id}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {order.status === 1 ? "Hoạt động" : "Đã hủy"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {totalMoney.toLocaleString()} VND
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                        >
                          Xem Chi Tiết
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
          )}
        </div>

        {selectedOrder && (
          <div className="mt-4 bg-gray-100 p-4 border border-gray-300 rounded shadow">
            <h3 className="text-xl font-semibold mb-4">
              Chi Tiết Đơn Hàng #{selectedOrder.id}
            </h3>
            <table className="w-full text-left border-collapse border border-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">
                    Mã Sản Phẩm
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Số Lượng</th>
                  <th className="border border-gray-300 px-4 py-2">Đơn Giá</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Thành Tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.order_details.map((detail) => (
                  <tr key={detail.id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {detail.product_id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {detail.qty}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {detail.price.toLocaleString()} VND
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {(detail.qty * detail.price).toLocaleString()} VND
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Đóng
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserProfile;
