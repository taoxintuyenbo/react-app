import React, { useState, useEffect } from "react";
import CategoryService from "../../../services/CategoryService"; // Import your service
import { Link } from "react-router-dom"; // Import Link for navigation
import { FaUndo, FaTrashAlt } from "react-icons/fa"; // Import icons

const TrashCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchTrashCategories = async () => {
      try {
        const result = await CategoryService.trash(); // Fetch trashed categories
        setCategories(result.categories);
      } catch (err) {
        console.error("Failed to load trashed categories:", err);
      }
    };

    fetchTrashCategories();
  }, []);

  const handleRestore = async (id) => {
    try {
      await CategoryService.restore(id); // Restore category
      setCategories(categories.filter((category) => category.id !== id)); // Remove restored category from list
    } catch (err) {
      console.error("Failed to restore category:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await CategoryService.destroy(id); // Permanently delete category
      setCategories(categories.filter((category) => category.id !== id)); // Remove deleted category from list
    } catch (err) {
      console.error("Failed to delete category:", err);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Thùng rác Danh mục</h1>
          <Link
            to="/admin/categories"
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
                <th className="border border-gray-300 px-4 py-2">
                  Tên Danh mục
                </th>
                <th className="border border-gray-300 px-4 py-2">Mô tả</th>
                <th className="border border-gray-300 px-4 py-2">
                  Danh mục cha
                </th>
                <th className="border border-gray-300 px-4 py-2">Hình ảnh</th>
                <th className="border border-gray-300 px-4 py-2">Hành động</th>
                <th className="border border-gray-300 px-4 py-2">ID</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="text-center">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {category.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {category.description}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {category.parent_name ? category.parent_name : "Không có"}
                    </td>
                    <td className="border border-gray-300 px-6 py-2">
                      {category.image && (
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-32 h-24"
                        />
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRestore(category.id)}
                          className="btn bg-blue-500 text-white py-1 px-3 mx-0.5 rounded-md"
                        >
                          <FaUndo className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="btn bg-red-500 text-white py-1 px-3 mx-0.5 rounded-md"
                        >
                          <FaTrashAlt className="text-xl" />
                        </button>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {category.id}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center text-gray-500 py-4 border border-gray-300"
                  >
                    Không có danh mục nào trong thùng rác
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

export default TrashCategory;
