import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductSaleService from "../../../services/ProductSaleService";
import { FaTrashRestore, FaTrashAlt } from "react-icons/fa";

const TrashProductSaleList = () => {
  const [trashedSales, setTrashedSales] = useState([]);

  useEffect(() => {
    // Fetch trashed product sales data when the component mounts
    const fetchTrashedSales = async () => {
      const result = await ProductSaleService.trash();
      setTrashedSales(result.product_sales);
    };

    fetchTrashedSales();
  }, []);

  const restoreProductSale = async (id) => {
    try {
      await ProductSaleService.restore(id);
      setTrashedSales((prevSales) =>
        prevSales.filter((sale) => sale.id !== id)
      );
    } catch (error) {
      console.error("Error restoring product sale:", error);
    }
  };

  const deleteProductSale = async (id) => {
    try {
      await ProductSaleService.destroy(id);
      setTrashedSales((prevSales) =>
        prevSales.filter((sale) => sale.id !== id)
      );
    } catch (error) {
      console.error("Error deleting product sale:", error);
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">
            Danh sách Khuyến mãi trong Thùng rác
          </h1>
          <Link
            to="/admin/product_sale"
            className="btn bg-blue-500 text-white py-2 px-4 rounded"
          >
            Quay lại Danh sách Khuyến mãi
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
                  Giá khuyến mãi
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Ngày bắt đầu
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Ngày kết thúc
                </th>
                <th className="border border-gray-300 px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {trashedSales &&
                trashedSales.length > 0 &&
                trashedSales.map((sale, index) => {
                  return (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {sale.product_name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {sale.price_sale} VND
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(sale.date_begin).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(sale.date_end).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex space-x-2">
                          {/* Restore Button */}
                          <button
                            onClick={() => restoreProductSale(sale.id)}
                            className="bg-green-500 py-1 px-3 mx-0.5 text-white rounded-md"
                          >
                            <FaTrashRestore className="text-xl" />
                          </button>

                          {/* Permanently Delete Button */}
                          <button
                            onClick={() => deleteProductSale(sale.id)}
                            className="bg-red-500 py-1 px-3 mx-0.5 text-white rounded-md"
                          >
                            <FaTrashAlt className="text-xl" />
                          </button>
                        </div>
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

export default TrashProductSaleList;
