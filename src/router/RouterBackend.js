import React from "react";
import Product from "../pages/backend/Product";
import Categories from "../pages/backend/Categories";
import Brands from "../pages/backend/Brands";
import ProductImage from "../pages/backend/ProductImage";
import ProductSale from "../pages/backend/ProductSale";
import ProductStore from "../pages/backend/ProductStore";
import Orders from "../pages/backend/Orders";
import OrderDetail from "../pages/backend/OrderDetail";
import Posts from "../pages/backend/Posts";
import Topics from "../pages/backend/Topics";
import Users from "../pages/backend/Users";
import Contact from "../pages/backend/Contact";
import Menu from "../pages/backend/Menu";
import BannerList from "../pages/backend/Banner";
import Config from "../pages/backend/Config";

// CRUD Imports for all components
import AddProduct from "../pages/backend/Product/create";
import EditProduct from "../pages/backend/Product/edit";
import ShowProduct from "../pages/backend/Product/show";
import TrashProduct from "../pages/backend/Product/trash";

import AddBanner from "../pages/backend/Banner/create";
import EditBanner from "../pages/backend/Banner/edit";
import ShowBanner from "../pages/backend/Banner/show";
import TrashBanner from "../pages/backend/Banner/trash";

import AddBrand from "../pages/backend/Brands/create";
import EditBrand from "../pages/backend/Brands/edit";
import ShowBrand from "../pages/backend/Brands/show";
import TrashBrand from "../pages/backend/Brands/trash";

import AddCategory from "../pages/backend/Categories/create";
import EditCategory from "../pages/backend/Categories/edit";
import ShowCategory from "../pages/backend/Categories/show";
import TrashCategory from "../pages/backend/Categories/trash";

import EditOrderDetail from "../pages/backend/OrderDetail/edit";
import ShowOrderDetail from "../pages/backend/OrderDetail/show";
import TrashOrderDetail from "../pages/backend/OrderDetail/trash";

import AddPost from "../pages/backend/Posts/create";
import EditPost from "../pages/backend/Posts/edit";
import ShowPost from "../pages/backend/Posts/show";
import TrashPost from "../pages/backend/Posts/trash";

import AddTopic from "../pages/backend/Topics/create";
import EditTopic from "../pages/backend/Topics/edit";
import ShowTopic from "../pages/backend/Topics/show";
import TrashTopic from "../pages/backend/Topics/trash";

import AddUser from "../pages/backend/Users/create";
import EditUser from "../pages/backend/Users/edit";
import ShowUser from "../pages/backend/Users/show";
import TrashUser from "../pages/backend/Users/trash";

import AddOrder from "../pages/backend/Orders/create";
import EditOrder from "../pages/backend/Orders/edit";
import ShowOrder from "../pages/backend/Orders/show";
import TrashOrder from "../pages/backend/Orders/trash";

import AddProductImage from "../pages/backend/ProductImage/create";
import EditProductImage from "../pages/backend/ProductImage/edit";
import ShowProductImage from "../pages/backend/ProductImage/show";
import TrashProductImage from "../pages/backend/ProductImage/trash";

import AddProductSale from "../pages/backend/ProductSale/create";
import EditProductSale from "../pages/backend/ProductSale/edit";
// import ShowProductSale from "../pages/backend/ProductSale/show";
import TrashProductSale from "../pages/backend/ProductSale/trash";

import AddProductStore from "../pages/backend/ProductStore/create";
import EditProductStore from "../pages/backend/ProductStore/edit";
import ShowProductStore from "../pages/backend/ProductStore/show";
import TrashProductStore from "../pages/backend/ProductStore/trash";

// Config CRUD (if needed)
import AddConfig from "../pages/backend/Config/create";
import EditConfig from "../pages/backend/Config/edit";
import ShowConfig from "../pages/backend/Config/show";
import TrashConfig from "../pages/backend/Config/trash";

// Contact CRUD
// import AddContact from "../pages/backend/Contact/create";
import EditContact from "../pages/backend/Contact/edit";
import ShowContact from "../pages/backend/Contact/show";
import TrashContact from "../pages/backend/Contact/trash";

// Menu CRUD
import AddMenu from "../pages/backend/Menu/create";
import EditMenu from "../pages/backend/Menu/edit";
import ShowMenu from "../pages/backend/Menu/show";
import TrashMenu from "../pages/backend/Menu/trash";

import LayoutBackend from "../layouts/backend";

// export default RouterBackend;

import Navbar from "../layouts/backend/navbar";
import Sidebar from "../layouts/backend/sidebar";
import ShowProductSale from "../pages/backend/ProductSale/show";
import Dashboard from "../layouts/backend/dashboard";

