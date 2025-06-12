import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initCart = {
  carts: [],
  amountItem: 0,
  totalAmount: 0,
};

const cartReducer = (state = initCart, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        const updatedCart = state.carts.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.amount }
            : item
        );
        toast.info(`Increase amount ${action.payload.name}`, {
          position: "bottom-right",
          autoClose: 2000,
        });
        return {
          ...state,
          carts: updatedCart,
          amountItem: state.amountItem,
        };
      } else {
        toast.success(`Add ${action.payload.name} to cart`, {
          position: "bottom-right",
          autoClose: 2000,
        });
        return {
          ...state,
          carts: [
            ...state.carts,
            { ...action.payload, quantity: action.payload.amount },
          ],
          amountItem: state.amountItem + 1,
        };
      }
    // case "TOTAL_CART":
    //   let total = 0;
    //   state.carts.map((item) => {
    //     total += item.price * item.quantity;
    //   });
    //   const newState = {
    //     ...state,
    //     totalAmount: total,
    //   };
    //   return newState;
    case "TOTAL_CART":
      let total = 0;
      state.carts.forEach((item) => {
        total += item.price * item.quantity;
      });
      const newState = {
        ...state,
        totalAmount: total,
      };
      return newState;
    case "REMOVE_ITEM_CART":
      toast.warning(`Removed ${action.payload.name} from cart`, {
        position: "bottom-right",
        autoClose: 2000,
      });
      return {
        ...state,
        carts: state.carts.filter((item) => item.id !== action.payload.id),
      };
    case "CLEAR_CART":
      return {
        ...state,
        carts: [],
      };
    case "UPDATE_CART":
      const updatedCartItems = state.carts.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      // Calculate total quantity of items
      const updatedAmountItem = updatedCartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      toast.info(`Updated ${action.payload.name} quantity`, {
        position: "bottom-right",
        autoClose: 2000,
      });

      return {
        ...state,
        carts: updatedCartItems,
        amountItem: updatedAmountItem,
      };

    default:
      return state;
  }
};

export default cartReducer;
