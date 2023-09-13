import React from "react";
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
const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboardCont">
        <TopBar />
        <div className="statsWidgetCont">
          <StatsWidget />
          <StatsWidget />
          <StatsWidget />
          <StatsWidget />
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
