import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // For routing
import PostService from "../../../services/PostService"; // Ensure this path is correct

const ShowPost = () => {
  const { id } = useParams(); // Get post ID from URL parameters
  const [post, setPost] = useState({});
  const [error, setError] = useState("");

  // Fetch post data on component mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await PostService.show(id); // Fetch post details
        setPost(result.post);
      } catch (err) {
        setError("Failed to load post data.");
        console.error("Fetch error:", err);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Chi tiết Bài viết</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Post Details */}
        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>ID:</strong> {post.id}
            </p>
            <p>
              <strong>Chủ đề ID:</strong> {post.topic_id}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {post.status === 1 ? "Hiển thị" : "Ẩn"}
            </p>
            <p className="col-span-2">
              <strong>Mô tả:</strong> {post.description}
            </p>

            <p>
              <strong>Ngày tạo:</strong>{" "}
              {new Date(post.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Ngày cập nhật:</strong>{" "}
              {new Date(post.updated_at).toLocaleString()}
            </p>
            <p>
              <strong>Người cập nhật:</strong> {post.updated_by}
            </p>
          </div>

          {/* Post Image */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Hình ảnh</h3>
            <div className="flex flex-wrap gap-4">
              {post.thumbnail ? (
                <img
                  src={`${post.thumbnail}`} // Adjust image path
                  alt={post.title}
                  className="w-32 h-32 object-cover rounded-md"
                />
              ) : (
                <p>Không có hình ảnh</p>
              )}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <Link
          to="/admin/post"
          className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block"
        >
          Quay lại
        </Link>
      </div>
    </section>
  );
};

export default ShowPost;
