import React from "react";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";

const Cart = () => {
  return (
    <div className="cart">
      <TopBar />
      <Navbar />
      <div className="cartCont">
        <div className="left">
          <div className="product">
            <h5>Review Item And Shipping</h5>
            <div className="productsCont">
              <div className="itemCont">
                <div className="imgCont">
                  <img
                    src="https://i.ibb.co/7pnyjjT/pinkheadphones.png"
                    alt=""
                  />
                </div>
                <div className="center">
                  <h5>Gallaxy Echo</h5>
                  <span>Color: Pink</span>
                </div>
                <div className="right">
                  <h5>$600.87</h5>
                  <span>Quantity: 01</span>
                </div>
              </div>
            </div>
          </div>

          <div className="shipping">
            <h5>Delivery Information</h5>
            <form action="">
              <div className="names">
                <div className="ame">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" id="firstName" />
                </div>
                <div className="name">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" />
                </div>
              </div>
              <label htmlFor="address">Address</label>
              <input type="text" id="address" />
              <div className="location">
                <div className="city">
                  <label htmlFor="city">City/Town</label>
                  <input type="text" name="city" id="city" />
                </div>
                <div className="zipCode">
                  <label htmlFor="zipCode">Zip Code</label>
                  <input type="text" name="zipCode" id="zipCode" />
                </div>
              </div>
              <div className="contact">
                <div className="mobile">
                  <label htmlFor="mobile">Mobile</label>
                  <input type="text" name="mobile" id="mobile" />
                </div>
                <div className="email">
                  <label htmlFor="email">Email</label>
                  <input type="text" name="email" id="email" />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
};

export default Cart;
