import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuService from "../services/MenuService";

const MainMenu = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      const response = await MenuService.getMenus();
      setMenus(response.menus);
    };
    fetchMenus();
  }, []);

  return (
    <nav
      className="flex items-center justify-center w-full lg:w-auto lg:order-1"
      id="mobile-menu-2"
    >
      <ul className="flex flex-col mt-4 font-medium text-lg lg:flex-row lg:space-x-8 lg:mt-0">
        {menus.map((menu) => (
          <li key={menu.id} className="relative group">
            <Link
              to={menu.link}
              className="block py-2 px-4 text-white hover:text-black"
            >
              {menu.name}
            </Link>
            {menu.children && menu.children.length > 0 && (
              <ul className="absolute top-full left-0 z-50 bg-white text-black shadow-lg mt-2 rounded-lg hidden group-hover:block lg:flex-col lg:space-y-2 lg:mt-0">
                {menu.children.map((child) => (
                  <li key={child.id}>
                    <Link
                      to={child.link}
                      className="block py-2 px-4 text-black hover:bg-gray-200 rounded-lg"
                    >
                      {child.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainMenu;
