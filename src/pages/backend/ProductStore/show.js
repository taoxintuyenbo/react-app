import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // For routing
import ProductStoreService from "../../../services/ProductStoreService"; // Ensure this path is correct
import ProductService from "../../../services/ProductService"; // To fetch product details

const ShowProductStore = () => {
  const { id } = useParams(); // Get product store ID from URL parameters
  const [productStore, setProductStore] = useState({});
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductStore = async () => {
      try {
        const result = await ProductStoreService.show(id); // Fetch product store details
        setProductStore(result.productstore);

        const productResult = await ProductService.show(
          result.productstore.product_id
        ); // Fetch product details
        setProduct(productResult.product);
      } catch (err) {
        setError("Failed to load product store data.");
        console.error("Fetch error:", err);
      }
    };

    fetchProductStore();
  }, [id]);

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">
          Chi tiết Sản phẩm Lưu kho
        </h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <h2 className="text-xl font-bold mb-4">Thông tin Sản phẩm Lưu kho</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p>
                <strong>ID:</strong> {productStore.id}
              </p>
              <p>
                <strong>Sản phẩm:</strong> {product.name} (ID:{" "}
                {productStore.product_id})
              </p>
              <p>
                <strong>Loại:</strong> {productStore.type}
              </p>
            </div>

            <div>
              <p>
                <strong>Giá gốc:</strong>{" "}
                {productStore.price_root?.toLocaleString()} VNĐ
              </p>
              <p>
                <strong>Số lượng:</strong> {productStore.qty}
              </p>
              <p>
                <strong>Người cập nhật:</strong> {productStore.updated_by}
              </p>
            </div>

            <div>
              <p>
                <strong>Trạng thái:</strong>{" "}
                {productStore.status === 1 ? "Hiển thị" : "Ẩn"}
              </p>
              <p>
                <strong>Ngày tạo:</strong>{" "}
                {new Date(productStore.created_at).toLocaleString()}
              </p>
            </div>

            <div>
              <p>
                <strong>Ngày cập nhật:</strong>{" "}
                {new Date(productStore.updated_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <Link
          to="/admin/product_store"
          className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block"
        >
          Quay lại
        </Link>
      </div>
    </section>
  );
};

export default ShowProductStore;
