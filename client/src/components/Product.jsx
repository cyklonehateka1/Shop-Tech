import { AiOutlineHeart, AiFillStar } from "react-icons/ai";
import "../styles/components/product.css";
import "../styles/components/productResponsive.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import React, { useEffect } from "react";

const Product = (props) => {
  const { cartState } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { name, price, desc, ratingCount, profileImg } = props.item;
  const navigate = useNavigate();
  const itemToAdd = {
    _id: props.item._id,
    quantity: 1,
    price,
    profileImg,
    name,
    color: "",
  };

  const addProductToCart = () => {
    const checkItemPresence = cartState.products.findIndex(
      (item) => item._id === itemToAdd._id
    );
    if (checkItemPresence === -1) {
      dispatch(
        addToCart({
          products: [...cartState.products, itemToAdd],
          quantity: itemToAdd.quantity,
          total: price * itemToAdd.quantity,
        })
      );
      localStorage.setItem("clientCart", JSON.stringify(cartState));
    } else {
      const newProducts = [...cartState.products];
      newProducts[checkItemPresence] = {
        ...newProducts[checkItemPresence],
        quantity: cartState.products[checkItemPresence].quantity + 1,
      };
      dispatch(
        addToCart({
          products: newProducts,
          quantity: itemToAdd.quantity,
          total: price * itemToAdd.quantity,
        })
      );
    }
  };

  useEffect(() => {
    localStorage.setItem("clientCart", JSON.stringify(cartState));
  }, [cartState]);

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
          <img src={`./uploads/${profileImg}`} alt="" />
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
          <button onClick={addProductToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
