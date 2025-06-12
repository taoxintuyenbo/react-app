import React, { useState, useEffect } from "react";
import axios from "axios";
import ConfigService from "../../../services/ConfigService";
import ContactService from "../../../services/ContactService";

const Contact = () => {
  const [formData, setFormData] = useState({});
  const [configData, setConfigData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({}); // Error state for form field validation

  useEffect(() => {
    const fetchConfigData = async () => {
      try {
        const response = await ConfigService.index();
        setConfigData(response.configs[0]);
      } catch (error) {
        console.error("Failed to fetch config data", error);
      }
    };

    fetchConfigData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ContactService.store(formData);
      setIsSubmitted(true);
      setFormData({
        id: "",
        name: "",
        email: "",
        phone: "",
        title: "",
        content: "",
      });
      setErrors(""); // Set validation errors
    } catch (error) {
      setErrors(error.response.data.errors); // Set validation errors
      console.error("Failed to submit contact form", error);
    }
  };

  if (!configData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">Loading contact information...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-6 max-w-4xl">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Liên Hệ</h1>
        <p className="text-lg text-gray-600">
          Hãy liên hệ với chúng tôi để biết thêm thông tin!
        </p>
      </header>

      {/* Google Map Embed */}
      <section className="relative w-full mb-8">
        <iframe
          className="w-full h-64 rounded-lg shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
          frameBorder="0"
          style={{ height: "230px", border: "0" }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
          title="Google Map - New York"
        ></iframe>
      </section>

      {/* Contact Information */}
      <section className="mb-8 bg-gray-50 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {configData.site_name}
        </h3>
        <ul className="space-y-2">
          <li>
            <i className="fas fa-map-marker-alt"></i> {configData.address}
          </li>
          <li>
            <i className="fas fa-phone-alt"></i> {configData.phones}
          </li>
          <li>
            <i className="fas fa-envelope"></i> {configData.email}
          </li>
          <li>
            <i className="fas fa-globe"></i>{" "}
            <a
              href={configData.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {configData.website}
            </a>
          </li>
        </ul>
      </section>

      {/* Contact Form */}
      <div className="container mx-auto py-12 px-6 max-w-4xl">
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Gửi tin nhắn cho chúng tôi
          </h3>

          {isSubmitted && (
            <p className="text-green-500 mb-4">
              Cảm ơn bạn đã liên hệ với chúng tôi!
            </p>
          )}

          {errors.submit && (
            <p className="text-red-500 mb-4">{errors.submit}</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="name"
              >
                Tên
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="phone"
              >
                Điện thoại
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone}</span>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="title"
              >
                Tiêu đề
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.title && (
                <span className="text-red-500 text-sm">{errors.title}</span>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="content"
              >
                Nội dung
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                rows="5"
              ></textarea>
              {errors.content && (
                <span className="text-red-500 text-sm">{errors.content}</span>
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Gửi tin nhắn
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
