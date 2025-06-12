import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import useParams for routing
import UserService from "../../../services/UserService"; // Import UserService

const ShowUser = () => {
  const { id } = useParams(); // Get user ID from URL parameters
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await UserService.show(id); // Fetch user data
        setUser(result.user);
      } catch (err) {
        setError("Failed to load user data.");
      }
    };

    fetchUser();
  }, [id]);

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Chi tiết Người dùng</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* User Details */}
        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-2">{user.fullname}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Username:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Giới tính:</strong> {user.gender === 1 ? "Nam" : "Nữ"}
            </p>
            <p className="col-span-2">
              <strong>Vai trò:</strong> {user.roles}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {user.phone}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {user.address}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {user.status === 1 ? "Hiển thị" : "Ẩn"}
            </p>
            <p>
              <strong>Ngày tạo:</strong>{" "}
              {new Date(user.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Ngày cập nhật:</strong>{" "}
              {new Date(user.updated_at).toLocaleString()}
            </p>
          </div>

          {/* User Image */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Ảnh đại diện</h3>
            <div className="flex flex-wrap gap-4">
              {user.thumbnail ? (
                <img
                  src={`${user.thumbnail}`} // Adjust image path
                  alt={user.fullname}
                  className="w-32 h-32 object-cover rounded-md"
                />
              ) : (
                <p>Không có ảnh đại diện</p>
              )}
            </div>
          </div>
        </div>

        <Link
          to="/admin/user"
          className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block"
        >
          Quay lại
        </Link>
      </div>
    </section>
  );
};

export default ShowUser;
