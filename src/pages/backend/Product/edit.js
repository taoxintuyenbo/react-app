// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import ProductService from "../../../services/ProductService";

// const EditProduct = () => {
//   const { id } = useParams(); // Get product ID from URL parameters
//   const [product, setProduct] = useState({
//     brand_id: "",
//     category_id: "",
//     name: "",
//     slug: "",
//     detail: "",
//     price: "",
//     description: "",
//     status: 1,
//   }); // Initialize product with default values
//   const [categories, setCategories] = useState([]); // List of categories
//   const [brands, setBrands] = useState([]); // List of brands
//   const [errors, setErrors] = useState({}); // State for validation errors
//   const [error, setError] = useState(""); // General error state
//   const navigate = useNavigate(); // Initialize useNavigate for navigation

//   // Fetch product, categories, and brands when component mounts
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const result = await ProductService.show(id); // Fetch product data
//         setProduct({
//           ...result.product,
//           brand_id: result.product.brand_id, // Set brand_id directly
//           category_id: result.product.category_id, // Set category_id directly
//         });
//       } catch (err) {
//         setError("Failed to load product data.");
//       }
//     };

//     const fetchCategoriesAndBrands = async () => {
//       try {
//         const categoryResponse = await ProductService.fetchCategories(); // Fetch categories
//         const brandResponse = await ProductService.fetchBrands(); // Fetch brands

//         setCategories(categoryResponse.categories || []);
//         setBrands(brandResponse.brands || []);
//       } catch (err) {
//         setError("Failed to load categories and brands.");
//       }
//     };

//     fetchProduct();
//     fetchCategoriesAndBrands();
//   }, [id]);

//   // Handle input changes for the form fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({
//       ...product,
//       [name]: value,
//     });
//   };

//   // Handle form submission to update the product
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await ProductService.update(id, product); // Update product data
//       navigate("/admin/product"); // Redirect to product list after update
//       window.location.reload(); // Reload the page
//     } catch (err) {
//       if (err.response && err.response.data && err.response.data.errors) {
//         setErrors(err.response.data.errors); // Set validation errors from the server
//       } else {
//         setError("Error updating product. Please try again.");
//       }
//     }
//   };

//   return (
//     <section className="content">
//       <div className="container mx-auto py-6">
//         <h1 className="text-3xl font-semibold mb-4">Chỉnh sửa Sản phẩm</h1>
//         {error && <div className="text-red-500 mb-4">{error}</div>}

//         <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Name */}
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-1" htmlFor="name">
//                   Tên sản phẩm
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={product.name || ""}
//                   onChange={handleChange}
//                   className={`border border-gray-300 p-2 w-full ${
//                     errors.name ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.name && (
//                   <span className="text-red-500 text-sm">{errors.name}</span>
//                 )}
//               </div>

//               {/* Price */}
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-1" htmlFor="price">
//                   Giá
//                 </label>
//                 <input
//                   type="number"
//                   id="price"
//                   name="price"
//                   value={product.price || ""}
//                   onChange={handleChange}
//                   className={`border border-gray-300 p-2 w-full ${
//                     errors.price ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.price && (
//                   <span className="text-red-500 text-sm">{errors.price}</span>
//                 )}
//               </div>

//               {/* Detail */}
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-1" htmlFor="detail">
//                   Chi tiết
//                 </label>
//                 <input
//                   type="text"
//                   id="detail"
//                   name="detail"
//                   value={product.detail || ""}
//                   onChange={handleChange}
//                   className={`border border-gray-300 p-2 w-full ${
//                     errors.detail ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.detail && (
//                   <span className="text-red-500 text-sm">{errors.detail}</span>
//                 )}
//               </div>
//               {/* Category Dropdown */}
//               <div className="mb-4">
//                 <label
//                   className="block text-gray-700 mb-1"
//                   htmlFor="category_id"
//                 >
//                   Danh mục
//                 </label>
//                 <select
//                   id="category_id"
//                   name="category_id"
//                   value={product.category_id || ""}
//                   onChange={handleChange}
//                   className={`border border-gray-300 p-2 w-full ${
//                     errors.category_id ? "border-red-500" : ""
//                   }`}
//                 >
//                   <option value="">Chọn Danh mục</option>
//                   {categories.map((category) => (
//                     <option key={category.id} value={category.id}>
//                       {category.name}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.category_id && (
//                   <span className="text-red-500 text-sm">
//                     {errors.category_id}
//                   </span>
//                 )}
//               </div>

//               {/* Brand Dropdown */}
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-1" htmlFor="brand_id">
//                   Thương hiệu
//                 </label>
//                 <select
//                   id="brand_id"
//                   name="brand_id"
//                   value={product.brand_id || ""}
//                   onChange={handleChange}
//                   className={`border border-gray-300 p-2 w-full ${
//                     errors.brand_id ? "border-red-500" : ""
//                   }`}
//                 >
//                   <option value="">Chọn Thương hiệu</option>
//                   {brands.map((brand) => (
//                     <option key={brand.id} value={brand.id}>
//                       {brand.name}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.brand_id && (
//                   <span className="text-red-500 text-sm">
//                     {errors.brand_id}
//                   </span>
//                 )}
//               </div>

