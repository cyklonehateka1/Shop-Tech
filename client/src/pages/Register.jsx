import "../styles/pages/register.css";
import { Link } from "react-router-dom";
import { useReducer, useState } from "react";
import registerReducer from "../utils/reducers/registerReducer";
import { backendConnection } from "../utils/axiosConnection";

const INITAL_STATE = {
  err: null,
  isLoading: false,
  success: false,
};

const Register = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };
  console.log(inputValue);

  const details = {
    name: inputValue.name,
    email: inputValue.email,
    password: inputValue.password,
  };

  const { state, dispatch } = useReducer(registerReducer, INITAL_STATE);
  const registerHandler = async (e) => {
    e.preventDefault();

    const res = await backendConnection.post("/auth/register", details);
  };

  return (
    <div className="register">
      <div className="registerCont">
        <div className="left">
          <img src="https://i.ibb.co/wd9fxVk/ecommerce-logo.png" alt="" />
          <div className="registerHeadingCont">
            <h2>Create Account</h2>
          </div>

          <form action="" onSubmit={registerHandler}>
            <div className="name">
              <label htmlFor="name">FULL NAME</label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                onChange={handleChange}
              />
            </div>
            <div className="email">
              <label htmlFor="email">EMAIL</label>
              <input
                type="email"
                id="email"
                placeholder="example@mail.com"
                onChange={handleChange}
              />
            </div>
            <div className="password">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                placeholder="Your Password"
                onChange={handleChange}
              />
            </div>
            <div className="password">
              <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Your Password"
                onChange={handleChange}
              />
            </div>
            <div className="termsAgree">
              <input type="checkbox" />
              <p>
                By signing up, you agree to our{" "}
                <Link>terms and conditions</Link>
              </p>
            </div>
            <button>SIGN up</button>
          </form>
        </div>
        <div className="right">
          <div className="imgTextCont">
            <img src="https://i.ibb.co/QMQS2W7/register.png" alt="" />
            <p>Already have an account?</p>
          </div>
          <button>
            <Link to="/register">Sign in</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
