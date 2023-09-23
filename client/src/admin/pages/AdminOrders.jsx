import React, { useEffect, useState } from "react";
import Order from "../components/AdminOrder";
import Table from "../components/AdminTable";
import "../styles/adminOrders.css";
import { ordersPageColumns, ordersPageRows } from "../utils/data";
import TopBar from "../components/AdminTopBar";
import Navbar from "../components/AdminNavbar";
import { getMethods } from "../../utils/protectedRoutes";

const Orders = () => {
  const [orderRows, setOrderRows] = useState([]);
  const [clickData, setClickData] = useState({
    state: false,
    data: {},
  });
  const getRowClickData = (data) => {
    setClickData({ state: true, data });
  };

  console.log(clickData);

  useEffect(() => {
    const getOrders = async () => {
      let rows = [];
      try {
        const res = await getMethods("/orders/find/unfulfilled");

        for (let i = 0; i < res.data.length; i++) {
          rows.push({
            id: res.data[i]._id,
            amount: res.data[i].cart.total,
            customer: res.data[i].customer,
            address: res.data[i].address && res.data[i].address,
            products: res.data[i].cart.products.map((item, index) => {
              return item.name;
            }),
            fulfilled: res.data[i].orderFulfilled,
          });
        }
        setOrderRows(rows);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="adminParent">
      <Navbar />
      <div className="orders">
        <TopBar />
        <br />
        <Order orderData={clickData} />
        <div className="ordersCont">
          <h4>Orders</h4>
          <Table
            rows={orderRows}
            columns={ordersPageColumns}
            pagination={10}
            pageSize={10}
            rowClickData={getRowClickData}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
