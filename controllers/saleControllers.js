const SaleSchema = require("../models/Sale.js");
const errorHandler = require("../middlewares/errorHandler.js");

const getSale = async (req, res, next) => {
  if (req.user.id !== req.params.id || req.user.accType !== "admin")
    return next(errorHandler(400, "You're not authorized"));
  try {
    const sale = await SaleSchema.findById(req.params.id);
    if (!sale) return next(errorHandler(404, "Sale not found"));
    res.status(200).json(sale);
  } catch (error) {
    return next(error);
  }
};
const getWeeklySale = async (req, res, next) => {
  const date = new Date();
  let prevWeekMon;
  if (date.getDay() === 1) {
    prevWeekMon = new Date(date.setDate(date.getDate() - 7));
  } else if (date.getDay() > 1) {
    prevWeekMon = new Date(
      date.setDate(date.getDate() - (date.getDay() - 1 + 7))
    );
  } else {
    prevWeekMon = new Date(date.setDate(date.getDate() - 6));
  }
  try {
    const weeklySale = await SaleSchema.aggregate([
      {
        $project: {
          sale: "",
        },
      },
    ]);
  } catch (error) {}
};

const getMonthlySales = async (req, res, next) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  try {
    const monthlySale = await SaleSchema.aggregate([
      {
        $match: { createdAt: { $gte: lastMonth } },
      },
      {
        $project: {
          day: { $dayOfMonth: "$createdAt" },
          sale: "$totalAmount",
        },
      },
      {
        $group: { _id: "$day", sale: { $sum: "$sale" } },
      },
      { $sort: { _id: 1 } },
    ]);
    res.status(200).json(monthlySale);
  } catch (error) {
    next(errorHandler);
  }
};

const getYearlySale = async (req, res, next) => {};

module.exports = {
  getSale,
  getMonthlySales,
  getYearlySale,
};
