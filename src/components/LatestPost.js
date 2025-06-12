import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostService from "../services/PostService";

const LatestPost = () => {
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await PostService.getAllPosts(); // Fetch all posts
        const posts = response.post; // Adjust based on your API response structure
        const sortedPosts = posts.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setLatestPosts(sortedPosts.slice(0, 4)); // Take the top 3 latest posts
      } catch (error) {
        console.error("Failed to fetch latest posts", error);
      }
    };

    fetchLatestPosts();
  }, []);

  return (
    <div className="container mx-auto py-12 px-6 max-w-4xl">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Bài viết mới nhất
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {latestPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {/* Thumbnail */}
            {post.thumbnail && (
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
            )}

            {/* Post Content */}
            <div className="p-4">
              <Link to={`/bai-viet/${post.slug}`}>
                <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition">
                  {post.title}
                </h2>
              </Link>
              {post.description && (
                <p className="text-gray-600 mt-2 text-sm">{post.description}</p>
              )}
              <p className="text-gray-500 mt-4 text-xs">
                Đăng vào: {new Date(post.created_at).toLocaleDateString()}
              </p>
              <Link
                to={`/bai-viet/${post.slug}`}
                className="inline-block mt-4 text-blue-500 hover:underline text-sm"
              >
                Xem thêm
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestPost;
