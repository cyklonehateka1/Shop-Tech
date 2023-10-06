const errorHandler = require("../middlewares/errorHandler.js");
const OrderSchema = require("../models/Order.js");
const SaleSchema = require("../models/Sale.js");

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
    console.log("hell");
    await order.save();

    res.status(201).json("Order placed successfully");
  } catch (error) {
    return next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    if (!req.user.id)
      return next(errorHandler(400, "You are not authenticated"));
    if (req.user.accType !== "admin")
      return next(errorHandler(403, "You are not authorized"));

    const orders = await OrderSchema.find();
    if (!orders || orders.length === 0)
      return next(errorHandler(404, "No order made"));

    res.status(200).json(orders);
  } catch (error) {
    return next(error);
  }
};

const getOrder = async (req, res, next) => {
  const id = req.query.id;
  let order;
  try {
    if (rreq.user.accType === "admin") {
      order = await OrderSchema.findById(id);
    } else {
      order = await OrderSchema.findOne({ customer: req.user.id, _id: id });
    }

    if (!order) return next(errorHandler(404, "Order not found"));
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

const getUnfulfilledOrders = async (req, res, next) => {
  let orders;
  try {
    if (req.user.accType !== "admin") return next(errorHandler);
    orders = await OrderSchema.find({ orderFulfilled: false });
    if (!orders || orders.length === 0)
      return next(errorHandler(404, "No order found"));
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
const getfulfilledOrders = async (req, res, next) => {
  let orders;
  try {
    if (req.user.accType !== "admin")
      return next(errorHandler(400, "You're not authorized"));
    orders = await OrderSchema.find({ orderFulfilled: true });
    if (!orders || orders.length === 0)
      return next(errorHandler(404, "No order found"));
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

const fulfillAnOrder = async (req, res, next) => {
  let fulfilledOrder;
  try {
    if (req.user.accType !== "admin")
      return next(errorHandler(400, "You're not authorized"));
    fulfilledOrder = await OrderSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: { orderFulfilled: true },
      },
      { new: true }
    );
    if (!fulfilledOrder) return next(errorHandler(404, "Cant find Order"));
    const newSale = await new SaleSchema({
      ...req.body,
      order: req.params.id,
    }).save();
    res.status(200).json({
      fulfilledOrder,
      newSale,
    });
  } catch (error) {
    next(errorHandler);
  }
};
const getTotalOrders = async (req, res, next) => {
  if (req.user.accType !== "admin")
    return next(errorHandler(400, "You're not authorized"));
  try {
    const totalOrders = await OrderSchema.countDocuments({}, { hint: "_id_" });
    res.status(200).json(totalOrders);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  newOrder,
  getOrder,
  getOrders,
  getUnfulfilledOrders,
  getfulfilledOrders,
  fulfillAnOrder,
  getTotalOrders,
};
