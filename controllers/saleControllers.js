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
  // const hellD = new Date();
  // const date = new Date(hellD.setDate(hellD.getDate() + 3));
  const date = new Date();
  let prevWeekMon;
  let currentWeekMon;
  if (date.getDay() === 1) {
    prevWeekMon = new Date(date.setDate(date.getDate() - 7));
    currentWeekMon = new Date();
  } else if (date.getDay() > 1) {
    prevWeekMon = new Date(
      date.setDate(date.getDate() - (date.getDay() - 1 + 7))
    );
    currentWeekMon = new Date(date.setDate(date.getDate() - date.getDay() + 7));
  } else {
    prevWeekMon = new Date(date.setDate(date.getDate() - 6));
    currentWeekMon = new Date(date.setDate(date.getDate() + 6));
  }
  try {
    const sales = await SaleSchema.find({
      createdAt: {
        $gte: prevWeekMon,
        $lte: new Date(),
      },
    });
    if (!sales) return next(errorHandler(404, "No sale found"));
    let prevWeekSale = 0;
    let currentWeekSale = 0;
    for (let i = 0; i < sales.length; i++) {
      const prevWeek =
        sales[i].createdAt >= prevWeekMon &&
        sales[i].createdAt < currentWeekMon;
      const currentWeek = sales[i].createdAt < prevWeekMon;
      if (prevWeek) {
        prevWeekSale += sales[i].totalAmount;
      } else {
        currentWeekSale += sales[i].totalAmount;
      }
    }
    res.status(200).json({ currentWeekSale, prevWeekSale });
    // console.log(prevWeekSale);
  } catch (error) {
    return next(error);
  }
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
    let responseData = 0;

    // for (let i = 0; i <)

    res.status(200).json(monthlySale);
  } catch (error) {
    next(errorHandler);
  }
};

const getTotalSales = async (req, res, next) => {
  if (req.user.accType !== "admin")
    return next(errorHandler(403, "You're not authorized"));
  try {
    const toatlSales = await SaleSchema.aggregate([
      {
        $match: {},
      },
      {
        $group: {
          _id: null,
          sale: { $sum: "$totalAmount" },
        },
      },
    ]);
    if (!toatlSales || toatlSales.length === 0)
      return next(errorHandler(404, "No sale found"));
    res.status(200).json(toatlSales[0]);
  } catch (error) {
    return next(error);
  }
};

const getYearlySale = async (req, res, next) => {};

module.exports = {
  getSale,
  getWeeklySale,
  getMonthlySales,
  getYearlySale,
  getTotalSales,
};
