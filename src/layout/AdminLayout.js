import React from "react";
import AdminNavbar from "../components/navbars/AdminNavbar";

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminNavbar />
      {children}
    </>
  );
};

export default AdminLayout;
