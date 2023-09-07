import React from "react";
import "../styles/components/hero.css";
import "../styles/components/heroResponsive.css";

const Hero = () => {
  return (
    <div className="hero">
      <div className="heroCont">
        <div className="heroLeft">
          <div className="heroTextCont">
            <h1>Grab Up To 50% Off On Selected Headphone</h1>
          </div>
          <button>Buy Now</button>
        </div>
        <div className="heroImgCont">
          <img src="https://i.ibb.co/FXgB7CD/potential-Hero.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
