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

//   // Calculate the total number of items in the cart
//   // const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
//   useEffect(() => {
//     // Retrieve user data from sessionStorage if available
//     const storedUser = JSON.parse(sessionStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//     console.log(user);
//   }, []);

//   const handleLogout = () => {
//     // Remove user data from sessionStorage and reset state
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
//             <a href="#" className="flex items-center">
//               <img
//                 src="./images/logo.jpg"
//                 className="h-10 mr-3"
//                 alt="Shop Logo"
//               />
//               <span className="self-center text-2xl font-bold text-white">
//                 Shop
//               </span>
//             </a>

//             {/* Search Form */}
//             <form className="flex flex-grow mx-4 mb-4">
//               <input
//                 type="text"
//                 placeholder="Search for products..."
//                 className="px-4 py-2 rounded-l-lg w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
//               />
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-white text-blue-500 rounded-r-lg border border-gray-300 hover:bg-blue-100"
//               >
//                 Search
//               </button>
//             </form>

//             {/* Cart Icon */}
//             <div className="flex items-center space-x-4">
//               <Link to="/gio-hang" className="relative">
//                 {/* Cart Icon */}
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
//                 {/* Cart Item Count */}
//                 {cartItems.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs">
//                     {cartItems.length}
//                   </span>
//                 )}
//               </Link>
//               <div className="flex items-center lg:order-2">
//                 {!user ? (
//                   // Display login and signup links when user is not logged in
//                   <>
//                     <Link
//                       to="/dang-nhap"
//                       className="text-gray-800 dark:text-white hover:bg-yellow-400 font-medium rounded-lg text-sm px-4 py-2 flex items-center"
//                     >
//                       {/* Login Icon */}
//                       <LoginIcon className="h-5 w-5 mr-2" />
//                       Log in
//                     </Link>

//                     <Link
//                       to="/dang-ki"
//                       className="text-white hover:bg-yellow-400 rounded-lg text-sm px-4 py-2 ml-2 flex items-center"
//                     >
//                       {/* Sign up Icon */}
//                       <UserAddIcon className="h-5 w-5 mr-2" />
//                       Sign up
//                     </Link>
//                   </>
//                 ) : (
//                   <div className="flex items-center lg:order-2">
//                     {/* Profile link with icon */}
//                     <Link
//                       to="/ho-so-nguoi-dung"
//                       className="text-white hover:bg-yellow-400 rounded-lg text-sm px-4 py-2 mr-2 flex items-center"
//                     >
//                       {/* User Icon */}
//                       <UserIcon className="h-5 w-5 mr-2" />
//                       {user?.name}
//                     </Link>

//                     {/* Logout button with icon */}
//                     <button
//                       onClick={handleLogout}
//                       className="text-white hover:bg-yellow-400 rounded-lg text-sm px-4 py-2 flex items-center"
//                     >
//                       {/* Logout Icon */}
//                       <LogoutIcon className="h-5 w-5 mr-2" />
//                       Logout
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
//       <footer class="bg-gray-900 text-white py-12">
//         <div class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
//           <Config />
//           <div className="md:col-span-2">
//             <FooterMenu />
//           </div>
//           <div>
//             <h3 class="text-xl font-semibold mb-4">CERTIFICATION</h3>
//             <img
//               src="https://path-to-certificate-image.jpg"
//               alt="Certification"
//               class="mx-auto"
//             />
//           </div>
//         </div>

//         <div class="container mx-auto mt-8">
//           <h3 class="text-xl font-semibold text-white mb-4">MOST SEARCHED</h3>
//           <div class="flex flex-wrap gap-2">
//             <span class="px-3 py-1 bg-gray-700 text-white rounded-lg">
//               tummy tuck dress
//             </span>
//             <span class="px-3 py-1 bg-gray-700 text-white rounded-lg">
//               dress for plus size
//             </span>
//             <span class="px-3 py-1 bg-gray-700 text-white rounded-lg">
//               shift dress
//             </span>
//             <span class="px-3 py-1 bg-gray-700 text-white rounded-lg">
//               party dress
//             </span>
//             <span class="px-3 py-1 bg-gray-700 text-white rounded-lg">
//               casual dress
//             </span>
//             <span class="px-3 py-1 bg-gray-700 text-white rounded-lg">
//               flared dress
//             </span>
//             <span class="px-3 py-1 bg-gray-700 text-white rounded-lg">
//               event dress
//             </span>
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

const LayoutFrontend = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.carts);

  // Lấy thông tin người dùng từ sessionStorage khi component được render
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    // Xóa dữ liệu người dùng khỏi sessionStorage và điều hướng về trang chính
    sessionStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

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
            <form className="flex flex-grow mx-4 mb-4">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="px-4 py-2 rounded-l-lg w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white text-blue-500 rounded-r-lg border border-gray-300 hover:bg-blue-100"
              >
                Tìm kiếm
              </button>
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
                  // Hiển thị khi người dùng chưa đăng nhập
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
                    {/* Link Hồ Sơ */}
                    <Link
                      to="/ho-so-nguoi-dung"
                      className="text-white hover:bg-yellow-400 rounded-lg text-sm px-4 py-2 mr-2 flex items-center"
                    >
                      <UserIcon className="h-5 w-5 mr-2" />
                      {user?.name}
                    </Link>

                    {/* Nút Đăng Xuất */}
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

      {/* Slider */}
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
        </div>

        {/* <div className="container mx-auto mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">
            TÌM KIẾM NHIỀU NHẤT
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-700 text-white rounded-lg">
              váy dạ hội
            </span>
            <span className="px-3 py-1 bg-gray-700 text-white rounded-lg">
              đầm cho người mập
            </span>
            <span className="px-3 py-1 bg-gray-700 text-white rounded-lg">
              đầm dự tiệc
            </span>
            <span className="px-3 py-1 bg-gray-700 text-white rounded-lg">
              váy công sở
            </span>
          </div>
        </div> */}
      </footer>
    </div>
  );
};

export default LayoutFrontend;
