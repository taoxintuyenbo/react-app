import React, { useState, useEffect } from "react";
import ProductService from "../services/ProductService";
import ProductCard from "./ProductCard";

const ProductCategoryHome = () => {
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const result = await ProductService.getCategoryHomeProducts(8); // Fetch products based on limit
        console.log(result); // Assuming the response has 'categories' key
        setCategoryProducts(result.categories); // Assuming categories contain products array
      } catch (error) {
        console.error("Error fetching products by category:", error);
      }
    };
    fetchCategoryProducts();
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl uppercase mb-8 mt-8">
        Sản phẩm theo danh mục
      </h1>

      {/* Iterate over each category */}
      {categoryProducts.map((categoryData) => (
        <div key={categoryData.category} className="mb-12">
          <h1 className="text-center text-2xl uppercase mb-8 ">
            {" "}
            {categoryData.category}
          </h1>
          {/* Products Grid for this category */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categoryData.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCategoryHome;
// import React, { useState, useEffect } from "react";
// import ProductService from "../services/ProductService";
// import ProductCard from "./ProductCard";
// import { Link } from "react-router-dom"; // Import Link for navigation

// const ProductCategoryHome = () => {
//   const [categoryProducts, setCategoryProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCategoryProducts = async () => {
//       try {
//         const result = await ProductService.getCategoryHomeProducts(8); // Fetch products based on limit
//         setCategoryProducts(result.categories); // Assuming categories contain products array
//         console.log("Fetched category products:", result.categories);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching products by category:", error);
//         setLoading(false);
//       }
//     };
//     fetchCategoryProducts();
//   }, []);

//   return (
//     <div className="section-container fade-in">
//       <h1 className="section-title">
//         Sản phẩm theo danh mục
//         <span className="hidden md:inline-block ml-2 relative">
//           <span className="absolute w-8 h-1 bg-gradient-to-r from-orange-300 to-orange-100 rounded top-1/2 -right-12"></span>
//           <span className="absolute w-3 h-3 bg-orange-400 rounded-full opacity-60 top-1/2 -right-16 transform -translate-y-1/2"></span>
//         </span>
//       </h1>

//       {/* Loading state */}
//       {loading ? (
//         <div className="text-center py-12">
//           <div className="inline-block w-12 h-12 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
//         </div>
//       ) : (
//         /* Iterate over each category */
//         categoryProducts.map((categoryData) => (
//           <div
//             key={categoryData.category}
//             className="category-section mb-16 fade-in-up"
//           >
//             <div className="category-header flex items-center justify-between mb-6">
//               <h2 className="text-xl md:text-2xl font-bold text-gray-800 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-4 before:h-4 before:bg-gradient-to-r before:from-orange-400 before:to-orange-600 before:rounded-full before:shadow-md">
//                 {categoryData.category}
//               </h2>
//               <Link
//                 to={`/danh-muc/${categoryData.slug || ""}`}
//                 className="view-all text-orange-500 hover:text-orange-700 font-medium flex items-center px-4 py-2 rounded-full bg-orange-50 hover:bg-orange-100 transition-colors duration-300"
//               >
//                 <svg
//                   className="w-4 h-4 ml-1 transition transform group-hover:translate-x-1"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                     clipRule="evenodd"
//                   ></path>
//                 </svg>
//               </Link>
//             </div>
//             {/* Products Grid for this category */}
//             <div className="products-grid relative before:absolute before:-top-6 before:-left-6 before:w-12 before:h-12 before:border-l-2 before:border-t-2 before:border-orange-200 before:rounded-tl-3xl after:absolute after:-bottom-6 after:-right-6 after:w-12 after:h-12 after:border-r-2 after:border-b-2 after:border-orange-200 after:rounded-br-3xl">
//               {categoryData.products.map((product, idx) => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   className={`stagger-item delay-${idx % 8}`}
//                 />
//               ))}
//             </div>

//             {/* Decorative elements */}
//             <div className="absolute -right-4 -top-4 w-20 h-20 bg-orange-50 rounded-full opacity-20 z-0"></div>
//             <div className="absolute -left-6 bottom-12 w-16 h-16 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full opacity-20 z-0"></div>
//           </div>
//         ))
//       )}

//       {/* Empty state */}
//       {!loading && categoryProducts.length === 0 && (
//         <div className="text-center py-12">
//           <div className="mb-4">
//             <svg
//               className="w-16 h-16 mx-auto text-orange-200"
//               fill="currentColor"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//             >
//               <path d="M4 6H2V20C2 21.1046 2.89543 22 4 22H18V20H4V6Z" />
//               <path d="M20 2H8C6.89543 2 6 2.89543 6 4V16C6 17.1046 6.89543 18 8 18H20C21.1046 18 22 17.1046 22 16V4C22 2.89543 21.1046 2 20 2ZM20 16H8V4H20V16ZM15 6H13V13H15V6ZM11 9H9V13H11V9Z" />
//             </svg>
//           </div>
//           <h3 className="text-xl font-bold text-gray-600 mb-2">
//             Không tìm thấy sản phẩm
//           </h3>
//           <p className="text-gray-500">
//             Hiện chưa có sản phẩm nào trong danh mục này.
//           </p>
//         </div>
//       )}

//       {/* Decorative bottom line */}
//       <div className="relative mt-16 mb-8">
//         <div className="absolute left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
//         <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-4 h-4 bg-white border-2 border-orange-200 rounded-full"></div>
//       </div>
//     </div>
//   );
// };

// export default ProductCategoryHome;
