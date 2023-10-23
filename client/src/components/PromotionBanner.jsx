import React from "react";
import "../styles/components/promoBanner.css";
import { useNavigate } from "react-router-dom";

const PromotionBanner = ({ item, img, heading, type, text, link }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (type === "all") {
      navigate("/products/flex?discount=all");
    } else {
      navigate(`/${link}`);
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
          <span>{text}</span>
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
