const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
    },
    partner: {
      type: String,
    },
    code: {
      type: String,
      required: true,
    },
    discountPercentage: {
      type: Number,
    },
    products: {
      type: [mongoose.Schema.Types.ObjectId],
    },
    parentCategory: {
      type: [String],
    },
    subCategory: {
      type: [String],
    },
    couponType: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    expiresOn: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", CouponSchema);
