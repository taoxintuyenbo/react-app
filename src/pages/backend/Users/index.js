import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import UserService from "../../../services/UserService"; // Ensure the path is correct
import {
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

const UserList = () => {
  const [users, setUsers] = useState([]);

  // Fetch users when the component mounts
  useEffect(() => {
    (async () => {
      const result = await UserService.index(); // Fetch users
      console.log(result);
      setUsers(result.users);
    })();
  }, []);

  // Toggle status of a user
  const toggleStatus = async (id, currentStatus) => {
    try {
      await UserService.status(id);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id
            ? { ...user, status: currentStatus === 1 ? 0 : 1 }
            : user
        )
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    try {
      await UserService.delete(id); // Call UserService delete method
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Danh sách Người dùng</h1>
          <div className="flex space-x-4">
            {/* <Link
              to="/admin/user/create"
              className="btn bg-green-500 text-white py-2 px-4 rounded"
            >
              Thêm Người dùng
            </Link> */}
            <Link
              to="/admin/user/trash"
              className="btn bg-red-500 text-white py-2 px-4 rounded flex items-center"
            >
              <FaTrashAlt className="mr-2" /> Thùng rác
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <table className="min-w-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2"></th>
                <th className="border border-gray-300 px-4 py-2">Tên</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">
                  Số điện thoại
                </th>
                <th className="border border-gray-300 px-4 py-2">Giới tính</th>
                <th className="border border-gray-300 px-4 py-2">Vai trò</th>
                <th className="border border-gray-300 px-4 py-2">Hành động</th>
                <th className="border border-gray-300 px-4 py-2">ID</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.length > 0 &&
                users.map((user, index) => {
                  return (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="text-center">
                        <input
                          type="checkbox"
                          name="user_checkbox"
                          value={user.id}
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.email}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.phone}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.gender === "male" ? "Nam" : "Nữ"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.roles}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex space-x-2">
                          {/* Toggle Status Button */}
                          <button
                            onClick={() => toggleStatus(user.id, user.status)}
                            className={`btn py-1 px-3 mx-0.5 text-white rounded-md ${
                              user.status === 1 ? "bg-green-500" : "bg-red-500"
                            }`}
                          >
                            {user.status === 1 ? (
                              <FaToggleOn className="text-xl" />
                            ) : (
                              <FaToggleOff className="text-xl" />
                            )}
                          </button>

                          {/* View User Details */}
                          <Link
                            to={`/admin/user/show/${user.id}`}
                            className="bg-blue-500 py-1 px-3 mx-0.5 text-white rounded-md"
                          >
                            <FaEye className="text-xl" />
                          </Link>

                          {/* Edit User */}
                          <Link
                            to={`/admin/user/edit/${user.id}`}
                            className="bg-yellow-500 py-1 px-3 mx-0.5 text-white rounded-md"
                          >
                            <FaEdit className="text-xl" />
                          </Link>

                          {/* Delete User */}
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="bg-red-500 py-1 px-3 mx-0.5 text-white rounded-md"
                          >
                            <FaTrashAlt className="text-xl" />
                          </button>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.id}
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

export default UserList;
