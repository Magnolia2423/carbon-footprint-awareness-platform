import { useState } from "react";
import axios from "axios";
import "./App.css";
import { jsPDF } from "jspdf";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [formData, setFormData] = useState({
    transport: "",
    electricity: "",
    food: "",
    waste: "",
  });

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateFootprint = async (e) => {
    e.preventDefault();

    if (
      Number(formData.transport) < 0 ||
      Number(formData.electricity) < 0 ||
      Number(formData.food) < 0 ||
      Number(formData.waste) < 0
    ) {
      alert("Values cannot be negative");
      return;
    }

    try {
      const res = await axios.post(
        "https://carbon-footprint-awareness-platform-x04l.onrender.com/api/calculate",
        formData
      );

      setResult(res.data.carbonFootprint);
      setHistory((prev) => [
  ...prev,
  res.data.carbonFootprint,
]);
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend");
    }
  };

  const chartData = {
    labels: ["Transport", "Electricity", "Food", "Waste"],
    datasets: [
      {
        label: "Carbon Emissions (kg CO₂)",
        data: [
          Number(formData.transport) * 0.21,
          Number(formData.electricity) * 0.85,
          Number(formData.food) * 2,
          Number(formData.waste) * 1.5,
        ],
        backgroundColor: [
          "#4CAF50",
          "#2196F3",
          "#FF9800",
          "#F44336",
        ],
        borderColor: [
          "#388E3C",
          "#1976D2",
          "#F57C00",
          "#D32F2F",
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Carbon Emission Breakdown",
      },
    },
  };

  const getStatus = () => {
    if (result < 20) return "🌱 Low Impact";
    if (result < 50) return "🌿 Moderate Impact";
    return "⚠️ High Impact";
  };

  const downloadReport = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Carbon Footprint Report", 20, 20);

  doc.setFontSize(12);
  doc.text(`Transport: ${formData.transport} km`, 20, 40);
  doc.text(`Electricity: ${formData.electricity} kWh`, 20, 50);
  doc.text(`Food Score: ${formData.food}`, 20, 60);
  doc.text(`Waste: ${formData.waste} kg`, 20, 70);

  doc.text(
    `Total Carbon Footprint: ${result.toFixed(2)} kg CO2`,
    20,
    90
  );

  doc.text(`Impact Level: ${getStatus()}`, 20, 100);

  doc.text(
    `Trees Needed To Offset: ${treesRequired}`,
    20,
    110
  );

  doc.save("Carbon_Footprint_Report.pdf");
};

  const treesRequired =
  result !== null ? Math.ceil(result / 21) : 0;

  return (
    <div className="container">
      <h1>
        🌍 Carbon Footprint
        <br />
        Awareness Platform
      </h1>

      <form onSubmit={calculateFootprint}>
        <label>🚗 Transport Distance (km)</label>
        <input
          type="number"
          name="transport"
          placeholder="Enter distance traveled"
          onChange={handleChange}
          required
        />

        <label>⚡ Electricity Usage (kWh)</label>
        <input
          type="number"
          name="electricity"
          placeholder="Enter electricity usage"
          onChange={handleChange}
          required
        />

        <label>🍽️ Food Consumption Score</label>
        <input
          type="number"
          name="food"
          placeholder="Enter food score"
          onChange={handleChange}
          required
        />

        <label>🗑️ Waste Generated (kg)</label>
        <input
          type="number"
          name="waste"
          placeholder="Enter waste generated"
          onChange={handleChange}
          required
        />

        <button type="submit">
          Calculate Carbon Footprint
        </button>
      </form>

      {result !== null && (
        <>
          <div className="result">
            <h2>
              Total Carbon Footprint: {result.toFixed(2)} kg CO₂
            </h2>

            <h3>{getStatus()}</h3>
            <p className="trees">
  🌳 Trees Needed to Offset: {treesRequired}
</p>

      <button
  className="download-btn"
  onClick={downloadReport}
>
  📄 Download PDF Report
</button>

<div className="history">
  <h3>📜 Calculation History</h3>

  <ul>
    {history.map((item, index) => (
      <li key={index}>
        Calculation #{index + 1}: {item.toFixed(2)} kg CO₂
      </li>
    ))}
  </ul>
</div>
          </div>

          <div className="tips">
            <h3>🌱 Sustainability Recommendations</h3>

            <ul>
              <li>Use public transport or carpooling whenever possible.</li>
              <li>Reduce unnecessary electricity consumption.</li>
              <li>Switch to LED lighting to save energy.</li>
              <li>Choose sustainable and local food options.</li>
              <li>Recycle and reduce household waste.</li>
              <li>Carry reusable bags and water bottles.</li>
            </ul>
          </div>

          <div className="chart-container">
            <h3>📊 Emission Breakdown</h3>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </>
      )}

      <footer className="footer">
        <p>© 2026 Carbon Footprint Awareness Platform</p>
        <p>Built with React, Node.js & Express</p>
      </footer>
    </div>
  );
}

export default App;