import React from "react";
import TopBar from "../components/TopBar";
import "../styles/adminDashboard.css";
import StatsWidget from "../components/StatsWidget";
import Charts from "../components/Charts";
import Reviews from "../components/Reviews";
import Table from "../components/Table";
import TopProduct from "../components/TopProduct";
import { tableRows } from "../utils/data";
import { tableColumns } from "../utils/data";
const Dashboard = () => {
  return (
    <div className="dashboard">
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
