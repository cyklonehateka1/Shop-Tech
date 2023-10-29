import React, { useState } from "react";
import "../styles/components/dealsCoupon.css";
import "../styles/components/dealsCouponResponsive.css";
import { getMethods } from "../utils/protectedRoutes";

const Coupon = ({ profileImg, title, id, expiresOn }) => {
  const [response, setResponse] = useState({ message: null, error: null });
  const handleClick = async () => {
    try {
      const res = await getMethods(`/coupons/code/${id}`);
      res.name && res.name === "AxiosError"
        ? setResponse({ error: res.response.data.message })
        : setResponse({ message: res.data });
      console.log(res);
    } catch (error) {
      setResponse({ error: "Something went wrong" });
      console.log(error);
    }
  };
  return (
    <div className="coupon">
      <div className="couponCont">
        <div className="imgCont">
          <img src={`./couponsImages/${profileImg}`} alt="" />
        </div>
        <div className="bottom">
          <p>{title}</p>
          <button onClick={handleClick}>Get Coupon Code</button>
          <span>expires on {expiresOn.split("T")[0]}</span>
        </div>
        <p>
          {response.error
            ? response.error
            : response.message
            ? response.message
            : ""}
        </p>
      </div>
    </div>
  );
};

export default Coupon;
