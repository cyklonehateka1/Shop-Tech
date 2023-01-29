import mongoose from "mongoose";

const ProuctSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    onDiscount: {
      type: Boolean,
      default: false,
    },
    discountPrice: {
      type: Number,
    },
    desc: {
      type: String,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    quanity: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    colors: {
      type: [String],
    },
    profileImg: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    model: {
      type: String,
    },
    parentCat: {
      type: [String],
    },
    subCat: {
      type: [String],
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
    },
    about: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("product", ProuctSchema);
