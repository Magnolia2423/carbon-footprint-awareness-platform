import { useState } from "react";
import axios from "axios";

function App() {

  const [formData, setFormData] = useState({
    transport: "",
    electricity: "",
    food: "",
    waste: ""
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateFootprint = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:5000/api/calculate",
      formData
    );

    setResult(res.data.carbonFootprint);
  };

  return (
    <div style={{padding:"20px"}}>

      <h1>Carbon Footprint Calculator</h1>

      <form onSubmit={calculateFootprint}>

        <input
          type="number"
          name="transport"
          placeholder="Transport (km)"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="electricity"
          placeholder="Electricity (kWh)"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="food"
          placeholder="Food Score"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="waste"
          placeholder="Waste (kg)"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Calculate
        </button>

      </form>

      {result !== null && (
        <h2>
          Carbon Footprint: {result} kg CO₂
        </h2>
      )}

    </div>
  );
}

export default App;