import React, { useEffect, useState } from "react";
import GlobalStyle from "../../global/GlobalStyle";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useFetchUser from "../../global/useFetchUser";
import { formatNaira } from "../../global/formatNaira";
import PayStack from "../../images/paystack.png";
import PaystackPop from "@paystack/inline-js";
import api from "../../api/api";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/loader/LoadingSpinner";
import { clearCart } from "../../features/cartSlice";
import { fetchProducts } from "../../features/productsSlice";

const Checkout = () => {
  const user = useSelector((state) => state.user.profile);
  const cart = useSelector((state) => state.cart.items);
  const quantity = useSelector((state) => state.cart.totalQuantity);
  const regions = useSelector((state) => state.region.items);
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price =
        item.discount_price !== null ? item.discount_price : item.price;
      return total + price * item.cartQuantity;
    }, 0);
  };

  useEffect(() => {
    if (region !== "") {
      const fee = regions.find((i) => i.name === region);
      const newFee = fee ? parseFloat(fee.fee) : 0;
      setDeliveryFee(newFee);
    }
  }, [region, regions]);

  useFetchUser();

  const totalPrice = getTotalPrice();
  const grandTotal = totalPrice + deliveryFee;

  const initializePayment = async () => {
    if (user.phone === null || user.address === null) {
      toast.error("Please update your contact information");
    } else {
      if (region !== "") {
        setLoading(true);
        try {
          const response = await api.post("/paystack/initialize", {
            email: user.email,
            amount: parseInt(grandTotal),
          });
          console.log(response.data.data);

          const { reference } = response.data.data;

          const popup = new PaystackPop();
          popup.newTransaction({
            key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
            reference,
            email: user.email,
            amount: parseInt(grandTotal) * 100,
            onSuccess: async (transaction) => {
              setLoading(true);
              try {
                await api.post("/order-store", {
                  cart: cart,
                  subtotal_price: totalPrice,
                  delivery_fee: deliveryFee,
                  region: region,
                  user_id: user.id,
                  reference: transaction.reference,
                });
                toast.success(`Payment successful and order has been created`);
                dispatch(fetchProducts());
                dispatch(clearCart());
                navigate("/");
              } catch (error) {
                console.log(error);
              } finally {
                setLoading(false);
              }
            },
            onCancel: () => {
              toast.error("Payment was canceled!");
            },
          });
        } catch (error) {
          console.error("Transaction initialization failed:", error);
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        toast.error("Please select a delivery region");
      }
    }
  };

  return (
    <div className={GlobalStyle.container}>
      <div className="w-full min-h-screen bg-gray-100">
        <div className={GlobalStyle.separator}>
          <h2 className={GlobalStyle.formHeader}>Checkout</h2>
        </div>
        <div className={GlobalStyle.separatorX}>
          <div className="flex max-lg:flex-col gap-5">
            <div className="w-full lg:w-3/4 flex flex-col mb-5 gap-5">
              <div className="w-full p-10 flex flex-col bg-white">
                <div className="py-1 border-b w-full">
                  <h2 className={GlobalStyle.formHeader}>Customer Address</h2>
                </div>
                {user.phone === null || user.address === null ? (
                  <Link
                    to={`/user/update-contact-details`}
                    className={GlobalStyle.fullButton}
                  >
                    Update Contact Information
                  </Link>
                ) : (
                  <>
                    <div className={GlobalStyle.columnUser}>
                      <span>Name:</span>
                      <span>{user.name}</span>
                    </div>
                    <div className={GlobalStyle.columnUser}>
                      <span>Email:</span>
                      <span className="text-right">{user.email}</span>
                    </div>
                    <div className={GlobalStyle.columnUser}>
                      <span>Address:</span>
                      <span className="text-right">{user.address}</span>
                    </div>
                    <div className={GlobalStyle.columnUser}>
                      <span>Phone number:</span>
                      <span>{user.phone}</span>
                    </div>
                  </>
                )}
              </div>
              <div className="w-full p-10 flex flex-col bg-white">
                <div className="py-1 border-b w-full">
                  <h2 className={GlobalStyle.formHeader}>Delivery Details</h2>
                </div>
                <div className={GlobalStyle.columnUser}>
                  <span>Select Region:</span>
                  <span>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className={GlobalStyle.inputThree}
                    >
                      <option value="" disabled>
                        Select delivery region
                      </option>
                      {regions.map((item) => {
                        return (
                          <option key={item.id} value={item.name}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </span>
                </div>
                <div className={GlobalStyle.columnUser}>
                  <span>Fee:</span>
                  <span>{formatNaira(deliveryFee)}</span>
                </div>
              </div>
              <div className="w-full p-10 flex flex-col bg-white">
                <div className="py-1 border-b w-full">
                  <h2 className={GlobalStyle.formHeader}>Payment Method</h2>
                </div>
                <div className={GlobalStyle.columnUser}>
                  <span>Pay with Cards, Bank Transfer or USSD:</span>
                  <span>
                    <img src={PayStack} alt="" className="w-20" />
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/4 h-fit flex flex-col border p-3 text-sm shadow mb-5 bg-white">
              <h2 className={GlobalStyle.formHeader}>Order Summary</h2>
              <div className={GlobalStyle.column}>
                <span>Item's total ({quantity}):</span>
                <span>{formatNaira(totalPrice)}</span>
              </div>
              <div className={GlobalStyle.column}>
                <span>Delivery fee:</span>
                <span>{formatNaira(deliveryFee)}</span>
              </div>
              <div className={GlobalStyle.column}>
                <span>Total:</span>
                <span>{formatNaira(grandTotal)}</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={initializePayment}
                  className={GlobalStyle.fullButton}
                >
                  {loading ? <LoadingSpinner /> : "Proceed to checkout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
