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
        <div className="left">
          <img src="https://i.ibb.co/7pnyjjT/pinkheadphones.png" alt="" />
        </div>
        <div className="right">
          <h2>Gallaxy Echo</h2>
          <div className="desc">
            <p>
              An experience of ultra-modern high quality sound to give you peace
              and tranquility from the outside world like never before
            </p>
          </div>
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
            <div id="pink"></div>
            <div id="blue"></div>
            <div id="green"></div>
            <div id="purple"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
