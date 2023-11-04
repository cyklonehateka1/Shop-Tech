import {
  BiCart,
  BiSearch,
  BiUser,
  BiLogOut,
  BiLogIn,
  BiWindowClose,
} from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import "../styles/components/navbar.css";
import "../styles/components/navbarResponsive.css";
import { useEffect, useState } from "react";
import { backendConnection } from "../utils/axiosConnection";
import Badge from "@mui/material/Badge";
import { useSelector, useDispatch } from "react-redux";
import { getCredentials } from "../redux/slices/credentialsSlice";
import Cookies from "js-cookie";
import { getMethods } from "../utils/protectedRoutes";

const Navbar = () => {
  const [accountModalOpen, setAccoutModalOpen] = useState(false);
  const { quantity } = useSelector((state) => state.cart.cartState);
  const { currentUser } = useSelector((state) => state.user);
  const { name, image } = useSelector((state) => state.credentials);
  const [searchedProducts, setSearchProducts] = useState(null);
  const [searchSuggestion, setSearchSuggestion] = useState(false);

  useEffect(() => {
    const userCart = async () => {
      const checkCart = localStorage.getItem("clientCart");
      if (checkCart) return;
      try {
        const res = await getMethods(`/cart/getusercart/${currentUser}`);
        localStorage.setItem("clientCart", JSON.stringify(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    userCart();
  }, [currentUser]);

  const accountModalHanlder = () => {
    if (accountModalOpen) {
      setAccoutModalOpen(false);
    } else {
      setAccoutModalOpen(true);
    }
  };
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await backendConnection.get("/auth/logout", {
        withCredentials: true,
        credentials: "include",
      });
      Cookies.remove("access_token");
      // localStorage.removeItem("clientId");

      setAccoutModalOpen(false);
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchedProducts = async (value) => {
    try {
      const res = await backendConnection.get(
        `products/getproducts?search=${value}`
      );
      setSearchProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  let checkTime;
  const handleChange = (e) => {
    setSearchSuggestion(true);
    clearTimeout(checkTime);
    let value;
    if (e.target.value.trim() === "") {
      value = null;
      setSearchSuggestion(false);
    } else {
      value = e.target.value;
    }
    checkTime = setTimeout(() => {
      getSearchedProducts(value);
    }, 400);
  };

  const handleProductClick = (item) => {
    navigate(`/product/${item._id}`);
  };
  return (
    <div className="navbar">
      <div className="navbarCont">
        <Link to="/" className="navLogoCont">
          <img src="https://i.ibb.co/wd9fxVk/ecommerce-logo.png" alt="" />
        </Link>
        <div className="navMenu">
          <ul>
            <li>
              <Link to="/categories?pCategory=accessories">Categories</Link>
            </li>
            <li>
              <Link to="/deals">Deals</Link>
            </li>
            <li>
              <Link to="/delivery">Delivery</Link>
            </li>
          </ul>
        </div>
        <div className="navSearchCont">
          <div className="navSearch">
            <input
              type="text"
              placeholder="Search Products"
              onChange={handleChange}
            />
            <div>
              <BiSearch />
            </div>
          </div>
          {searchSuggestion && (
            <div className="navSearchSuggestions">
              {searchedProducts && searchedProducts.length > 0
                ? searchedProducts.map((item, index) => {
                    return (
                      <div key={index} onClick={() => handleProductClick(item)}>
                        <div className="left">
                          <img src={`/uploads/` + item.profileImg} alt="" />
                        </div>
                        <div className="right">
                          <h5>{item.name}</h5>
                        </div>
                      </div>
                    );
                  })
                : `No product matched`}
            </div>
          )}
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
                  {currentUser ? (
                    <div className="account">
                      <img src={image} alt="" />
                      <p>{name}</p>
                    </div>
                  ) : (
                    <Link to="/register" className="sign">
                      <span>
                        <BiUser />
                      </span>
                      <p>Sign Up</p>
                    </Link>
                  )}
                  {currentUser ? (
                    <div className="sign" onClick={logoutHandler}>
                      <span>
                        <BiLogOut />
                      </span>
                      <p>Logout</p>
                    </div>
                  ) : (
                    <Link to="/login" className="sign">
                      <span>
                        <BiLogIn />
                      </span>
                      <p>Login</p>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="cart">
            <Link to="/cart">
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
      <div className="mobileSearchCont">
        <div className="mobileSearch">
          <input
            type="text"
            placeholder="Search Products"
            onChange={handleChange}
          />
          <div>
            <BiSearch />
          </div>
        </div>

        {searchSuggestion && (
          <div className="mobileSearchSuggestions">
            {searchedProducts && searchedProducts.length > 0
              ? searchedProducts.map((item, index) => {
                  return (
                    <div key={index} onClick={() => handleProductClick(item)}>
                      <div className="left">
                        <img src={`/uploads/` + item.profileImg} alt="" />
                      </div>
                      <div className="right">
                        <h5>{item.name}</h5>
                      </div>
                    </div>
                  );
                })
              : `No product matched`}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
