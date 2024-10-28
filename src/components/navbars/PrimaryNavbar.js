import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo/ss.png";
import { MdShoppingCart, MdAccountCircle, MdSearch } from "react-icons/md";
import { useSelector } from "react-redux";
import GlobalStyle from "../../global/GlobalStyle";

const PrimaryNavbar = () => {
  const auth = useSelector((state) => state.user.auth);
  const quantity = useSelector((state) => state.cart.totalQuantity);
  return (
    <nav className={GlobalStyle.navWrap}>
      <div className={GlobalStyle.navContainer}>
        <Link to="/">
          <img src={logo} alt="logo" className="w-16" />
        </Link>
        <div className="gap-5 items-center flex">
          <Link
            to="/search"
            className="flex gap-1 items-center hover:text-primary transition-all ease-in-out duration-500"
          >
            <MdSearch className="text-lg" />
          </Link>
          <Link
            to="/cart"
            className="flex gap-1 items-center hover:text-primary transition-all ease-in-out duration-500"
          >
            <div className="w-6 h-6 flex justify-center items-center relative">
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 text-xxxs rounded-full bg-red-500 flex justify-center items-center text-white">
                {quantity}
              </span>
              <MdShoppingCart className="text-lg" />
            </div>
          </Link>
          {auth ? (
            <Link
              to={"/user"}
              className="flex gap-1 items-center hover:text-primary transition-all ease-in-out duration-500"
            >
              <MdAccountCircle className="text-lg" />
              <span>Account</span>
            </Link>
          ) : (
            <Link
              to={"/login"}
              className="flex gap-1 items-center hover:text-primary transition-all ease-in-out duration-500"
            >
              <MdAccountCircle className="text-lg" />
              <span>Sign in</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default PrimaryNavbar;
