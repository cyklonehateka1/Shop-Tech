import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import "../styles/pages/product.css";
import { useLocation } from "react-router-dom";
import { backendConnection } from "../utils/axiosConnection";
import { useEffect } from "react";

const Product = () => {
  const [product, setProduct] = useState(null);

  const location = useLocation();

  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await backendConnection.get(`/products/getone/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);

  console.log(product);

  return (
    <div className="productPage">
      <TopBar />
      <Navbar />
      <div className="productPageCont">
        <div>
          <div className="left">
            <img src={product && product.profileImg} alt="" />
          </div>
          <div className="right">
            <h2>{product && product.name}</h2>
            <p>{product && product.desc}</p>
            <div className="rating">
              <div className="stars">
                <span className="starFill">
                  <AiFillStar />
                </span>
                <span className="starFill">
                  <AiFillStar />
                </span>
                <span className="starFill">
                  <AiFillStar />
                </span>
                <span className="starFill">
                  <AiFillStar />
                </span>
                <span className="starFill">
                  <AiFillStar />
                </span>
              </div>
              <span className="text">(241)</span>
            </div>
            <div className="pricing">
              <h4>{`$${product && product.price} or ${
                product && Math.ceil(product.price / 6)
              }/month`}</h4>
              <p>Suggested payments with 6 months special financing</p>
            </div>
            <div className="colorCont">
              <h5>Choose a Color</h5>
              <div className="colors">
                {product &&
                  product.colors.map((color, index) => {
                    return (
                      <div key={index}>
                        <div
                          id={`${color}`}
                          style={{ backgroundColor: `${color}` }}
                        ></div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="productButton">
              <div className="productCount">
                <div className="incdec">
                  <span className="dec">-</span>
                  <span className="count">1</span>
                  <span className="inc">+</span>
                </div>
                <span>Only 21 left</span>
              </div>
              <div className="buttons">
                <button className="buy">Buy Now</button>
                <button className="addToCart">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
