// src/pages/backend/ProductImage/TrashProductImage.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // For navigation
import ProductImageService from "../../../services/ProductImageService"; // Ensure this path is correct
import { FaUndo, FaTrashAlt } from "react-icons/fa"; // Import icons

const TrashProductImage = () => {
  const [trashedProductImages, setTrashedProductImages] = useState([]);

  useEffect(() => {
    const fetchTrashedProductImages = async () => {
      try {
        const result = await ProductImageService.trash();
        setTrashedProductImages(result.trashedProductImages);
      } catch (error) {
        console.error("Error fetching trashed product images:", error);
      }
    };

    fetchTrashedProductImages();
  }, []);

  const handleRestore = async (id) => {
    if (
      window.confirm("Bạn có chắc chắn muốn khôi phục hình ảnh sản phẩm này?")
    ) {
      try {
        await ProductImageService.restore(id);
        setTrashedProductImages(
          trashedProductImages.filter((image) => image.id !== id)
        );
      } catch (error) {
        console.error("Error restoring product image:", error);
      }
    }
  };

  const handlePermanentDelete = async (id) => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn xóa vĩnh viễn hình ảnh sản phẩm này?"
      )
    ) {
      try {
        await ProductImageService.deletePermanent(id);
        setTrashedProductImages(
          trashedProductImages.filter((image) => image.id !== id)
        );
      } catch (error) {
        console.error("Error permanently deleting product image:", error);
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">
          Thùng rác Hình ảnh Sản phẩm
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">
                  Sản phẩm ID
                </th>
                <th className="border border-gray-300 px-4 py-2">Hình ảnh</th>
                <th className="border border-gray-300 px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {trashedProductImages.length > 0 ? (
                trashedProductImages.map((image, index) => (
                  <tr key={image.id} className="hover:bg-gray-100">
                    <td className="text-center">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {image.product_id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <img
                        className="w-24 h-24 object-cover"
                        src={`/images/products/${image.thumbnail}`}
                        alt={`Product ${image.product_id}`}
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRestore(image.id)}
                          className="btn bg-blue-500 text-white py-1 px-2 rounded mr-2"
                        >
                          <FaUndo /> Khôi phục
                        </button>
                        <button
                          onClick={() => handlePermanentDelete(image.id)}
                          className="btn bg-red-500 text-white py-1 px-2 rounded"
                        >
                          <FaTrashAlt /> Xóa vĩnh viễn
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    Không có hình ảnh sản phẩm nào trong thùng rác.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Link
          to="/admin/product-image"
          className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          Quay lại
        </Link>
      </div>
    </section>
  );
};

export default TrashProductImage;
