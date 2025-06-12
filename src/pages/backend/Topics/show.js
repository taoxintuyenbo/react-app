import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import useParams for routing
import TopicService from "../../../services/TopicService"; // Import your service

const ShowTopic = () => {
  const { id } = useParams(); // Get topic ID from URL parameters
  const [topic, setTopic] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const result = await TopicService.show(id); // Fetch topic data
        setTopic(result.topic);
      } catch (err) {
        setError("Failed to load topic data.");
      }
    };

    fetchTopic();
  }, [id]);

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Chi tiết Chủ đề</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Topic Details */}
        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-2">{topic.name}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>ID:</strong> {topic.id}
            </p>
            <p>
              <strong>Slug:</strong> {topic.slug}
            </p>
            <p>
              <strong>Thứ tự sắp xếp:</strong> {topic.sort_order}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {topic.status === 1 ? "Hiển thị" : "Ẩn"}
            </p>
            <p className="col-span-2">
              <strong>Mô tả:</strong> {topic.description}
            </p>

            <p>
              <strong>Ngày tạo:</strong>{" "}
              {new Date(topic.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Ngày cập nhật:</strong>{" "}
              {new Date(topic.updated_at).toLocaleString()}
            </p>
          </div>
        </div>

        <Link
          to="/admin/topic"
          className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block"
        >
          Quay lại
        </Link>
      </div>
    </section>
  );
};

export default ShowTopic;
