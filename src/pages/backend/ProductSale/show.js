import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductSaleService from "../../../services/ProductSaleService"; // Ensure this path is correct
import { FaArrowLeft } from "react-icons/fa";

const ShowProductSale = () => {
  const { id } = useParams(); // Get product sale ID from URL parameters
  const [productSale, setProductSale] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductSale = async () => {
      try {
        const result = await ProductSaleService.show(id); // Fetch product sale details
        setProductSale(result.product_sale);
      } catch (err) {
        setError("Failed to load product sale data.");
        console.error("Fetch error:", err);
      }
    };

    fetchProductSale();
  }, [id]);

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">
          Chi tiết Khuyến mãi Sản phẩm
        </h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <h2 className="text-xl font-bold mb-4">
            Thông tin Khuyến mãi Sản phẩm
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p>
                <strong>ID:</strong> {productSale.id}
              </p>
              <p>
                <strong>Sản phẩm:</strong> {productSale.product_name}
              </p>
              <p>
                <strong>Giá khuyến mãi:</strong> {productSale.price_sale} VNĐ
              </p>
            </div>

            <div>
              <p>
                <strong>Ngày bắt đầu:</strong>{" "}
                {new Date(productSale.date_begin).toLocaleDateString()}
              </p>
              <p>
                <strong>Ngày kết thúc:</strong>{" "}
                {new Date(productSale.date_end).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p>
                <strong>Trạng thái:</strong>
                {productSale.status === 1 ? "Hiển thị" : "Ẩn"}
              </p>
            </div>
          </div>
        </div>

        <Link
          to="/admin/product_sale"
          className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block"
        >
          Quay lại
        </Link>
      </div>
    </section>
  );
};

export default ShowProductSale;
