import React from "react";
import "../styles/components/halfPriceStore.css";
import "../styles/components/halfPriceStoreResponsive.css";
import Products from "./Products";

const HalfPriceStore = () => {
  const query = "discount=50";
  return (
    <div className="halfPriceStore">
      <div className="halfPriceStoreCont">
        <h4>you pay half the cost, to be the boss.</h4>
        <p>Get 50% off selected Items</p>
        <Products query={query} display={"none"} />
      </div>
    </div>
  );
};

export default HalfPriceStore;
