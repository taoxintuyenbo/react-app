import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ContactService from "../../../services/ContactService";
import { FaSave, FaArrowLeft } from "react-icons/fa";

const EditContact = () => {
  const { id } = useParams(); // Get contact ID from URL parameters
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    content: "",
    status: 1, // Default status to "Active"
  });

  const [errors, setErrors] = useState({}); // Validation errors
  const [error, setError] = useState(""); // General error message
  const navigate = useNavigate();

  // Fetch contact data when the component mounts
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const result = await ContactService.show(id); // Fetch contact data
        setContact(result.contact);
      } catch (err) {
        setError("Failed to load contact data.");
      }
    };

    fetchContact();
  }, [id]);

  // Handle input changes for the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  // Handle form submission to update the contact
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ContactService.update(id, contact); // Update contact with the form data
      console.log(response);
      navigate("/admin/contact"); // Redirect to contact list after successful update
      window.location.reload(); // Reload the page
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors); // Set validation errors
      } else {
        setError("Error updating contact. Please try again.");
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Chỉnh sửa Liên hệ</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="name">
                  Tên liên hệ
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contact.name || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contact.email || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="phone">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={contact.phone || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">{errors.phone}</span>
                )}
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
                  value={contact.title || ""}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.title ? "border-red-500" : ""
                  }`}
                />
                {errors.title && (
                  <span className="text-red-500 text-sm">{errors.title}</span>
                )}
              </div>

              {/* Content */}
              <div className="mb-4 md:col-span-2">
                <label className="block text-gray-700 mb-1" htmlFor="content">
                  Nội dung
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={contact.content || ""}
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
                  value={contact.status}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full"
                >
                  <option value={1}>Hiển thị</option>
                  <option value={2}>Ẩn</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-4 mt-4">
              <button
                type="submit"
                className="btn bg-green-500 text-white py-2 px-4 rounded"
              >
                Cập nhật Liên hệ
              </button>
              <Link
                to="/admin/contact"
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

export default EditContact;
