const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    country: {
      type: String,
    },
    phone: {
      type: String,
    },
    accountType: {
      type: String,
      default: "customer",
    },
    isSuperUser: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    fromGoogle: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
