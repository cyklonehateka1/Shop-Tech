const verifyEmailTemplate = (text) => {
  return `<div
  style="
    width: 100vw;
    padding-top: 10vh;
    background-color: rgb(249, 249, 249);
    font-family: sans-serif;
  "
>
  <div
    style="
      margin-left: 10vw;
      max-width: 60%;
      min-width: 50%;
      display: flex;
      align-items: center;
    "
  >
    <div style="width: 10%; height: 100%">
      <img
        src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
        alt=""
        style="width: 100%"
      />
    </div>
    <div
      style="
        margin-left: 10px;
        width: 65%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      "
    >
      <h1
        style="
          font-size: 40px;
          color: rgb(65, 65, 65);
          letter-spacing: 2px;
          margin-bottom: 0;
        "
      >
        COMPANY NAME
      </h1>
      <p style="font-size: 14px; color: rgb(78, 78, 78); margin-top: 0">
      </p>
    </div>
  </div>
  <div style="max-width: 100%; margin-top: 7vh; margin-bottom: 7vh">
    <img src="./Default.png" alt="" style="width: 100%" />
  </div>
  <div
    style="
      margin: 0 10vw;
      background-color: white;
      border-radius: 10px;
      padding: 3%;
      margin-bottom: 20vh;
    "
  >
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      "
    >
      <div style="font-size: 20px">
        <p style="margin-top: -3px">Verify Your email</p>
      </div>
      <div style="font-size: 17px; color: rgb(65, 65, 65)">
        Wed, 1st January 1890
      </div>
    </div>
    <div style="margin: 8vh 0">
      <p
        style="
          text-align: justify;
          font-size: 20px;
          line-height: 26px;
          word-spacing: 3px;
          letter-spacing: 0.3px;
          word-wrap: break-word;
        "
      >
      ${text}
      </p>
    </div>
    <div style="display: flex; max-width: 100%; justify-content: space-between">
      <div
        style="display: flex; max-width: 60%; justify-content: space-between"
      >
        <div
          style="
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 40%;
          "
        >
          <div style="width: 20%; margin-right: 20px; border-radius: 50px">
            <img
              src="https://www.iconbunny.com/icons/media/catalog/product/cache/2/thumbnail/600x/1b89f2fc96fc819c2a7e15c7e545e8a9/1/6/169.9-single-message-bubble-icon-iconbunny.jpg"
              alt=""
              style="width: 100%; border-radius: 50px"
            />
          </div>
          <div>
            <p style="font-size: 17px; word-spacing: 6px">+233 23456789</p>
            <p style="font-size: 17px; word-spacing: 6px">+233 83456743</p>
          </div>
        </div>
        <div
          style="
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 40%;
          "
        >
          <div style="width: 20%; margin-right: 20px">
            <img
              src="https://i.pinimg.com/originals/03/e5/73/03e5739fddbe11ddba09f4d62de5b7e9.jpg"
              alt=""
              style="width: 100%; border-radius: 50px"
            />
          </div>
          <div>
            <p style="font-size: 17px; word-spacing: 6px">+233 23456789</p>
            <p style="font-size: 17px; word-spacing: 6px">+233 83456743</p>
          </div>
        </div>
      </div>
      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-end;
          width: 30%;
        "
      >
        <div style="width: 40%">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcK1AfInRjuswv43UcOhKtnUd71VEHNSRDAA&usqp=CAU"
            alt=""
            style="width: 100%; border-radius: 50px"
          />
        </div>
        <div style="display: flex; flex-direction: column">
          <p style="font-size: 23px; color: rgb(43, 43, 43)">Your Name</p>
          <p style="font-size: 18px; color: rgb(92, 92, 92); margin-top: 0">
            Position
          </p>
        </div>
      </div>
    </div>
  </div>
  <div style="max-width: 100%">
    <img src="./Variant2.png" alt="" style="width: 100%" />
  </div>
</div>
`;
};

module.exports = verifyEmailTemplate;
