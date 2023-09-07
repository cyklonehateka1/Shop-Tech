import "../styles/pages/register.css";
import { Link, useNavigate } from "react-router-dom";
import { useReducer, useState } from "react";
import registerReducer from "../utils/reducers/registerReducer";
import { backendConnection } from "../utils/axiosConnection";

const INITAL_STATE = {
  err: null,
  isLoading: false,
  success: false,
};

const Register = () => {
  const [state, dispatch] = useReducer(registerReducer, INITAL_STATE);
  const [formError, setFormError] = useState("");
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const { password, email, name, confirmPassword } = value;
  const submitHandler = (e) => {
    e.preventDefault();
    if (!password || !email || !name) {
      setFormError("All feilds are required");
    }
    if (password.length < 6) {
      setFormError("Password cannot be less than 6 characters");
    }
    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
    }
    backendConnection
      .post("/auth/register", {
        name,
        email,
        password,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        setFormError(
          err.response.data.message === {}
            ? "something went wrong"
            : err.response.data.message
        );
        console.log(err.response.data.message);
      });
  };

  return (
    <div className="register">
      <div className="registerCont">
        <div className="left">
          <img src="https://i.ibb.co/wd9fxVk/ecommerce-logo.png" alt="" />
          <div className="registerHeadingCont">
            <h2>Create Account</h2>
          </div>

          <form action="" onSubmit={submitHandler}>
            <div className="name">
              <label htmlFor="name">FULL NAME</label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                name="name"
                required
                onChange={handleChange}
              />
            </div>
            <div className="email">
              <label htmlFor="email">EMAIL</label>
              <input
                type="email"
                id="email"
                placeholder="example@mail.com"
                required
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="password">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                placeholder="Your Password"
                required
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="password">
              <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Your Password"
                name="confirmPassword"
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
            <p>{formError}</p>
            <p>{}</p>
            <button>SIGN up</button>
          </form>
        </div>
        <div className="right">
          <div className="imgTextCont">
            <img src="https://i.ibb.co/QMQS2W7/register.png" alt="" />
            <p>Already have an account?</p>
          </div>
          <button>
            <Link to="/login">Sign in</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
