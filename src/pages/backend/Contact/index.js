import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import ContactService from "../../../services/ContactService"; // Ensure the path is correct
import {
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const result = await ContactService.index(); // Fetch contacts
        setContacts(result.contacts);
      } catch (err) {
        console.error("Failed to load contacts:", err);
      }
    };

    fetchContacts();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      await ContactService.status(id); // Toggle status
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === id
            ? { ...contact, status: currentStatus === 1 ? 2 : 1 }
            : contact
        )
      );
    } catch (error) {
      console.error("Error toggling contact status:", error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await ContactService.delete(id); // Call ContactService delete method
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== id)
      );
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Danh sách Liên hệ</h1>
          <div className="flex space-x-4">
            <a
              href="/admin/contact/trash"
              className="btn bg-red-500 text-white py-2 px-4 rounded flex items-center"
            >
              <i className="fa fa-trash mr-2" /> Thùng rác
            </a>
          </div>
        </div>

        <div className="overflow-x-auto border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <table className="min-w-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2"></th>
                <th className="border border-gray-300 px-4 py-2">Tên</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">
                  Số điện thoại
                </th>
                <th className="border border-gray-300 px-4 py-2">Tiêu đề</th>
                <th className="border border-gray-300 px-4 py-2">Nội dung</th>

                <th className="border border-gray-300 px-4 py-2">Hành động</th>
                <th className="border border-gray-300 px-4 py-2">ID</th>
              </tr>
            </thead>
            <tbody>
              {contacts &&
                contacts.length > 0 &&
                contacts.map((contact, index) => {
                  return (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="text-center">
                        <input
                          type="checkbox"
                          name="contact_checkbox"
                          value={contact.id}
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {contact.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {contact.email}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {contact.phone}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {contact.title}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {contact.content}
                      </td>

                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              toggleStatus(contact.id, contact.status)
                            }
                            className={`btn py-1 px-3 mx-0.5 text-white rounded-md ${
                              contact.status === 1
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          >
                            {contact.status === 1 ? (
                              <FaToggleOn className="text-xl" />
                            ) : (
                              <FaToggleOff className="text-xl" />
                            )}
                          </button>
                          <Link
                            to={`/admin/contact/show/${contact.id}`}
                            className="bg-blue-500 py-1 px-3 mx-0.5 text-white rounded-md"
                          >
                            <FaEye className="text-xl" />
                          </Link>
                          <Link
                            to={`/admin/contact/edit/${contact.id}`}
                            className="bg-yellow-500 py-1 px-3 mx-0.5 text-white rounded-md"
                          >
                            <FaEdit className="text-xl" />
                          </Link>
                          <button
                            onClick={() => deleteContact(contact.id)}
                            className="bg-red-500 py-1 px-3 mx-0.5 text-white rounded-md"
                          >
                            <FaTrashAlt className="text-xl" />
                          </button>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {contact.id}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ContactList;
