import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import Link for navigation
import BannerService from "../../../services/BannerService";

const ShowBanner = () => {
  const { id } = useParams(); // Get banner ID from URL parameters
  const [banner, setBanner] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const result = await BannerService.show(id); // Fetch banner data
        setBanner(result.banner);
      } catch (err) {
        setError("Failed to load banner details.");
      }
    };

    fetchBanner();
  }, [id]);

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Chi tiết Banner</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Banner Details */}
        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-2">{banner.name}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>ID:</strong> {banner.id}
            </p>
            <p>
              <strong>Vị trí:</strong> {banner.position}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {banner.status === 1 ? "Hiển thị" : "Ẩn"}
            </p>
            <p className="col-span-2">
              <strong>Mô tả:</strong> {banner.description}
            </p>
            <p>
              <strong>Ngày tạo:</strong>{" "}
              {banner.created_at
                ? new Date(banner.created_at).toLocaleString()
                : "N/A"}
            </p>
            <p>
              <strong>Ngày cập nhật:</strong>{" "}
              {banner.updated_at
                ? new Date(banner.updated_at).toLocaleString()
                : "N/A"}
            </p>
          </div>

          {/* Banner Image */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Hình ảnh</h3>
            <div className="flex flex-wrap gap-4">
              {banner.image ? (
                <img
                  src={`${banner.image}`} // Adjust image path if needed
                  alt={banner.name}
                  className="w-32 h-32 object-cover rounded-md"
                />
              ) : (
                <p>Không có hình ảnh</p>
              )}
            </div>
          </div>
        </div>

        <Link
          to="/admin/banner"
          className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block"
        >
          Quay lại
        </Link>
      </div>
    </section>
  );
};

export default ShowBanner;
