// import React, { useEffect, useState } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import Config from "../../components/Config";
// import FooterMenu from "../../components/FooterMenu";
// import MainMenu from "../../components/MainMenu";
// import {
//   UserIcon,
//   LogoutIcon,
//   LoginIcon,
//   UserAddIcon,
// } from "@heroicons/react/solid";
// import { useSelector } from "react-redux";

// const LayoutFrontend = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const cartItems = useSelector((state) => state.cart.carts);

//   // Lấy thông tin người dùng từ sessionStorage khi component được render
//   useEffect(() => {
//     const storedUser = JSON.parse(sessionStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   const handleLogout = () => {
//     // Xóa dữ liệu người dùng khỏi sessionStorage và điều hướng về trang chính
//     sessionStorage.removeItem("user");
//     setUser(null);
//     navigate("/");
//   };

//   return (
//     <div>
//       <header className="bg-orange-500 p-4 w-full z-10">
//         <nav className="border-gray-200 py-2.5">
//           <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
//             {/* Logo */}
//             <a href="/" className="flex items-center">
//               <img
//                 src="./images/logo.jpg"
//                 className="h-10 mr-3"
//                 alt="Logo Shop"
//               />
//               <span className="self-center text-2xl font-bold text-white">
//                 Cửa Hàng
//               </span>
//             </a>

//             {/* Form Tìm Kiếm */}
//             <form className="flex flex-grow mx-4 mb-4">
//               <input
//                 type="text"
//                 placeholder="Tìm kiếm sản phẩm..."
//                 className="px-4 py-2 rounded-l-lg w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
//               />
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-white text-blue-500 rounded-r-lg border border-gray-300 hover:bg-blue-100"
//               >
//                 Tìm kiếm
//               </button>
//             </form>

//             {/* Giỏ Hàng */}
//             <div className="flex items-center space-x-4">
//               <Link to="/gio-hang" className="relative">
//                 {/* Biểu Tượng Giỏ Hàng */}
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6 text-white"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M3 3h2l.4 2m0 0h13.2l1.4 7H7.4M5.4 5l1.2 6h9.6l1.2-6m-12 0H16m-6 14a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z"
//                   />
//                 </svg>
//                 {/* Số lượng sản phẩm */}
//                 {cartItems.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs">
//                     {cartItems.length}
//                   </span>
//                 )}
//               </Link>
//               <div className="flex items-center lg:order-2">
//                 {!user ? (
//                   // Hiển thị khi người dùng chưa đăng nhập
//                   <>
//                     <Link
//                       to="/dang-nhap"
//                       className="text-gray-800 dark:text-white hover:bg-yellow-400 font-medium rounded-lg text-sm px-4 py-2 flex items-center"
//                     >
//                       <LoginIcon className="h-5 w-5 mr-2" />
//                       Đăng Nhập
//                     </Link>

//                     <Link
//                       to="/dang-ki"
//                       className="text-white hover:bg-yellow-400 rounded-lg text-sm px-4 py-2 ml-2 flex items-center"
//                     >
//                       <UserAddIcon className="h-5 w-5 mr-2" />
//                       Đăng Ký
//                     </Link>
//                   </>
//                 ) : (
//                   <div className="flex items-center lg:order-2">
//                     {/* Link Hồ Sơ */}
//                     <Link
//                       to="/ho-so-nguoi-dung"
//                       className="text-white hover:bg-yellow-400 rounded-lg text-sm px-4 py-2 mr-2 flex items-center"
//                     >
//                       <UserIcon className="h-5 w-5 mr-2" />
//                       {user?.name}
//                     </Link>

//                     {/* Nút Đăng Xuất */}
//                     <button
//                       onClick={handleLogout}
//                       className="text-white hover:bg-yellow-400 rounded-lg text-sm px-4 py-2 flex items-center"
//                     >
//                       <LogoutIcon className="h-5 w-5 mr-2" />
//                       Đăng Xuất
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <MainMenu />
//         </nav>
//       </header>

//       {/* Slider */}
//       <Outlet />
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
//           <Config />
//           <div className="md:col-span-2">
//             <FooterMenu />
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold mb-4">CHỨNG NHẬN</h3>
//             <img
//               src="https://path-to-certificate-image.jpg"
//               alt="Chứng nhận"
//               className="mx-auto"
//             />
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LayoutFrontend;
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Config from "../../components/Config";
import FooterMenu from "../../components/FooterMenu";
import MainMenu from "../../components/MainMenu";
import {
  UserIcon,
  LogoutIcon,
  LoginIcon,
  UserAddIcon,
} from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import axios from "axios";

