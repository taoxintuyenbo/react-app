import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import useParams for routing
import CategoryService from "../../../services/CategoryService"; // Import your service

const ShowCategory = () => {
  const { id } = useParams(); // Get category ID from URL parameters
  const [category, setCategory] = useState({});
  const [parentCategory, setParentCategory] = useState(null); // State for parent category
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const result = await CategoryService.show(id); // Fetch category data
        setCategory(result.category);

        // If the category has a parent_id, fetch the parent category details
        if (result.category.parent_id) {
          const parentResult = await CategoryService.show(
            result.category.parent_id
          );
          setParentCategory(parentResult.category.name); // Set parent category's name
        }
      } catch (err) {
        setError("Failed to load category data.");
      }
    };

    fetchCategory();
  }, [id]);

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Chi tiết Danh mục</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Category Details */}
        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-2">{category.name}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>ID:</strong> {category.id}
            </p>
            <p>
              <strong>Slug:</strong> {category.slug}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {category.status === 1 ? "Hiển thị" : "Ẩn"}
            </p>
            <p>
              <strong>Danh mục cha:</strong>{" "}
              {parentCategory ? parentCategory : "Không có"}
            </p>
            <p className="col-span-2">
              <strong>Mô tả:</strong> {category.description}
            </p>

            <p>
              <strong>Ngày tạo:</strong>{" "}
              {new Date(category.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Ngày cập nhật:</strong>{" "}
              {new Date(category.updated_at).toLocaleString()}
            </p>
          </div>

          {/* Category Image */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Hình ảnh</h3>
            <div className="flex flex-wrap gap-4">
              {category.image ? (
                <img
                  src={`${category.image}`} // Adjust image path
                  alt={category.name}
                  className="w-32 h-32 object-cover rounded-md"
                />
              ) : (
                <p>Không có hình ảnh</p>
              )}
            </div>
          </div>
        </div>

        <Link
          to="/admin/categories"
          className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block"
        >
          Quay lại
        </Link>
      </div>
    </section>
  );
};

export default ShowCategory;
