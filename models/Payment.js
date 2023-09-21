const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
    },
    cardHolderName: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: Number,
      required: true,
    },
    cardCvc: {
      type: Number,
      required: true,
    },
    cardExpiryDate: {
      type: String,
      required: true,
    },
    ref: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("payment", PaymentSchema);
