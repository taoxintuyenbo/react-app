import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import ProductImageService from "../../../services/ProductImageService"; // Ensure the path is correct
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";

const ProductImageList = () => {
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await ProductImageService.index(); // Fetch product images
      setProductImages(result.productImages);
    })();
  }, []);

  const deleteProductImage = async (id) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa hình ảnh này?");

    if (confirmed) {
      try {
        await ProductImageService.destroy(id); // Call ProductImageService delete method
        // Remove the deleted product image from the UI
        setProductImages((prevImages) =>
          prevImages.filter((image) => image.id !== id)
        );
      } catch (error) {
        console.error("Error deleting product image:", error);
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">
            Danh sách Hình ảnh Sản phẩm
          </h1>
          <div className="flex space-x-4">
            <Link
              to="/admin/product_image/create"
              className="btn bg-green-500 text-white py-2 px-4 rounded"
            >
              Thêm Hình ảnh
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <table className="min-w-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">
                  Sản phẩm ID
                </th>
                <th className="border border-gray-300 px-4 py-2">Thumbnail</th>
                <th className="border border-gray-300 px-4 py-2">Ngày tạo</th>
                <th className="border border-gray-300 px-4 py-2">
                  Ngày cập nhật
                </th>
                <th className="border border-gray-300 px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {productImages &&
                productImages.length > 0 &&
                productImages.map((image, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {image.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {image.product_id}
                    </td>
                    <td className="border border-gray-300 px-6 py-2">
                      {image.thumbnail && (
                        <img
                          src={`${image.thumbnail}`}
                          alt="Product Thumbnail"
                          className="w-32 h-24 object-cover"
                        />
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(image.created_at).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(image.updated_at).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex space-x-2">
                        <Link
                          to={`/admin/product_image/show/${image.id}`}
                          className="bg-blue-500 py-1 px-3 mx-0.5 text-white rounded-md"
                        >
                          <FaEye className="text-xl" />
                        </Link>
                        <Link
                          to={`/admin/product_image/edit/${image.id}`}
                          className="bg-yellow-500 py-1 px-3 mx-0.5 text-white rounded-md"
                        >
                          <FaEdit className="text-xl" />
                        </Link>
                        <button
                          onClick={() => deleteProductImage(image.id)}
                          className="bg-red-500 py-1 px-3 mx-0.5 text-white rounded-md"
                        >
                          <FaTrashAlt className="text-xl" />
                        </button>
                      </div>
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

export default ProductImageList;
