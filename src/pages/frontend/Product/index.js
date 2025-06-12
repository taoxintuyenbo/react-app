// import React, { useState, useEffect } from "react";
// import ProductService from "../../../services/ProductService";
// import { Slider } from "@mui/material";
// import GridViewIcon from "@mui/icons-material/GridView";
// import ListIcon from "@mui/icons-material/List";
// import ProductCard from "../../../components/ProductCard";
// import ProductCardListView from "../../../components/ProductCardListView";

// const AllProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [filters, setFilters] = useState({
//     categoryId: [],
//     brandId: [],
//     priceRange: [0, 999999],
//   });
//   const [sort, setSort] = useState("price_asc");
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [viewMode, setViewMode] = useState("grid");

//   const [showAllCategories, setShowAllCategories] = useState(false);
//   const [showAllBrands, setShowAllBrands] = useState(false);

//   const maxItemsToShow = 5; // Limit for initial display

//   useEffect(() => {
//     const fetchCategoriesAndBrands = async () => {
//       try {
//         const categoryResponse = await ProductService.fetchCategories();
//         const brandResponse = await ProductService.fetchBrands();
//         setCategories(categoryResponse.categories || []);
//         setBrands(brandResponse.brands || []);
//       } catch (err) {
//         setError("Failed to load categories and brands.");
//       }
//     };
//     fetchCategoriesAndBrands();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const { categoryId, brandId, priceRange } = filters;
//       const [priceMin, priceMax] = priceRange;
//       const response = await ProductService.allProducts({
//         categoryId,
//         brandId,
//         priceMin,
//         priceMax,
//         page: currentPage,
//         sort,
//       });

//       if (response && response.products) {
//         setProducts(response.products.data);
//         setTotalPages(response.products.last_page);
//       } else {
//         setProducts([]);
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setError("Failed to fetch products");
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [filters, sort, currentPage]);

//   const handleFilterChange = (filterType, value) => {
//     setFilters((prevFilters) => {
//       if (filterType === "categoryId" || filterType === "brandId") {
//         const newValue = prevFilters[filterType].includes(value)
//           ? prevFilters[filterType].filter((id) => id !== value)
//           : [...prevFilters[filterType], value];
//         return { ...prevFilters, [filterType]: newValue };
//       }
//       return { ...prevFilters, [filterType]: value };
//     });
//     setCurrentPage(1);
//   };

//   const handleSortChange = (e) => {
//     setSort(e.target.value);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handlePriceRangeChange = (event, newValue) => {
//     handleFilterChange("priceRange", newValue);
//   };

//   const toggleViewMode = () => {
//     setViewMode(viewMode === "grid" ? "list" : "grid");
//   };

//   const maxPagesToShow = 5;
//   const startPage = Math.max(
//     1,
//     Math.min(
//       currentPage - Math.floor(maxPagesToShow / 2),
//       totalPages - maxPagesToShow + 1
//     )
//   );
//   const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

//   return (
//     <div className="container mx-auto my-8">
//       <h1 className="text-center text-2xl font-bold mt-4 mb-8">All Products</h1>
//       {error && <p className="text-center text-red-500">{error}</p>}

//       <div className="flex justify-end mb-4">
//         <label className="block">
//           Sort By:
//           <select
//             name="sort"
//             value={sort}
//             onChange={handleSortChange}
//             className="border rounded px-3 py-2 ml-2"
//           >
//             <option value="newest">Newest</option>
//             <option value="price_asc">Price: Low to High</option>
//             <option value="price_desc">Price: High to Low</option>
//             <option value="bestseller">Bestseller</option>
//           </select>
//         </label>
//         <button onClick={toggleViewMode} className="px-2">
//           {viewMode === "grid" ? (
//             <ListIcon fontSize="large" className="text-blue-500" />
//           ) : (
//             <GridViewIcon fontSize="large" className="text-blue-500" />
//           )}
//         </button>
//       </div>

//       <div className="flex">
//         <div className="w-1/4 border-r pr-4">
//           <h2 className="text-lg font-semibold mb-4">Categories</h2>
//           <ul className="space-y-2">
//             {(showAllCategories
//               ? categories
//               : categories.slice(0, maxItemsToShow)
//             ).map((category) => (
//               <li
//                 key={category.id}
//                 className={`cursor-pointer p-2 rounded ${
//                   filters.categoryId.includes(category.id)
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-100"
//                 }`}
//                 onClick={() => handleFilterChange("categoryId", category.id)}
//               >
//                 {category.name}
//               </li>
//             ))}
//           </ul>
//           {categories.length > maxItemsToShow && (
//             <button
//               className="mt-2 text-orange-500 font-bold text-center"
//               onClick={() => setShowAllCategories(!showAllCategories)}
//             >
//               {showAllCategories ? "Ẩn" : "Xem thêm"}
//             </button>
//           )}

