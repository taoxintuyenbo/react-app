import React from "react";
import Home from "../pages/frontend/Home"; // Adjust path based on your folder structure
import AllProducts from "../pages/frontend/Product";
import ProductDetail from "../pages/frontend/Product/detail";
import ProductByCategory from "../pages/frontend/Product/productByCategory";
import SinglePage from "../pages/frontend/post/SinglePage";
import PostList from "../pages/frontend/post";
import PostDetail from "../pages/frontend/post/detail";
import Contact from "../pages/frontend/contact";
import Register from "../pages/frontend/user/register";
import Login from "../pages/frontend/user/login";
import UserProfile from "../pages/frontend/user/profile";
import Cart from "../pages/frontend/cart";
import Checkout from "../pages/frontend/cart/checkout";
import PaymentSuccess from "../pages/frontend/cart/success-payment";
import SearchResults from "../pages/frontend/Product/searchResult";
const RouterFrontend = [
  { path: "/", element: <Home /> },
  { path: "san-pham", element: <AllProducts /> },
  { path: "/san-pham/:slug", element: <ProductDetail /> },
  { path: "/danh-muc/:slug", element: <ProductByCategory /> },
  { path: "/trang-don/:slug", element: <SinglePage /> },
  { path: "/bai-viet", element: <PostList /> },
  { path: "/bai-viet/:slug", element: <PostDetail /> },
  { path: "/lien-he", element: <Contact /> },
  { path: "/dang-ki", element: <Register /> },
  { path: "/dang-nhap", element: <Login /> },
  { path: "/ho-so-nguoi-dung", element: <UserProfile /> },
  { path: "/gio-hang", element: <Cart /> },
  { path: "/thanh-toan", element: <Checkout /> },
  { path: "/thanh-toan-thanh-cong", element: <PaymentSuccess /> },
  { path: "/tim-kiem", element: <SearchResults /> },
];

export default RouterFrontend;
