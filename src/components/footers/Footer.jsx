import React from "react";
import logo from "../logo/ss.png";

const Footer = () => {
  return (
    <footer className="w-full p-10 bg-gray-100 text-secondary text-xs">
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5 pb-5 border-b">
        <div className="w-full flex gap-2 items-center justify-between">
          <img src={logo} alt="" className="w-24" />
        </div>
        <div className="w-full flex flex-col gap-1">
          <h3 className="font-medium text-lg">New to ShopSmart?</h3>
          <p>
            Subscribe to our newsletter to get updates on our latest offers!
          </p>
          <div className="w-full gap-2 flex">
            <input
              type="text"
              className="w-1/2 lg:1/3 border h-8 outline-none rounded p-3 text-xs text-secondary"
              placeholder="Email address"
            />
            <button className="text-xs text-white bg-secondary hover:bg-white hover:text-secondary px-5 w-fit h-8 flex items-center justify-center transition-all ease-in-out duration-1000 border rounded capitalize">
              Submit
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col gap-1">
          <h3 className="font-medium text-lg">About ShopSmart</h3>
          <span className="cursor-pointer">About us</span>
          <span className="cursor-pointer">Terms and Conditions</span>
          <span className="cursor-pointer">Privacy Policy</span>
        </div>
      </div>
      <div className="w-full text-center text-xxs mt-2">© 2023 ShopSmart Inc</div>
    </footer>
  );
};

export default Footer;
