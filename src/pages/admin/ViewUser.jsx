import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/api";
import GlobalStyle from "../../global/GlobalStyle";
import LoadingSpinner from "../../components/loader/LoadingSpinner";
import { formatNaira } from "../../global/formatNaira";
import toast from "react-hot-toast";

const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [role, setRole] = useState("");

  const getUser = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/user/${id}`);
      setUser(res.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const getUserOrder = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/user-order/${id}`);
      setOrders(res.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserOrder();
    if (user) {
      setRole(user.role);
    }
    // eslint-disable-next-line
  }, [user]);

  const changeRole = async (e) => {
    e.preventDefault();
    setLoading(false);
    try {
      const res = await api.post(`/user-role/${id}`, { role });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={GlobalStyle.containerAdmin}>
      <div className={GlobalStyle.adminWrap}>
        {loading ? (
          <div className={GlobalStyle.separatorCenter}>
            <LoadingSpinner />
          </div>
        ) : (
          <div className="w-full p-10 flex flex-col gap-5 items-center bg-white ">
            <div className="flex flex-col w-full font-light">
              <div className="py-1 border-b w-full">
                <h2 className={GlobalStyle.formHeader}>Account Information</h2>
              </div>
              <div className={GlobalStyle.columnUser}>
                <span>Name:</span>
                <span className="capitalize">{user.name}</span>
              </div>
              <div className={GlobalStyle.columnUser}>
                <span>Email:</span>
                <span>{user.email}</span>
              </div>
              <div className={GlobalStyle.columnUser}>
                <span>Role:</span>
                <span className="capitalize">{user.role}</span>
              </div>
              <div className={GlobalStyle.columnUser}>
                <span>Created on:</span>
                <span>{new Date(user.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex flex-col w-full font-light">
              <div className="py-1 border-b w-full">
                <h2 className={GlobalStyle.formHeader}>Change role</h2>
              </div>
              <form
                onSubmit={changeRole}
                className="w-full py-2 flex justify-between items-center gap-5"
              >
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={GlobalStyle.inputThree}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <button className={GlobalStyle.smallButton}>Change</button>
              </form>
            </div>
            <div className="flex flex-col w-full font-light">
              <div className="py-1 border-b w-full">
                <h2 className={GlobalStyle.formHeader}>Contact Information</h2>
              </div>
              <div className={GlobalStyle.columnUser}>
                <span>Address:</span>
                <span className="text-right">
                  {user.address === null ? "No address" : user.address}
                </span>
              </div>
              <div className={GlobalStyle.columnUser}>
                <span>Phone number:</span>
                <span>{user.phone === null ? "No contact" : user.phone}</span>
              </div>
            </div>
            <div className="flex flex-col w-full font-light">
              <div className="py-1 border-b w-full">
                <h2 className={GlobalStyle.formHeader}>Orders</h2>
              </div>{" "}
              {orders.length === 0 ? (
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
                          to={`/admin/view-order/${item.order_number}`}
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
                              on{" "}
                              {new Date(item.created_at).toLocaleDateString()}{" "}
                              at{" "}
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
        )}
      </div>
    </div>
  );
};

export default ViewUser;
