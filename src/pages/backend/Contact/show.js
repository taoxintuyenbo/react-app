import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import useParams for routing
import ContactService from "../../../services/ContactService"; // Import your service

const ShowContact = () => {
  const { id } = useParams(); // Get contact ID from URL parameters
  const [contact, setContact] = useState({});
  const [error, setError] = useState("");

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

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Chi tiết Liên hệ</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Contact Details */}
        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-2">{contact.name}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>ID:</strong> {contact.id}
            </p>
            <p>
              <strong>Email:</strong> {contact.email}
            </p>
            <p>
              <strong>Phone:</strong> {contact.phone}
            </p>
            <p>
              <strong>Title:</strong> {contact.title}
            </p>
            <p>
              <strong>Nội dung:</strong> {contact.content}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {contact.status === 1 ? "Hiển thị" : "Ẩn"}
            </p>
            <p>
              <strong>Ngày tạo:</strong>{" "}
              {new Date(contact.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Ngày cập nhật:</strong>{" "}
              {new Date(contact.updated_at).toLocaleString()}
            </p>
          </div>
        </div>

        <Link
          to="/admin/contact"
          className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block"
        >
          Quay lại
        </Link>
      </div>
    </section>
  );
};

export default ShowContact;
