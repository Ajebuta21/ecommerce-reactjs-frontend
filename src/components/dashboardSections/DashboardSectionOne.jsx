import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import GlobalStyle from "../../global/GlobalStyle";
import { formatNaira } from "../../global/formatNaira";
import api from "../../api/api";
import LoadingSpinner from "../loader/LoadingSpinner";

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const DashboardSectionOne = () => {
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState({});

  const getAnalytics = async () => {
    setLoading(true);
    try {
      const res = await api.get("/get-analytics");
      setAnalytics(res.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnalytics();
  }, []);

  const lineChartData = (label, dataKey) => ({
    labels:
      analytics.lastThreeMonths?.map((monthData) => monthData.month) || [],
    datasets: [
      {
        label,
        data:
          analytics.lastThreeMonths?.map((monthData) => monthData[dataKey]) ||
          [],
        borderColor: "#fca5a5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        borderWidth: 1,
        tension: 0.6,
        pointRadius: 0,
        pointBackgroundColor: "#164e63",
      },
    ],
  });

  const lineChartOptions = {
    responsive: true,
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#164e63",
          font: {
            size: 8,
          },
        },
      },
      y: {
        grid: { display: false },
        ticks: {
          color: "#164e63",
          font: {
            size: 8,
          },
        },
        beginAtZero: false,
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "#444",
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        titleFont: { size: 12 },
        bodyFont: { size: 12 },
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Background color for tooltip
        titleColor: "#fff", // Tooltip title color
        bodyColor: "#fff", // Tooltip body color
      },
    },
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {analytics && (
        <div className="w-full gap-5 flex max-lg:flex-col">
          {/* Total Users Section */}
          <div data-aos="fade-up" className={GlobalStyle.dashboardInfo}>
            <div className="w-full flex flex-col gap-1">
              <div className="w-full flex justify-between">
                <div className="flex flex-col gap-1">
                  <h6 className="text-xs font-light capitalize">
                    total customers
                  </h6>
                  <span className="font-medium text-xl">
                    {analytics.totalUsers}
                  </span>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <span className="text-xs font-light capitalize">
                    This month
                  </span>
                  <span className="text-lg">
                    +{parseInt(analytics.userGrowthPercentage)}%
                  </span>
                </div>
              </div>
              <Line
                data={lineChartData("New Users", "newUsers")}
                options={lineChartOptions}
                className="w-full h-32"
              />
            </div>
          </div>

          {/* Total Sales Section */}
          <div data-aos="fade-up" className={GlobalStyle.dashboardInfo}>
            <div className="w-full flex flex-col gap-1">
              <div className="w-full flex justify-between">
                <div className="flex flex-col gap-1">
                  <h6 className="text-xs font-light capitalize">total sales</h6>
                  <span className="font-medium text-xl">
                    {formatNaira(parseFloat(analytics.totalRevenue))}
                  </span>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <span className="text-xs font-light capitalize">
                    This month
                  </span>
                  <span className="text-lg">
                    +{parseInt(analytics.revenueChangePercentage)}%
                  </span>
                </div>
              </div>
              <Line
                data={lineChartData("Revenue", "revenue")}
                options={lineChartOptions}
                className="w-full h-32"
              />
            </div>
          </div>

          {/* Total Orders Section */}
          <div data-aos="fade-up" className={GlobalStyle.dashboardInfo}>
            <div className="w-full flex flex-col gap-1">
              <div className="w-full flex justify-between">
                <div className="flex flex-col gap-1">
                  <h6 className="text-xs font-light capitalize">
                    total orders
                  </h6>
                  <span className="font-medium text-xl">
                    {analytics.totalOrders}
                  </span>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <span className="text-xs font-light capitalize">
                    This month
                  </span>
                  <span className="text-lg">
                    +{parseInt(analytics.orderGrowthPercentage)}%
                  </span>
                </div>
              </div>
              <Line
                data={lineChartData("New Orders", "newOrders")}
                options={lineChartOptions}
                className="w-full h-32"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardSectionOne;
