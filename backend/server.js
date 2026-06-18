const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const activityRoutes = require("./routes/activityRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use("/api", activityRoutes);

app.get("/", (req, res) => {
  res.send("Carbon Footprint API Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});