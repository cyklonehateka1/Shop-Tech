import ProductSchema from "../models/Product.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import CartSchema from "../models/Cart.js";

export const addProduct = async (req, res, next) => {
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
  const qPCategory = req.query.parentCategory;
  const qSCategory = req.query.subCategory;
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
        $regex: qSearch,
        $options: "i",

        $or: [
          {
            name: {
              $regex: qSearch,
              $options: "i",
            },
          },
          {
            desc: {
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
    res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};

export const updateProduct = async (req, res, next) => {
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

export const addProductToCart = async (req, res, next) => {
  try {
    const cart = await CartSchema.findOne({ user: req.params.userId });
    if (!cart) return next(errorHandler(401, "Cart not found"));

    const product = cart.products.findIndex(
      (item) => item.product.toString() === req.body.productId
    );

    if (product === -1) {
      cart.items.push({
        product: req.body.productId,
        quantity: req.body.quantity || 1,
      });
    } else {
      cart.items[product].quantity += req.body.quantity || 1;
    }
    await cart.save();
    res.status(200).json("Product added successfully");
  } catch (error) {
    return next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const cart = await CartSchema.findOne({ user: req.params.userId });
    if (!cart) return next(errorHandler(401, "Cart not found"));

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === req.body.productId
    );

    if (itemIndex === -1) return next(errorHandler(404, "Product not found"));
    cart.items.splice(itemIndex, 1);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    return next(error);
  }
};