//               {/* Status */}
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-1">Trạng thái</label>
//                 <select
//                   name="status"
//                   value={product.status}
//                   onChange={handleChange}
//                   className="border border-gray-300 p-2 w-full"
//                 >
//                   <option value={1}>Hiển thị</option>
//                   <option value={2}>Ẩn</option>
//                 </select>
//               </div>
//             </div>
//             {/* Description */}
//             <div className="mb-4 md:col-span-2">
//               <label className="block text-gray-700 mb-1" htmlFor="description">
//                 Mô tả
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={product.description || ""}
//                 onChange={handleChange}
//                 className={`border border-gray-300 p-2 w-full ${
//                   errors.description ? "border-red-500" : ""
//                 }`}
//               />
//               {errors.description && (
//                 <span className="text-red-500 text-sm">
//                   {errors.description}
//                 </span>
//               )}
//             </div>
//             <button
//               type="submit"
//               className="btn bg-green-500 text-white py-2 px-4 rounded mt-4"
//             >
//               Cập nhật Sản phẩm
//             </button>
//             <Link
//               to="/admin/product"
//               className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block mx-3"
//             >
//               Quay lại
//             </Link>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EditProduct;
import ProductImageService from "../../../services/ProductImageService";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ProductService from "../../../services/ProductService";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    brand_id: "",
    category_id: "",
    name: "",
    slug: "",
    detail: "",
    price: "",
    description: "",
    status: 1,
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [existingThumbnails, setExistingThumbnails] = useState([]);
  const [newThumbnails, setNewThumbnails] = useState([]);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  // Fetch product, categories, and brands
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await ProductService.show(id);
        const categoriesResponse = await ProductService.fetchCategories();
        const brandsResponse = await ProductService.fetchBrands();
        console.log("productResponse", productResponse);
        setProduct({
          ...productResponse.product,
          brand_id: productResponse.product.brand_id,
          category_id: productResponse.product.category_id,
        });
        setExistingThumbnails(productResponse.product.images || []);
        setCategories(categoriesResponse.categories || []);
        setBrands(brandsResponse.brands || []);
      } catch (err) {
        setError("Failed to load data.");
      }
    };

    fetchData();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle new image uploads
  const handleNewImagesChange = (e) => {
    setNewThumbnails([...e.target.files]);
  };

  const deleteProductImage = async (imageId) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa hình ảnh này?");

    if (confirmed) {
      try {
        await ProductImageService.destroy(imageId); // Call delete API
        // Update existing thumbnails in the UI
        setExistingThumbnails((prevImages) =>
          prevImages.filter((image) => image.id !== imageId)
        );
      } catch (error) {
        console.error("Error deleting product image:", error);
      }
    }
  };

  // Remove a new image with confirmation
  const handleRemoveNewImage = (index) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa hình ảnh mới này không?")) {
      setNewThumbnails(newThumbnails.filter((_, i) => i !== index));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("detail", product.detail);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("category_id", product.category_id);
    formData.append("brand_id", product.brand_id);
    formData.append("status", product.status);

    // Append new images
    newThumbnails.forEach((file) => {
      formData.append("thumbnail[]", file);
    });

    try {
      const respone = await ProductService.update(id, formData);
      console.log(respone);
      navigate("/admin/product");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        setError("Error updating product. Please try again.");
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Chỉnh sửa Sản phẩm</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Name */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="name">
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={product.name || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>

              {/* Price */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="price">
                  Giá
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={product.price || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.price ? "border-red-500" : ""
                  }`}
                />
                {errors.price && (
                  <span className="text-red-500 text-sm">{errors.price}</span>
                )}
              </div>

              {/* Detail */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="detail">
                  Chi tiết
                </label>
                <input
                  type="text"
                  id="detail"
                  name="detail"
                  value={product.detail || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.detail ? "border-red-500" : ""
                  }`}
                />
                {errors.detail && (
                  <span className="text-red-500 text-sm">{errors.detail}</span>
                )}
              </div>

              {/* Category Dropdown */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-1"
                  htmlFor="category_id"
                >
                  Danh mục
                </label>
                <select
                  id="category_id"
                  name="category_id"
                  value={product.category_id || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.category_id ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Chọn Danh mục</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <span className="text-red-500 text-sm">
                    {errors.category_id}
                  </span>
                )}
              </div>

              {/* Brand Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="brand_id">
                  Thương hiệu
                </label>
                <select
                  id="brand_id"
                  name="brand_id"
                  value={product.brand_id || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.brand_id ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Chọn Thương hiệu</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
                {errors.brand_id && (
                  <span className="text-red-500 text-sm">
                    {errors.brand_id}
                  </span>
                )}
              </div>

              {/* Status */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Trạng thái</label>
                <select
                  name="status"
                  value={product.status}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full"
                >
                  <option value={1}>Hiển thị</option>
                  <option value={2}>Ẩn</option>
                </select>
              </div>

              {/* Existing Thumbnails */}
              <div className="mb-4 md:col-span-2">
                <label className="block text-gray-700 mb-1">
                  Hình ảnh hiện có
                </label>
                <div className="flex flex-wrap gap-2">
                  {existingThumbnails.map((thumbnail, index) => (
                    <div key={index} className="relative">
                      <img
                        src={thumbnail.thumbnail}
                        alt={`Existing Thumbnail ${index}`}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => deleteProductImage(thumbnail.id)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* New Thumbnails */}
              <div className="mb-4 md:col-span-2">
                <label className="block text-gray-700 mb-1">
                  Thêm hình ảnh
                </label>

                <input
                  type="file"
                  id="thumbnail"
                  name="thumbnail"
                  multiple
                  onChange={handleNewImagesChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.thumbnail ? "border-red-500" : ""
                  }`}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {Array.from(newThumbnails).map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`New Thumbnail ${index}`}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveNewImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn bg-green-500 text-white py-2 px-4 rounded mt-4"
            >
              Cập nhật Sản phẩm
            </button>
            <Link
              to="/admin/product"
              className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block mx-3"
            >
              Quay lại
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProduct;
