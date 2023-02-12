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
  const [error, setError] = useState("");
  const [state, dispatch] = useReducer(registerReducer, INITAL_STATE);
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };
  const { name, email, password, confirmPassword } = inputValue;
  const details = {
    name,
    email,
    password,
  };

  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      dispatch({ type: "RESET" });
      return setError("All fields are required");
    }

    if (password !== confirmPassword) {
      dispatch({ type: "RESET" });
      return setError("Passwords do not match");
    }

    dispatch({ type: "REGISTER_START" });
    try {
      await backendConnection.post("/auth/register", details);
      dispatch({ type: "REGISTER_SUCCESS" });
      navigate("/awaitEmailconfirm");
    } catch (error) {
      // dispatch({
      //   type: "REGISTER_FAILURE",
      //   payload: error.response.data.message,
      // });
      console.log(error);
      setError("");
    }
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
                name="name"
                required
              />
            </div>
            <div className="email">
              <label htmlFor="email">EMAIL</label>
              <input
                type="email"
                id="email"
                placeholder="example@mail.com"
                onChange={handleChange}
                required
                name="email"
              />
            </div>
            <div className="password">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                placeholder="Your Password"
                onChange={handleChange}
                required
                name="password"
              />
            </div>
            <div className="password">
              <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Your Password"
                onChange={handleChange}
                name="confirmPassword"
              />
            </div>
            <div className="termsAgree">
              <input type="checkbox" />
              <p>
                By signing up, you agree to our{" "}
                <Link>terms and conditions</Link>
              </p>
            </div>
            <p>{error}</p>
            <p>{state.err && state.err}</p>
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
