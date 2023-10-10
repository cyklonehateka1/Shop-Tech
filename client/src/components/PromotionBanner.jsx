import React from "react";
import "../styles/components/promoBanner.css";

const PromotionBanner = ({ item, img, heading }) => {
  return (
    <div
      className={`promotionBanner promotionBanner${item}`}
      onClick={(e) => console.log(e)}
    >
      <div className="promoBannerCont">
        <div className="left">
          <h3>{heading}</h3>
          <span>Get 20% off selected items</span>
          <button>Order Now</button>
        </div>
        <div className="right">
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default PromotionBanner;
