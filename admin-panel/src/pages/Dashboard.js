import React, { useEffect, useState } from "react";
import Chart from "../components/Chart";
import { getOrders } from "../services/orderService";

const Dashboard = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    // Example Data
    setStats([
      { month: "Jan", value: 1000 },
      { month: "Feb", value: 1500 },
      { month: "Mar", value: 1200 },
      { month: "Apr", value: 1800 },
      { month: "May", value: 2000 }
    ]);
  }, []);

  return (
    <div>
      <h2>Dashboard Overview</h2>
      <Chart data={stats} />
    </div>
  );
};

export default Dashboard;
