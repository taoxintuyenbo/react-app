import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // For routing and navigation
import ProductSaleService from "../../../services/ProductSaleService"; // Ensure this path is correct
import ProductService from "../../../services/ProductService"; // To fetch available products

const EditProductSale = () => {
  const { id } = useParams(); // Get product sale ID from URL parameters
  const [productSale, setProductSale] = useState({
    product_id: "",
    price_sale: "",
    date_begin: "",
    date_end: "",
    status: 1,
  });
  const [products, setProducts] = useState([]); // To populate product options
  const [errors, setErrors] = useState({}); // For validation errors
  const [error, setError] = useState(""); // General error message
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Utility function to format dates for input fields
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Format as "YYYY-MM-DD"
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const saleResult = await ProductSaleService.show(id); // Fetch product sale details
        setProductSale({
          product_id: saleResult.product_sale.product_id,
          price_sale: saleResult.product_sale.price_sale,
          date_begin: formatDateForInput(saleResult.product_sale.date_begin),
          date_end: formatDateForInput(saleResult.product_sale.date_end),
          status: saleResult.product_sale.status,
        });

        const productsResult = await ProductService.index(); // Fetch available products
        setProducts(productsResult.products);
      } catch (err) {
        setError("Failed to load product sale data.");
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductSale({
      ...productSale,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ProductSaleService.update(id, productSale); // Update product sale
      navigate("/admin/product_sale"); // Redirect to product sale list after successful update
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors); // Handle validation errors
      } else {
        setError("Error updating product sale. Please try again.");
        console.error("Update error:", err);
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">
          Chỉnh sửa Chương trình Khuyến mãi
        </h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product ID */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="product_id">
                Sản phẩm
              </label>
              <select
                id="product_id"
                name="product_id"
                value={productSale.product_id}
                onChange={handleChange}
                required
                disabled
                className="border border-gray-300 p-2 w-full"
              >
                <option value="">-- Chọn sản phẩm --</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} (ID: {product.id})
                  </option>
                ))}
              </select>
              {errors.product_id && (
                <span className="text-red-500 text-sm">
                  {errors.product_id}
                </span>
              )}
            </div>

            {/* Price Sale */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="price_sale">
                Giá Khuyến mãi (VNĐ)
              </label>
              <input
                type="number"
                id="price_sale"
                name="price_sale"
                value={productSale.price_sale}
                onChange={handleChange}
                required
                className={`border border-gray-300 p-2 w-full ${
                  errors.price_sale ? "border-red-500" : ""
                }`}
                placeholder="Nhập giá khuyến mãi"
                min="0"
              />
              {errors.price_sale && (
                <span className="text-red-500 text-sm">
                  {errors.price_sale}
                </span>
              )}
            </div>

            {/* Date Begin */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="date_begin">
                Ngày Bắt đầu
              </label>
              <input
                type="date"
                id="date_begin"
                name="date_begin"
                value={productSale.date_begin}
                onChange={handleChange}
                required
                className={`border border-gray-300 p-2 w-full ${
                  errors.date_begin ? "border-red-500" : ""
                }`}
              />
              {errors.date_begin && (
                <span className="text-red-500 text-sm">
                  {errors.date_begin}
                </span>
              )}
            </div>

            {/* Date End */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="date_end">
                Ngày Kết thúc
              </label>
              <input
                type="date"
                id="date_end"
                name="date_end"
                value={productSale.date_end}
                onChange={handleChange}
                required
                className={`border border-gray-300 p-2 w-full ${
                  errors.date_end ? "border-red-500" : ""
                }`}
              />
              {errors.date_end && (
                <span className="text-red-500 text-sm">{errors.date_end}</span>
              )}
            </div>

            {/* Status */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Trạng thái</label>
              <select
                name="status"
                value={productSale.status}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              >
                <option value={1}>Hiển thị</option>
                <option value={2}>Ẩn</option>
              </select>
              {errors.status && (
                <span className="text-red-500 text-sm">{errors.status}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn bg-yellow-500 text-white py-2 px-4 rounded"
          >
            Cập nhật Khuyến mãi
          </button>
          <Link
            to="/admin/product_sale"
            className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block mx-3"
          >
            Quay lại
          </Link>
        </form>
      </div>
    </section>
  );
};

export default EditProductSale;
