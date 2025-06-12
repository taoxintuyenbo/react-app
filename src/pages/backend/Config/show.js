import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import useParams for routing
import ConfigService from "../../../services/ConfigService"; // Import ConfigService to interact with API

const ShowConfig = () => {
  const { id } = useParams(); // Get config ID from URL parameters
  const [config, setConfig] = useState({});
  const [error, setError] = useState("");

  // Fetch config data when component mounts
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const result = await ConfigService.show(id); // Fetch config data
        setConfig(result.config); // Set config data in state
      } catch (err) {
        setError("Failed to load config data."); // Handle error
      }
    };

    fetchConfig();
  }, [id]);

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Chi tiết Cấu hình</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Config Details */}
        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-2">{config.site_name}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>ID:</strong> {config.id}
            </p>
            <p>
              <strong>Email:</strong> {config.email}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {config.status === 1 ? "Hiển thị" : "Ẩn"}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {config.phones}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {config.address}
            </p>
            <p>
              <strong>Hotline:</strong> {config.hotline}
            </p>
            <p>
              <strong>Zalo:</strong> {config.zalo}
            </p>
            <p>
              <strong>Facebook: </strong>
              {config.facebook}
            </p>

            <p>
              <strong>Ngày tạo:</strong>{" "}
              {new Date(config.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Ngày cập nhật:</strong>{" "}
              {new Date(config.updated_at).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Back Button */}
        <Link
          to="/admin/config"
          className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block"
        >
          Quay lại
        </Link>
      </div>
    </section>
  );
};

export default ShowConfig;
