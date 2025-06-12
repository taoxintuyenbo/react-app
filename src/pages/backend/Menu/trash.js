import React, { useState, useEffect } from "react";
import MenuService from "../../../services/MenuService"; // Import your service
import { Link } from "react-router-dom"; // Import Link for navigation
import { FaUndo, FaTrashAlt } from "react-icons/fa"; // Import icons

const TrashMenu = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchTrashMenus = async () => {
      try {
        const result = await MenuService.trash(); // Fetch trashed menus
        setMenus(result.menus);
      } catch (err) {
        console.error("Failed to load trashed menus:", err);
      }
    };

    fetchTrashMenus();
  }, []);

  const handleRestore = async (id) => {
    try {
      await MenuService.restore(id); // Restore menu
      setMenus(menus.filter((menu) => menu.id !== id)); // Remove restored menu from list
    } catch (err) {
      console.error("Failed to restore menu:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await MenuService.delete(id); // Permanently delete menu
      setMenus(menus.filter((menu) => menu.id !== id)); // Remove deleted menu from list
    } catch (err) {
      console.error("Failed to delete menu:", err);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Thùng rác Menu</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Tên menu</th>
                <th className="border border-gray-300 px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="text-center">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {menu.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleRestore(menu.id)}
                      className="btn bg-blue-500 text-white py-1 px-2 rounded mr-2"
                    >
                      <FaUndo /> Khôi phục
                    </button>
                    <button
                      onClick={() => handleDelete(menu.id)}
                      className="btn bg-red-500 text-white py-1 px-2 rounded"
                    >
                      <FaTrashAlt /> Xóa vĩnh viễn
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link
          to="/admin/menu"
          className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          Quay lại
        </Link>
      </div>
    </section>
  );
};

export default TrashMenu;
