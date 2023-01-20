import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/login.css";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../redux/slices/userSlice";
import { backendConnection } from "../utils/axiosConnection";

const Login = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [inputError, setInputError] = useState("");

  const dispatch = useDispatch();
  const { currentUser, error, isLoading } = useSelector((state) => state.user);

  const changeHandler = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  let { email, password } = inputValue;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password || email.trim() === "" || password.trim() === "") {
      dispatch(loginFailure(null));
      return setInputError("All fields are required");
    }

    dispatch(loginStart());

    try {
      const res = await backendConnection.post("/auth/login", inputValue, {
        withCredentials: true,
        credentials: "include",
      });
      dispatch(loginSuccess());
      Cookies.set("clientId", res.data);
      navigate("/");
    } catch (error) {
      dispatch(loginFailure(error));
      console.log(error);
    }
  };

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
            <p href="#">Sign in with Google</p>
          </button>

          <div className="hrText">
            <hr className="hrLeft" />
            <p>or Sign in with Email</p>
            <hr className="hrRight" />
          </div>

          <form action="" onSubmit={submitHandler}>
            <div className="email">
              <label htmlFor="email">EMAIL</label>
              <input
                type="email"
                id="email"
                placeholder="example@mail.com"
                name="email"
                onChange={changeHandler}
              />
            </div>
            <div className="password">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                placeholder="Your Password"
                name="password"
                onChange={changeHandler}
              />
            </div>
            <p>
              {inputError.trim() !== "" && error === null ? inputError : error}
            </p>
            <div className="forgotButton">
              <Link to="/forgotpassword">Forgot password?</Link>
              <button disabled={isLoading}>LOGIN</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