//           <h2 className="text-lg font-semibold mt-8 mb-4">Brands</h2>
//           <ul className="space-y-2">
//             {(showAllBrands ? brands : brands.slice(0, maxItemsToShow)).map(
//               (brand) => (
//                 <li
//                   key={brand.id}
//                   className={`cursor-pointer p-2 rounded ${
//                     filters.brandId.includes(brand.id)
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-100"
//                   }`}
//                   onClick={() => handleFilterChange("brandId", brand.id)}
//                 >
//                   {brand.name}
//                 </li>
//               )
//             )}
//           </ul>
//           {brands.length > maxItemsToShow && (
//             <button
//               className="mt-2 text-orange-500 font-bold text-center"
//               onClick={() => setShowAllBrands(!showAllBrands)}
//             >
//               {showAllBrands ? "Ẩn" : "Xem thêm"}
//             </button>
//           )}

//           <h2 className="text-lg font-semibold mt-8 mb-4">Price Range</h2>
//           <Slider
//             value={filters.priceRange}
//             onChange={handlePriceRangeChange}
//             valueLabelDisplay="auto"
//             min={0}
//             max={999999}
//           />
//           <div className="flex justify-between text-sm mt-2">
//             <span>{filters.priceRange[0].toLocaleString()} VND</span>
//             <span>{filters.priceRange[1].toLocaleString()} VND</span>
//           </div>
//         </div>

//         <div className="w-3/4 pl-4">
//           <div
//             className={
//               viewMode === "grid"
//                 ? "products-grid grid grid-cols-2 md:grid-cols-3 gap-8"
//                 : "products-list space-y-4"
//             }
//           >
//             {products.length > 0 ? (
//               products.map((product) =>
//                 viewMode === "grid" ? (
//                   <ProductCard key={product.id} product={product} />
//                 ) : (
//                   <ProductCardListView key={product.id} product={product} />
//                 )
//               )
//             ) : (
//               <p className="text-center col-span-full text-red-500">
//                 No products found.
//               </p>
//             )}
//           </div>

//           <div className="pagination mt-8 flex justify-center space-x-2">
//             <button
//               className="px-4 py-2 border rounded bg-gray-200"
//               disabled={currentPage === 1}
//               onClick={() => handlePageChange(currentPage - 1)}
//             >
//               Back
//             </button>

//             {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
//               <button
//                 key={startPage + index}
//                 className={`px-4 py-2 border rounded ${
//                   currentPage === startPage + index
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-200"
//                 }`}
//                 onClick={() => handlePageChange(startPage + index)}
//               >
//                 {startPage + index}
//               </button>
//             ))}

//             <button
//               className="px-4 py-2 border rounded bg-gray-200"
//               disabled={currentPage === totalPages}
//               onClick={() => handlePageChange(currentPage + 1)}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllProducts;
import React, { useState, useEffect } from "react";
import ProductService from "../../../services/ProductService";
import { Slider } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";
import ProductCard from "../../../components/ProductCard";
import ProductCardListView from "../../../components/ProductCardListView";

