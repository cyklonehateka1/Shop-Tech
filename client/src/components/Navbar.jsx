import { BiCart, BiSearch, BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import "../styles/components/navbar.css";

const Navbar = () => {
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
          <div>
            <div>
              <BiUser />
            </div>
            <span>Account</span>
          </div>
          <div className="cart">
            <Link to="cart">
              <div>
                <BiCart />
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
