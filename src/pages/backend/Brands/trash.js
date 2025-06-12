import React, { useState, useEffect } from "react";
import BrandService from "../../../services/BrandService"; // Import your service
import { Link } from "react-router-dom"; // Import Link for navigation
import { FaUndo, FaTrashAlt } from "react-icons/fa"; // Import icons

const TrashBrand = () => {
  const [brands, setBrands] = useState([]); // State for storing trashed brands

  // Fetch trashed brands when the component mounts
  useEffect(() => {
    const fetchTrashBrands = async () => {
      try {
        const result = await BrandService.trash(); // Fetch trashed brands
        setBrands(result.brands);
      } catch (err) {
        console.error("Failed to load trashed brands:", err);
      }
    };

    fetchTrashBrands();
  }, []);

  // Restore a brand
  const handleRestore = async (id) => {
    try {
      await BrandService.restore(id); // Restore brand
      setBrands(brands.filter((brand) => brand.id !== id)); // Remove restored brand from list
    } catch (err) {
      console.error("Failed to restore brand:", err);
    }
  };

  // Permanently delete a brand
  const handleDelete = async (id) => {
    try {
      await BrandService.destroy(id); // Permanently delete brand
      setBrands(brands.filter((brand) => brand.id !== id)); // Remove deleted brand from list
    } catch (err) {
      console.error("Failed to delete brand:", err);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Thùng rác Thương hiệu</h1>
          <Link
            to="/admin/brand"
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
              {brands.length > 0 ? (
                brands.map((brand, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {brand.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {brand.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {brand.slug}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {brand.image && (
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className="w-32 h-24 object-cover"
                        />
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {brand.description}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRestore(brand.id)}
                          className="btn bg-blue-500 text-white py-1 px-3 mx-0.5 rounded-md"
                        >
                          <FaUndo className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleDelete(brand.id)}
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
                    Không có thương hiệu nào trong thùng rác
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

export default TrashBrand;
