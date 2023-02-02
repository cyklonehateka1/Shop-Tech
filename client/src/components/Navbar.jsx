import {
  BiCart,
  BiSearch,
  BiUser,
  BiLogOut,
  BiWindowClose,
} from "react-icons/bi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/components/navbar.css";
import { useState } from "react";
import { backendConnection } from "../utils/axiosConnection";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";

const Navbar = (props) => {
  const [accountModalOpen, setAccoutModalOpen] = useState(false);
  const { products, quantity, total } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);

  const accountModalHanlder = (props) => {
    if (accountModalOpen) {
      setAccoutModalOpen(false);
    } else {
      setAccoutModalOpen(true);
    }
  };

  const navigate = useNavigate();

  const location = useLocation();

  const logoutHandler = async () => {
    try {
      const res = await backendConnection.get("/auth/logout", {
        withCredentials: true,
        credentials: "include",
      });
      console.log(res.data);
      localStorage.removeItem("clientId");
      setAccoutModalOpen(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar">
      <div className="navbarCont">
        <div className="navLogoCont">
          <img src="https://i.ibb.co/wd9fxVk/ecommerce-logo.png" alt="" />
        </div>
        <div className="navMenu">
          <ul>
            <li>
              <span>Categories</span>
            </li>
            <li>
              <Link to="/deals">Deals</Link>
            </li>
            <li>
              <Link to="/deals">What's New</Link>
            </li>
            <li>
              <Link to="/deals">Delivery</Link>
            </li>
          </ul>
        </div>
        <div className="navSearchCont">
          <input type="text" placeholder="Search Products" />
          <div>
            <BiSearch />
          </div>
        </div>
        <div className="cartAccountCont">
          <div className="accountsParent">
            <div className="closedOptions" onClick={accountModalHanlder}>
              <div>
                <BiUser />
              </div>
              <span>Account</span>
            </div>
            {accountModalOpen && (
              <div className="openOptions">
                <div className="close">
                  <BiWindowClose onClick={accountModalHanlder} />
                </div>
                <div className="cont">
                  <div className="account">
                    <img
                      src="https://i.ibb.co/dGcxdHw/intern-img-jg.png"
                      alt=""
                    />
                    <p>Cyklone Hateka</p>
                  </div>
                  {currentUser && (
                    <div className="sign" onClick={logoutHandler}>
                      <span>
                        <BiLogOut />
                      </span>
                      <p>Logout</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="cart">
            <Link to="cart">
              <div>
                <Badge badgeContent={quantity} color="primary">
                  <BiCart style={{ fontSize: "20px" }} />
                </Badge>
              </div>
              <span>Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
