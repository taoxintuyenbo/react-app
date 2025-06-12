import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import ConfigService from "../../../services/ConfigService"; // Import your ConfigService
import { FaUndo, FaTrashAlt } from "react-icons/fa"; // Import icons

const TrashConfig = () => {
  const [configs, setConfigs] = useState([]);

  // Fetch trashed configs when the component mounts
  useEffect(() => {
    const fetchTrashConfigs = async () => {
      try {
        const result = await ConfigService.trash(); // Fetch trashed configs
        setConfigs(result.configs);
      } catch (err) {
        console.error("Failed to load trashed configs:", err);
      }
    };

    fetchTrashConfigs();
  }, []);

  // Handle restoring a config
  const handleRestore = async (id) => {
    try {
      await ConfigService.restore(id); // Restore config
      setConfigs(configs.filter((config) => config.id !== id)); // Remove restored config from list
    } catch (err) {
      console.error("Failed to restore config:", err);
    }
  };

  // Handle permanently deleting a config
  const handleDelete = async (id) => {
    try {
      await ConfigService.destroy(id); // Permanently delete config
      setConfigs(configs.filter((config) => config.id !== id)); // Remove deleted config from list
    } catch (err) {
      console.error("Failed to delete config:", err);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Thùng rác Cấu hình</h1>
          <Link
            to="/admin/config"
            className="btn bg-blue-500 text-white py-2 px-4 rounded"
          >
            Quay lại
          </Link>
        </div>

        <div className="overflow-x-auto border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <table className="min-w-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">
                  Tên trang web
                </th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">
                  Số điện thoại
                </th>
                <th className="border border-gray-300 px-4 py-2">Địa chỉ</th>
                <th className="border border-gray-300 px-4 py-2">Hotline</th>
                <th className="border border-gray-300 px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {configs.length > 0 ? (
                configs.map((config, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {config.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {config.site_name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {config.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {config.phones}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {config.address}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {config.hotline}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRestore(config.id)}
                          className="btn bg-blue-500 text-white py-1 px-3 mx-0.5 rounded-md"
                        >
                          <FaUndo className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleDelete(config.id)}
                          className="btn bg-red-500 text-white py-1 px-3 mx-0.5 rounded-md"
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
                    colSpan="7"
                    className="text-center text-gray-500 py-4 border border-gray-300"
                  >
                    Không có cấu hình nào trong thùng rác
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

export default TrashConfig;
