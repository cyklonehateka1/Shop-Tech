import axios from "axios";
const HubtelTest = () => {
  const handlePayTest = async () => {
    const mobileNumber = "0248226831";
    try {
      const resp = await fetch.post(
        `https://devp-reqsendmoney-230622-api.hubtel.com/request-money/${mobileNumber}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Basic " +
              Buffer.from("Emmanuel Hateka:B,o,o,l,e,t1").toString("base64"),
          },
          body: JSON.stringify({
            amount: 1,
            title: "string",
            description: "string",
            clientReference: "string",
            callbackUrl: "http://localhost:3000",
            cancellationUrl: "http://localhost:3000",
            returnUrl: "http://localhost:3000",
            logo: "http://example.com",
          }),
        }
      );
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button onClick={handlePayTest}>Pay</button>
    </div>
  );
};

export default HubtelTest;
