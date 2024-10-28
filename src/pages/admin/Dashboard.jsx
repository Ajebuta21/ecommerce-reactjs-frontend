import React from "react";
import GlobalStyle from "../../global/GlobalStyle";
import { useSelector } from "react-redux";
import DashboardSectionOne from "../../components/dashboardSections/DashboardSectionOne";
import DashboardSectionThree from "../../components/dashboardSections/DashboardSectionThree";

const Dashboard = () => {
  const user = useSelector((state) => state.user.profile);
  return (
    <div className={GlobalStyle.containerAdmin}>
      <div className={GlobalStyle.adminWrap}>
        <div className="flex flex-col w-full gap-5">
          <h1 className={GlobalStyle.formHeader}>Dashboard</h1>
          <span className="text-xs font-light">
            Welcome back <span className="capitalize">{user.name}</span>, here
            is what is been happening in your store.
          </span>
          <DashboardSectionOne />
          <span className="text-xs font-light">Top selling products</span>
          <DashboardSectionThree />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
