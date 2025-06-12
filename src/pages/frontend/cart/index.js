import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CLEAR, TOTAL } from "../../../redux/action/cartAction";
import CartItem from "./cartItem";

function Cart() {
  const dispatch = useDispatch();
  dispatch(TOTAL());

  const clearCart = () => {
    dispatch(CLEAR());
  };

  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => state.cart.carts);

  return (
    <div className="container mx-auto my-4 px-4">
      {cartItems.length === 0 ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold">Giỏ hàng của bạn trống</h2>
          <p className="text-lg">
            Tiếp tục mua sắm{" "}
            <Link to="/san-pham" className="text-blue-500">
              tại đây
            </Link>
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-center text-2xl font-bold mb-4">Giỏ Hàng</h1>
          <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full bg-white table-auto">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Hình ảnh</th>
                  <th className="px-4 py-2 text-left">Sản phẩm</th>
                  <th className="px-4 py-2 text-left">Đơn giá</th>
                  <th className="px-4 py-2 text-left">Số lượng</th>
                  <th className="px-4 py-2 text-left">Thành tiền</th>
                  <th className="px-4 py-2 text-left">Xóa</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((e) => (
                  <CartItem key={e.id} item={e} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <h4 className="text-xl font-semibold">
              Tổng cộng: ${totalAmount.toFixed(2)}
            </h4>
            <div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
                onClick={() => clearCart()}
              >
                Xóa Giỏ Hàng
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                <Link to="/thanh-toan">Thanh toán</Link>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
