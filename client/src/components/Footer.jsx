import React from "react";
import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiFillLinkedin,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerCont">
        <div className="logoIcons">
          <div className="left">
            <img src="https://i.ibb.co/wd9fxVk/ecommerce-logo.png" alt="" />
          </div>
          <div className="right">
            <span className="twitter">
              <AiOutlineTwitter />
            </span>
            <span className="instagram">
              <AiOutlineInstagram />
            </span>
            <span className="linkedin">
              <AiFillLinkedin />
            </span>
          </div>
        </div>
        <div className="cols">
          <div className="col1">
            <h4>RESOURCES</h4>
            <p>Application</p>
            <p>Documentation</p>
            <p>Systems</p>
            <p>F&Q</p>
          </div>
          <div className="col1">
            <h4>PRICING</h4>
            <p>Overview</p>
            <p>Premium Plans</p>
            <p>Affiliate Program</p>
            <p>Promotions</p>
          </div>
          <div className="col1">
            <h4>COMPANY</h4>
            <p>About Us</p>
            <p>Blog</p>
            <p>Partnerships</p>
            <p>Careers</p>
            <p>Press</p>
          </div>
          <div className="col1">
            <h4>SOCIAL</h4>
            <p>Twitter</p>
            <p>Instagram</p>
            <p>Linkedin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
