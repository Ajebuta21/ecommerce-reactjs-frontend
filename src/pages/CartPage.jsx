import React, { useState } from "react";
import GlobalStyle from "../global/GlobalStyle";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { formatNaira } from "../global/formatNaira";
import {
  clearCart,
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItemFromCart,
} from "../features/cartSlice";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import api from "../api/api";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/loader/LoadingSpinner";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.items);
  const quantity = useSelector((state) => state.cart.totalQuantity);
  const auth = useSelector((state) => state.user.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price =
        item.discount_price !== null ? item.discount_price : item.price;
      return total + price * item.cartQuantity;
    }, 0);
  };

  const checkCart = async () => {
    setLoading(true);
    try {
      await api.post("/check-cart", { cart });
      navigate("/checkout");
    } catch (error) {
      if (!auth) {
        navigate("/login");
        toast.error("Please login befor proceeding");
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className={GlobalStyle.containerStatic}>
        <div className="w-64 h-64 flex flex-col justify-center items-center gap-5 p-3">
          <h2 className="text-xl font-semibold">Your cart is empty!</h2>
          <MdOutlineRemoveShoppingCart className="text-5xl" />
          <Link
            to="/"
            className="text-xs text-center hover:text-primary transition-all ease-in-out duration-1000"
          >
            Go back to the store and add some <br /> items to your cart.
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={GlobalStyle.container}>
      <div className={GlobalStyle.separator}>
        <h2 className={GlobalStyle.formHeader}>Your Cart</h2>
      </div>
      <div className={GlobalStyle.separatorX}>
        <div className="flex max-lg:flex-col gap-5">
          <div className="w-full lg:w-3/4 flex flex-col mb-5">
            {cart.map((item) => {
              return (
                <div
                  key={item.name}
                  className="w-full border-b p-2 text-xs lg:text-sm flex flex-col gap-2"
                >
                  <div className="w-full flex gap-1 h-8 lg:h-10">
                    <img
                      src={item.image_one}
                      alt={item.name}
                      className="w-8 h-full lg:w-10"
                    />
                    <div className="w-full h-full flex items-center capitalize">
                      {item.name}
                    </div>
                    <div className="w-2/5 h-full flex items-center justify-end">
                      {item.discount_price === null
                        ? formatNaira(item.price * item.cartQuantity)
                        : formatNaira(item.discount_price * item.cartQuantity)}
                    </div>
                  </div>
                  <div className="w-full flex justify-between items-center h-8 lg:h-10">
                    <div className="h-full flex items-center">
                      Quantity: {item.cartQuantity}
                    </div>
                    <div className="flex items-center gap-5">
                      <button
                        onClick={() => dispatch(decreaseItemQuantity(item.id))}
                        className={GlobalStyle.weightButton}
                      >
                        <FaCaretLeft />
                      </button>
                      <span className="font-semibold">{item.cartQuantity}</span>
                      <button
                        onClick={() => dispatch(increaseItemQuantity(item.id))}
                        className={GlobalStyle.weightButton}
                      >
                        <FaCaretRight />
                      </button>
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-center">
                    <button
                      onClick={() => dispatch(removeItemFromCart(item.id))}
                      className={GlobalStyle.fullButton}
                    >
                      Remove item
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="p-2 flex justify-center w-full">
              <button
                className={GlobalStyle.smallButton}
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/4 h-fit flex flex-col border p-3 text-sm shadow mb-5">
            <h2 className={GlobalStyle.formHeader}>cart Summary</h2>
            <div className={GlobalStyle.column}>
              <span>Total quantity:</span>
              <span>{quantity}</span>
            </div>
            <div className={GlobalStyle.column}>
              <span>Subtotal:</span>
              <span>{formatNaira(getTotalPrice())}</span>
            </div>
            <div className="pt-2">
              <button onClick={checkCart} className={GlobalStyle.fullButton}>
                {loading ? <LoadingSpinner /> : "Proceed to checkout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
