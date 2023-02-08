import React from "react";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import "../styles/pages/cart.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/slices/cartSlice";
import { useState } from "react";
import PaystackPop from "@paystack/inline-js";

const Cart = () => {
  const { products, total } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const [paymentDetails, setPaymentDetails] = useState({
    email: currentUser.email,
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });
  const dispatch = useDispatch();

  const tax = Math.ceil((total * 10) / 100);
  const shippingCost = Math.ceil((total * 15) / 100);

  const grandTotal = total + tax + shippingCost;

  const handlePaymentDetailsChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const paystackDetails = {
    ...paymentDetails,
    amount: grandTotal * 100,
    key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
    currency: "USD",
    channels: ["card"],
  };
  console.log(paystackDetails);

  const paymentHandler = (e) => {
    let handler = new PaystackPop();
    handler.newTransaction({
      ...paymentDetails,
      onSuccess: function (transaction) {
        let message = "Payment complete! Reference: " + transaction.reference;
        alert(message);
      },
      onclose: function () {
        window.alert("Hell yeah!");
      },
    });
  };

  return (
    <div className="cart">
      <TopBar />
      <Navbar />
      <div className="cartCont">
        <div className="left">
          <div className="cartProduct">
            <h5>Review Item And Shipping</h5>
            <span>Double click on item to remove</span>
            <div className="productsListCont">
              {products &&
                products.map((item, index) => {
                  return (
                    <div
                      className="itemCont"
                      key={index}
                      onDoubleClick={(e) => dispatch(removeFromCart(item))}
                    >
                      <div className="left">
                        <div className="imgCont">
                          <img src={item.product.profileImg} alt="Product" />
                        </div>
                        <div className="center">
                          <h5>{item.product.name}</h5>
                          <span>Color: {item.product.color}</span>
                        </div>
                      </div>
                      <div className="right">
                        <h5>${item.product.price}</h5>
                        <span>Quantity: {item.quantity}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="shipping">
            <h5>Delivery Information</h5>
            <form action="">
              <div className="names">
                <div className="name">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" id="firstName" placeholder="Type here" />
                </div>
                <div className="name">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" placeholder="Type here" />
                </div>
              </div>
              <div className="address">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" placeholder="Type here" />
              </div>
              <div className="location">
                <div className="city">
                  <label htmlFor="city">City/Town</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Type here"
                  />
                </div>
                <div className="zipCode">
                  <label htmlFor="zipCode">Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    placeholder="Type here"
                  />
                </div>
              </div>
              <div className="contact">
                <div className="mobile">
                  <label htmlFor="mobile">Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    id="mobile"
                    placeholder="Type here"
                  />
                </div>
                <div className="email">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Type here"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="right">
          <h3>Order Summary</h3>
          <div className="inputCont">
            <div className="input">
              <input type="text" placeholder="Enter Coupon Code" />
              <button>Add Coupon</button>
            </div>
          </div>
          <h5>Payment Details</h5>
          <div className="paymentDetails">
            <ul>
              <li>
                <input type="radio" id="shoppingCard" name="shoppingCard" />
                <label htmlFor="">Shopcart Card</label>
              </li>
              <li>
                <input type="radio" id="debitCredit" name="creditOrDebit" />
                <label htmlFor="">Credit or Debit Card</label>
              </li>
            </ul>
            <div className="icons">
              <img
                src="https://i.ibb.co/2KSnNN6/Mastercard-2019-logo-svg.png"
                alt=""
                name="master"
              />
              <img
                src="https://i.ibb.co/qYX7jT8/Visa-Inc-logo-svg.png"
                alt=""
                name="visa"
              />
            </div>
          </div>
          <form action="">
            <div className="row">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Type here"
                name="email"
                onChange={handlePaymentDetailsChange}
              />
            </div>
            <div className="row">
              <label htmlFor="cardName">Card Holder Name</label>
              <input
                type="text"
                placeholder="Type here"
                name="cardHolderName"
                onChange={handlePaymentDetailsChange}
              />
            </div>
            <div className="row">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                placeholder="0000********1234"
                name="cardNumber"
                onChange={handlePaymentDetailsChange}
              />
            </div>
            <div className="cvcExpiry">
              <div className="expiry">
                <label htmlFor="">Expiry</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  name="expiryDate"
                  onChange={handlePaymentDetailsChange}
                />
              </div>
              <div className="cvc">
                <label htmlFor="">CVC</label>
                <input
                  type="text"
                  placeholder="000"
                  name="cvc"
                  onChange={handlePaymentDetailsChange}
                />
              </div>
            </div>
          </form>
          <div className="summary">
            <div className="row">
              <p>Sub Total</p>
              <span>{total}</span>
            </div>
            <div className="row">
              <p>Tax(10%)</p>
              <span>${tax}</span>
            </div>
            <div className="row">
              <p>Coupon Discount</p>
              <span>-$0.00</span>
            </div>
            <div className="row">
              <p>Shipping Cost</p>
              <span>${shippingCost}</span>
            </div>
            <div className="totalButton">
              <div className="row">
                <p>Total</p>
                <span>${grandTotal}</span>
              </div>
              <button onClick={paymentHandler}>Pay ${grandTotal}</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
