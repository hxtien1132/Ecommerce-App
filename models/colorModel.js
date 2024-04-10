const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var colorSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: ["White", "Gray", "Gold", "Green", "Red ", "Pink", "Silver", "Other"],
      required: true,
      index: true,
      message: "Value is not supported",
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Color", colorSchema);
