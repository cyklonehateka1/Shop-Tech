const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  cart: {
    products: {
      type: Array,
    },
    quantity: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
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
