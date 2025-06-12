import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Import for routing and navigation
import ProductImageService from "../../../services/ProductImageService"; // Import ProductImageService

const EditProductImage = () => {
  const { id } = useParams(); // Get product image ID from URL parameters
  const [productImage, setProductImage] = useState({
    product_id: "",
    thumbnail: "",
  });
  const [selectedImage, setSelectedImage] = useState(null); // Image file state for selected new image
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // To redirect after successful edit

  // Fetch product image details when the component loads
  useEffect(() => {
    const fetchProductImage = async () => {
      try {
        const result = await ProductImageService.show(id); // Fetch product image data by ID
        setProductImage(result.productImage); // Set the product image data
      } catch (err) {
        setError("Failed to load product image data.");
      }
    };

    fetchProductImage();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductImage({
      ...productImage,
      [name]: value,
    });
  };

  // Handle image file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setSelectedImage(file); // Set the new image file
  };

  // Handle form submission to update the product image
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Form data to send
    formData.append("product_id", productImage.product_id);

    // Append new image if selected
    if (selectedImage) {
      formData.append("thumbnail", selectedImage);
    }

    try {
      console.log(await ProductImageService.update(id, formData)); // Send the update request
      navigate("/admin/product_image"); // Redirect after successful update
      window.location.reload(); // Reload the page
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors); // Set validation errors
      } else {
        setError("Error updating product image. Please try again.");
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">
          Chỉnh sửa Hình ảnh Sản phẩm
        </h1>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 gap-4">
              {/* Product ID */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-1"
                  htmlFor="product_id"
                >
                  ID Sản phẩm
                </label>
                <input
                  type="text"
                  id="product_id"
                  name="product_id"
                  value={productImage.product_id}
                  onChange={handleChange}
                  className={`border border-gray-300 p-2 w-full ${
                    errors.product_id ? "border-red-500" : ""
                  }`}
                  disabled // Assuming product_id should not be changed
                />
                {errors.product_id && (
                  <span className="text-red-500 text-sm">
                    {errors.product_id}
                  </span>
                )}
              </div>

              {/* Thumbnail Upload */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="thumbnail">
                  Hình ảnh (thumbnail)
                </label>
                <input
                  type="file"
                  id="thumbnail"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="border border-gray-300 p-2 w-full"
                />
                {errors.thumbnail && (
                  <span className="text-red-500 text-sm">
                    {errors.thumbnail}
                  </span>
                )}

                {/* Preview of current image */}
                {productImage.thumbnail && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Hình ảnh hiện tại:
                    </h3>
                    <img
                      src={productImage.thumbnail}
                      alt="Current Thumbnail"
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  </div>
                )}

                {/* Preview of selected image */}
                {selectedImage && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Hình ảnh mới:
                    </h3>
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="New Thumbnail"
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-4 mt-4">
              <button
                type="submit"
                className="btn bg-green-500 text-white py-2 px-4 rounded"
              >
                Cập nhật Hình ảnh
              </button>
              <Link
                to="/admin/product_image"
                className="btn bg-blue-500 text-white py-2 px-4 rounded"
              >
                Quay lại
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProductImage;
