import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductService from "../../../services/ProductService";
import {
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await ProductService.index();
      setProducts(result.products);
      console.log(result.products);
    })();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      await ProductService.status(id);

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id
            ? { ...product, status: currentStatus === 1 ? 2 : 1 }
            : product
        )
      );
    } catch (error) {
      console.error("Error toggling product status:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await ProductService.delete(id); // Call ProductService delete method
      // Remove the deleted product from the UI
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Danh sách Sản phẩm</h1>
          <div className="flex space-x-4">
            <Link
              to="/admin/product/create"
              className="btn bg-green-500 text-white py-2 px-4 rounded"
            >
              Thêm Sản phẩm
            </Link>
            <a
              href="/admin/product/trash"
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
              {products &&
                products.length > 0 &&
                products.map((product, index) => {
                  return (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="text-center">
                        <input
                          type="checkbox"
                          name="product_checkbox"
                          value={product.id}
                        />
                      </td>
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
                            onClick={() =>
                              toggleStatus(product.id, product.status)
                            }
                            className={`btn py-1 px-3 mx-0.5 text-white rounded-md ${
                              product.status === 1
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          >
                            {product.status === 1 ? (
                              <FaToggleOn className="text-xl" />
                            ) : (
                              <FaToggleOff className="text-xl" />
                            )}
                          </button>

                          <Link
                            to={`/admin/product/show/${product.id}`}
                            className="bg-blue-500 py-1 px-3 mx-0.5 text-white rounded-md"
                          >
                            <FaEye className="text-xl" />
                          </Link>
                          <Link
                            to={`/admin/product/edit/${product.id}`}
                            className="bg-yellow-500 py-1 px-3 mx-0.5 text-white rounded-md"
                          >
                            <FaEdit className="text-xl" />
                          </Link>
                          {/* Change from Link to button for delete */}
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="bg-red-500 py-1 px-3 mx-0.5 text-white rounded-md"
                          >
                            <FaTrashAlt className="text-xl" />
                          </button>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {product.id}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
