const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        color: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("cart", CartSchema);
