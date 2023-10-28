import React, { useState } from "react";
import "../styles/pages/awaitEmail.css";
import { backendConnection } from "../utils/axiosConnection";

const AwaitEmailConfirm = () => {
  const [response, setResponse] = useState({ error: null, message: null });
  const temporalInfo = JSON.parse(localStorage.getItem("temporalInfo"));
  const resendHandler = async () => {
    try {
      const resend = await backendConnection.post(
        `/auth/resendconfirmationemail/${temporalInfo.userId}`
      );
      resend.data
        ? setResponse({ message: resend.data })
        : resend.name && resend.name === "AxiosError"
        ? setResponse({ message: resend.response.data.message })
        : setResponse({ message: "Something went wrong" });
    } catch (error) {
      error.name && error.name === "AxiosError"
        ? setResponse({ message: error.response.data.message })
        : setResponse({ message: "Something went wrong" });
    }
  };
  return (
    <div className="awaitEmailConfirm">
      <div className="awaitConfirmCont">
        <div className="top">
          <img
            src="https://i.ibb.co/grtJ3Kf/undraw-Mail-sent-re-0ofv.png"
            alt=""
          />
        </div>
        <div className="bottom">
          <h3>Email Confirmation</h3>
          <p>
            We have sent a confirmation email to{" "}
            <span>
              {temporalInfo ? temporalInfo.email : "example@mail.com"}
            </span>
            {". "}
            follow the link provided to complete your registration.
          </p>
          <hr />
          <div>
            <p>
              Didn't get the mail? <span onClick={resendHandler}>Resend</span>
            </p>
          </div>
          <span>{response.message && response.message}</span>
        </div>
      </div>
    </div>
  );
};

export default AwaitEmailConfirm;