const TatCaSanPham = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({
    categoryId: [],
    brandId: [],
    priceRange: [0, 999999],
  });
  const [sort, setSort] = useState("price_asc");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState("grid");

  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const maxItemsToShow = 5; // Giới hạn số mục hiển thị ban đầu

  useEffect(() => {
    const fetchCategoriesAndBrands = async () => {
      try {
        const categoryResponse = await ProductService.fetchCategories();
        const brandResponse = await ProductService.fetchBrands();
        setCategories(categoryResponse.categories || []);
        setBrands(brandResponse.brands || []);
      } catch (err) {
        setError("Không thể tải danh mục và thương hiệu.");
      }
    };
    fetchCategoriesAndBrands();
  }, []);

  const fetchProducts = async () => {
    try {
      const { categoryId, brandId, priceRange } = filters;
      const [priceMin, priceMax] = priceRange;
      const response = await ProductService.allProducts({
        categoryId,
        brandId,
        priceMin,
        priceMax,
        page: currentPage,
        sort,
      });

      if (response && response.products) {
        setProducts(response.products.data);
        setTotalPages(response.products.last_page);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Lỗi tải sản phẩm:", error);
      setError("Không thể tải sản phẩm.");
    }
  };

  // useEffect(() => {
  //   fetchProducts();
  // }, [filters, sort, currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [filters, sort, currentPage, fetchProducts]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      if (filterType === "categoryId" || filterType === "brandId") {
        const newValue = prevFilters[filterType].includes(value)
          ? prevFilters[filterType].filter((id) => id !== value)
          : [...prevFilters[filterType], value];
        return { ...prevFilters, [filterType]: newValue };
      }
      return { ...prevFilters, [filterType]: value };
    });
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePriceRangeChange = (event, newValue) => {
    handleFilterChange("priceRange", newValue);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  const maxPagesToShow = 5;
  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(maxPagesToShow / 2),
      totalPages - maxPagesToShow + 1
    )
  );
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-center text-2xl font-bold mt-4 mb-8">
        Tất Cả Sản Phẩm
      </h1>
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="flex justify-end mb-4">
        <label className="block">
          Sắp xếp theo:
          <select
            name="sort"
            value={sort}
            onChange={handleSortChange}
            className="border rounded px-3 py-2 ml-2"
          >
            <option value="newest">Mới nhất</option>
            <option value="price_asc">Giá: Thấp đến Cao</option>
            <option value="price_desc">Giá: Cao đến Thấp</option>
            <option value="bestseller">Bán chạy nhất</option>
          </select>
        </label>
        <button onClick={toggleViewMode} className="px-2">
          {viewMode === "grid" ? (
            <ListIcon fontSize="large" className="text-blue-500" />
          ) : (
            <GridViewIcon fontSize="large" className="text-blue-500" />
          )}
        </button>
      </div>

      <div className="flex">
        <div className="w-1/4 border-r pr-4">
          <h2 className="text-lg font-semibold mb-4">Danh Mục</h2>
          <ul className="space-y-2">
            {(showAllCategories
              ? categories
              : categories.slice(0, maxItemsToShow)
            ).map((category) => (
              <li
                key={category.id}
                className={`cursor-pointer p-2 rounded ${
                  filters.categoryId.includes(category.id)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => handleFilterChange("categoryId", category.id)}
              >
                {category.name}
              </li>
            ))}
          </ul>
          {categories.length > maxItemsToShow && (
            <button
              className="mt-2 text-orange-500 font-bold text-center"
              onClick={() => setShowAllCategories(!showAllCategories)}
            >
              {showAllCategories ? "Ẩn" : "Xem thêm"}
            </button>
          )}

          <h2 className="text-lg font-semibold mt-8 mb-4">Thương Hiệu</h2>
          <ul className="space-y-2">
            {(showAllBrands ? brands : brands.slice(0, maxItemsToShow)).map(
              (brand) => (
                <li
                  key={brand.id}
                  className={`cursor-pointer p-2 rounded ${
                    filters.brandId.includes(brand.id)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  }`}
                  onClick={() => handleFilterChange("brandId", brand.id)}
                >
                  {brand.name}
                </li>
              )
            )}
          </ul>
          {brands.length > maxItemsToShow && (
            <button
              className="mt-2 text-orange-500 font-bold text-center"
              onClick={() => setShowAllBrands(!showAllBrands)}
            >
              {showAllBrands ? "Ẩn" : "Xem thêm"}
            </button>
          )}

          <h2 className="text-lg font-semibold mt-8 mb-4">Khoảng Giá</h2>
          <Slider
            value={filters.priceRange}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={999999}
          />
          <div className="flex justify-between text-sm mt-2">
            <span>{filters.priceRange[0].toLocaleString()} VND</span>
            <span>{filters.priceRange[1].toLocaleString()} VND</span>
          </div>
        </div>

        <div className="w-3/4 pl-4">
          <div
            className={
              viewMode === "grid"
                ? "products-grid grid grid-cols-2 md:grid-cols-3 gap-8"
                : "products-list space-y-4"
            }
          >
            {products.length > 0 ? (
              products.map((product) =>
                viewMode === "grid" ? (
                  <ProductCard key={product.id} product={product} />
                ) : (
                  <ProductCardListView key={product.id} product={product} />
                )
              )
            ) : (
              <p className="text-center col-span-full text-red-500">
                Không tìm thấy sản phẩm nào.
              </p>
            )}
          </div>

          <div className="pagination mt-8 flex justify-center space-x-2">
            <button
              className="px-4 py-2 border rounded bg-gray-200"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Trước
            </button>

            {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
              <button
                key={startPage + index}
                className={`px-4 py-2 border rounded ${
                  currentPage === startPage + index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handlePageChange(startPage + index)}
              >
                {startPage + index}
              </button>
            ))}

            <button
              className="px-4 py-2 border rounded bg-gray-200"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Tiếp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TatCaSanPham;
