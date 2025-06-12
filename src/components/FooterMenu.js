import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuService from "../services/MenuService";

const FooterMenu = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchFooterMenu = async () => {
      const response = await MenuService.getFooterMenus();
      setMenus(response.menus);
    };

    fetchFooterMenu();
  }, []);

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-200 col-span-full">
        GIỚI THIỆU & CHÍNH SÁCH
      </h3>
      {menus.map((menu) => (
        <div key={menu.id} className="border-b border-gray-600 pb-4">
          <ul className="space-y-2">
            {menu.children && menu.children.length > 0 ? (
              menu.children.map((child) => (
                <li key={child.id}>
                  <Link
                    TO={child.link}
                    className="text-gray-300 hover:underline"
                  >
                    {child.name}
                  </Link>
                </li>
              ))
            ) : (
              <li>
                <Link to={menu.link} className="text-gray-300 hover:underline">
                  {menu.name}
                </Link>
              </li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterMenu;
