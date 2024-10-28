import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import GlobalStyle from "../../global/GlobalStyle";
import { formatNaira } from "../../global/formatNaira";
import LoadingSpinner from "../../components/loader/LoadingSpinner";

const ViewUserOrder = () => {
  const { order_number } = useParams();
  const [order, setOrder] = useState({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const cart = order?.cart || [];

  const getOrder = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/order/${order_number}`);
      setOrder(res.data[0]);
      setStatus(res.data[0]?.status || "");
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrder();
    // eslint-disable-next-line
  }, []);

  const totalCartQuantity = order?.cart
    ? order?.cart.reduce((acc, cartItem) => acc + cartItem.cartQuantity, 0)
    : 0;

  if (loading) {
    return (
      <div className={GlobalStyle.containerStatic}>
        <div className="w-full h-full flex flex-col bg-gray-100 px-5 lg:px-10 lg:p-10">
          <div className="flex flex-col w-full gap-5">
            <h1 className={GlobalStyle.formHeader}>{order_number}</h1>
          </div>
          <div className={GlobalStyle.separatorXCenter}>
            <LoadingSpinner />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={GlobalStyle.containerStatic}>
      <div className="w-full h-full flex flex-col bg-gray-100 px-5 lg:px-10 lg:p-10">
        {order && (
          <div className="flex flex-col w-full gap-5">
            <h1 className={GlobalStyle.formHeader}>{order_number}</h1>
            <div className="w-full flex max-lg:flex-col gap-5">
              <div className="w-full p-10 flex flex-col bg-white text-sm">
                <div className="py-1 border-b w-full">
                  <h2 className={GlobalStyle.formHeader}>Order Details</h2>
                </div>
                <div className={GlobalStyle.columnUser}>
                  <span>Reference:</span>
                  <span>{order.reference}</span>
                </div>
                <div className={GlobalStyle.columnUser}>
                  <span>Status:</span>
                  <span className="capitalize">{status}</span>
                </div>
                <div className={GlobalStyle.columnUser}>
                  <span>Subtotal:</span>
                  <span>{formatNaira(order.subtotal_price)}</span>
                </div>
                <div className={GlobalStyle.columnUser}>
                  <span>Delivery Fee:</span>
                  <span>{formatNaira(order.delivery_fee)}</span>
                </div>
                <div className={GlobalStyle.columnUser}>
                  <span>Total Price:</span>
                  <span>{formatNaira(order.total_price)}</span>
                </div>
              </div>
              <div className="w-full p-10 flex flex-col bg-white text-sm">
                <div className="py-1 border-b w-full">
                  <h2 className={GlobalStyle.formHeader}>Delivery Details</h2>
                </div>
                <div className={GlobalStyle.columnUser}>
                  <span>Email:</span>
                  <span>{order.user_email}</span>
                </div>
                <div className={GlobalStyle.columnUser}>
                  <span>Phone Number:</span>
                  <span>{order.user_phone_number}</span>
                </div>
                <div className={GlobalStyle.columnUser}>
                  <span>Address:</span>
                  <span className="text-right">{order.user_address}</span>
                </div>
                <div className={GlobalStyle.columnUser}>
                  <span>Region:</span>
                  <span>{order.region}</span>
                </div>
              </div>
            </div>
            <div className="w-full p-10 flex flex-col bg-white">
              <div className="py-1 border-b w-full">
                <h2 className={GlobalStyle.formHeader}>Cart Details</h2>
              </div>
              {cart.map((item, index) => {
                const price = item.discount_price ?? item.price;
                return (
                  <div
                    key={index}
                    className="w-full py-2 grid grid-cols-2 text-sm"
                  >
                    <div className="w-full capitalize">{item.name}</div>
                    <div className="w-full row-start-1 row-end-3 col-start-2 flex items-center justify-end">
                      {formatNaira(price)}
                    </div>
                    <div className="w-full">Quantity: {item.cartQuantity}</div>
                  </div>
                );
              })}
              <div className="w-full py-3 border-y grid grid-cols-2 gap-1 text-xs">
                <div className="w-full">Total ({totalCartQuantity}):</div>
                <div className="w-full text-end">
                  {formatNaira(order.subtotal_price)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewUserOrder;
