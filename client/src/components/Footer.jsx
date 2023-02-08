import React from "react";
import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiFillLinkedin,
} from "react-icons/ai";
import "../styles/components/footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerCont">
        <div className="logoIcons">
          <div className="left">
            <img src="https://i.ibb.co/wd9fxVk/ecommerce-logo.png" alt="" />
          </div>
          <div className="right">
            <a className="twitter" href="#">
              <AiOutlineTwitter />
            </a>
            <a className="instagram" href="#">
              <AiOutlineInstagram />
            </a>
            <a className="linkedin" href="#">
              <AiFillLinkedin />
            </a>
          </div>
        </div>
        <div className="cols">
          <div className="col">
            <h4>RESOURCES</h4>
            <a href="#">Application</a>
            <a href="#">Documentation</a>
            <a href="#">Systems</a>
            <a href="#">F&Q</a>
          </div>
          <div className="col">
            <h4>PRICING</h4>
            <a href="#">Overview</a>
            <a href="#">Premium Plans</a>
            <a href="#">Affiliate Program</a>
            <a href="#">Promotions</a>
          </div>
          <div className="col">
            <h4>COMPANY</h4>
            <a href="#">About Us</a>
            <a href="#">Blog</a>
            <a href="#">Partnerships</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
          </div>
          <div className="col">
            <h4>DATA</h4>
            <a href="#">About Us</a>
            <a href="#">Blog</a>
            <a href="#">Partnerships</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
          </div>
          <div className="col">
            <h4>SOCIAL</h4>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
            <a href="#">Linkedin</a>
          </div>
        </div>
        <div className="copyright">
          <p>&copy;Copyright. All rights reserved </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
