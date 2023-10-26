import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import "../styles/pages/cart.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/slices/cartSlice";
import { useState } from "react";
import { backendConnection } from "../utils/axiosConnection";
import { getMethods, postMethods } from "../utils/protectedRoutes";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartState } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const [formError, setFormError] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    email: "",
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });
  const [couponRes, setCouponRes] = useState({ message: "", data: "" });
  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: "",
    lastName: "",
    address: "",
    zipCode: "",
    city: "",
    mobile: "",
    email: "",
  });
  const dispatch = useDispatch();
  const { total, products } = cartState;
  const navigate = useNavigate();

  const removeItemHandler = (item) => {
    const newList = [];
    let quantity = 0;
    let itemTotal = 0;
    for (let i = 0; i < products.length; i++) {
      if (products[i]._id !== item._id) {
        newList.push(products[i]);
      } else {
        itemTotal = products[i].price * products[i].quantity;
        quantity = products[i].quantity;
      }
    }
    dispatch(
      removeFromCart({
        products: newList,
        quantity,
        total: itemTotal,
      })
    );
  };

  useEffect(() => {
    localStorage.setItem("clientCart", JSON.stringify(cartState));
  }, [cartState]);
  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };
  const verifyCouponCode = async () => {
    try {
      const res = await getMethods(`/coupons/usecode/${couponCode}`);
      setCouponRes({ message: "Enjoy your discount", data: res.data });
    } catch (error) {
      setCouponRes({ message: "Something went wrong" });
    }
  };
  const tax = Math.ceil((12.5 / 100) * total);
  const shippingCost = Math.ceil((8 / 100) * total);

  const grandTotal = total + tax + shippingCost;

  const handlePaymentDetailsChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
    console.log(paymentDetails);
  };
  const deliveryChangeHandler = (e) => {
    setDeliveryDetails({ ...deliveryDetails, [e.target.name]: e.target.value });
  };

  const placeOrder = async (responseData) => {
    const { cardNumber, cardHolderName, cvc, expiryDate } = paymentDetails;

    try {
      const res = await postMethods("/orders/new", {
        products: cartState.products,
        quantity: cartState.quantity,
        total: cartState.total,
        shippingCost,
        payment: {
          cardHolderName,
          cardNumber,
          cardCvc: cvc,
          cardExpiryDate: expiryDate,
        },
        address: deliveryDetails.address,
        totalAmount: grandTotal,
      });
      setPaymentDetails({
        email: "",
        expiryDate: "",
        cardHolderName: "",
        cardNumber: "",
        cvc: "",
      });
      setDeliveryDetails({
        firstName: "",
        lastName: "",
        address: "",
        zipCode: "",
        city: "",
        mobile: "",
        email: "",
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const paymentHandler = (e) => {
    const { firstName, lastName, zipCode, address, city, email, mobile } =
      deliveryDetails;
    const { cardNumber, cardHolderName, cvc, expiryDate } = paymentDetails;
    e.preventDefault();
    const checkEmtyField =
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      zipCode.trim() === "" ||
      address.trim() === "" ||
      city.trim() === "" ||
      email.trim() === "" ||
      mobile.trim() === "" ||
      cardNumber.trim() === "" ||
      cardHolderName.trim() === "" ||
      cvc.trim() === "" ||
      expiryDate.trim() === "" ||
      paymentDetails.email.trim() === "";

    if (!currentUser) {
      navigate("/login");
      return;
    }
    if (checkEmtyField) {
      setFormError("All fields are required");
      return;
    }
    console.log(formError);
    const handler = window.PaystackPop.setup({
      key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
      email: paymentDetails.email,
      amount: grandTotal * 100,
      currency: "GHS",
      channels: ["card"],
      callback: (response) => {
        const reference = response.reference;
        getMethods(`/payment/verifytransaction?reference=${reference}`)
          .then((res) => {
            console.log(res);
            if (res.data && res.data.data.status === "success") {
              placeOrder();
            }
          })
          .catch((error) => {
            console.log(error);
          });

        // Make an AJAX call to your server with the reference to verify the transaction
      },
      onClose: function () {
        alert("Transaction was not completed, window closed.");
      },
    });
    handler.openIframe();
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
                      onDoubleClick={(e) => removeItemHandler(item)}
                    >
                      <div className="left">
                        <div className="imgCont">
                          <img
                            src={"/uploads/" + item.profileImg}
                            alt="Product"
                          />
                        </div>
                        <div className="center">
                          <h5>{item.name}</h5>
                          <span>Color: {item.color}</span>
                        </div>
                      </div>
                      <div className="right">
                        <h5>${item.price}</h5>
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
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Type here"
                    name="firstName"
                    value={deliveryDetails.firstName}
                    onChange={deliveryChangeHandler}
                  />
                </div>
                <div className="name">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Type here"
                    name="lastName"
                    value={deliveryDetails.lastName}
                    onChange={deliveryChangeHandler}
                  />
                </div>
              </div>
              <div className="address">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Type here"
                  name="address"
                  value={deliveryDetails.address}
                  onChange={deliveryChangeHandler}
                />
              </div>
              <div className="location">
                <div className="city">
                  <label htmlFor="city">City/Town</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Type here"
                    value={deliveryDetails.city}
                    onChange={deliveryChangeHandler}
                  />
                </div>
                <div className="zipCode">
                  <label htmlFor="zipCode">Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    placeholder="Type here"
                    value={deliveryDetails.zipCode}
                    onChange={deliveryChangeHandler}
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
                    value={deliveryDetails.mobile}
                    onChange={deliveryChangeHandler}
                  />
                </div>
                <div className="email">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Type here"
                    value={deliveryDetails.email}
                    onChange={deliveryChangeHandler}
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
              <input
                type="text"
                placeholder="Enter Coupon Code"
                onChange={handleCouponChange}
              />
              <button onClick={verifyCouponCode}>Add Coupon</button>
            </div>
          </div>
          <h5>Payment Details</h5>
          <div className="paymentDetails">
            <ul>
              <li>
                <input
                  type="radio"
                  id="shoppingCard"
                  name="paymentType"
                  value="shopcartCard"
                  onChange={handlePaymentDetailsChange}
                />
                <label htmlFor="">Shopcart Card</label>
              </li>
              <li>
                <input
                  type="radio"
                  id="debitCredit"
                  value="debitCredit"
                  name="paymentType"
                  onChange={handlePaymentDetailsChange}
                />
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
                value={paymentDetails.email}
                onChange={handlePaymentDetailsChange}
              />
            </div>
            <div className="row">
              <label htmlFor="cardName">Card Holder Name</label>
              <input
                type="text"
                placeholder="Type here"
                name="cardHolderName"
                value={paymentDetails.cardHolderName}
                onChange={handlePaymentDetailsChange}
              />
            </div>
            <div className="row">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                placeholder="0000********1234"
                name="cardNumber"
                value={paymentDetails.cardNumber}
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
                  value={paymentDetails.expiryDate}
                  onChange={handlePaymentDetailsChange}
                />
              </div>
              <div className="cvc">
                <label htmlFor="">CVC</label>
                <input
                  type="text"
                  placeholder="000"
                  name="cvc"
                  value={paymentDetails.cvc}
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
              <p>Tax(12.5%)</p>
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
              <span>{formError}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
