const errorHandler = require("../middlewares/errorHandler.js");
const PaymentSchema = require("../models/Payment");
const axios = require("axios");

const verifyPayment = async (req, res, next) => {
  const reference = req.query.reference;
  const paystackSecretKey = process.env.PAYSTACK_SEC_KEY;

  const url = `https://api.paystack.co/transaction/verify/${reference}`;

  const options = {
    headers: {
      Authorization: `Bearer ${paystackSecretKey}`,
    },
  };

  try {
    const verify = axios.get(url, options);
    res.status(verify.request.status).json(verify.data);
    console.log(verify.data);
  } catch (error) {
    return next(error);
  }
};
