import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import for routing
import ProductImageService from "../../../services/ProductImageService"; // Import ProductImageService
import ProductService from "../../../services/ProductService"; // Import ProductImageService

const ShowProductImage = () => {
  const { id } = useParams(); // Get product image ID from URL parameters
  const [productImage, setProductImage] = useState({});
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    // Function to fetch product image details
    const fetchProductImage = async () => {
      try {
        const result = await ProductImageService.show(id); // Fetch product image data by ID
        setProductImage(result.productImage);
        const result2 = await ProductService.show(
          result.productImage.product_id
        ); // Fetch product image data by ID
        console.log(result2);
        setProduct(result2.product); // Set the related product details
      } catch (err) {
        setError("Failed to load product image data.");
      }
    };

    fetchProductImage();
  }, [id]);

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">
          Chi tiết Hình ảnh Sản phẩm
        </h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Product Image Details */}
        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>ID Hình ảnh:</strong> {productImage.id}
            </p>
            <p>
              <strong>ID Sản phẩm:</strong> {productImage.product_id}
            </p>
            <p>
              <strong>Ngày tạo:</strong>{" "}
              {new Date(productImage.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Ngày cập nhật:</strong>{" "}
              {new Date(productImage.updated_at).toLocaleString()}
            </p>
          </div>

          {/* Product Image */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Hình ảnh</h3>
            <div className="flex flex-wrap gap-4">
              {productImage.thumbnail ? (
                <img
                  src={`${productImage.thumbnail}`} // Adjust image path
                  alt={`Product Image ${productImage.id}`}
                  className="w-32 h-32 object-cover rounded-md"
                />
              ) : (
                <p>Không có hình ảnh</p>
              )}
            </div>
          </div>
        </div>

        <Link
          to="/admin/product_image"
          className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block"
        >
          Quay lại
        </Link>
      </div>
    </section>
  );
};

export default ShowProductImage;