// Define your routes with Navbar and Sidebar embedded
const RouterBackend = [
  {
    path: "/admin",
    element: (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-grow">
          <Sidebar />
          <main className="flex-grow p-4 bg-gray-100">
            <LayoutBackend />
          </main>
          <div />
        </div>
      </div>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },

      // Product Routes
      { path: "product", element: <Product /> },
      { path: "product/create", element: <AddProduct /> },
      { path: "product/edit/:id", element: <EditProduct /> },
      { path: "product/show/:id", element: <ShowProduct /> },
      { path: "product/trash", element: <TrashProduct /> },

      // Banner Routes
      { path: "banner", element: <BannerList /> },
      { path: "banner/create", element: <AddBanner /> },
      { path: "banner/edit/:id", element: <EditBanner /> },
      { path: "banner/show/:id", element: <ShowBanner /> },
      { path: "banner/trash", element: <TrashBanner /> },

      // Brands Routes
      { path: "brand", element: <Brands /> },
      { path: "brand/create", element: <AddBrand /> },
      { path: "brand/edit/:id", element: <EditBrand /> },
      { path: "brand/show/:id", element: <ShowBrand /> },
      { path: "brand/trash", element: <TrashBrand /> },

      // Categories Routes
      { path: "categories", element: <Categories /> },
      { path: "category/create", element: <AddCategory /> },
      { path: "category/edit/:id", element: <EditCategory /> },
      { path: "category/show/:id", element: <ShowCategory /> },
      { path: "category/trash", element: <TrashCategory /> },

      // Orders Routes
      { path: "orders", element: <Orders /> },
      { path: "order/create", element: <AddOrder /> },
      { path: "order/edit/:id", element: <EditOrder /> },
      { path: "order/show/:id", element: <ShowOrder /> },
      { path: "order/trash", element: <TrashOrder /> },

      // OrderDetail Routes
      { path: "orderdetail/:id", element: <OrderDetail /> },
      { path: "orderdetail/edit/:id", element: <EditOrderDetail /> },
      { path: "orderdetail/show/:id", element: <ShowOrderDetail /> },
      { path: "orderdetail/trash", element: <TrashOrderDetail /> },

      // Post Routes
      { path: "post", element: <Posts /> },
      { path: "post/create", element: <AddPost /> },
      { path: "post/edit/:id", element: <EditPost /> },
      { path: "post/show/:id", element: <ShowPost /> },
      { path: "post/trash", element: <TrashPost /> },

      // Topic Routes
      { path: "topic", element: <Topics /> },
      { path: "topic/create", element: <AddTopic /> },
      { path: "topic/edit/:id", element: <EditTopic /> },
      { path: "topic/show/:id", element: <ShowTopic /> },
      { path: "topic/trash", element: <TrashTopic /> },

      // User Routes
      { path: "user", element: <Users /> },
      { path: "user/create", element: <AddUser /> },
      { path: "user/edit/:id", element: <EditUser /> },
      { path: "user/show/:id", element: <ShowUser /> },
      { path: "user/trash", element: <TrashUser /> },

      // ProductImage Routes
      { path: "product_image", element: <ProductImage /> },
      { path: "product_image/create", element: <AddProductImage /> },
      { path: "product_image/edit/:id", element: <EditProductImage /> },
      { path: "product_image/show/:id", element: <ShowProductImage /> },
      { path: "product_image/trash", element: <TrashProductImage /> },

      // ProductSale Routes
      { path: "product_sale", element: <ProductSale /> },
      { path: "product_sale/create", element: <AddProductSale /> },
      { path: "product_sale/edit/:id", element: <EditProductSale /> },
      { path: "product_sale/show/:id", element: <ShowProductSale /> },
      { path: "product_sale/trash", element: <TrashProductSale /> },

      // ProductStore Routes
      { path: "product_store", element: <ProductStore /> },
      { path: "product_store/create", element: <AddProductStore /> },
      { path: "product_store/edit/:id", element: <EditProductStore /> },
      { path: "product_store/show/:id", element: <ShowProductStore /> },
      { path: "product_store/trash", element: <TrashProductStore /> },

      // Config Routes
      { path: "config", element: <Config /> },
      { path: "config/create", element: <AddConfig /> },
      { path: "config/edit/:id", element: <EditConfig /> },
      { path: "config/show/:id", element: <ShowConfig /> },
      { path: "config/trash", element: <TrashConfig /> },

      // Contact Routes
      { path: "contact", element: <Contact /> },
      // { path: "contact/create", element: <AddContact /> },
      { path: "contact/edit/:id", element: <EditContact /> },
      { path: "contact/show/:id", element: <ShowContact /> },
      { path: "contact/trash", element: <TrashContact /> },

      // Menu Routes
      { path: "menu", element: <Menu /> },
      { path: "menu/create", element: <AddMenu /> },
      { path: "menu/edit/:id", element: <EditMenu /> },
      { path: "menu/show/:id", element: <ShowMenu /> },
      { path: "menu/trash", element: <TrashMenu /> },
    ],
  },
];

export default RouterBackend;
