import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import ProductStoreService from "../../../services/ProductStoreService"; // Ensure this path is correct
import {
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

const ProductStoreList = () => {
  const [productStores, setProductStores] = useState([]);

  useEffect(() => {
    const fetchProductStores = async () => {
      try {
        const result = await ProductStoreService.index();
        setProductStores(result.productstores); // Assuming 'productstores' is the returned data
      } catch (error) {
        console.error("Error fetching product stores:", error);
      }
    };

    fetchProductStores();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      await ProductStoreService.status(id); // Assuming you call your service to toggle status

      // Update the status locally based on the currentStatus
      setProductStores((prevProductStores) =>
        prevProductStores.map((store) =>
          store.id === id
            ? { ...store, status: currentStatus === 1 ? 2 : 1 }
            : store
        )
      );
    } catch (error) {
      console.error("Error toggling product status:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await ProductStoreService.delete(id);
      setProductStores(productStores.filter((store) => store.id !== id));
    } catch (error) {
      console.error("Error deleting product store:", error);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Danh sách Sản phẩm Lưu kho</h1>
          <div className="flex space-x-4">
            <Link
              to="/admin/product_store/create"
              className="btn bg-green-500 text-white py-2 px-4 rounded"
            >
              Thêm Sản phẩm Lưu kho
            </Link>
            <Link
              to="/admin/product_store/trash"
              className="btn bg-red-500 text-white py-2 px-4 rounded flex items-center"
            >
              <FaTrashAlt className="mr-2" /> Thùng rác
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <table className="min-w-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">
                  Ma Sản phẩm
                </th>
                <th className="border border-gray-300 px-4 py-2">Loại</th>
                <th className="border border-gray-300 px-4 py-2">Giá gốc</th>
                <th className="border border-gray-300 px-4 py-2">Số lượng</th>

                <th className="border border-gray-300 px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {productStores && productStores.length > 0 ? (
                productStores.map((store, index) => {
                  return (
                    <tr key={store.id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2">
                        {store.id}
                      </td>
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
                            onClick={() => toggleStatus(store.id, store.status)}
                            className={`btn py-1 px-3 mx-0.5 text-white rounded-md ${
                              store.status === 1 ? "bg-green-500" : "bg-red-500"
                            }`}
                          >
                            {store.status === 1 ? (
                              <FaToggleOn className="text-xl" />
                            ) : (
                              <FaToggleOff className="text-xl" />
                            )}
                          </button>
                          <Link
                            to={`/admin/product_store/show/${store.id}`}
                            className="btn bg-sky-500 py-1 px-3 mx-0.5 text-white rounded-md"
                          >
                            <FaEye className="text-xl" />
                          </Link>
                          <Link
                            to={`/admin/product_store/edit/${store.id}`}
                            className="btn bg-yellow-500 py-1 px-3 mx-0.5 text-white rounded-md"
                          >
                            <FaEdit className="text-xl" />
                          </Link>
                          <button
                            onClick={() => handleDelete(store.id)}
                            className="btn bg-red-500 py-1 px-3 mx-0.5 text-white rounded-md"
                          >
                            <FaTrashAlt className="text-xl" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    Không có sản phẩm nào được lưu kho.
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

export default ProductStoreList;
