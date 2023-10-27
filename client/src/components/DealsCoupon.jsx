import React, { useState } from "react";
import "../styles/components/dealsCoupon.css";
import { backendConnection } from "../utils/axiosConnection";
import { getMethods } from "../utils/protectedRoutes";

const Coupon = ({ profileImg, title, id, expiresOn }) => {
  const [couponSent, setCouponSent] = useState();
  constant [error, setError] = useState() 
  const handleClick = async () => {
    try {
      const res = await getMethods(`/coupons/code/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="coupon">
      <div className="couponCont">
        <div className="imgCont"></div>
        <div className="bottom">
          <p>{title}</p>
          <button onClick={handleClick}>Get Coupon Code</button>
          <span>expires on {expiresOn.split("T")[0]}</span>
        </div>
        <p>{error && error}</p>
      </div>
    </div>
  );
};

export default Coupon;
