import { AiOutlineHeart, AiFillStar } from "react-icons/ai";
import "../styles/components/product.css";
import { useNavigate, useLocation } from "react-router-dom";
import { backendConnection } from "../utils/axiosConnection";

const Product = (props) => {
  const { name, price, desc, ratingCount, profileImg } = props.item;
  const location = useLocation();
  const navigate = useNavigate();
  const sendProduct = (e) => {
    if (!e.target.closest("#wishlist")) {
      navigate(`/product/${props.item._id}`);
    } else {
      console.log("wishlist");
    }
  };

  return (
    <div className="product">
      <div className="productCont">
        <div className="imgIconCont" onClick={sendProduct}>
          <img src={`uploads/${profileImg}`} alt="" />
          <span id="wishlist">
            <AiOutlineHeart />
          </span>
        </div>
        <div className="productDetCont">
          <div className="bold">
            <h5>{name}</h5>
            <span>${price}</span>
          </div>
          <span>{desc}</span>
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
            <span className="text">({ratingCount})</span>
          </div>
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
