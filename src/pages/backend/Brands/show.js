import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import useParams for routing
import BrandService from "../../../services/BrandService";

const ShowBrand = () => {
  const { id } = useParams(); // Get brand ID from URL parameters
  const [brand, setBrand] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const result = await BrandService.show(id); // Fetch brand data
        setBrand(result.brand);
      } catch (err) {
        setError("Failed to load brand details.");
      }
    };

    fetchBrand();
  }, [id]);

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Chi tiết Thương hiệu</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Brand Details */}
        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-2">{brand.name}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>ID:</strong> {brand.id}
            </p>
            <p>
              <strong>Slug:</strong> {brand.slug}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {brand.status === 1 ? "Hiển thị" : "Ẩn"}
            </p>
            <p className="col-span-2">
              <strong>Mô tả:</strong> {brand.description}
            </p>
            <p>
              <strong>Ngày tạo:</strong>{" "}
              {brand.created_at
                ? new Date(brand.created_at).toLocaleString()
                : "N/A"}
            </p>
            <p>
              <strong>Ngày cập nhật:</strong>{" "}
              {brand.updated_at
                ? new Date(brand.updated_at).toLocaleString()
                : "N/A"}
            </p>
          </div>

          {/* Brand Image */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Hình ảnh</h3>
            <div className="flex flex-wrap gap-4">
              {brand.image ? (
                <img
                  src={brand.image} // Adjust the image path if necessary
                  alt={brand.name}
                  className="w-32 h-32 object-cover rounded-md"
                />
              ) : (
                <p>Không có hình ảnh</p>
              )}
            </div>
          </div>
        </div>

        <Link
          to="/admin/brand"
          className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block"
        >
          Quay lại
        </Link>
      </div>
    </section>
  );
};

export default ShowBrand;
