import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import for routing
import ProductService from "../../../services/ProductService"; // Import ProductService

const ShowProduct = () => {
  const { id } = useParams(); // Get product ID from URL parameters
  const [product, setProduct] = useState({});
  // const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Function to fetch product details
    const fetchProduct = async () => {
      try {
        const result = await ProductService.show(id); // Fetch product data by ID
        setProduct(result.product);
        // setImages(result.images); // Set the images in state
      } catch (err) {
        setError("Failed to load product data.");
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Chi tiết Sản phẩm</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Product Details */}
        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>ID:</strong> {product.id}
            </p>
            <p>
              <strong>Slug:</strong> {product.slug}
            </p>
            <p>
              <strong>Giá:</strong>{" "}
              {new Intl.NumberFormat().format(product.price)} VND
            </p>
            <p>
              <strong>Danh mục:</strong> {product.catname}
            </p>
            <p>
              <strong>Thương hiệu:</strong> {product.brandname}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {product.status === 1 ? "Hiển thị" : "Ẩn"}
            </p>
            <p className="col-span-2">
              <strong>Chi tiết:</strong> {product.detail}
            </p>
            <p className="col-span-2">
              <strong>Mô tả:</strong> {product.description}
            </p>

            <p>
              <strong>Ngày tạo:</strong>{" "}
              {new Date(product.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Ngày cập nhật:</strong>{" "}
              {new Date(product.updated_at).toLocaleString()}
            </p>
          </div>

          {/* Product Images */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Hình ảnh</h3>
            <div className="flex flex-wrap gap-4">
              {product.images && product.images.length > 0 ? (
                product.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${image.thumbnail}`} // Adjust image path
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                ))
              ) : (
                <p>Không có hình ảnh</p>
              )}
            </div>
          </div>
        </div>

        <Link
          to="/admin/product"
          className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block"
        >
          Quay lại
        </Link>
      </div>
    </section>
  );
};

export default ShowProduct;
