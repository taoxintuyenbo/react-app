import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { REMOVE, UPDATE } from "../../../redux/action/cartAction";

function CartItem(props) {
  const dispatch = useDispatch();

  const removeItem = (item) => {
    dispatch(REMOVE(item));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return; // Prevent quantity below 1
    dispatch(UPDATE({ id, quantity, name: props.item.name }));
  };

  return (
    <tr key={props.item.id} className="border-b border-gray-200">
      <td className="px-4 py-2">
        <img
          src={props.item.images[0].thumbnail}
          alt={props.item.name}
          className="w-20 h-20 object-cover"
        />
      </td>
      <td className="px-4 py-2 text-sm">{props.item.name}</td>
      <td className="px-4 py-2 text-sm">${props.item.price.toFixed(2)}</td>
      <td className="px-4 py-2 text-sm">
        <div className="flex items-center">
          <button
            className="px-2 py-1 bg-gray-300 rounded-l hover:bg-gray-400"
            onClick={() =>
              updateQuantity(props.item.id, props.item.quantity - 1)
            }
          >
            -
          </button>
          <input
            type="number"
            className="w-12 text-center border"
            value={props.item.quantity}
            onChange={(e) =>
              updateQuantity(props.item.id, parseInt(e.target.value, 10))
            }
          />
          <button
            className="px-2 py-1 bg-gray-300 rounded-r hover:bg-gray-400"
            onClick={() =>
              updateQuantity(props.item.id, props.item.quantity + 1)
            }
          >
            +
          </button>
        </div>
      </td>
      <td className="px-4 py-2 text-sm">
        ${(props.item.price * props.item.quantity).toFixed(2)}
      </td>
      <td className="px-2 py-2 text-center">
        <button
          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
          onClick={() => removeItem(props.item)}
        >
          <FaTrashAlt className="text-xl" />{" "}
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
