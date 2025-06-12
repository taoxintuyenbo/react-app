import React from "react";
import { Outlet, Link } from "react-router-dom"; // Import Outlet for nested routing
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
  FaPowerOff,
} from "react-icons/fa";

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-red-400 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-gray-800">
              <FaTachometerAlt />
            </a>
          </li>
          <li>
            <Link to="/admin" className="text-gray-800 hover:text-black">
              Trang chủ
            </Link>
          </li>
        </ul>
        <ul className="flex space-x-4">
          <li>
            <a
              href="#"
              className="text-gray-800 hover:text-black flex items-center"
            >
              <FaUser className="mr-2" /> Quản lý
            </a>
          </li>
          <li>
            <Link
              to="/logout"
              className="text-gray-800 hover:text-black flex items-center"
            >
              <FaPowerOff className="mr-2" /> Thoát
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
