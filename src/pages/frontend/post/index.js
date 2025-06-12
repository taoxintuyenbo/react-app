import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostService from "../../../services/PostService"; // Đảm bảo đường dẫn chính xác

const DanhSachBaiViet = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await PostService.getAllPosts();
        console.log("Dữ liệu bài viết:", response);
        setPosts(response.post); // Đảm bảo response.post là cấu trúc dữ liệu chính xác
      } catch (error) {
        console.error("Không thể tải bài viết", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto py-12 px-6 max-w-4xl">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Danh Sách Bài Viết
        </h1>
        <p className="text-lg text-gray-600">
          Khám phá các bài viết mới nhất của chúng tôi
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {/* Hình thu nhỏ */}
            {post.thumbnail && (
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}

            {/* Nội dung bài viết */}
            <div className="p-6">
              <Link to={`/bai-viet/${post.slug}`}>
                <h2 className="text-2xl font-semibold text-gray-800 hover:text-blue-500 transition">
                  {post.title}
                </h2>
              </Link>
              {post.description && (
                <p className="text-gray-600 mt-2">{post.description}</p>
              )}
              <p className="text-gray-500 mt-4">
                Ngày đăng: {new Date(post.created_at).toLocaleDateString()}
              </p>
              <Link
                to={`/bai-viet/${post.slug}`}
                className="inline-block mt-4 text-blue-500 hover:underline"
              >
                Đọc thêm
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DanhSachBaiViet;
