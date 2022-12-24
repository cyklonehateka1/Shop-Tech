import { AiOutlineHeart, AiFillStar } from "react-icons/ai";
import "../styles/components/product.css";

const Product = (props) => {
  return (
    <div className="product">
      <div className="productCont">
        <div className="imgIconCont">
          <img src="https://i.ibb.co/7pnyjjT/pinkheadphones.png" alt="" />
          <span>
            <AiOutlineHeart />
          </span>
        </div>
        <div className="productDetCont">
          <div className="bold">
            <h5>Samsung Headphones</h5>
            <span>$78.00</span>
          </div>
          <span>Super quality sound and neck adjustment</span>
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
            <span className="text">(121)</span>
          </div>
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
