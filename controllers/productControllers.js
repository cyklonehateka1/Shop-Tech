const ProductSchema = require("../models/Product.js");
const CartSchema = require("../models/Cart.js");

const addProduct = async (req, res, next) => {
  const { price, desc, name, profileImg } = req.body;

  if (req.user.accType !== "admin")
    return next(errorHandler(401, "You're not authorized"));
  if (!price || !desc || !name || !profileImg)
    return next(errorHandler(400, "Some fields are required"));

  try {
    let product = await ProductSchema.findOne({ name });
    if (product) return next(errorHandler(400, "Product name already exist"));

    product = new ProductSchema(req.body);
    await product.save();

    res.status(201).json("New product added successfully");
  } catch (error) {
    return next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await ProductSchema.findById(req.params.productId);

    if (!product) return next(errorHandler(400, "Product not found"));

    res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

const getProducts = async (req, res, next) => {
  const qPCategory = req.query.pCategory;
  const qSCategory = req.query.sCategory;
  const qSearch = req.query.search;
  const qBrand = req.query.brand;
  const qLimit = req.query.limit;
  const qSkip = req.query.skip;

  try {
    let products;

    if (qPCategory) {
      products = await ProductSchema.find({ parentCat: { $in: [qPCategory] } })
        .limit(qLimit)
        .skip(qSkip);
    } else if (qSCategory) {
      products = await ProductSchema.find({ subCat: { $in: [qSCategory] } })
        .limit(qLimit)
        .skip(qSkip);
    } else if (qBrand) {
      products = await ProductSchema.find({ brand: qBrand })
        .limit(qLimit)
        .skip(qSkip);
    } else if (qSearch) {
      products = await ProductSchema.find({
        $or: [
          {
            name: {
              $regex: qSearch,
              $options: "i",
            },
          },
          {
            model: {
              $regex: qSearch,
              $options: "i",
            },
          },
          {
            brand: {
              $regex: qSearch,
              $options: "i",
            },
          },
        ],
      })
        .limit(qLimit)
        .skip(qSkip);
    } else {
      products = await ProductSchema.find().limit();
    }
    res.status(201).json(products);
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  if (req.user.accType !== "admin")
    return next(errorHandler(403, "You are not authorized"));
  try {
    let product = await ProductSchema.findById(req.params.id);
    if (!product) return next(errorHandler(403, "Product not found"));
    product = await ProductSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json("Product updated successfully");
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  addProduct,
  getProduct,
  getProducts,
  updateProduct,
};
