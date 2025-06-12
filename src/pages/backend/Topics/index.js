import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import TopicService from "../../../services/TopicService"; // Import TopicService
import {
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

const TopicList = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await TopicService.index(); // Fetch topics
        setTopics(result.topics);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    })();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      await TopicService.status(id); // Toggle status for topic

      setTopics((prevTopics) =>
        prevTopics.map((topic) =>
          topic.id === id
            ? { ...topic, status: currentStatus === 1 ? 2 : 1 }
            : topic
        )
      );
    } catch (error) {
      console.error("Error toggling topic status:", error);
    }
  };

  const deleteTopic = async (id) => {
    try {
      await TopicService.delete(id); // Delete the topic
      setTopics((prevTopics) => prevTopics.filter((topic) => topic.id !== id));
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Danh sách Chủ đề</h1>
          <div className="flex space-x-4">
            <Link
              to="/admin/topic/create"
              className="btn bg-green-500 text-white py-2 px-4 rounded"
            >
              Thêm Chủ đề
            </Link>
            <a
              href="/admin/topic/trash"
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
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Tên Chủ đề</th>
                <th className="border border-gray-300 px-4 py-2">Slug</th>
                <th className="border border-gray-300 px-4 py-2">Mô tả</th>
                <th className="border border-gray-300 px-4 py-2">Hành động</th>
                <th className="border border-gray-300 px-4 py-2">ID</th>
              </tr>
            </thead>
            <tbody>
              {topics &&
                topics.length > 0 &&
                topics.map((topic, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="text-center">
                      <input
                        type="checkbox"
                        name="topic_checkbox"
                        value={topic.id}
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {topic.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {topic.slug}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {topic.description}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleStatus(topic.id, topic.status)}
                          className={`btn py-1 px-3 mx-0.5 text-white rounded-md ${
                            topic.status === 1 ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {topic.status === 1 ? (
                            <FaToggleOn className="text-xl" />
                          ) : (
                            <FaToggleOff className="text-xl" />
                          )}
                        </button>

                        <Link
                          to={`/admin/topic/show/${topic.id}`}
                          className="bg-blue-500 py-1 px-3 mx-0.5 text-white rounded-md"
                        >
                          <FaEye className="text-xl" />
                        </Link>
                        <Link
                          to={`/admin/topic/edit/${topic.id}`}
                          className="bg-yellow-500 py-1 px-3 mx-0.5 text-white rounded-md"
                        >
                          <FaEdit className="text-xl" />
                        </Link>
                        <button
                          onClick={() => deleteTopic(topic.id)}
                          className="bg-red-500 py-1 px-3 mx-0.5 text-white rounded-md"
                        >
                          <FaTrashAlt className="text-xl" />
                        </button>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {topic.id}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TopicList;
