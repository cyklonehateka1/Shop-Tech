import React from "react";
import "../styles/adminStatsWidget.css";
import {
  MdOutlineSell,
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

const StatsWidget = ({ title, amount, percentage, weekChange, sign }) => {
  return (
    <div className="statsWidget">
      <div className="statsWidgetSubCont">
        <div className="top">
          <div>
            <MdOutlineSell />
          </div>
          <span>{title}</span>
        </div>
        <h4>
          {sign}
          {amount}
        </h4>
        <div className="bottom">
          <div className="left">
            <div>
              <MdOutlineKeyboardArrowUp />
              {/* <MdOutlineKeyboardArrowDown /> */}
            </div>
            <span>{percentage}%</span>
          </div>
          <span>{weekChange} this week</span>
        </div>
      </div>
    </div>
  );
};

export default StatsWidget;
