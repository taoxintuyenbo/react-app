import React from "react";
import { Link } from "react-router-dom"; // Import Outlet for nested routing
import {
  FaTachometerAlt,
  FaCopy,
  FaUser,
  FaShoppingBag,
  FaClipboard,
  FaIdCard,
  FaBars,
  FaImage,
  FaCogs,
} from "react-icons/fa";

// Navbar Component

// Sidebar Component
const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen pl-5 pb-5">
      <div className="mt-4">
        <ul className="space-y-4">
          {/* Dashboard */}
          <li>
            <Link
              to="/admin"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700"
            >
              <FaTachometerAlt />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Quản lý sản phẩm */}
          <li>
            <Link
              to="/admin/product"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700"
            >
              <FaCopy />
              <span>Quản lý sản phẩm</span>
            </Link>
            <ul className="pl-6 space-y-2">
              <li>
                <Link to="/admin/product" className="hover:text-gray-300">
                  Tất cả sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/admin/categories" className="hover:text-gray-300">
                  Danh mục
                </Link>
              </li>
              <li>
                <Link to="/admin/brand" className="hover:text-gray-300">
                  Thương hiệu
                </Link>
              </li>
              <li>
                <Link to="/admin/product_image" className="hover:text-gray-300">
                  Ảnh sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/admin/product_sale" className="hover:text-gray-300">
                  Khuyến mãi sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/admin/product_store" className="hover:text-gray-300">
                  Kho sản phẩm
                </Link>
              </li>
            </ul>
          </li>

          {/* Quản lý đơn hàng */}
          <li>
            <Link
              to="/admin/orders"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700"
            >
              <FaShoppingBag />
              <span>Đơn hàng</span>
            </Link>
            <ul className="pl-6 space-y-2">
              <li>
                <Link to="/admin/orders" className="hover:text-gray-300">
                  Tất cả đơn hàng
                </Link>
              </li>
              {/* <li>
                <Link to="/admin/orderdetail" className="hover:text-gray-300">
                  Chi tiết đơn hàng
                </Link>
              </li> */}
            </ul>
          </li>

          {/* Quản lý bài viết */}
          <li>
            <Link
              to="/admin/post"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700"
            >
              <FaClipboard />
              <span>Bài viết</span>
            </Link>
            <ul className="pl-6 space-y-2">
              <li>
                <Link to="/admin/post" className="hover:text-gray-300">
                  Tất cả bài viết
                </Link>
              </li>
              <li>
                <Link to="/admin/topic" className="hover:text-gray-300">
                  Chủ đề
                </Link>
              </li>
            </ul>
          </li>

          {/* Quản lý người dùng */}
          <li>
            <Link
              to="/admin/user"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700"
            >
              <FaUser />
              <span>Người dùng</span>
            </Link>
            <ul className="pl-6 space-y-2">
              <li>
                <Link to="/admin/user" className="hover:text-gray-300">
                  Danh sách người dùng
                </Link>
              </li>
            </ul>
          </li>

          {/* Quản lý liên hệ */}
          <li>
            <Link
              to="/admin/contact"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700"
            >
              <FaIdCard />
              <span>Liên hệ</span>
            </Link>
          </li>

          {/* Quản lý menu */}
          <li>
            <Link
              to="/admin/menu"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700"
            >
              <FaBars />
              <span>Menu</span>
            </Link>
          </li>

          {/* Quản lý giao diện */}
          <li>
            <Link
              to="/admin/banner"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700"
            >
              <FaImage />
              <span>Banner</span>
            </Link>
          </li>

          {/* Cấu hình */}
          <li>
            <Link
              to="/admin/config"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700"
            >
              <FaCogs />
              <span>Cấu hình</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};
export default Sidebar;

// LayoutBackend Component
