import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    transport: "",
    electricity: "",
    food: "",
    waste: "",
  });

  const [result, setResult] = useState(null);

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
        "http://localhost:5000/api/calculate",
        formData
      );

      setResult(res.data.carbonFootprint);
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend");
    }
  };

  const getStatus = () => {
    if (result < 20) return "🌱 Low Impact";
    if (result < 50) return "🌿 Moderate Impact";
    return "⚠️ High Impact";
  };

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