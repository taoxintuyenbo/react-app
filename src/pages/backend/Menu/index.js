import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import MenuService from "../../../services/MenuService"; // Ensure the path is correct
import {
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

const MenuList = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await MenuService.index(); // Fetch menu items
      setMenus(result.menus);
    })();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      await MenuService.status(id);
      setMenus((prevMenus) =>
        prevMenus.map((menu) =>
          menu.id === id
            ? { ...menu, status: currentStatus === 1 ? 2 : 1 }
            : menu
        )
      );
    } catch (error) {
      console.error("Error toggling menu status:", error);
    }
  };

  const deleteMenu = async (id) => {
    try {
      await MenuService.delete(id); // Call MenuService delete method
      setMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== id));
    } catch (error) {
      console.error("Error deleting menu:", error);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Danh sách Menu</h1>
          <div className="flex space-x-4">
            <Link
              to="/admin/menu/create"
              className="btn bg-green-500 text-white py-2 px-4 rounded"
            >
              Thêm Menu
            </Link>
            <a
              href="/admin/menu/trash"
              className="btn bg-red-500 text-white py-2 px-4 rounded flex items-center"
            >
              <i className="fa fa-trash mr-2" /> Thùng rác
            </a>
          </div>
        </div>

        <div className="overflow-x-auto border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <table className="min-w-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2"></th>
                <th className="border border-gray-300 px-4 py-2">Tên</th>
                <th className="border border-gray-300 px-4 py-2">Liên kết</th>
                <th className="border border-gray-300 px-4 py-2">Loại</th>
                <th className="border border-gray-300 px-4 py-2">Bảng ID</th>
                <th className="border border-gray-300 px-4 py-2">Hành động</th>
                <th className="border border-gray-300 px-4 py-2">ID</th>
              </tr>
            </thead>
            <tbody>
              {menus &&
                menus.length > 0 &&
                menus.map((menu, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="text-center">
                      <input
                        type="checkbox"
                        name="menu_checkbox"
                        value={menu.id}
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {menu.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {menu.link}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {menu.type}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {menu.table_id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleStatus(menu.id, menu.status)}
                          className={`btn py-1 px-3 mx-0.5 text-white rounded-md ${
                            menu.status === 1 ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {menu.status === 1 ? (
                            <FaToggleOn className="text-xl" />
                          ) : (
                            <FaToggleOff className="text-xl" />
                          )}
                        </button>

                        <Link
                          to={`/admin/menu/show/${menu.id}`}
                          className="bg-blue-500 py-1 px-3 mx-0.5 text-white rounded-md"
                        >
                          <FaEye className="text-xl" />
                        </Link>
                        <Link
                          to={`/admin/menu/edit/${menu.id}`}
                          className="bg-yellow-500 py-1 px-3 mx-0.5 text-white rounded-md"
                        >
                          <FaEdit className="text-xl" />
                        </Link>
                        <button
                          onClick={() => deleteMenu(menu.id)}
                          className="bg-red-500 py-1 px-3 mx-0.5 text-white rounded-md"
                        >
                          <FaTrashAlt className="text-xl" />
                        </button>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {menu.id}
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

export default MenuList;
