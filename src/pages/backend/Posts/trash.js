import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // For navigation
import PostService from "../../../services/PostService"; // Import your Post service
import { FaUndo, FaTrashAlt } from "react-icons/fa"; // Import icons

const TrashPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchTrashedPosts = async () => {
      try {
        const result = await PostService.trash(); // Fetch trashed posts
        setPosts(result.posts);
      } catch (err) {
        console.error("Failed to load trashed posts:", err);
      }
    };

    fetchTrashedPosts();
  }, []);

  const handleRestore = async (id) => {
    try {
      await PostService.restore(id); // Restore post
      setPosts(posts.filter((post) => post.id !== id)); // Remove restored post from list
    } catch (err) {
      console.error("Failed to restore post:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await PostService.destroy(id); // Permanently delete post
      setPosts(posts.filter((post) => post.id !== id)); // Remove deleted post from list
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Thùng rác Bài viết</h1>
          <Link
            to="/admin/post"
            className="btn bg-blue-500 text-white py-2 px-4 rounded"
          >
            Quay lại
          </Link>
        </div>

        <div className="overflow-x-auto border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <table className="min-w-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Tiêu đề</th>
                <th className="border border-gray-300 px-4 py-2">Mô tả</th>
                <th className="border border-gray-300 px-4 py-2">Loại</th>
                <th className="border border-gray-300 px-4 py-2">Hành động</th>
                <th className="border border-gray-300 px-4 py-2">ID</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="text-center">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {post.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {post.description}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {post.type}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRestore(post.id)}
                          className="btn bg-blue-500 text-white py-1 px-3 mx-0.5 rounded-md"
                        >
                          <FaUndo className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="btn bg-red-500 text-white py-1 px-3 mx-0.5 rounded-md"
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
                  <td
                    colSpan="6"
                    className="text-center text-gray-500 py-4 border border-gray-300"
                  >
                    Không có bài viết nào trong thùng rác
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

export default TrashPost;
