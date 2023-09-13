const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
  },
  address: {
    type: String,
  },
  totalAmount: {
    type: Number,
  },
  shippingCost: {
    typeof: Number,
  },
  paymentMethod: {
    type: String,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
