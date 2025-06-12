import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import PostService from "../../../services/PostService"; // Ensure this path is correct
import {
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  // Fetch all posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await PostService.index(); // Fetch all posts
        setPosts(result.posts); // Set the post data
      } catch (error) {
        console.error("Error fetching posts:", error); // Handle fetch error
      }
    };

    fetchPosts();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      await PostService.status(id);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id
            ? { ...post, status: currentStatus === 1 ? 2 : 1 }
            : post
        )
      );
    } catch (error) {
      console.error("Error toggling post status:", error);
    }
  };

  // Delete a post and remove it from the list
  const deletePost = async (id) => {
    // if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
    try {
      await PostService.delete(id); // Delete the post (permanently delete instead of trash)
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id)); // Remove post from the list
    } catch (error) {
      console.error("Error deleting post:", error); // Handle delete error
    }
    // }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Danh sách Bài viết</h1>
          <div className="flex space-x-4">
            {/* Button to navigate to Add Post page */}
            <Link
              to="/admin/post/create"
              className="btn bg-green-500 text-white py-2 px-4 rounded"
            >
              Thêm Bài viết
            </Link>
            <Link
              to="/admin/post/trash"
              className="btn bg-red-500 text-white py-2 px-4 rounded flex items-center"
            >
              <FaTrashAlt className="mr-2" /> Thùng rác
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <table className="min-w-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2"></th>
                <th className="border border-gray-300 px-4 py-2">Tiêu đề</th>
                <th className="border border-gray-300 px-4 py-2">Chủ đề</th>
                <th className="border border-gray-300 px-4 py-2">Mô tả</th>
                <th className="border border-gray-300 px-4 py-2">Loại</th>
                <th className="border border-gray-300 px-4 py-2">Hình ảnh</th>
                <th className="border border-gray-300 px-4 py-2">Hành động</th>
                <th className="border border-gray-300 px-4 py-2">ID</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="text-center">
                      <input
                        type="checkbox"
                        name="post_checkbox"
                        value={post.id}
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {post.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {post.topic_id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {post.description}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {post.type}
                    </td>
                    <td className="border border-gray-300  py-2">
                      {post.thumbnail && (
                        <img
                          src={`${post.thumbnail}`}
                          alt={post.title}
                          className="w-32 h-24"
                        />
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleStatus(post.id, post.status)}
                          className={`btn py-1 px-3 mx-0.5 text-white rounded-md ${
                            post.status === 1 ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {post.status === 1 ? (
                            <FaToggleOn className="text-xl" />
                          ) : (
                            <FaToggleOff className="text-xl" />
                          )}
                        </button>

                        <Link
                          to={`/admin/post/show/${post.id}`}
                          className="bg-blue-500 py-1 px-3 mx-0.5 text-white rounded-md"
                        >
                          <FaEye className="text-xl" />
                        </Link>
                        <Link
                          to={`/admin/post/edit/${post.id}`}
                          className="bg-yellow-500 py-1 px-3 mx-0.5 text-white rounded-md"
                        >
                          <FaEdit className="text-xl" />
                        </Link>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="bg-red-500 py-1 px-3 mx-0.5 text-white rounded-md"
                        >
                          <FaTrashAlt className="text-xl" />
                        </button>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {post.id}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    Không có bài viết nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PostList;
