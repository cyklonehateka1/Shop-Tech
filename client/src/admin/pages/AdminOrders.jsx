import React, { useEffect, useState } from "react";
import Order from "../components/AdminOrder";
import Table from "../components/AdminTable";
import "../styles/adminOrders.css";
import { ordersPageColumns, ordersPageRows } from "../utils/data";
import TopBar from "../components/AdminTopBar";
import Navbar from "../components/AdminNavbar";
import { getMethods } from "../../utils/protectedRoutes";
import { useDispatch, useSelector } from "react-redux";
import {
  start,
  failure,
  getOrdersSuccess,
} from "../../redux/slices/orderSlice";

const Orders = () => {
  const [orderRows, setOrderRows] = useState([]);
  const [clickData, setClickData] = useState({
    state: false,
    data: {
      row: {
        customer: null,
      },
    },
  });
  const dispatch = useDispatch();
  const getRowClickData = (data) => {
    setClickData({ state: true, data });
  };
  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    const getOrders = async () => {
      let rows = [];
      let newRows = [];
      dispatch(start);
      try {
        const res = await getMethods("/orders/find/unfulfilled");

        for (let i = 0; i < res.data.length; i++) {
          rows.push({
            id: res.data[i]._id,
            amount: res.data[i].cart.total,
            customer: res.data[i].customer,
            address: res.data[i].address || null,
            products: res.data[i].cart.products.map((item, index) => {
              return item.name;
            }),
            productObjects: res.data[i].cart.products.map((item, index) => {
              return item;
            }),
            paymentDetails: res.data[i].payment,
            fulfilled: res.data[i].orderFulfilled,
          });
        }

        dispatch(getOrdersSuccess(rows));

        setOrderRows(rows);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, [dispatch]);
  const date = new Date();
  const newDate = new Date(date.setDate(date.getDate() + 6));
  // console.log(newDate);

  let day;
  if (newDate.getDay() === 0) {
    day = new Date(newDate.setDate(newDate.getDate() - 6));
  } else if (newDate.getDay() > 1) {
    day = new Date(date.setDate(date.getDate() - (date.getDay() - 1 + 7)));
  }
  console.log(day);

  return (
    <div className="adminParent">
      <Navbar />
      <div className="orders">
        <TopBar />
        <br />
        {clickData.state && <Order orderData={clickData} />}
        <div className="ordersCont">
          <h4>Orders</h4>
          <Table
            rows={orders}
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
