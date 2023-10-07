const errorHandler = require("../middlewares/errorHandler");
const CategorySchema = require("../models/Category");

const createNewCategory = async (req, res, next) => {
  if (req.user.accType !== "admin")
    return next(errorHandler(403, "You're not authorized"));

  try {
    const category = await CategorySchema.findOne({
      categoryName: req.body.categoryName,
    });
    if (category) return next(errorHandler(400, "Category already exists"));
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
    const category = await CategorySchema.findById(req.params.id);
    if (!category) return next(errorHandler(404, "Category not found"));
    const updatedCategory = await CategorySchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: { categoryName: req.body.categoryName },
        $push: {
          subCategories: req.body.subCategories,
          associatedBrands: req.body.associatedBrands,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createNewCategory,
  getSubCategories,
  updateCategory,
};
