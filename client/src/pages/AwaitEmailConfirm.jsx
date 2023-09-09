import React from "react";
import "../styles/pages/awaitEmail.css";

const AwaitEmailConfirm = () => {
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
            We have sent a confirmation email to <span>example@mail.com</span>
            {". "}
            follow the link provided to complete your registration.
          </p>
          <hr />
          <div>
            <p>
              Didn't get the mail? <span>Resend</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwaitEmailConfirm;
