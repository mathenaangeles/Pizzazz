const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Pizza = new Schema(
  {
    size: {
      type: String,
    },
    crust: {
      type: String,
    },
    toppings: {
      type: Array,
    },
    total: {
      type: Number,
    },
  },
  {
    collection: "pizza",
  }
);

module.exports = mongoose.model("Pizza", Pizza);
