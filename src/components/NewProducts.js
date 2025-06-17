import React, { useState, useEffect } from "react";
import ProductService from "../services/ProductService";
import ProductCard from "./ProductCard";
const NewProducts = () => {
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const result = await ProductService.getNewProducts(8); // Fetch 8 new products
        setNewProducts(result.products);
        // console.log(result.products);
      } catch (error) {
        console.error("Error fetching new products:", error);
      }
    };
    fetchNewProducts();
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl uppercase mb-8 ">Sản phẩm mới</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {newProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewProducts;
// import React, { useState, useEffect } from "react";
// import ProductService from "../services/ProductService";
// import ProductCard from "./ProductCard";
// import "./ProductList.css"; // Adjust the path according to the location of the file
// import "./SharedAnimations.css"; // Adjust the path according to the location of the file

// const NewProducts = () => {
//   const [newProducts, setNewProducts] = useState([]);

//   useEffect(() => {
//     const fetchNewProducts = async () => {
//       try {
//         const result = await ProductService.getNewProducts(8); // Fetch 8 new products
//         setNewProducts(result.products);
//         // console.log(result.products);
//       } catch (error) {
//         console.error("Error fetching new products:", error);
//       }
//     };
//     fetchNewProducts();
//   }, []);
//   return (
//     <div className="section-container" id="products">
//       <h1 className="section-title">
//         <span className="relative inline-block">
//           Sản phẩm mới
//           <span className="absolute -top-6 -right-6 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center">
//             <svg
//               className="w-3 h-3 text-green-500 mr-1"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
//                 clipRule="evenodd"
//               ></path>
//             </svg>
//             NEW
//           </span>
//         </span>
//       </h1>

//       <div className="products-grid px-2">
//         {newProducts.map((product, index) => {
//           // Add created_at property with recent date to show the "New" badge
//           const date = new Date();
//           const enhancedProduct = {
//             ...product,
//             created_at: date.toISOString(),
//           };
//           return <ProductCard key={product.id} product={enhancedProduct} />;
//         })}
//       </div>

//       <div className="text-center mt-10">
//         <a
//           href="/san-pham"
//           className="cta-button group bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
//         >
//           <span className="flex items-center">
//             Xem tất cả
//             <svg
//               className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M14 5l7 7m0 0l-7 7m7-7H3"
//               ></path>
//             </svg>
//           </span>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default NewProducts;
