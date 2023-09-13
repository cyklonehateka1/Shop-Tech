import React from "react";
import { Link } from "react-router-dom";
import "../styles/adminNavbar.css";
import {
  AiOutlineDashboard,
  AiOutlineMessage,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { TfiShoppingCartFull, TfiStatsUp } from "react-icons/tfi";
import { RiCoupon3Line } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { Badge } from "@mui/material";

const Navbar = () => {
  return (
    <div className="adminNavbar">
      <div className="navbarContainer">
        <div className="navLogoCont">
          <img src="https://i.ibb.co/wd9fxVk/ecommerce-logo.png" alt="" />
        </div>
        <div className="navMenuCont">
          <ul>
            <li>
              <div>
                <AiOutlineDashboard />
              </div>
              <Link to="/admin/dashboard"> Dashboard</Link>
            </li>
            <li>
              <div>
                <BsHandbag />
              </div>
              <Link to="/admin/products">All Products</Link>
            </li>

            <li>
              <div>
                <HiOutlineViewGridAdd />
              </div>
              <Link to="/admin/addproduct">Add Product</Link>
            </li>
            <li>
              <div>
                <TfiShoppingCartFull />
              </div>
              <Link to="/admin/orders">Orders</Link>
            </li>
            <li>
              <div>
                <RiCoupon3Line />
              </div>
              <Link to="/admin/coupons">Coupons</Link>
            </li>
            <li>
              <div>
                <FiUsers />
              </div>
              <Link to="/admin/customers">Customers</Link>
            </li>
            <li>
              <div>
                <TfiStatsUp />
              </div>
              <Link to="/admin/analytics">Analytics</Link>
            </li>
            <li>
              <div>
                <AiOutlineMessage />
              </div>
              <Link to="/admin/messages">
                <Badge color="warning" variant="dot">
                  Messages
                </Badge>
              </Link>
            </li>
          </ul>
        </div>
        <div className="navBottom">
          <ul>
            <li>
              <div>
                <AiOutlineSetting />
              </div>
              <Link to="/">Settings</Link>
            </li>
            <li>
              <div>
                <AiOutlineLogout />
              </div>
              <Link to="/">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
