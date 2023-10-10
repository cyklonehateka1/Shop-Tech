import React from "react";
import TopBar from "../components/AdminTopBar";
import "../styles/adminCoupons.css";
import Table from "../components/AdminTable";
import { orderProductsCol, orderProductRow } from "../utils/data";
import Navbar from "../components/AdminNavbar";

const Coupons = () => {
  return (
    <div className="adminCoupons">
      {/* <Navbar /> */}
      <div>
        <TopBar />
        <div className="addCoupon">
          <button>+</button>
        </div>
        <div className="adminCouponsCont">
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
