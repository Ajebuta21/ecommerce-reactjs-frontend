import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../../api/api";
import LoadingSpinner from "../loader/LoadingSpinner";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardSectionTwo = () => {
  const [loading, setLoading] = useState(false);
  const [monthlySubtotals, setMonthlySubtotals] = useState([]);

  const getMonthlySubtotals = async () => {
    setLoading(true);
    try {
      const res = await api.get("/get-monthly-subtotal");
      setMonthlySubtotals(res.data.lastTwelveMonths);
    } catch (error) {
      console.error("Failed to fetch monthly subtotals", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMonthlySubtotals();
  }, []);

  const chartData = {
    labels: monthlySubtotals.map((monthData) => monthData.month),
    datasets: [
      {
        label: "Monthly Subtotals",
        data: monthlySubtotals.map((monthData) => monthData.subtotal),
        borderColor: "#fca5a5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        borderWidth: 1,
        tension: 0.6,
        pointRadius: 0,
        pointBackgroundColor: "#164e63",
      },
    ],
  };

  const chartOptions = {
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
        grid: { display: true },
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

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="w-full">
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </>
  );
};

export default DashboardSectionTwo;
