import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MenuService from "../../../services/MenuService";
import { FaSave, FaArrowLeft } from "react-icons/fa";

const EditMenu = () => {
  const { id } = useParams(); // Get menu ID from URL parameters
  const [menu, setMenu] = useState({
    name: "",
    link: "",
    status: 1,
    type: "",
    table_id: "",
  });
  const [menus, setMenus] = useState([]); // List of menus for parent dropdown
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menuResult = await MenuService.show(id); // Fetch menu data
        setMenu(menuResult.menu);
      } catch (err) {
        setError("Failed to load menu data.");
      }
    };

    const fetchParentMenus = async () => {
      try {
        const parentMenus = await MenuService.parentMenu(id); // Fetch parent menus
        setMenus(parentMenus.menus || []);
      } catch (err) {
        setError("Failed to load parent menus.");
      }
    };

    fetchMenu();
    fetchParentMenus();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenu({
      ...menu,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await MenuService.update(id, menu); // Update menu item
      navigate("/admin/menu"); // Redirect to menu list after update
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors); // Set validation errors
      } else {
        setError("Error updating menu. Please try again.");
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Chỉnh sửa Menu</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="name">
                  Tên Menu
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={menu.name || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>

              {/* Parent Menu Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="table_id">
                  Menu Cha
                </label>
                <select
                  id="table_id"
                  name="table_id"
                  value={menu.table_id || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.table_id ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Không có menu cha</option>
                  {menus.map((menuItem) => (
                    <option key={menuItem.id} value={menuItem.id}>
                      {menuItem.name}
                    </option>
                  ))}
                </select>
                {errors.table_id && (
                  <span className="text-red-500 text-sm">
                    {errors.table_id}
                  </span>
                )}
              </div>

              {/* Link */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="link">
                  Liên kết
                </label>
                <input
                  type="text"
                  id="link"
                  name="link"
                  value={menu.link || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.link ? "border-red-500" : ""
                  }`}
                />
                {errors.link && (
                  <span className="text-red-500 text-sm">{errors.link}</span>
                )}
              </div>

              {/* Type */}
              {/* <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="type">
                  Loại
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={menu.type || ""}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full"
                />
              </div> */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="type">
                  Loại
                </label>
                <select
                  id="type"
                  name="type"
                  value={menu.type || ""}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full"
                >
                  <option value="">-- Chọn loại --</option>
                  <option value="category">Category</option>
                  <option value="brand">Brand</option>
                  <option value="topic">Topic</option>
                  <option value="post">Post</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              {/* Status */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Trạng thái</label>
                <select
                  name="status"
                  value={menu.status || 1}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full"
                >
                  <option value={1}>Hiển thị</option>
                  <option value={2}>Ẩn</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-4 mt-4">
              <button
                type="submit"
                className="btn bg-green-500 text-white py-2 px-4 rounded flex items-center"
              >
                <FaSave className="mr-2" /> Cập nhật Menu
              </button>
              <Link
                to="/admin/menu"
                className="btn bg-blue-500 text-white py-2 px-4 rounded flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Quay lại
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditMenu;
