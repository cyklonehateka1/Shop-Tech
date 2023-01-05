import React from "react";
import { Link } from "react-router-dom";
import "../styles/pages/login.css";

const Login = () => {
  return (
    <div className="login">
      <div className="loginCont">
        <div className="left">
          <div>
            <img
              src="https://i.ibb.co/zsKHKLy/undraw-welcome-cats-thqn.png"
              alt=""
            />
            <p>
              Get access to your wishlist, orders, recommendatiions and more
            </p>
          </div>

          <button>
            <Link to="/register">Sign Up</Link>
          </button>
        </div>
        <div className="right">
          <img src="https://i.ibb.co/wd9fxVk/ecommerce-logo.png" alt="" />

          <div className="loginHeadingCont">
            <h2>Login</h2>
          </div>
          <button>
            <img src="https://i.ibb.co/D8t7tB7/google.png" alt="" />
            <p>Sign in with Google</p>
          </button>

          <div className="hrText">
            <hr className="hrLeft" />
            <p>or Sign in with Email</p>
            <hr className="hrRight" />
          </div>

          <form action="">
            <div className="email">
              <label htmlFor="email">EMAIL</label>
              <input type="email" id="email" placeholder="example@mail.com" />
            </div>
            <div className="password">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                placeholder="Your Password"
              />
            </div>
            <div className="forgotButton">
              <Link to="/forgotpassword">Forgot password?</Link>
              <button>LOGIN</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
