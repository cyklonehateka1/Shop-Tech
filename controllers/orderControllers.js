const errorHandler = require("../middlewares/errorHandler.js");
const OrderSchema = require("../models/Order.js");

const newOrder = async (req, res, next) => {
  const { quantity, products, total, address } = req.body;
  const details = {
    address,
    cart: { products, quantity, total },
    customer: req.user.id,
    paymentId: req.user.id,
  };
  try {
    if (!req.user.id)
      return next(errorHandler(402, "You are not authenticated"));
    const order = new OrderSchema(details);
    await order.save();
    res.status(201).json("Order placed successfully");
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  newOrder,
};
