import React from "react";
import Order from "../components/AdminOrder";
import Table from "../components/AdminTable";
import "../styles/adminOrders.css";
import { ordersPageColumns, ordersPageRows } from "../utils/data";
import TopBar from "../components/AdminTopBar";
import Navbar from "../components/AdminNavbar";

const Orders = () => {
  return (
    <div className="adminParent">
      <Navbar />
      <div className="orders">
        <TopBar />
        <br />
        <Order />
        <div className="ordersCont">
          <h4>Orders</h4>
          <Table
            rows={ordersPageRows}
            columns={ordersPageColumns}
            pagination={10}
            pageSize={10}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
