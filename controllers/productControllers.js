const ProductSchema = require("../models/Product.js");
const CartSchema = require("../models/Cart.js");
const errorHandler = require("../middlewares/errorHandler.js");

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
  let qPCategory = req.query.pCategory;
  let qSCategory = req.query.sCategory;
  const qSearch = req.query.search;
  const qBrand = req.query.brand;
  const qLimit = req.query.limit;
  const qSkip = req.query.skip;
  const qDiscount = req.query.discount;
  const pId = req.query.pId;
  const qSort = req.query.sort;

  try {
    let queryCriteria = {};

    if (qPCategory) {
      const qPCategories = qPCategory.split(",");
      queryCriteria.parentCat = {
        $in: qPCategories.map((category) => new RegExp(category, "i")),
      };
    }
    if (qBrand) {
      queryCriteria.brand = new RegExp(qBrand, "i");
    }
    if (qSCategory) {
      const qSCategories = qSCategory.split(",");
      queryCriteria.subCat = {
        $in: qSCategories.map((category) => new RegExp(category, "i")),
      };
    }

    if (qDiscount === "all") {
      queryCriteria.onDiscount = true;
    } else if (qDiscount) {
      queryCriteria.onDiscount = true;
      queryCriteria.discountPercentage = parseInt(qDiscount);
    }

    if (qSearch) {
      queryCriteria.$or = [
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
      ];
    }

    let query = ProductSchema.find(queryCriteria);

    if (qLimit) {
      query = query.limit(parseInt(qLimit, 10));
    }

    if (qSkip) {
      query = query.skip(parseInt(qSkip, 10));
    }

    if (qSort === "new") {
      query = query.sort({ createdAt: -1 });
    }

    let products = await query.exec();
    if (pId) {
      products = products.filter((product) => {
        return product._id.toString() !== pId;
      });
    }
    console.log(products)
    res.status(200).json(products);
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

const createDiscount = async (req, res, next) => {
  if (req.user.accType !== "admin")
    return next(errorHandler(403, "You're not authorised"));
  const calcPercentage = (productPrice, discountPrice) => {
    const discountAmount = productPrice - discountPrice;

    const percentage = (discountAmount / productPrice) * 100;
    let rounded;
    if (percentage - Math.floor(percentage) > 0.5) {
      rounded = Math.ceil(percentage);
    } else {
      rounded = Math.floor(percentage);
    }
    return rounded;
  };
  try {
    const product = await ProductSchema.findById(req.params.id);
    if (!product) return next(errorHandler(404, "Product not found"));

    const reqBody = {
      discountPercentage: calcPercentage(product.price, req.body.discountPrice),
      discountPrice: req.body.discountPrice,
      onDiscount: true,
    };

    const discount = await ProductSchema.findByIdAndUpdate(
      product._id,
      {
        $set: reqBody,
      },
      { new: true }
    );
    res.status(200).json(discount);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  addProduct,
  getProduct,
  getProducts,
  updateProduct,
  createDiscount,
};
