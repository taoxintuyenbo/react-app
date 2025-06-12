import React, { useState, useEffect } from "react";
import BannerService from "../../../services/BannerService"; // Import your service
import { Link } from "react-router-dom"; // Import Link for navigation
import { FaUndo, FaTrashAlt } from "react-icons/fa"; // Import icons

const TrashBanner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchTrashBanners = async () => {
      try {
        const result = await BannerService.trash(); // Fetch trashed banners
        setBanners(result.banners);
      } catch (err) {
        console.error("Failed to load trashed banners:", err);
      }
    };

    fetchTrashBanners();
  }, []);

  const handleRestore = async (id) => {
    try {
      await BannerService.restore(id); // Restore banner
      setBanners(banners.filter((banner) => banner.id !== id)); // Remove restored banner from list
    } catch (err) {
      console.error("Failed to restore banner:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await BannerService.destroy(id); // Permanently delete banner
      setBanners(banners.filter((banner) => banner.id !== id)); // Remove deleted banner from list
    } catch (err) {
      console.error("Failed to delete banner:", err);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Thùng rác Banner</h1>
          <Link
            to="/admin/banner"
            className="btn bg-blue-500 text-white py-2 px-4 rounded"
          >
            Quay lại
          </Link>
        </div>

        <div className="overflow-x-auto border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <table className="min-w-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Tên</th>
                <th className="border border-gray-300 px-4 py-2">Link</th>
                <th className="border border-gray-300 px-4 py-2">Hình ảnh</th>
                <th className="border border-gray-300 px-4 py-2">Mô tả</th>
                <th className="border border-gray-300 px-4 py-2">Vị trí</th>
                <th className="border border-gray-300 px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {banners.length > 0 ? (
                banners.map((banner, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {banner.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {banner.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {banner.link}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {banner.image && (
                        <img
                          src={banner.image}
                          alt={banner.name}
                          className="w-32 h-24 object-cover"
                        />
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {banner.description}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {banner.position}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRestore(banner.id)}
                          className="btn bg-blue-500 text-white py-1 px-3 mx-0.5 rounded-md"
                        >
                          <FaUndo className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleDelete(banner.id)}
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
                    colSpan="7"
                    className="text-center text-gray-500 py-4 border border-gray-300"
                  >
                    Không có banner nào trong thùng rác
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

export default TrashBanner;
