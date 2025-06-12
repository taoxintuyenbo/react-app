import React, { useState, useEffect } from "react";
import TopicService from "../../../services/TopicService"; // Import your service
import { Link } from "react-router-dom"; // Import Link for navigation
import { FaUndo, FaTrashAlt } from "react-icons/fa"; // Import icons

const TrashTopic = () => {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrashTopics = async () => {
      try {
        const result = await TopicService.trash(); // Fetch trashed topics
        setTopics(result.topics); // Set topics from the response
      } catch (err) {
        setError("Failed to load trashed topics.");
      }
    };

    fetchTrashTopics();
  }, []);

  const handleRestore = async (id) => {
    try {
      await TopicService.restore(id); // Restore topic
      setTopics(topics.filter((topic) => topic.id !== id)); // Remove restored topic from the list
    } catch (err) {
      setError("Failed to restore topic.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await TopicService.destroy(id); // Permanently delete topic
      setTopics(topics.filter((topic) => topic.id !== id)); // Remove deleted topic from the list
    } catch (err) {
      setError("Failed to delete topic.");
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Thùng rác Chủ đề</h1>
          <Link
            to="/admin/topic"
            className="btn bg-blue-500 text-white py-2 px-4 rounded"
          >
            Quay lại
          </Link>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="overflow-x-auto border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <table className="min-w-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Tên Chủ đề</th>
                <th className="border border-gray-300 px-4 py-2">Mô tả</th>
                <th className="border border-gray-300 px-4 py-2">Thao tác</th>
                <th className="border border-gray-300 px-4 py-2">ID</th>
              </tr>
            </thead>
            <tbody>
              {topics.length > 0 ? (
                topics.map((topic, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {topic.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {topic.description}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRestore(topic.id)}
                          className="btn bg-blue-500 text-white py-1 px-3 mx-0.5 rounded-md"
                        >
                          <FaUndo className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleDelete(topic.id)}
                          className="btn bg-red-500 text-white py-1 px-3 mx-0.5 rounded-md"
                        >
                          <FaTrashAlt className="text-xl" />
                        </button>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {topic.id}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-gray-500 py-4 border border-gray-300"
                  >
                    Không có chủ đề nào trong thùng rác
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

export default TrashTopic;
