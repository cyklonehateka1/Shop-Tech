const mongoose = require("mongoose");

const subCatAndBrandSchema = new mongoose.Schema({
  name: String,
  img: String,
});

const CategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      unique: true,
    },
    subCategories: [subCatAndBrandSchema],
    associatedBrands: [subCatAndBrandSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
