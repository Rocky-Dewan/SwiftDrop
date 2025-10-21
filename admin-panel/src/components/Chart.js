import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const Chart = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.month),
    datasets: [
      {
        label: "Revenue",
        data: data.map(d => d.value),
        borderColor: "#10ac84",
        backgroundColor: "rgba(16,172,132,0.2)",
        fill: true,
        tension: 0.3
      }
    ]
  };

  return <Line data={chartData} />;
};

export default Chart;
