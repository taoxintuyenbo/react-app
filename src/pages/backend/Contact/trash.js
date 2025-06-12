import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import ContactService from "../../../services/ContactService"; // Import your service
import { FaUndo, FaTrashAlt } from "react-icons/fa"; // Import icons

const TrashContact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchTrashContacts = async () => {
      try {
        const result = await ContactService.trash(); // Fetch trashed contacts
        setContacts(result.contacts);
      } catch (err) {
        console.error("Failed to load trashed contacts:", err);
      }
    };

    fetchTrashContacts();
  }, []);

  const handleRestore = async (id) => {
    try {
      await ContactService.restore(id); // Restore contact
      setContacts(contacts.filter((contact) => contact.id !== id)); // Remove restored contact from list
    } catch (err) {
      console.error("Failed to restore contact:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await ContactService.destroy(id); // Permanently delete contact
      setContacts(contacts.filter((contact) => contact.id !== id)); // Remove deleted contact from list
    } catch (err) {
      console.error("Failed to delete contact:", err);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Thùng rác Liên hệ</h1>
          <Link
            to="/admin/contact"
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
                <th className="border border-gray-300 px-4 py-2">Tên</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Tiêu đề</th>
                <th className="border border-gray-300 px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((contact, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="text-center">{index + 1}</td>
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
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRestore(contact.id)}
                          className="btn bg-blue-500 text-white py-1 px-3 mx-0.5 rounded-md"
                        >
                          <FaUndo className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="btn bg-red-500 text-white py-1 px-3 mx-0.5 rounded-md"
                        >
                          <FaTrashAlt className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-gray-500 py-4 border border-gray-300"
                  >
                    Không có liên hệ nào trong thùng rác
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

export default TrashContact;