const LayoutFrontend = () => {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState(""); // State for search input
  const [searchResults, setSearchResults] = useState([]); // State for search result
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.carts);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setShowSearchResults(false);
    if (e.target.value.length > 1) {
      fetchSearchResults(e.target.value);
    } else {
      setSearchResults([]);
    }
  };

  // Fetch search results from API
  const fetchSearchResults = async (query) => {
    try {
      const res = await axios.get(
        `/api/products/search?query=${encodeURIComponent(query)}`
      );
      setSearchResults(res.data.products || []);
      setShowSearchResults(true);
    } catch (err) {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  // Handle search form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      // Navigate to a search results page (optional)
      navigate(`/tim-kiem?query=${encodeURIComponent(search)}`);
      setShowSearchResults(false);
    }
  };

  // Optional: Hide the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".search-dropdown")) {
        setShowSearchResults(false);
      }
    };
    if (showSearchResults) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearchResults]);

  return (
    <div>
      <header className="bg-orange-500 p-4 w-full z-10">
        <nav className="border-gray-200 py-2.5">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img
                src="./images/logo.jpg"
                className="h-10 mr-3"
                alt="Logo Shop"
              />
              <span className="self-center text-2xl font-bold text-white">
                Cửa Hàng
              </span>
            </a>

            {/* Form Tìm Kiếm */}
            <form
              className="flex flex-grow mx-4 mb-4 relative"
              onSubmit={handleSearchSubmit}
              autoComplete="off"
            >
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Tìm kiếm sản phẩm..."
                className="px-4 py-2 rounded-l-lg w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onFocus={() => {
                  if (searchResults.length > 0) setShowSearchResults(true);
                }}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white text-blue-500 rounded-r-lg border border-gray-300 hover:bg-blue-100"
              >
                Tìm kiếm
              </button>
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="search-dropdown absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg z-50 rounded-b-lg max-h-80 overflow-y-auto">
                  {searchResults.map((product) => (
                    <Link
                      to={`/san-pham/${product.slug}`}
                      key={product.id}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-900"
                      onClick={() => setShowSearchResults(false)}
                    >
                      <img
                        src={
                          product.images && product.images.length > 0
                            ? product.images[0].thumbnail
                            : "/images/default-product.png"
                        }
                        alt={product.name}
                        className="h-8 w-8 object-cover rounded mr-3"
                      />
                      <span>{product.name}</span>
                      {product.price_sale ? (
                        <span className="ml-auto text-green-600 font-semibold">
                          {product.price_sale.toLocaleString()} đ
                        </span>
                      ) : (
                        <span className="ml-auto text-gray-800">
                          {product.price.toLocaleString()} đ
                        </span>
                      )}
                    </Link>
                  ))}
                  {searchResults.length === 0 && (
                    <div className="px-4 py-2 text-gray-600 text-sm">
                      Không có kết quả
                    </div>
                  )}
                </div>
              )}
            </form>

            {/* Giỏ Hàng */}
            <div className="flex items-center space-x-4">
              <Link to="/gio-hang" className="relative">
                {/* Biểu Tượng Giỏ Hàng */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2m0 0h13.2l1.4 7H7.4M5.4 5l1.2 6h9.6l1.2-6m-12 0H16m-6 14a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z"
                  />
                </svg>
                {/* Số lượng sản phẩm */}
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              <div className="flex items-center lg:order-2">
                {!user ? (
                  <>
                    <Link
                      to="/dang-nhap"
                      className="text-gray-800 dark:text-white hover:bg-yellow-400 font-medium rounded-lg text-sm px-4 py-2 flex items-center"
                    >
                      <LoginIcon className="h-5 w-5 mr-2" />
                      Đăng Nhập
                    </Link>
                    <Link
                      to="/dang-ki"
                      className="text-white hover:bg-yellow-400 rounded-lg text-sm px-4 py-2 ml-2 flex items-center"
                    >
                      <UserAddIcon className="h-5 w-5 mr-2" />
                      Đăng Ký
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center lg:order-2">
                    <Link
                      to="/ho-so-nguoi-dung"
                      className="text-white hover:bg-yellow-400 rounded-lg text-sm px-4 py-2 mr-2 flex items-center"
                    >
                      <UserIcon className="h-5 w-5 mr-2" />
                      {user?.name}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-white hover:bg-yellow-400 rounded-lg text-sm px-4 py-2 flex items-center"
                    >
                      <LogoutIcon className="h-5 w-5 mr-2" />
                      Đăng Xuất
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <MainMenu />
        </nav>
      </header>
      <Outlet />
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <Config />
          <div className="md:col-span-2">
            <FooterMenu />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">CHỨNG NHẬN</h3>
            <img
              src="https://path-to-certificate-image.jpg"
              alt="Chứng nhận"
              className="mx-auto"
            />
          </div>
          <Link to="/admin" className="text-white">
            Admin
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default LayoutFrontend;
