import React, { useState } from "react";
import GlobalStyle from "../../global/GlobalStyle";
import logo from "../logo/ss.png";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaBox, FaUser } from "react-icons/fa";
import { BsCollectionFill } from "react-icons/bs";
import { IoMdCart } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

const menu = [
  { title: "dashboard", link: "/admin/dashboard", icon: <MdDashboard /> },
  { title: "manage products", link: "/admin/manage-product", icon: <FaBox /> },
  {
    title: "manage categories",
    link: "/admin/manage-category",
    icon: <BsCollectionFill />,
  },
  { title: "manage orders", link: "/admin/manage-order", icon: <IoMdCart /> },
  {
    title: "manage regions",
    link: "/admin/manage-region",
    icon: <FaLocationDot />,
  },
  {
    title: "manage user",
    link: "/admin/manage-users",
    icon: <FaUser />,
  },
];

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={GlobalStyle.navWrap}>
      <div className={GlobalStyle.navContainer}>
        <Link to="/">
          <img src={logo} alt="logo" className="w-16" />
        </Link>
        <div
          onClick={toggleMenu}
          className={`w-6 h-6 max-lg:flex flex-col justify-between hidden z-20 transition-all ease-in-out items-start`}
        >
          <span
            className={`w-full h-0.5 bg-secondary transition-all ease-in-out duration-1000 ${
              isOpen ? "rotate-45 translate-y-2.5" : ""
            }`}
          ></span>
          <span
            className={`w-full h-0.5 bg-secondary transition-all ease-in-out duration-1000 ${
              isOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-full h-0.5 bg-secondary transition-all ease-in-out duration-1000 ${
              isOpen ? "-rotate-45 -translate-y-3" : ""
            }`}
          ></span>
        </div>
        <div
          className={`w-64 h-[calc(100vh-5rem)] absolute max-lg:border-r left-0 top-full flex flex-col gap-2 text-sm font-semibold transition-all ease-in-out duration-1000 bg-white ${
            isOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"
          } p-2`}
        >
          {menu.map((item) => {
            return (
              <Link
                key={item.link}
                to={item.link}
                onClick={() => setIsOpen(false)}
                className={`w-full h-10 lg:h-9 flex justify-between items-center pl-5 rounded font-light ${
                  location.pathname === item.link
                    ? "text-white bg-secondary"
                    : ""
                } transition-all ease-in-out`}
              >
                <div className="flex items-center gap-5">
                  {item.icon}
                  <span className="capitalize">{item.title}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
