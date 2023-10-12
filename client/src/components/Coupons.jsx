import React, { useEffect, useState } from "react";
import "../styles/components/coupons.css";
import PromotionBanner from "./PromotionBanner";
import DealsCoupon from "./DealsCoupon";
import { backendConnection } from "../utils/axiosConnection";

const Coupons = () => {
  const [coupons, setCoupons] = useState(null);
  useEffect(() => {
    const getAvailableCoupons = async () => {
      try {
        const res = await backendConnection.get(`/coupons/available`);
        setCoupons(res.data);
      } catch (error) {
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
          {/* <DealsCoupon />
          <DealsCoupon />
          <DealsCoupon />
          <DealsCoupon /> */}
        </div>
      </div>
    </div>
  );
};

export default Coupons;