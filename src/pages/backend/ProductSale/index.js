import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductSaleService from "../../../services/ProductSaleService";
import {
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
const ProductSaleList = () => {
  const [productSales, setProductSales] = useState([]);

  useEffect(() => {
    // Fetch product sales data when the component mounts
    const fetchProductSales = async () => {
      const result = await ProductSaleService.index();
      console.log(result);
      setProductSales(result.product_sale);
    };

    fetchProductSales();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      await ProductSaleService.status(id);
      setProductSales((prevProductSales) =>
        prevProductSales.map((sale) =>
          sale.id === id
            ? { ...sale, status: currentStatus === 1 ? 2 : 1 }
            : sale
        )
      );
    } catch (error) {
      console.error("Error toggling product sale status:", error);
    }
  };

  const deleteProductSale = async (id) => {
    try {
      await ProductSaleService.delete(id);
      setProductSales((prevProductSales) =>
        prevProductSales.filter((sale) => sale.id !== id)
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
            Danh sách Khuyến mãi Sản phẩm
          </h1>
          <div className="flex space-x-4">
            <Link
              to="/admin/product_sale/create"
              className="btn bg-green-500 text-white py-2 px-4 rounded"
            >
              Thêm Khuyến mãi
            </Link>
            <Link
              to="/admin/product_sale/trash"
              className="btn bg-red-500 text-white py-2 px-4 rounded flex items-center"
            >
              <i className="fa fa-trash mr-2" /> Thùng rác
            </Link>
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
              {productSales &&
                productSales.length > 0 &&
                productSales.map((sale, index) => {
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
                          {/* Toggle Status Button */}
                          <button
                            onClick={() => toggleStatus(sale.id, sale.status)}
                            className={`btn py-1 px-3 mx-0.5 text-white rounded-md ${
                              sale.status === 1 ? "bg-green-500" : "bg-red-500"
                            }`}
                          >
                            {sale.status === 1 ? (
                              <FaToggleOn className="text-xl" />
                            ) : (
                              <FaToggleOff className="text-xl" />
                            )}
                          </button>
                          <Link
                            to={`/admin/product_sale/show/${sale.id}`}
                            className="btn bg-sky-500 py-1 px-3 mx-0.5 text-white rounded-md"
                          >
                            <FaEye className="text-xl" />
                          </Link>
                          <Link
                            to={`/admin/product_sale/edit/${sale.id}`}
                            className="btn bg-yellow-500 py-1 px-3 mx-0.5 text-white rounded-md"
                          >
                            <FaEdit className="text-xl" />
                          </Link>
                          {/* Delete Product Sale */}
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

export default ProductSaleList;
