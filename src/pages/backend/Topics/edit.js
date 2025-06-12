import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Import necessary hooks
import TopicService from "../../../services/TopicService"; // Import your service
import { FaSave, FaArrowLeft } from "react-icons/fa"; // Import icons

const EditTopic = () => {
  const { id } = useParams(); // Get topic ID from URL parameters
  const [topic, setTopic] = useState({
    name: "",
    slug: "",
    sort_order: 0,
    description: "",
    status: 1,
  });
  const [errors, setErrors] = useState({}); // Validation errors
  const [error, setError] = useState(""); // General error message
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  // Fetch topic data when component mounts
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

  // Handle input changes for the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTopic({
      ...topic,
      [name]: value,
    });
  };

  // Handle form submission to update the topic
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await TopicService.update(id, topic); // Update topic with form data
      navigate("/admin/topic"); // Redirect to topics list after successful update
      window.location.reload(); // Reload the page
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors); // Set validation errors
      } else {
        setError("Error updating topic. Please try again.");
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Chỉnh sửa Chủ đề</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="name">
                  Tên Chủ đề
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={topic.name || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  required
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>

              {/* Status */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Trạng thái</label>
                <select
                  name="status"
                  value={topic.status}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full"
                >
                  <option value={1}>Hiển thị</option>
                  <option value={2}>Ẩn</option>
                </select>
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
                  value={topic.description || ""}
                  onChange={handleChange}
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
                className="btn bg-green-500 text-white py-2 px-4 rounded flex items-center"
              >
                <FaSave className="mr-2" /> Cập nhật Chủ đề
              </button>
              <Link
                to="/admin/topic"
                className="btn bg-blue-500 text-white py-2 px-4 rounded flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Quay lại
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditTopic;
