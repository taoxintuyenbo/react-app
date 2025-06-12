import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductStoreService from "../../../services/ProductStoreService";
import { FaUndo, FaTrashAlt } from "react-icons/fa";

const TrashProductStore = () => {
  const [productStores, setProductStores] = useState([]);

  useEffect(() => {
    const fetchTrashProductStores = async () => {
      try {
        const result = await ProductStoreService.trash(); // Fetch trashed product stores
        setProductStores(result.productstores);
      } catch (err) {
        console.error("Failed to load trashed product stores:", err);
      }
    };

    fetchTrashProductStores();
  }, []);

  const handleRestore = async (id) => {
    try {
      await ProductStoreService.restore(id); // Restore product store
      setProductStores(productStores.filter((store) => store.id !== id)); // Remove restored product store from list
    } catch (err) {
      console.error("Failed to restore product store:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await ProductStoreService.destroy(id); // Permanently delete product store
      setProductStores(productStores.filter((store) => store.id !== id)); // Remove deleted product store from list
    } catch (err) {
      console.error("Failed to delete product store:", err);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Thùng rác Sản phẩm Lưu kho</h1>
          <Link
            to="/admin/product_store"
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
                  Mã sản phẩm
                </th>
                <th className="border border-gray-300 px-4 py-2">Loại</th>
                <th className="border border-gray-300 px-4 py-2">Giá gốc</th>
                <th className="border border-gray-300 px-4 py-2">Số lượng</th>
                <th className="border border-gray-300 px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {productStores.length > 0 ? (
                productStores.map((store, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="text-center">{store.id}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {store.product_id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {store.type}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {store.price_root.toLocaleString()} VNĐ
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {store.qty}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRestore(store.id)}
                          className="btn bg-blue-500 text-white py-1 px-3 mx-0.5 rounded-md"
                        >
                          <FaUndo className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleDelete(store.id)}
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
                    Không có sản phẩm lưu kho nào trong thùng rác.
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

export default TrashProductStore;
