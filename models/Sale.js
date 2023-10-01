const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
    },
    totalAmount: {
      type: Number,
    },
    shippingCost: {
      typeof: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("sale", SaleSchema);
