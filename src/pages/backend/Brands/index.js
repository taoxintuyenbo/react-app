import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import BrandService from "../../../services/BrandService"; // Import your service
import {
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

const BrandList = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const result = await BrandService.index(); // Fetch brands
        setBrands(result.brands);
      } catch (err) {
        console.error("Failed to load brands:", err);
      }
    };

    fetchBrands();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      await BrandService.status(id); // Toggle brand status
      setBrands((prevBrands) =>
        prevBrands.map((brand) =>
          brand.id === id
            ? { ...brand, status: currentStatus === 1 ? 0 : 1 }
            : brand
        )
      );
    } catch (error) {
      console.error("Error toggling brand status:", error);
    }
  };

  const deleteBrand = async (id) => {
    try {
      await BrandService.delete(id); // Soft delete brand
      setBrands((prevBrands) => prevBrands.filter((brand) => brand.id !== id));
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Danh sách Thương hiệu</h1>
          <div className="flex space-x-4">
            <Link
              to="/admin/brand/create"
              className="btn bg-green-500 text-white py-2 px-4 rounded"
            >
              Thêm Thương hiệu
            </Link>
            <Link
              to="/admin/brand/trash"
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
                <th className="border border-gray-300 px-4 py-2">
                  Tên Thương hiệu
                </th>
                <th className="border border-gray-300 px-4 py-2">Slug</th>
                <th className="border border-gray-300 px-4 py-2">Hình ảnh</th>
                <th className="border border-gray-300 px-4 py-2">Mô tả</th>
                <th className="border border-gray-300 px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {brands && brands.length > 0 ? (
                brands.map((brand, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {brand.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {brand.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {brand.slug}
                    </td>
                    <td className="border border-gray-300  py-2">
                      {brand.image && (
                        <img
                          src={`${brand.image}`} // Adjust path as necessary
                          alt={brand.name}
                          className="w-24 h-24 object-cover"
                        />
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {brand.description}
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleStatus(brand.id, brand.status)}
                          className={`btn py-1 px-3 text-white rounded-md ${
                            brand.status === 1 ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {brand.status === 1 ? (
                            <FaToggleOn className="text-xl" />
                          ) : (
                            <FaToggleOff className="text-xl" />
                          )}
                        </button>
                        <Link
                          to={`/admin/brand/show/${brand.id}`}
                          className="btn bg-sky-500 text-white py-1 px-2 mx-0.5 rounded-md"
                        >
                          <FaEye className="text-xl" />
                        </Link>
                        <Link
                          to={`/admin/brand/edit/${brand.id}`}
                          className="btn bg-blue-500 text-white py-1 px-2 mx-0.5 rounded-md"
                        >
                          <FaEdit className="text-xl" />
                        </Link>
                        <button
                          onClick={() => deleteBrand(brand.id)}
                          className="btn bg-red-500 text-white py-1 px-2 mx-0.5 rounded-md"
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
                    Không có thương hiệu nào
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

export default BrandList;
