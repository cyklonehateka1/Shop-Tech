import React from "react";
import "../styles/components/resErrModal.css";
const ResponseErrorModal = () => {
  return (
    <div className="resErrModal">
      <div className="resErrModalCont">
        <h4>Error</h4>
        <img src={`/uploads/`} alt="" />
        <p>Ooops... something went wrong</p>
      </div>
    </div>
  );
};

export default ResponseErrorModal;
