const errorHandler = require("../middlewares/errorHandler");
const CategorySchema = require("../models/Category");

const createNewCategory = async (req, res, next) => {
  if (req.user.accType !== "admin")
    return next(errorHandler(403, "You're not authorized"));
  try {
    const newCategory = await new CategorySchema(req.body).save();
    if (!newCategory)
      return next(errorHandler(400, "Category creation failed"));
    res.status(201).json("Category successfully created");
  } catch (error) {
    return next(error);
  }
};

const getSubCategories = async (req, res, next) => {
  const category = req.query.catName;
  try {
    const subCategories = await CategorySchema.findOne({
      categoryName: category,
    });
    if (!subCategories)
      return next(errorHandler(404, "Categories data not found"));
    res.status(200).json(subCategories);
  } catch (error) {
    return next(error);
  }
};

const updateCategory = async (req, res, next) => {
  if (req.user.accType !== "admin")
    return next(errorHandler(403, "You're not authorized"));
  try {
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createNewCategory,
  getSubCategories,
};
