const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  transport: Number,
  electricity: Number,
  food: Number,
  waste: Number,
  totalEmission: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  "Activity",
  activitySchema
);