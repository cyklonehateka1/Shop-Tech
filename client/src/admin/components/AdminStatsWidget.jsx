import React from "react";
import "../styles/adminStatsWidget.css";
import { MdOutlineSell, MdOutlineKeyboardArrowUp } from "react-icons/md";

const StatsWidget = () => {
  return (
    <div className="statsWidget">
      <div className="statsWidgetSubCont">
        <div className="top">
          <div>
            <MdOutlineSell />
          </div>
          <span>Total Sales</span>
        </div>
        <h4>$874,763.87</h4>
        <div className="bottom">
          <div className="left">
            <div>
              <MdOutlineKeyboardArrowUp />
            </div>
            <span>34%</span>
          </div>
          <span>+18.4k this week</span>
        </div>
      </div>
    </div>
  );
};

export default StatsWidget;
