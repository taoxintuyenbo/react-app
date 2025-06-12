import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BannerService from "../../../services/BannerService";
import {
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

const BannerList = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await BannerService.index(); // Fetch banners
      setBanners(result.banners);
    })();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      await BannerService.status(id);
      setBanners((prevBanners) =>
        prevBanners.map((banner) =>
          banner.id === id
            ? { ...banner, status: currentStatus === 1 ? 0 : 1 }
            : banner
        )
      );
    } catch (error) {
      console.error("Error toggling banner status:", error);
    }
  };

  const deleteBanner = async (id) => {
    try {
      await BannerService.delete(id);
      setBanners((prevBanners) =>
        prevBanners.filter((banner) => banner.id !== id)
      );
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Danh sách Banner</h1>
          <div className="flex space-x-4">
            <Link
              to="/admin/banner/create"
              className="btn bg-green-500 text-white py-2 px-4 rounded"
            >
              Thêm Banner
            </Link>
            <Link
              to="/admin/banner/trash"
              className="btn bg-red-500 text-white py-2 px-4 rounded flex items-center"
            >
              Thùng rác
            </Link>
          </div>
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
              {banners && banners.length > 0 ? (
                banners.map((banner, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="text-center">{banner.id}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {banner.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {banner.link}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {banner.image && (
                        <img
                          src={`${banner.image}`}
                          alt={banner.name}
                          className="w-32 h-24"
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
                          onClick={() => toggleStatus(banner.id, banner.status)}
                          className={`btn py-1 px-3 mx-0.5 text-white rounded-md ${
                            banner.status === 1 ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {banner.status === 1 ? (
                            <FaToggleOn className="text-xl" />
                          ) : (
                            <FaToggleOff className="text-xl" />
                          )}
                        </button>
                        <Link
                          to={`/admin/banner/show/${banner.id}`}
                          className="btn bg-blue-500 text-white py-1 px-3 mx-0.5 rounded-md"
                        >
                          <FaEye className="text-xl" />
                        </Link>
                        <Link
                          to={`/admin/banner/edit/${banner.id}`}
                          className="btn bg-yellow-500 text-white py-1 px-3 mx-0.5 rounded-md"
                        >
                          <FaEdit className="text-xl" />
                        </Link>
                        <button
                          onClick={() => deleteBanner(banner.id)}
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
                    colSpan="14"
                    className="text-center text-gray-500 py-4 border border-gray-300"
                  >
                    Không có banner nào
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

export default BannerList;
