import React from "react";
import productImage from "./assets/images/hoa-ly-do.png";
import Carousel from "./components/Carousel";
const App = () => {
  return (
    <div>
      {/* Header */}
      <header className="bg-orange-500 p-4 w-full z-10">
        <nav className="border-gray-200 py-2.5">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
            {/* Logo */}
            <a href="#" className="flex items-center">
              <img
                src="./images/logo.jpg"
                className="h-10 mr-3"
                alt="Shop Logo"
              />
              <span className="self-center text-2xl font-bold text-white">
                Shop
              </span>
            </a>

            {/* Search Form */}
            <form className="flex flex-grow mx-4 mb-4">
              <input
                type="text"
                placeholder="Search for products..."
                className="px-4 py-2 rounded-l-lg w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white text-blue-500 rounded-r-lg border border-gray-300 hover:bg-blue-100"
              >
                Search
              </button>
            </form>

            {/* Cart Icon */}
            <div className="flex items-center space-x-4">
              <a href="#cart" className="relative">
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
                {/* Cart Item Count */}
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs">
                  3
                </span>
              </a>

              {/* Log In / Sign Up */}
              <div className="flex items-center lg:order-2">
                <a
                  href="#"
                  className="text-gray-800 dark:text-white hover:bg-yellow-400 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Log in
                </a>
                <a
                  href="#"
                  className="text-white hover:bg-yellow-400 rounded-lg text-sm px-4 py-2 ml-2"
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div
            className="flex items-center justify-center w-full lg:w-auto lg:order-1"
            id="mobile-menu-2 "
          >
            <ul className="flex flex-col mt-4 font-medium text-lg lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-white hover:text-black "
                >
                  Company
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-white hover:text-black"
                >
                  Marketplace
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-white hover:text-black"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-white hover:text-black"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-white hover:text-black"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <Carousel />
      {/* Slider */}

      {/* Product Grid */}
      <main className="container mx-auto py-8">
        <h1 className="text-center text-2xl uppercase mb-8">New Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Product 1 */}
          <div className="border group">
            <div className="relative overflow-hidden">
              <img
                className="w-full transition-all duration-700 hover:scale-110"
                src={productImage}
                alt="Product 1"
              />
            </div>
            <h2 className="text-lg font-semibold text-center mt-4">
              Product 1
            </h2>
            <div className="text-center text-gray-500">Price: $99.99</div>
          </div>

          {/* Product 2 */}
          <div className="border group">
            <div className="relative overflow-hidden">
              <img
                className="w-full transition-all duration-700 hover:scale-110"
                src={productImage}
                alt="Product 2"
              />
            </div>
            <h2 className="text-lg font-semibold text-center mt-4">
              Product 2
            </h2>
            <div className="text-center text-gray-500">Price: $79.99</div>
          </div>

          {/* Product 3 */}
          <div className="border group">
            <div className="relative overflow-hidden">
              <img
                className="w-full transition-all duration-700 hover:scale-110"
                src={productImage}
                alt="Product 3"
              />
            </div>
            <h2 className="text-lg font-semibold text-center mt-4">
              Product 3
            </h2>
            <div className="text-center text-gray-500">Price: $89.99</div>
          </div>

          {/* Product 4 */}
          <div className="border group">
            <div className="relative overflow-hidden">
              <img
                className="w-full transition-all duration-700 hover:scale-110"
                src={productImage}
                alt="Product 4"
              />
            </div>
            <h2 className="text-lg font-semibold text-center mt-4">
              Product 4
            </h2>
            <div className="text-center text-gray-500">Price: $69.99</div>
          </div>

          {/* Product 5 */}
          <div className="border group">
            <div className="relative overflow-hidden">
              <img
                className="w-full transition-all duration-700 hover:scale-110"
                src={productImage}
                alt="Product 5"
              />
            </div>
            <h2 className="text-lg font-semibold text-center mt-4">
              Product 5
            </h2>
            <div className="text-center text-gray-500">Price: $59.99</div>
          </div>

          {/* Product 6 */}
          <div className="border group">
            <div className="relative overflow-hidden">
              <img
                className="w-full transition-all duration-700 hover:scale-110"
                src={productImage}
                alt="Product 6"
              />
            </div>
            <h2 className="text-lg font-semibold text-center mt-4">
              Product 6
            </h2>
            <div className="text-center text-gray-500">Price: $49.99</div>
          </div>

          {/* Product 7 */}
          <div className="border group">
            <div className="relative overflow-hidden">
              <img
                className="w-full transition-all duration-700 hover:scale-110"
                src={productImage}
                alt="Product 7"
              />
            </div>
            <h2 className="text-lg font-semibold text-center mt-4">
              Product 7
            </h2>
            <div className="text-center text-gray-500">Price: $109.99</div>
          </div>

          {/* Product 8 */}
          <div className="border group">
            <div className="relative overflow-hidden">
              <img
                className="w-full transition-all duration-700 hover:scale-110"
                src={productImage}
                alt="Product 8"
              />
            </div>
            <h2 className="text-lg font-semibold text-center mt-4">
              Product 8
            </h2>
            <div className="text-center text-gray-500">Price: $119.99</div>
          </div>
        </div>

        <h1 className="text-center text-2xl uppercase mb-8">Sale Products</h1>

        {/* Product List */}
        <ul className="space-y-6">
          {/* Product 1 */}
          <li className="flex items-center border rounded-lg p-4">
            <img
              className="w-24 h-24 object-cover mr-4 transition-transform duration-700 hover:scale-110"
              src={productImage}
              alt="Product 1"
            />
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">Product 1</h2>
              <p className="text-gray-500">Price: $99.99</p>
            </div>
          </li>

          {/* Product 2 */}
          <li className="flex items-center border rounded-lg p-4">
            <img
              className="w-24 h-24 object-cover mr-4 transition-transform duration-700 hover:scale-110"
              src={productImage}
              alt="Product 2"
            />
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">Product 2</h2>
              <p className="text-gray-500">Price: $79.99</p>
            </div>
          </li>

          {/* Product 3 */}
          <li className="flex items-center border rounded-lg p-4">
            <img
              className="w-24 h-24 object-cover mr-4 transition-transform duration-700 hover:scale-110"
              src={productImage}
              alt="Product 3"
            />
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">Product 3</h2>
              <p className="text-gray-500">Price: $89.99</p>
            </div>
          </li>

          {/* Product 4 */}
          <li className="flex items-center border rounded-lg p-4">
            <img
              className="w-24 h-24 object-cover mr-4 transition-transform duration-700 hover:scale-110"
              src={productImage}
              alt="Product 4"
            />
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">Product 4</h2>
              <p className="text-gray-500">Price: $69.99</p>
            </div>
          </li>

          {/* Product 5 */}
          <li className="flex items-center border rounded-lg p-4">
            <img
              className="w-24 h-24 object-cover mr-4 transition-transform duration-700 hover:scale-110"
              src={productImage}
              alt="Product 5"
            />
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">Product 5</h2>
              <p className="text-gray-500">Price: $59.99</p>
            </div>
          </li>

          {/* Product 6 */}
        </ul>

        <h1 className="text-center text-2xl uppercase mb-8">
          Recommend Products
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Product 1 */}
          <div className="border group">
            <div className="relative overflow-hidden">
              <img
                className="w-full transition-all duration-700 hover:scale-110"
                src={productImage}
                alt="Product 1"
              />
            </div>
            <h2 className="text-lg font-semibold text-center mt-4">
              Product 1
            </h2>
            <div className="text-center text-gray-500">Price: $99.99</div>
          </div>

          {/* Product 2 */}
          <div className="border group">
            <div className="relative overflow-hidden">
              <img
                className="w-full transition-all duration-700 hover:scale-110"
                src={productImage}
                alt="Product 2"
              />
            </div>
            <h2 className="text-lg font-semibold text-center mt-4">
              Product 2
            </h2>
            <div className="text-center text-gray-500">Price: $79.99</div>
          </div>

          {/* Product 3 */}
          <div className="border group">
            <div className="relative overflow-hidden">
              <img
                className="w-full transition-all duration-700 hover:scale-110"
                src={productImage}
                alt="Product 3"
              />
            </div>
            <h2 className="text-lg font-semibold text-center mt-4">
              Product 3
            </h2>
            <div className="text-center text-gray-500">Price: $89.99</div>
          </div>

          {/* Product 4 */}
          <div className="border group">
            <div className="relative overflow-hidden">
              <img
                className="w-full transition-all duration-700 hover:scale-110"
                src={productImage}
                alt="Product 4"
              />
            </div>
            <h2 className="text-lg font-semibold text-center mt-4">
              Product 4
            </h2>
            <div className="text-center text-gray-500">Price: $69.99</div>
          </div>
        </div>
        <section className="my-12">
          <h1 className="text-center text-2xl uppercase mb-8">
            Latest Articles
          </h1>
          <ul className="space-y-6">
            {/* Article 1 */}
            <li className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">
                How to Choose the Right Product for Your Needs
              </h2>
              <p className="text-gray-600 mb-4">
                When choosing a product, there are a few factors to consider. In
                this article, we’ll break down the most important things to keep
                in mind when making a purchase...
              </p>
              <a href="#" className="text-blue-500 hover:underline">
                Read More
              </a>
            </li>

            {/* Article 2 */}
            <li className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">
                5 Tips for Shopping Smart During Sales
              </h2>
              <p className="text-gray-600 mb-4">
                Sales can be overwhelming, but with these simple tips, you can
                make sure you're getting the best deals without sacrificing
                quality. Let's dive into some smart shopping tips...
              </p>
              <a href="#" className="text-blue-500 hover:underline">
                Read More
              </a>
            </li>

            {/* Article 3 */}
            <li className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">
                The Best Products of 2024: A Comprehensive Guide
              </h2>
              <p className="text-gray-600 mb-4">
                We've reviewed the top products of the year, from electronics to
                home goods, to help you find the best deals and most reliable
                items on the market...
              </p>
              <a href="#" className="text-blue-500 hover:underline">
                Read More
              </a>
            </li>

            {/* Article 4 */}
            <li className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">
                Understanding Product Warranties: What to Look For
              </h2>
              <p className="text-gray-600 mb-4">
                A product warranty can give you peace of mind, but not all
                warranties are created equal. In this guide, we explain what to
                look for and how to choose the right warranty for your
                purchase...
              </p>
              <a href="#" className="text-blue-500 hover:underline">
                Read More
              </a>
            </li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer class="bg-gray-900 text-white py-12">
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <h3 class="text-xl font-semibold mb-4">Fashion Xinh</h3>
            <ul class="space-y-2">
              <li>
                <i class="fas fa-map-marker-alt"></i> 168/25 Chế Lan Viên, P.
                Tây Thạnh, Tân Phú, TP HCM
              </li>
              <li>
                <i class="fas fa-phone-alt"></i> 028 710 86717
              </li>
              <li>
                <i class="fas fa-envelope"></i> cskh@thoitrangxinh.net
              </li>
              <li>
                <i class="fas fa-globe"></i> https://thoitrangxinh.net
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-4">LINKS</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline">
                  Spring Summer Dresses
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline">
                  Autumn Winter Dresses
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline">
                  New Party Dresses 2024
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline">
                  Sale OFF Dresses
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline">
                  Xinh Blog
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-4">INFORMATION</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="hover:underline">
                  Shopping Guide
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline">
                  Standard Dress Sizes
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline">
                  Fake Goods Warning
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline">
                  Product Commitment
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline">
                  Return & Exchange Guide
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-4">POLICIES & REGULATIONS</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="hover:underline">
                  Payment Methods
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline">
                  Delivery Methods
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline">
                  Return & Refund
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline">
                  Wholesale Prices Policy
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline">
                  Affiliate Program
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-4">CERTIFICATION</h3>
            <img
              src="https://path-to-certificate-image.jpg"
              alt="Certification"
              class="mx-auto"
            />
          </div>
        </div>

        <div class="container mx-auto mt-8">
          <h3 class="text-xl font-semibold text-white mb-4">MOST SEARCHED</h3>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-gray-700 text-white rounded-lg">
              tummy tuck dress
            </span>
            <span class="px-3 py-1 bg-gray-700 text-white rounded-lg">
              dress for plus size
            </span>
            <span class="px-3 py-1 bg-gray-700 text-white rounded-lg">
              shift dress
            </span>
            <span class="px-3 py-1 bg-gray-700 text-white rounded-lg">
              party dress
            </span>
            <span class="px-3 py-1 bg-gray-700 text-white rounded-lg">
              casual dress
            </span>
            <span class="px-3 py-1 bg-gray-700 text-white rounded-lg">
              flared dress
            </span>
            <span class="px-3 py-1 bg-gray-700 text-white rounded-lg">
              event dress
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
