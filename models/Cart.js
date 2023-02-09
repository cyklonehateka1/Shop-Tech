import mongoose from "mongoose";

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

export default mongoose.model("cart", CartSchema);
