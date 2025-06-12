import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductService from "../../../services/ProductService";
import { FaUndo, FaTrashAlt } from "react-icons/fa";

const TrashProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTrashProducts = async () => {
      try {
        const result = await ProductService.trash(); // Fetch trashed products
        setProducts(result.products);
      } catch (err) {
        console.error("Failed to load trashed products:", err);
      }
    };

    fetchTrashProducts();
  }, []);

  const handleRestore = async (id) => {
    try {
      await ProductService.restore(id); // Restore product
      setProducts(products.filter((product) => product.id !== id)); // Remove restored product from list
    } catch (err) {
      console.error("Failed to restore product:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await ProductService.destroy(id); // Permanently delete product
      setProducts(products.filter((product) => product.id !== id)); // Remove deleted product from list
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Thùng rác Sản phẩm</h1>
          <Link
            to="/admin/product"
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
                <th className="border border-gray-300 px-4 py-2">
                  Tên sản phẩm
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Thương hiệu
                </th>
                <th className="border border-gray-300 px-4 py-2">Danh mục</th>
                <th className="border border-gray-300 px-4 py-2">Hình ảnh</th>
                <th className="border border-gray-300 px-4 py-2">Hành động</th>
                <th className="border border-gray-300 px-4 py-2">ID</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="text-center">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.brandname}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.catname}
                    </td>
                    <td className="border border-gray-300 px-6 py-2">
                      {product.images && product.images.length > 0 && (
                        <img
                          src={`${product.images[0].thumbnail}`}
                          alt={product.name}
                          className="w-32 h-24"
                        />
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRestore(product.id)}
                          className="btn bg-blue-500 text-white py-1 px-3 mx-0.5 rounded-md"
                        >
                          <FaUndo className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="btn bg-red-500 text-white py-1 px-3 mx-0.5 rounded-md"
                        >
                          <FaTrashAlt className="text-xl" />
                        </button>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.id}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center text-gray-500 py-4 border border-gray-300"
                  >
                    Không có sản phẩm nào trong thùng rác
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

export default TrashProduct;
