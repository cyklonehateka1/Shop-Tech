import React from "react";
import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import "../styles/pages/confirmEmail.css";
import { backendConnection } from "../utils/axiosConnection";
import confirmEmailReducer from "../utils/reducers/confirmEmailReducer";

const ConfirmEmail = () => {
  const [state, dispatch] = useReducer(confirmEmailReducer, {
    err: null,
    isLoading: false,
    success: false,
  });

  const { userId, token } = useParams();
  console.log(token);

  useEffect(() => {
    const verifyAccount = async () => {
      dispatch({ type: "START" });
      try {
        const res = await backendConnection.get(
          `/auth/${userId}/verify/${token}`
        );
        dispatch({ type: "SUCCESS" });
      } catch (error) {
        dispatch({
          type: "FAILURE",
          payload: error.response.data
            ? error.response.data.message
            : "Something went wrong, please try again later or contact customer care.",
        });
      }
    };
    verifyAccount();
  }, [userId, token]);
  return (
    <div className="confirmEmailCont">
      <div className="messageBox">
        <div className="imgCont">
          {state.success ? (
            <img
              src="https://images.vexels.com/media/users/3/157893/isolated/preview/d6f4e679138673eb3223362c70ecf7ce-check-mark-tick-icon.png"
              alt=""
            />
          ) : !state.isLoading ? (
            <img
              src="https://cdn-icons-png.flaticon.com/512/6659/6659895.png"
              alt=""
            />
          ) : (
            <h5>...Loading</h5>
          )}
        </div>
        <p>
          {state.err
            ? state.err
            : state.isLoading
            ? "...Loading"
            : "Account verified successfully.. Click on the login butto below and let's go shopping at affordable prices"}
        </p>
        <button onClick={() => (window.location.href = "/login")}>Login</button>
      </div>
    </div>
  );
};

export default ConfirmEmail;
