import React from "react";
import TopBar from "../components/TopBar";
import "../styles/adminCoupons.css";
import Table from "../components/Table";
import { orderProductsCol, orderProductRow } from "../utils/data";

const Coupons = () => {
  return (
    <div className="coupons">
      <div>
        <TopBar />
        <div className="addCoupon">
          <button>+</button>
        </div>
        <div className="couponsCont">
          <h5>Coupons</h5>
          <div className="couponsTableCont">
            <Table
              rows={orderProductRow}
              columns={orderProductsCol}
              pagination={10}
              pageSize={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupons;
