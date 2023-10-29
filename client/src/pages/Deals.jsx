import React from "react";
import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import PromotionBanner from "../components/PromotionBanner";
import { promoBannerData } from "../utils/data";
import "../styles/pages/deals.css";
import "../styles/pages/dealsResponsive.css";
import HalfPriceStore from "../components/HalfPriceStore";
import Footer from "../components/Footer";
import Coupons from "../components/Coupons";

const Deals = () => {
  return (
    <div className="deals">
      <TopBar />
      <Navbar />
      <div className="dealsCont">
        {promoBannerData.map((item) => {
          return (
            <PromotionBanner
              item={item.itemName}
              img={item.img}
              heading={item.heading}
              key={item.itemName}
              text={item.text}
              link={`products/none?pCategory=${item.type}`}
            />
          );
        })}

        <HalfPriceStore />
        <Coupons />
      </div>
      <Footer />
    </div>
  );
};

export default Deals;
