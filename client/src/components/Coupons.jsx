import React, { useEffect, useState } from "react";
import "../styles/components/coupons.css";
import "../styles/components/couponsResponsive.css";
import PromotionBanner from "./PromotionBanner";
import DealsCoupon from "./DealsCoupon";
import { backendConnection } from "../utils/axiosConnection";

const Coupons = () => {
  const [coupons, setCoupons] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getAvailableCoupons = async () => {
      try {
        const res = await backendConnection.get(`/coupons/available`);
        setCoupons(res.data);
      } catch (error) {
        setError(
          error.response.data ? error.response.data : "Something went wrong"
        );
        console.log(error);
      }
    };
    getAvailableCoupons();
  }, []);
  return (
    <div className="coupons">
      <div className="couponsCont">
        <PromotionBanner
          item={"Coupons"}
          img={"https://i.ibb.co/MBzPPcQ/special.png"}
          heading={"Get latest coupons"}
          type={"all"}
        />
        <h4>get latest coupons and deals</h4>
        <p>{error}</p>
        <div className="couponsParentCont">
          {coupons &&
            coupons.map((item) => {
              const { profileImg, expiresOn, _id, title } = item;
              return (
                <DealsCoupon
                  profileImg={profileImg}
                  expiresOn={expiresOn}
                  title={title}
                  key={_id}
                  id={_id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Coupons;
