import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../../../services/ProductService";
import ProductSaleService from "../../../services/ProductSaleService";
import { Link } from "react-router-dom";
const CreateProductSale = () => {
  const [products, setProducts] = useState([]); // State for product list
  const [product_id, setProductId] = useState(""); // State for selected product ID
  const [price_sale, setPriceSale] = useState(""); // State for sale price
  const [date_begin, setDateBegin] = useState(""); // State for sale start date
  const [date_end, setDateEnd] = useState(""); // State for sale end date
  const [error, setError] = useState(""); // State for error handling
  const navigate = useNavigate();

  // Fetch product data when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await ProductService.index();
        setProducts(result.products);
      } catch (err) {
        setError("Failed to load products.");
      }
    };

    fetchProducts();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProductSale = {
        product_id,
        price_sale,
        date_begin,
        date_end,
      };
      const result = await ProductSaleService.store(newProductSale);
      console.log(result);
      navigate("/admin/product_sale"); // Redirect to the product list after successful submission
    } catch (err) {
      setError("Failed to create sale. Please try again.");
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <h1 className="text-3xl font-semibold mb-6">
            Thêm Khuyến mãi Sản phẩm
          </h1>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Product Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Chọn sản phẩm</label>
              <select
                value={product_id}
                onChange={(e) => setProductId(e.target.value)}
                className="border border-gray-300 p-2 w-full"
                required
              >
                <option value="">Chọn sản phẩm</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sale Price */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Giá khuyến mãi</label>
              <input
                type="number"
                value={price_sale}
                onChange={(e) => setPriceSale(e.target.value)}
                className="border border-gray-300 p-2 w-full"
                required
                placeholder="Nhập giá khuyến mãi"
              />
            </div>

            {/* Start Date */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Ngày bắt đầu</label>
              <input
                type="date"
                value={date_begin}
                onChange={(e) => setDateBegin(e.target.value)}
                className="border border-gray-300 p-2 w-full"
                required
              />
            </div>

            {/* End Date */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Ngày kết thúc</label>
              <input
                type="date"
                value={date_end}
                onChange={(e) => setDateEnd(e.target.value)}
                className="border border-gray-300 p-2 w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="btn bg-green-500 text-white py-2 px-4 rounded"
            >
              Thêm Khuyến mãi
            </button>
            <Link
              to="/admin/product_sale"
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

export default CreateProductSale;
