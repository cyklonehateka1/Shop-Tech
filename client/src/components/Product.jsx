import { AiOutlineHeart, AiFillStar } from "react-icons/ai";
import "../styles/components/product.css";

const Product = (props) => {
  const { name, price, desc, ratingCount, profileImg } = props.item;
  return (
    <div className="product">
      <div className="productCont">
        <div className="imgIconCont">
          <img src={profileImg} alt="" />
          <span>
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
