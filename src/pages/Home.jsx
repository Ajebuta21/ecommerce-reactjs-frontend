import React from "react";
import GlobalStyle from "../global/GlobalStyle";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaShippingFast } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { RiRefund2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import ProductCard from "../components/productComponents/ProductCard";
import { Link } from "react-router-dom";
import paystack from "../images/paystack2.png";
import Footer from "../components/footers/Footer";

const Home = () => {
  const services = [
    { name: "Payment Secured", icon: <RiSecurePaymentLine /> },
    { name: "Nationwide Shipping", icon: <FaShippingFast /> },
    { name: "24/7 Support", icon: <BiSupport /> },
    { name: "No Refund Policy", icon: <RiRefund2Line /> },
  ];

  const product = useSelector((state) => state.products.items);
  const category = useSelector((state) => state.category.items);

  return (
    <div className={GlobalStyle.container}>
      <div className="w-full h-64 bg-gradient-to-br from-secondary to-secondary/70 text-white">
        <div className="w-full h-full flex flex-col items-center justify-center gap-5 backdrop-blur-sm bg-secondary/10">
          <h1 className="text-3xl font-semibold">Welcome to ShopSmart</h1>
          <span className="text-xs">Your home for things and things</span>
          <button className="px-5 py-1 border border-white text-sm hover:bg-white hover:text-secondary transition-all ease-in-out duration-1000">
            Shop now
          </button>
        </div>
      </div>
      <div className="w-full p-5 lg:p-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((item, index) => (
          <div
            key={index}
            className="w-full h-20 border flex gap-5 justify-between items-center px-5 max-sm:px-3 group cursor-pointer hover:bg-secondary/5 transition-all ease-in-out duration-700"
          >
            <div className="w-14 h-14 flex items-center justify-center text-3xl group-hover:text-4xl transition-all ease-in-out duration-700">
              {item.icon}
            </div>
            <span className="text-lg max-sm:text-sm font-light group-hover:-translate-y-1 transition-all ease-in-out duration-700">
              {item.name}
            </span>
          </div>
        ))}
      </div>
      <div className={GlobalStyle.separator}>
        <h2 className={GlobalStyle.formHeader}>New arrivals</h2>
      </div>
      <div className={GlobalStyle.productGrid}>
        {product
          .filter((product) => product.quantity > 0)
          .slice(-12)
          .reverse()
          .map((item) => {
            return <ProductCard key={item.id} item={item} />;
          })}
      </div>
      <div className="w-full p-5 lg:p-10">
        <h2 className={GlobalStyle.formHeader}>Shop by category</h2>
      </div>
      <div className="w-full px-5 lg:px-10 gap-2 md:gap-5 grid grid-cols-2 lg:grid-cols-4">
        {category.map((item) => {
          return (
            <Link
              key={item.id}
              className={GlobalStyle.categoryLink}
              to={`/categories/${item.name}`}
              data-aos="zoom-in-down"
            >
              {item.name}
            </Link>
          );
        })}
      </div>
      <div className={GlobalStyle.separator}>
        <h2 className={GlobalStyle.formHeader}>
          Save more when you by this products
        </h2>
      </div>
      <div className={GlobalStyle.productGrid}>
        {product
          .filter((product) => product.discount_price !== null)
          .filter((product) => product.quantity > 0)
          .slice(-12)
          .reverse()
          .map((item) => {
            return <ProductCard key={item.id} item={item} />;
          })}
      </div>
      <div className={GlobalStyle.separatorCenter}>
        <img data-aos="zoom-in" src={paystack} alt="" className="w-64" />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
