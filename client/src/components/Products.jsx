import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "./Product";
import "../styles/components/products.css";
import { backendConnection } from "../utils/axiosConnection";
import { AiOutlineDown } from "react-icons/ai";

const Products = ({ modalsClose, closeAllModals }) => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [priceFilter, setPriceFilter] = useState({ min: null, max: null });
  const [priceModalOpen, setPriceModalOpen] = useState(false);

  const priceModalHandler = () => {
    if (!priceModalOpen) {
      setPriceModalOpen(true);
    } else return;
  };

  // (e.target.closest(".active-image-box"))

  const location = useLocation();

  const query = location.search;

  useEffect(() => {
    const getProducts = async () => {
      let res;
      try {
        res = await backendConnection.get(`/products/getproducts${query}`);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
        setError("Something went wrong");
      }
    };

    getProducts();
  }, [location.pathname, query]);
  return (
    <div className="products">
      <div className="productsCont">
        <div className="filterList">
          <div className="filterListCont">
            <div className="priceFilter" onClick={priceModalHandler}>
              <p>
                Price{" "}
                <span>
                  <AiOutlineDown />
                </span>
              </p>
              {priceModalOpen && (
                <div className="modal">
                  <input type="number" name="min" placeholder="min" />
                  <input type="number" name="max" placeholder="max" />
                  <button>Apply</button>
                </div>
              )}
            </div>
            <div className="selectCont">
              <select name="" id="" defaultValue="headphoneTypes">
                <option value="headphoneTypes">Review</option>
                <option>1 star</option>
                <option>2 stars</option>
                <option>2 stars</option>
                <option>4 stars</option>
                <option>5 stars</option>
              </select>
            </div>
            <div className="selectCont">
              <p>
                Discount <span style={{ color: "red" }}>*</span>
              </p>
            </div>
            <div className="sortBy">
              <select name="" id="">
                <option value="">Recomended</option>
                <option value="">Newest</option>
                <option value="">Lowest Price</option>
                <option value="">Highest Price</option>
              </select>
            </div>
          </div>
        </div>
        <h4>Products For You!</h4>
        <div>
          {products && products.length > 0 ? (
            products.map((item, index) => {
              return <Product item={item} key={index} />;
            })
          ) : (
            <h2>...Ooops! No Products found</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
