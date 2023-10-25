const errorHandler = require("../middlewares/errorHandler");
const CouponSchema = require("../models/Coupon");
const sendEmail = require("../utils/sendEmail");
const UserSchema = require("../models/User");

const createCoupon = async (req, res, next) => {
  const date = new Date(req.body.expiresOn);

  if (req.user.accType !== "admin")
    return next(errorHandler(403, "You're not authorized"));
  try {
    const newCoupon = new CouponSchema({ ...req.body, expiresOn: date });
    await newCoupon.save();
    res.status(200).json("Coupon added successfully");
  } catch (error) {
    next(error);
  }
};

const getCouponCode = async (req, res, next) => {
  try {
    const coupon = await CouponSchema.findById(req.params.id);
    if (!coupon) return next(errorHandler(404, "Coupon not found"));
    sendEmail(
      req.user.email,
      `ShopTech ${coupon.title} coupon code`,
      coupon.code
    );
    res
      .status(200)
      .json("Coupon sent to the email account associated to this account");
  } catch (error) {
    return next(error);
  }
};

const getAllCoupons = async (req, res, next) => {
  if (req.user.accType !== "admin")
    return next(errorHandler(403, "You're not authorized"));
  try {
    const coupons = await CouponSchema.find();
    res.status(200).json(coupons);
  } catch (error) {
    return next(error);
  }
};

const getAvailableCoupons = async (req, res, next) => {
  const date = new Date();
  try {
    const availableCoupons = await CouponSchema.find({
      expiresOn: { $gt: date },
    });
    res.status(200).json(availableCoupons);
  } catch (error) {
    return next(error);
  }
};

const useCoupon = async (req, res, next) =>{
  try{
    const verifyCoupon = CouponSchema.findOne({code:req.params.code})
 		if (!verifyCoupon) return next(errorHandler(404,"Invalid coupon code")) 
    rest.status(200).json("Discount applied.")
  }catch (error) {
    return next(error)
  }
} 

module.exports = {
  createCoupon,
  getAllCoupons,
  getAvailableCoupons,
  getCouponCode,
};
