import React from "react";
import "../styles/components/hero.css";
import "../styles/components/heroResponsive.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero">
      <div className="heroCont">
        <div className="heroLeft">
          <div className="heroTextCont">
            <h1>Grab Up To 50% Off On Selected Headphone</h1>
          </div>
          <button>
            <Link to={`/products/none?sCategory=headsets&discount=all`}>
              Buy Now
            </Link>
          </button>
        </div>
        <div className="heroImgCont">
          <img src="https://i.ibb.co/FXgB7CD/potential-Hero.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
