import React from "react";
import "../styles/components/promoBanner.css";
import { useNavigate } from "react-router-dom";

const PromotionBanner = ({ item, img, heading, type }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (type === "all") {
      navigate("/products?discount=all");
    } else {
      navigate(`/products/?pCategory=${type}&discount=all`);
    }
  };
  return (
    <div
      className={`promotionBanner promotionBanner${item}`}
      onClick={(e) => console.log(e)}
    >
      <div className="promoBannerCont">
        <div className="left">
          <h3>{heading}</h3>
          <span>Get 20% off selected items</span>
          <button onClick={handleClick}>Order Now</button>
        </div>
        <div className="right">
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default PromotionBanner;
