import React from "react";
import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiFillLinkedin,
} from "react-icons/ai";
import "../styles/components/footer.css";
import "../styles/components/footerResponsive.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerCont">
        <div className="logoIcons">
          <div className="left">
            <img src="https://i.ibb.co/wd9fxVk/ecommerce-logo.png" alt="" />
          </div>
          <div className="right">
            <a className="twitter" href="http://localhost:3000">
              <AiOutlineTwitter />
            </a>
            <a className="instagram" href="http://localhost:3000">
              <AiOutlineInstagram />
            </a>
            <a className="linkedin" href="http://localhost:3000">
              <AiFillLinkedin />
            </a>
          </div>
        </div>
        <div className="cols">
          <div className="col">
            <h4>RESOURCES</h4>
            <a href="http://localhost:3000">Application</a>
            <a href="http://localhost:3000">Documentation</a>
            <a href="http://localhost:3000">Systems</a>
            <a href="http://localhost:3000">F&Q</a>
          </div>
          <div className="col">
            <h4>PRICING</h4>
            <a href="http://localhost:3000">Overview</a>
            <a href="http://localhost:3000">Premium Plans</a>
            <a href="http://localhost:3000">Affiliate Program</a>
            <a href="http://localhost:3000">Promotions</a>
          </div>
          <div className="col">
            <h4>COMPANY</h4>
            <a href="http://localhost:3000">About Us</a>
            <a href="http://localhost:3000">Blog</a>
            <a href="http://localhost:3000">Partnerships</a>
            <a href="http://localhost:3000">Careers</a>
            <a href="http://localhost:3000">Press</a>
          </div>
          <div className="col">
            <h4>DATA</h4>
            <a href="http://localhost:3000">About Us</a>
            <a href="http://localhost:3000">Blog</a>
            <a href="http://localhost:3000">Partnerships</a>
            <a href="http://localhost:3000">Careers</a>
            <a href="http://localhost:3000">Press</a>
          </div>
          <div className="col">
            <h4>SOCIAL</h4>
            <a href="http://localhost:3000">Twitter</a>
            <a href="http://localhost:3000">Instagram</a>
            <a href="http://localhost:3000">Linkedin</a>
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
