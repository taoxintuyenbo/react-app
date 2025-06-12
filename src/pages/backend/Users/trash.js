import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // For navigation
import UserService from "../../../services/UserService"; // Ensure the path is correct
import { FaUndo, FaTrashAlt } from "react-icons/fa"; // Import icons

const TrashUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchTrashedUsers = async () => {
      try {
        const result = await UserService.trash(); // Fetch trashed users
        setUsers(result.users);
      } catch (err) {
        console.error("Failed to load trashed users:", err);
      }
    };

    fetchTrashedUsers();
  }, []);

  const handleRestore = async (id) => {
    try {
      await UserService.restore(id); // Restore user
      setUsers(users.filter((user) => user.id !== id)); // Remove restored user from list
    } catch (err) {
      console.error("Failed to restore user:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await UserService.destroy(id); // Permanently delete user
      setUsers(users.filter((user) => user.id !== id)); // Remove deleted user from list
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Thùng rác Người dùng</h1>
          <Link
            to="/admin/user"
            className="btn bg-blue-500 text-white py-2 px-4 rounded"
          >
            Quay lại
          </Link>
        </div>

        <div className="overflow-x-auto border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <table className="min-w-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Tên</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">
                  Số điện thoại
                </th>
                <th className="border border-gray-300 px-4 py-2">Vai trò</th>
                <th className="border border-gray-300 px-4 py-2">Hành động</th>
                <th className="border border-gray-300 px-4 py-2">ID</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="text-center">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.fullname}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.phone}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.roles}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRestore(user.id)}
                          className="btn bg-blue-500 text-white py-1 px-3 mx-0.5 rounded-md"
                        >
                          <FaUndo className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="btn bg-red-500 text-white py-1 px-3 mx-0.5 rounded-md"
                        >
                          <FaTrashAlt className="text-xl" />
                        </button>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.id}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center text-gray-500 py-4 border border-gray-300"
                  >
                    Không có người dùng nào trong thùng rác
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TrashUser;
