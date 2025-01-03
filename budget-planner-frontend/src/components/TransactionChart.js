import React from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  ChartDataLabels
);

const TransactionChart = ({ transactions, chartType }) => {
  // Regrouper les transactions par catégorie
  const categories = transactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  // Charger les couleurs personnalisées des catégories depuis localStorage
  const categoryColors = JSON.parse(localStorage.getItem("categoryColors")) || {};

  // Préparer les données pour le graphique
  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: "Dépenses par catégorie",
        data: Object.values(categories),
        backgroundColor: Object.keys(categories).map((category) =>
          categoryColors[category] || "#ccc" // Utiliser la couleur par défaut si non définie
        ),
        hoverBackgroundColor: Object.keys(categories).map((category) =>
          categoryColors[category] || "#aaa"
        ),
      },
    ],
  };

  // Options pour afficher les pourcentages et les valeurs
  const options = {
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        position: "top",
      },
      datalabels: {
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
          const percentage = ((value / total) * 100).toFixed(0);
          return `${percentage}%\n${value}€`;
        },
        color: "#fff",
        font: {
          weight: "bold",
        },
        anchor: "center",
        align: "center",
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px", height: "400px", margin: "0 auto" }}>
      {chartType === "pie" && <Pie data={data} options={options} />}
      {chartType === "bar" && <Bar data={data} options={options} />}
      {chartType === "line" && <Line data={data} options={options} />}
    </div>
  );
};

export default TransactionChart;