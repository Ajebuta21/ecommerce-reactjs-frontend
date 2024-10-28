import React from "react";
import GlobalStyle from "../../global/GlobalStyle";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/api";
import { removeUser } from "../../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaBox, FaUserEdit } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { RiAdminFill, RiLockPasswordFill } from "react-icons/ri";
import { TiUserDelete } from "react-icons/ti";
import useFetchUser from "../../global/useFetchUser";

const AccountPage = () => {
  const user = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useFetchUser();

  const logoutUser = async () => {
    const logoutPromise = api
      .post("logout")
      .then(() => {
        dispatch(removeUser());
        localStorage.removeItem("access_token");
        navigate("/");
      })
      .catch((error) => {
        dispatch(removeUser());
        localStorage.removeItem("access_token");
        navigate("/");
      });

    toast.promise(logoutPromise, {
      loading: "Logging out...",
      success: "Logout successful!",
      error: "Logout failed. Please try again.",
    });
  };

  return (
    <div className={GlobalStyle.container}>
      <div className="w-full min-h-screen flex max-lg:flex-col lg:flex-row-reverse bg-gray-100 max-lg:gap-5 p-2 lg:p-10">
        <div className="w-full lg:h-full flex justify-center items-center">
          <div className="w-11/12 p-10 flex flex-col gap-5 items-center bg-white max-lg:mt-5">
            <div className="flex flex-col w-full font-light">
              <div className="py-1 border-b w-full">
                <h2 className={GlobalStyle.formHeader}>Account Information</h2>
              </div>
              <div className={GlobalStyle.columnUser}>
                <span>Name:</span>
                <span>{user.name}</span>
              </div>
              <div className={GlobalStyle.columnUser}>
                <span>Email:</span>
                <span>{user.email}</span>
              </div>
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
          </div>
        </div>
        <div className="w-full lg:h-full flex justify-center lg:items-center">
          <div className="w-11/12 flex flex-col bg-white h-fit p-10 mb-5">
            <div>
              <div className="py-1 border-b w-full">
                <h2 className={GlobalStyle.formHeader}>My ShopSmart account</h2>
              </div>
            </div>
            <Link to={`/user/order`} className={GlobalStyle.accountLink}>
              <FaBox />
              <span>My orders</span>
            </Link>
            <Link to={`/user/wishlist`} className={GlobalStyle.accountLink}>
              <MdFavorite />
              <span>My wish-list</span>
            </Link>
            {user.role === "admin" && (
              <Link to={`/admin/dashboard`} className={GlobalStyle.accountLink}>
                <RiAdminFill />
                <span>Admin dashboard</span>
              </Link>
            )}
            <div>
              <div className="py-1 border-b w-full">
                <h2 className={GlobalStyle.formHeader}>Account settings</h2>
              </div>
            </div>
            <Link
              to={`/user/update-account-details`}
              className={GlobalStyle.accountLink}
            >
              <FaUserEdit />
              <span>Update account information</span>
            </Link>
            <Link
              to={`/user/update-contact-details`}
              className={GlobalStyle.accountLink}
            >
              <FaUserEdit />
              <span>Update contact information</span>
            </Link>
            <Link
              to={`/user/update-password`}
              className={GlobalStyle.accountLink}
            >
              <RiLockPasswordFill />
              <span>Update password</span>
            </Link>
            <button className={GlobalStyle.accountLink}>
              <TiUserDelete />
              <span>Delete account</span>
            </button>
            <div className="py-5">
              <button className={GlobalStyle.fullButton} onClick={logoutUser}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
