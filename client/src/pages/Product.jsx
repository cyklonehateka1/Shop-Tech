import React from "react";
import { AiFillStar } from "react-icons/ai";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import "../styles/pages/product.css";

const Product = () => {
  return (
    <div className="productPage">
      <TopBar />
      <Navbar />
      <div className="productPageCont">
        <div>
          <div className="left">
            <img src="https://i.ibb.co/7pnyjjT/pinkheadphones.png" alt="" />
          </div>
          <div className="right">
            <h2>Gallaxy Echo</h2>
            <p>
              An experience of ultra-modern high quality sound to give you peace
              and tranquility from the outside world like never before
            </p>
            <div className="rating">
              <div className="stars">
                <span className="starFill">
                  <AiFillStar />
                </span>
                <span className="starFill">
                  <AiFillStar />
                </span>
                <span className="starFill">
                  <AiFillStar />
                </span>
                <span className="starFill">
                  <AiFillStar />
                </span>
                <span className="starFill">
                  <AiFillStar />
                </span>
              </div>
              <span className="text">(241)</span>
            </div>
            <div className="pricing">
              <h4>$476.99 or 87.76/month</h4>
              <p>Suggested payments with 6 months special financing</p>
            </div>
            <div className="colorCont">
              <h5>Choose a Color</h5>
              <div className="colors">
                <div>
                  <div id="pink" style={{ backgroundColor: "pink" }}></div>
                </div>
                <div id="blue">
                  <div id="blue" style={{ backgroundColor: "blue" }}></div>
                </div>
                <div id="green">
                  <div id="green" style={{ backgroundColor: "green" }}></div>
                </div>
                <div id="purple">
                  <div id="purple" style={{ backgroundColor: "purple" }}></div>
                </div>
              </div>
            </div>
            <div className="productButton">
              <div className="productCount">
                <div className="incdec">
                  <span className="dec">-</span>
                  <span className="count">1</span>
                  <span className="inc">+</span>
                </div>
                <span>Only 21 left</span>
              </div>
              <div className="buttons">
                <button className="buy">Buy Now</button>
                <button className="addToCart">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
