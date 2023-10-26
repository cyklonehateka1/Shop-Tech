import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import "../styles/pages/product.css";
import { useLocation } from "react-router-dom";
import { backendConnection } from "../utils/axiosConnection";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import Products from "../components/Products";
import Label from "../components/Label";

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(product && product.colors[0]);
  const { cartState } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
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

  const handleQuantity = (e) => {
    if (e.target.id === "dec" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (e.target.id === "inc") {
      setQuantity(quantity + 1);
    }
  };

  const colorHandler = (e) => {
    setColor(e.target.id);
  };
  const itemToAdd = {
    _id: product && product._id,
    quantity,
    price: product && product.price,
    profileImg: product && product.profileImg,
    name: product && product.name,
    brand: product && product.brand,
    parentCat: product && product.parentCat,
    subCat: product && product.subCat,
    color,
  };
  const addProductHandler = () => {
    const checkProduct = cartState.products.findIndex(
      (item) => item._id === itemToAdd._id
    );
    if (checkProduct === -1) {
      dispatch(
        addToCart({
          products: [...cartState.products, itemToAdd],
          quantity,
          total: itemToAdd.price * quantity,
        })
      );
    } else if (cartState.products[checkProduct].quantity > itemToAdd.quantity) {
      const newCart = [...cartState.products];
      newCart[checkProduct] = {
        ...newCart[checkProduct],
        quantity: itemToAdd.quantity,
      };
      const newQuantity =
        newCart[checkProduct].quantity -
        cartState.products[checkProduct].quantity;

      dispatch(
        addToCart({
          products: newCart,
          quantity: newQuantity,
          total: quantity * itemToAdd.price,
        })
      );
    } else {
      const newCart = [...cartState.products];
      newCart[checkProduct] = {
        ...newCart[checkProduct],
        quantity: itemToAdd.quantity,
      };
      const newQuantity =
        newCart[checkProduct].quantity -
        cartState.products[checkProduct].quantity;
      dispatch(
        addToCart({
          products: newCart,
          quantity: newQuantity,
          total: quantity * itemToAdd.price,
        })
      );
    }
  };
  useEffect(() => {
    localStorage.setItem("clientCart", JSON.stringify(cartState));
  }, [cartState]);

  return (
    <div className="productPage">
      <TopBar />
      <Navbar />
      <div className="productPageCont">
        <div>
          <div
            className="left"
            name="hell"
            onClick={(e) => console.log(e.target.name)}
          >
            <img src={`/uploads/${product && product.profileImg}`} alt="" />
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
                      <div key={index} onClick={colorHandler}>
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
                  <span className="dec" id="dec" onClick={handleQuantity}>
                    -
                  </span>
                  <span className="count">{quantity}</span>
                  <span className="inc" id="inc" onClick={handleQuantity}>
                    +
                  </span>
                </div>
                <span>Only 21 left</span>
              </div>
              <div className="buttons">
                <button className="buy">Buy Now</button>
                <button className="addToCart" onClick={addProductHandler}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Label text={"Similar items"} />
        </div>
        {product && (
          <Products
            display={"none"}
            headingText={"Similar items"}
            query={`sCategory=${product.subCat.toString()}&pId=${product._id}`}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SingleProduct;
