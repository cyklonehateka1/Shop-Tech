const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    payment: {
      cardHolderName: {
        type: String,
      },

      cardNumber: {
        type: Number,
      },
      cardCvc: {
        type: Number,
      },
      cardExpiryDate: {
        type: String,
      },
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
    orderFulfilled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
