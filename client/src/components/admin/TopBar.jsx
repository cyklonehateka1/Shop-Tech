import React from "react";
import "../styles/topBar.css";
import { CiSearch, CiDark } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";

import { Badge } from "@mui/material";

const TopBar = () => {
  return (
    <div className="topBar">
      <div className="left">
        <div className="searchCont">
          <input type="text" placeholder="Search" />
          <div>
            <CiSearch />
          </div>
        </div>
      </div>
      <div className="right">
        <div className="icon">
          <CiDark />
        </div>
        <div className="icon">
          <Badge color="secondary" variant="dot">
            <IoIosNotificationsOutline />
          </Badge>
        </div>
        <div className="account">
          <div className="profileImgCont">
            <img src="https://i.ibb.co/dGcxdHw/intern-img-jg.png" alt="" />
          </div>
          <span>Cyklone Hateka</span>
          <div className="downArr">
            <MdKeyboardArrowDown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
