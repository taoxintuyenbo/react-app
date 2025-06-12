import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import CategoryService from "../../../services/CategoryService"; // Ensure the path is correct
import {
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await CategoryService.index(); // Fetch categories
      setCategories(result.categories);
    })();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      await CategoryService.status(id);
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === id
            ? { ...category, status: currentStatus === 1 ? 2 : 1 }
            : category
        )
      );
    } catch (error) {
      console.error("Error toggling category status:", error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await CategoryService.delete(id); // Call CategoryService delete method
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Danh sách Danh mục</h1>
          <div className="flex space-x-4">
            <Link
              to="/admin/category/create"
              className="btn bg-green-500 text-white py-2 px-4 rounded"
            >
              Thêm Danh mục
            </Link>
            <a
              href="/admin/category/trash"
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
                <th className="border border-gray-300 px-4 py-2">Hình ảnh</th>

                <th className="border border-gray-300 px-4 py-2">
                  Tên danh mục
                </th>
                <th className="border border-gray-300 px-4 py-2">Mô tả</th>
                <th className="border border-gray-300 px-4 py-2">
                  Danh mục cha
                </th>
                <th className="border border-gray-300 px-4 py-2">Hành động</th>
                <th className="border border-gray-300 px-4 py-2">ID</th>
              </tr>
            </thead>
            <tbody>
              {categories &&
                categories.length > 0 &&
                categories.map((category, index) => {
                  return (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="text-center">
                        <input
                          type="checkbox"
                          name="category_checkbox"
                          value={category.id}
                        />
                      </td>
                      <td className="border border-gray-300  py-2">
                        {category.image && (
                          <img
                            src={`${category.image}`}
                            alt={category.name}
                            className="w-24 h-24"
                          />
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {category.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {category.description}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {category.parent_id ? category.parent_id : "Không có"}
                      </td>

                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              toggleStatus(category.id, category.status)
                            }
                            className={`btn py-1 px-3 mx-0.5 text-white rounded-md ${
                              category.status === 1
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          >
                            {category.status === 1 ? (
                              <FaToggleOn className="text-xl" />
                            ) : (
                              <FaToggleOff className="text-xl" />
                            )}
                          </button>

                          <Link
                            to={`/admin/category/show/${category.id}`}
                            className="bg-blue-500 py-1 px-3 mx-0.5 text-white rounded-md"
                          >
                            <FaEye className="text-xl" />
                          </Link>
                          <Link
                            to={`/admin/category/edit/${category.id}`}
                            className="bg-yellow-500 py-1 px-3 mx-0.5 text-white rounded-md"
                          >
                            <FaEdit className="text-xl" />
                          </Link>
                          <button
                            onClick={() => deleteCategory(category.id)}
                            className="bg-red-500 py-1 px-3 mx-0.5 text-white rounded-md"
                          >
                            <FaTrashAlt className="text-xl" />
                          </button>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {category.id}
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

export default CategoryList;
