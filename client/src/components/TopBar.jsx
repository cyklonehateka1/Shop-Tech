import React from "react";
import "../styles/components/topBar.css";
import { BiPhoneCall, BiChevronDown } from "react-icons/bi";

const TopBar = () => {
  return (
    <div className="topBar">
      <div className="topBarCont">
        <div className="left">
          <div>
            <BiPhoneCall />
          </div>
          <span>+233 123 456 cd789</span>
        </div>
        <div className="center">
          <p>Get 50% 0ff on Selected items</p>
          <span> | </span>
          <p>Shop Now</p>
        </div>
        <div className="right">
          <div className="lang">
            <p>Eng </p>
            <div>
              <BiChevronDown />
            </div>
          </div>
          <div className="location">
            <p>Location </p>
            <div>
              <BiChevronDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
