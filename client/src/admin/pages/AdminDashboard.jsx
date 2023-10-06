import React, { useEffect, useState } from "react";
import TopBar from "../components/AdminTopBar";
import Navbar from "../components/AdminNavbar";
import "../styles/adminDashboard.css";
import StatsWidget from "../components/AdminStatsWidget";
import Charts from "../components/AdminCharts";
import Reviews from "../components/AdminReviews";
import Table from "../components/AdminTable";
import TopProduct from "../components/AdminTopProduct";
import { tableRows } from "../utils/data";
import { tableColumns } from "../utils/data";
import { getMethods } from "../../utils/protectedRoutes";
const Dashboard = () => {
  const [weeklySales, setWeeklySales] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [totalSales, setTotalSales] = useState(null);
  const [totalOrders, setTotalOrders] = useState(null);
  const [customerQuantity, setCustomerQuantity] = useState(null);
  useEffect(() => {
    const getWeeklySales = async () => {
      try {
        const res = await getMethods("/sales/get/weekly");
        console.log(res.data);
        setWeeklySales(res.data.currentWeekSale);
        setPercentage(
          100 -
            Math.floor((res.data.currentWeekSale / res.data.prevWeekSale) * 100)
        );
      } catch (error) {
        console.log(error);
      }
    };
    getWeeklySales();
  }, [getMethods]);
  useEffect(() => {
    const getTotalSales = async () => {
      try {
        const res = await getMethods("/sales/get/total");
        setTotalSales(res.data.sale);
      } catch (error) {
        console.log(error);
      }
    };
    getTotalSales();
  }, [getMethods]);
  useEffect(() => {
    const getTotalCustomerQuantity = async () => {
      try {
        const res = await getMethods("/users/get/totalcount");
        setCustomerQuantity(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTotalCustomerQuantity();
  }, [getMethods]);
  useEffect(() => {
    const getTotalOrders = async () => {
      try {
        const res = await getMethods("/orders/get/totalorders");
        setTotalOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTotalOrders();
  }, [getMethods]);
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboardCont">
        <TopBar />
        <div className="statsWidgetCont">
          <StatsWidget
            title={"Sales this week"}
            amount={weeklySales}
            percentage={percentage}
            sign={"$"}
          />
          <StatsWidget
            title={"All time sales"}
            amount={totalSales}
            percentage={""}
            sign={"$"}
          />
          <StatsWidget
            title={"Total Customers"}
            amount={customerQuantity}
            percentage={""}
            sign={""}
          />
          <StatsWidget
            title={"Total Orders"}
            amount={totalOrders}
            percentage={""}
            sign={""}
          />
        </div>
        <div className="chartsReviewsCont">
          <Charts />
          <Reviews />
        </div>
        <div className="tableTopProCont">
          <div className="dashboardTable">
            <h5>Current Orders</h5>
            <Table rows={tableRows} columns={tableColumns} pagination={5} />
          </div>
          <TopProduct />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
