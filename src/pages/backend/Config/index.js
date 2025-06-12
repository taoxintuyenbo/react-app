import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ConfigService from "../../../services/ConfigService";
import {
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

const ConfigList = () => {
  const [configs, setConfigs] = useState([]);

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const result = await ConfigService.index();
        setConfigs(result.configs);
      } catch (err) {
        console.error("Failed to load configs:", err);
      }
    };

    fetchConfigs();
  }, []);

  // Toggle status (active or inactive)
  const toggleStatus = async (id, currentStatus) => {
    try {
      await ConfigService.status(id);
      setConfigs((prevConfigs) =>
        prevConfigs.map((config) =>
          config.id === id
            ? { ...config, status: currentStatus === 1 ? 0 : 1 }
            : config
        )
      );
    } catch (error) {
      console.error("Error toggling config status:", error);
    }
  };

  // Delete config
  const deleteConfig = async (id) => {
    try {
      await ConfigService.delete(id);
      setConfigs((prevConfigs) =>
        prevConfigs.filter((config) => config.id !== id)
      );
    } catch (error) {
      console.error("Error deleting config:", error);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Danh sách Cấu hình</h1>
          <div className="flex space-x-4">
            <Link
              to="/admin/config/create"
              className="btn bg-green-500 text-white py-2 px-4 rounded"
            >
              Thêm Cấu hình
            </Link>
            <Link
              to="/admin/config/trash"
              className="btn bg-red-500 text-white py-2 px-4 rounded flex items-center"
            >
              <i className="fa fa-trash mr-2" /> Thùng rác
            </Link>
          </div>
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
                <th className="border border-gray-300 px-4 py-2">Zalo</th>
                <th className="border border-gray-300 px-4 py-2">Facebook</th>
                <th className="border border-gray-300 px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {configs &&
                configs.length > 0 &&
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
                      {config.zalo}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {config.facebook}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleStatus(config.id, config.status)}
                          className={`btn py-1 px-3 ${
                            config.status === 1 ? "bg-green-500" : "bg-red-500"
                          } text-white rounded-md`}
                        >
                          {config.status === 1 ? (
                            <FaToggleOn className="text-xl" />
                          ) : (
                            <FaToggleOff className="text-xl" />
                          )}
                        </button>
                        <Link
                          to={`/admin/config/show/${config.id}`}
                          className="bg-sky-500 py-1 px-2 mx-0.5 text-white rounded-md"
                        >
                          <FaEye className="text-xl" />
                        </Link>
                        <Link
                          to={`/admin/config/edit/${config.id}`}
                          className="bg-yellow-500 py-1 px-2 mx-0.5 text-white rounded-md"
                        >
                          <FaEdit className="text-xl" />
                        </Link>
                        <button
                          onClick={() => deleteConfig(config.id)}
                          className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md"
                        >
                          <FaTrashAlt className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ConfigList;
