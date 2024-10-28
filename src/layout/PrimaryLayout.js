import React from "react";
import PrimaryNavbar from "../components/navbars/PrimaryNavbar";

const PrimaryLayout = ({ children }) => {
  return (
    <>
      <PrimaryNavbar />
      {children}
    </>
  );
};

export default PrimaryLayout;
