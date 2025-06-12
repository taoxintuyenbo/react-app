import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD } from "../../../redux/action/cartAction";

import ProductService from "../../../services/ProductService";
import ProductCard from "../../../components/ProductCard";

const ProductDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [relevantProducts, setRelevantProducts] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(""); // Trạng thái hiển thị thông báo thành công
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1); // Số lượng sản phẩm cần thêm vào giỏ

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);

        const response = await ProductService.detail(slug);
        setProduct(response.product);
        setRelevantProducts(response.relevant_products || []);
      } catch (err) {
        setError("Không thể tải thông tin sản phẩm.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetail();
  }, [slug]);

  const handleAddToCart = (amountItem) => {
    if (amountItem < 1) {
      alert("Số lượng phải lớn hơn 0");
      return;
    }

    const productToCart = {
      ...product,
      amount: amountItem,
    };

    dispatch(ADD(productToCart));
    setSuccess(
      `Đã thêm ${product.name} (x${amountItem}) vào giỏ hàng thành công!`
    );
    setTimeout(() => setSuccess(""), 3000); // Xóa thông báo sau 3 giây
  };

  if (loading) return <div className="text-center">Đang tải...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!product)
    return (
      <div className="text-center text-gray-500">Không tìm thấy sản phẩm</div>
    );

  return (
    <div className="container mx-auto my-8 p-4">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
        <div className="flex-shrink-0">
          <img
            src={
              product.images?.[currentImage]?.thumbnail ||
              "/path/to/default-image.jpg"
            }
            alt={product.name}
            className="w-96 h-96 object-cover"
          />
          <div className="flex mt-4 space-x-2 overflow-x-auto">
            {product.images?.map((image, index) => (
              <img
                key={index}
                src={image.thumbnail}
                alt={`Hình ${index + 1}`}
                onClick={() => setCurrentImage(index)}
                className={`w-20 h-20 object-cover cursor-pointer border ${
                  index === currentImage ? "border-blue-500" : "border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-500 mb-4">Giá: {product.price} VND</p>
          {product.salePrice && (
            <p className="text-lg text-red-500 mb-4">
              Giá khuyến mãi: {product.salePrice} VND
            </p>
          )}
          <p className="text-lg mb-4">{product.detail}</p>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded w-16 text-center"
              min="1"
            />
            <button
              onClick={() => handleAddToCart(quantity)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
          {/* Hiển thị thông báo thành công */}
          {success && <div className="text-green-500 mt-4">{success}</div>}
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Sản phẩm liên quan</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relevantProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
