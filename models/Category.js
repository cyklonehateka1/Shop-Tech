const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
    },
    subCategories: {
      type: [
        {
          name: {
            type: String,
          },
          img: {
            type: String,
          },
        },
      ],
    },
    associatedBrands: {
      type: [
        {
          name: {
            type: String,
          },
          img: {
            type: String,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
