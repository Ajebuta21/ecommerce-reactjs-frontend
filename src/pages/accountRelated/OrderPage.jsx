import React, { useEffect, useState } from "react";
import GlobalStyle from "../../global/GlobalStyle";
import { useSelector } from "react-redux";
import api from "../../api/api";
import { Link } from "react-router-dom";
import { formatNaira } from "../../global/formatNaira";
import LoadingSpinner from "../../components/loader/LoadingSpinner";

const OrderPage = () => {
  const user = useSelector((state) => state.user.profile);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const getUserOrder = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/user-order/${user.id}`);
      setOrders(res.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserOrder();
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className={GlobalStyle.containerStatic}>
      <div className="w-full h-full flex flex-col bg-gray-100 px-5 lg:px-10 lg:p-10">
        <div className="w-full p-10 flex flex-col gap-5 items-center bg-white max-lg:mt-5">
          <div className="flex flex-col w-full font-light">
            <div className="py-1 border-b w-full">
              <h2 className={GlobalStyle.formHeader}>Orders</h2>
            </div>{" "}
            {loading ? (
              <div className={GlobalStyle.separatorCenter}>
                <LoadingSpinner />
              </div>
            ) : orders.length === 0 ? (
              <div className={GlobalStyle.separatorCenter}>
                <span>No orders yet.</span>
              </div>
            ) : (
              <div className="w-full flex flex-col mt-2 gap-2">
                {orders
                  .slice()
                  .reverse()
                  .map((item) => {
                    const totalCartQuantity = item.cart
                      ? item.cart.reduce(
                          (acc, cartItem) => acc + cartItem.cartQuantity,
                          0
                        )
                      : 0;

                    return (
                      <Link
                        to={`/user/order/${item.order_number}`}
                        key={item.order_number}
                        className="w-full p-2 bg-white hover:bg-secondary/5 transition-all ease-in-out duration-1000 gap-1 grid grid-cols-3"
                      >
                        <div className="w-full col-start-1 col-end-3 flex flex-col gap-0.5">
                          <div className="w-full flex items-center gap-2">
                            <span>{item.order_number}</span>{" "}
                          </div>
                          <span className="bg-secondary text-white py-0.5 px-2 rounded capitalize text-xs font-extralight w-fit">
                            {item.status}
                          </span>
                          <span className="text-xs">
                            Total Items: {totalCartQuantity}
                          </span>
                          <span className="text-xs">
                            on {new Date(item.created_at).toLocaleDateString()}{" "}
                            at {new Date(item.created_at).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="w-full col-start-3 row-start-1 row-end-3 flex justify-end items-center">
                          {formatNaira(item.total_price)}
                        </div>
                      </Link>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
