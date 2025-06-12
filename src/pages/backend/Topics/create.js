import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link for navigation
import TopicService from "../../../services/TopicService"; // Import your service

const CreateTopic = () => {
  const [topic, setTopic] = useState({
    name: "",
    slug: "",
    sort_order: 0, // Default sort order
    description: "",
    status: 1, // Default status to "Active"
  });

  const [errors, setErrors] = useState({}); // State for validation errors
  const [error, setError] = useState(""); // General error state
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Handle input changes for the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTopic({
      ...topic,
      [name]: value,
    });
  };

  // Handle form submission to create a new topic
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(await TopicService.store(topic)); // Create topic with form data
      navigate("/admin/topic"); // Redirect to the topic list after successful creation
    } catch (err) {
      console.log("Error response:", err); // Log the full error response for debugging
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors); // Set validation errors from the server
      } else {
        setError("Error creating topic. Please try again.");
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <div className="flex justify-between mb-4">
            <h1 className="text-3xl font-semibold mb-4">Thêm Chủ đề</h1>
            <Link
              to="/admin/topic"
              className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block mx-3"
            >
              Quay lại
            </Link>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Topic Name */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="name">
                  Tên Chủ đề
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={topic.name}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  // required
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>

              {/* Status Dropdown */}
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

              {/* Description (Full Width) */}
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
                  value={topic.description}
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

            <button
              type="submit"
              className="btn bg-green-500 text-white py-2 px-4 rounded mt-4"
            >
              Thêm Chủ đề
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateTopic;
