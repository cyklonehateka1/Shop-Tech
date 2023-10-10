import React from "react";
import "../styles/components/coupons.css";
import PromotionBanner from "./PromotionBanner";
import DealsCoupon from "./DealsCoupon";

const Coupons = () => {
  return (
    <div className="coupon">
      <div className="couponsCont">
        <PromotionBanner
          item={"Coupons"}
          img={"https://i.ibb.co/MBzPPcQ/special.png"}
        />
        <h4>get latest coupons and deals</h4>
        <DealsCoupon />
      </div>
    </div>
  );
};

export default Coupons;
