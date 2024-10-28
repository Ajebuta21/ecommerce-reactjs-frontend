import React, { useEffect, useState } from "react";
import api from "../../api/api";
import GlobalStyle from "../../global/GlobalStyle";
import { formatNaira } from "../../global/formatNaira";
import LoadingSpinner from "../../components/loader/LoadingSpinner";
import { Link } from "react-router-dom";

const ManageOrder = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getAllOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
    // eslint-disable-next-line
  }, []);

  const filteredOrders = orders.filter((item) => {
    return (
      item.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reference.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className={GlobalStyle.containerAdmin}>
      <div className={GlobalStyle.adminWrap}>
        <div className="flex flex-col w-full gap-5">
          <h1 className={GlobalStyle.formHeader}>Manage orders</h1>
          <div className="w-full flex justify-between items-center">
            <span className="text-xs font-light">{orders.length} orders</span>
          </div>
          <div className={GlobalStyle.separatorCenter}>
            <input
              type="text"
              className={GlobalStyle.inputTwo}
              placeholder="Search order by order number or reference"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {loading ? (
            <div className={GlobalStyle.separatorCenter}>
              <LoadingSpinner />
            </div>
          ) : orders.length === 0 ? (
            <div className={GlobalStyle.separatorCenter}>
              <span className="text-xs">No orders yet.</span>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className={GlobalStyle.separatorCenter}>
              <span className="text-xs">
                No orders found matching your search.
              </span>
            </div>
          ) : (
            <div className="w-full flex flex-col border-t border-x">
              {filteredOrders
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
                      to={`/admin/view-order/${item.order_number}`}
                      key={item.order_number}
                      className="w-full p-2 bg-white hover:bg-secondary/5 transition-all ease-in-out duration-1000 border-b gap-1 grid grid-cols-3"
                    >
                      <div className="w-full col-start-1 col-end-3 flex flex-col gap-0.5">
                        <div className="w-full flex items-center gap-2">
                          <span>{item.order_number}</span>{" "}
                          <span className="bg-secondary text-white py-0.5 px-2 rounded capitalize text-xs font-extralight">
                            {item.status}
                          </span>
                        </div>
                        <span className="text-xs">
                          Total Items: {totalCartQuantity}
                        </span>
                        <span className="text-xs">
                          on {new Date(item.created_at).toLocaleDateString()} at{" "}
                          {new Date(item.created_at).toLocaleTimeString()}
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
  );
};

export default ManageOrder;
