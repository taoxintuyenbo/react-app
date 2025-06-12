import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import PostService from "../../../services/PostService"; // Ensure this path is correct
import TopicService from "../../../services/TopicService"; // To fetch topics

const CreatePost = () => {
  const [post, setPost] = useState({
    thumbnail: "",
    title: "",
    topic_id: "",
    description: "",
    content: "",
    type: "", // For post type like 'post' or 'page'
    status: 1, // Default to "Active"
  });

  const [topics, setTopics] = useState([]); // To hold list of topics
  const [selectedImage, setSelectedImage] = useState(null); // State for the image
  const [error, setError] = useState(""); // Error message
  const [errors, setErrors] = useState({}); // Validation errors
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Fetch topics on component mount
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const result = await TopicService.index(); // Fetch topics
        setTopics(result.topics); // Set the fetched topics in state
      } catch (err) {
        setError("Failed to load topics.");
        console.error("Fetch error:", err);
      }
    };

    fetchTopics();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail") {
      setSelectedImage(files[0]); // Handle file selection
    } else {
      setPost({
        ...post,
        [name]: value,
      });
    }
  };

  // Handle form submission to create the post
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData for file upload
    const formData = new FormData();
    if (selectedImage) {
      formData.append("thumbnail", selectedImage); // Append the selected image file
    }
    formData.append("title", post.title);
    formData.append("topic_id", post.topic_id);
    formData.append("description", post.description);
    formData.append("content", post.content); // Include content in the form
    formData.append("type", post.type); // Include post type
    formData.append("status", post.status);

    try {
      await PostService.store(formData); // Create post
      navigate("/admin/post"); // Redirect to post list after successful creation
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors); // Set validation errors
      } else {
        setError("Error creating post. Please try again.");
        console.error("Creation error:", err);
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Thêm Bài viết</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Thumbnail */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="thumbnail">
              Hình ảnh
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              accept="image/*"
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
            />
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="title">
              Tiêu đề
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={handleChange}
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
              <span className="text-red-500 text-sm">{errors.topic_id}</span>
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
              <option value="page">Page</option>
            </select>
            {errors.type && (
              <span className="text-red-500 text-sm">{errors.type}</span>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="description">
              Mô tả
            </label>
            <textarea
              id="description"
              name="description"
              value={post.description}
              onChange={handleChange}
              className={`border border-gray-300 p-2 w-full ${
                errors.description ? "border-red-500" : ""
              }`}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description}</span>
            )}
          </div>

          {/* Content */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="content">
              Nội dung
            </label>
            <textarea
              id="content"
              name="content"
              value={post.content}
              onChange={handleChange}
              className={`border border-gray-300 p-2 w-full ${
                errors.content ? "border-red-500" : ""
              }`}
            />
            {errors.content && (
              <span className="text-red-500 text-sm">{errors.content}</span>
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

          <button
            type="submit"
            className="btn bg-green-500 text-white py-2 px-4 rounded"
          >
            Thêm Bài viết
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
