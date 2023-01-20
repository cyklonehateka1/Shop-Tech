import ProductSchema from "../models/Product.js";
import { errorHandler } from "../middlewares/errorHandler.js";

export const addProduct = async (req, res, next) => {
  const { price, desc, name, profileImg } = req.body;

  if (!price || !desc || !name || !profileImg)
    return next(errorHandler(400, "Some fields are required"));

  try {
    let product = await ProductSchema.findOne(name);
    if (product) return next(errorHandler(400, "Product name already exist"));

    product = new ProductSchema(req.body);
    await product.save();

    res.status(201).json("New product added successfully");
  } catch (error) {
    return next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await ProductSchema.findById(req.params.productId);

    if (!product) return next(errorHandler(400, "Product not found"));

    res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

export const getProducts = async (req, res, next) => {
  const qCategory = req.query.qcategory;
  const qSearch = req.query.qSearch;
  const qBrand = req.query.qBrand;

  try {
    let products;

    if (qCategory) {
      products = await ProductSchema.find({ categories: { $in: [qCategory] } });
    } else if (qBrand) {
      products = await ProductSchema.find({ brand: qBrand });
    }
  } catch (error) {}
};
