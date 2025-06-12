import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import useParams for routing
import MenuService from "../../../services/MenuService"; // Import your service

const ShowMenu = () => {
  const { id } = useParams(); // Get menu ID from URL parameters
  const [menu, setMenu] = useState({});
  const [parentMenu, setParentMenu] = useState(null); // State for parent menu
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const result = await MenuService.show(id); // Fetch menu data
        setMenu(result.menu);

        // If the menu has a parent_id, fetch the parent menu details
        if (result.menu.parent_id) {
          const parentResult = await MenuService.show(result.menu.parent_id);
          setParentMenu(parentResult.menu.name); // Set parent menu's name
        }
      } catch (err) {
        setError("Failed to load menu data.");
      }
    };

    fetchMenu();
  }, [id]);

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Chi tiết Menu</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Menu Details */}
        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-2">{menu.name}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>ID:</strong> {menu.id}
            </p>
            <p>
              <strong>Liên kết:</strong> {menu.link}
            </p>
            <p>
              <strong>Loại:</strong> {menu.type}
            </p>
            <p>
              <strong>Menu cha:</strong> {parentMenu ? parentMenu : "Không có"}
            </p>
            <p>
              <strong>Bảng liên kết:</strong> {menu.table_id}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {menu.status === 1 ? "Hiển thị" : "Ẩn"}
            </p>
            <p>
              <strong>Ngày tạo:</strong>{" "}
              {new Date(menu.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Ngày cập nhật:</strong>{" "}
              {new Date(menu.updated_at).toLocaleString()}
            </p>
          </div>
        </div>

        <Link
          to="/admin/menu"
          className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block"
        >
          Quay lại
        </Link>
      </div>
    </section>
  );
};

export default ShowMenu;
