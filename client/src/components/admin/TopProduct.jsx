import React from "react";
import "../styles/topProduct.css";

const topProduct = () => {
  return (
    <div className="topProduct">
      <div className="topProdCont">
        <h5>Top Product</h5>
        <div>
          <div className="prod">
            <div className="left">
              <div className="imgCont">
                <img
                  src="https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c25lYWtlcnN8ZW58MHx8MHx8&w=1000&q=80"
                  alt=""
                />
              </div>
              <div className="details">
                <p>Convers All Stars</p>
                <span>Price $129</span>
              </div>
            </div>
            <button>357 Sale</button>
          </div>
          <div className="prod">
            <div className="left">
              <div className="imgCont">
                <img
                  src="https://images.unsplash.com/photo-1603787081207-362bcef7c144?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c25lYWtlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                  alt=""
                />
              </div>
              <div className="details">
                <p>Nike Jordan 1</p>
                <span>Price $259</span>
              </div>
            </div>
            <button>280 Sale</button>
          </div>
          <div className="prod">
            <div className="left">
              <div className="imgCont">
                <img
                  src="https://thumbs.dreamstime.com/b/nike-air-force-shoe-made-173430533.jpg"
                  alt=""
                />
              </div>
              <div className="details">
                <p>Nike Airforce</p>
                <span>Price $259</span>
              </div>
            </div>
            <button>232 Sale</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default topProduct;
