import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // For routing and navigation
import PostService from "../../../services/PostService"; // Ensure this path is correct
import TopicService from "../../../services/TopicService"; // Import TopicService to fetch topics

const EditPost = () => {
  const { id } = useParams(); // Get post ID from URL parameters
  const [post, setPost] = useState({
    title: "",
    topic_id: "",
    description: "",
    content: "",
    status: 1,
    thumbnail: "",
    updated_by: "",
    type: "", // Add type state for the post type
  });
  const [topics, setTopics] = useState([]); // State to hold list of topics
  const [selectedImage, setSelectedImage] = useState(null); // State for the image
  const [errors, setErrors] = useState({}); // Validation errors
  const [error, setError] = useState(""); // General error message
  const navigate = useNavigate(); // Initialize useNavigate for navigation

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

    const fetchTopics = async () => {
      try {
        const result = await TopicService.index(); // Fetch topics
        setTopics(result.topics); // Set the fetched topics in state
      } catch (err) {
        setError("Failed to load topics.");
        console.error("Fetch error:", err);
      }
    };

    fetchPost();
    fetchTopics();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setSelectedImage(file); // Set the selected file
  };

  // Handle form submission to update the post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("topic_id", post.topic_id);
    formData.append("description", post.description);
    formData.append("status", post.status);
    formData.append("content", post.content);

    formData.append("updated_by", post.updated_by);
    formData.append("type", post.type); // Add the post type to the form data
    if (selectedImage) {
      formData.append("thumbnail", selectedImage); // Append image file if selected
    }

    try {
      console.log(post);
      await PostService.update(id, formData); // Update post
      navigate("/admin/post"); // Redirect to post list after successful update
      window.location.reload(); // Reload the page
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors); // Set validation errors
      } else {
        setError("Error updating post. Please try again.");
        console.error("Update error:", err);
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Chỉnh sửa Bài viết</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="title">
                  Tiêu đề
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={post.title || ""}
                  onChange={handleChange}
                  required
                  className={`border border-gray-300 p-2 w-full ${
                    errors.title ? "border-red-500" : ""
                  }`}
                />
                {errors.title && (
                  <span className="text-red-500 text-sm">{errors.title}</span>
                )}
              </div>

              {/* Topic ID Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="topic_id">
                  Chủ đề
                </label>
                <select
                  id="topic_id"
                  name="topic_id"
                  value={post.topic_id || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.topic_id ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Chọn chủ đề</option>
                  {topics.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.name}
                    </option>
                  ))}
                </select>
                {errors.topic_id && (
                  <span className="text-red-500 text-sm">
                    {errors.topic_id}
                  </span>
                )}
              </div>

              {/* Post Type Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="type">
                  Loại bài viết
                </label>
                <select
                  id="type"
                  name="type"
                  value={post.type || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.type ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Chọn loại bài viết</option>
                  <option value="post">Post</option>
                  <option value="page">Page</option>m{" "}
                </select>
                {errors.type && (
                  <span className="text-red-500 text-sm">{errors.type}</span>
                )}
              </div>

              {/* Status */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Trạng thái</label>
                <select
                  name="status"
                  value={post.status}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full"
                >
                  <option value={1}>Hiển thị</option>
                  <option value={2}>Ẩn</option>
                </select>
              </div>

              {/* Thumbnail Upload */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="thumbnail">
                  Hình ảnh
                </label>
                <input
                  type="file"
                  id="thumbnail"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border border-gray-300 p-2 w-full"
                />
                {post.thumbnail && typeof post.thumbnail === "string" && (
                  <img
                    className="w-24 h-24 object-cover mt-2"
                    src={`${post.thumbnail}`}
                    alt={post.title}
                  />
                )}
              </div>
              <div className="mb-4 md:col-span-2">
                <label
                  className="block text-gray-700 mb-1"
                  htmlFor="description"
                >
                  Noi dung
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={post.content || ""}
                  onChange={handleChange}
                  required
                  className={`border border-gray-300 p-2 w-full ${
                    errors.content ? "border-red-500" : ""
                  }`}
                />
                {errors.content && (
                  <span className="text-red-500 text-sm">{errors.content}</span>
                )}
              </div>
              {/* Description */}
              <div className="mb-4 md:col-span-2">
                <label
                  className="block text-gray-700 mb-1"
                  htmlFor="description"
                >
                  Mô tả
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={post.description || ""}
                  onChange={handleChange}
                  required
                  className={`border border-gray-300 p-2 w-full ${
                    errors.description ? "border-red-500" : ""
                  }`}
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    {errors.description}
                  </span>
                )}
              </div>
            </div>

            <div className="flex space-x-4 mt-4">
              <button
                type="submit"
                className="btn bg-green-500 text-white py-2 px-4 rounded"
              >
                Cập nhật Bài viết
              </button>
              <Link
                to="/admin/post"
                className="btn bg-blue-500 text-white py-2 px-4 rounded"
              >
                Quay lại
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditPost;
