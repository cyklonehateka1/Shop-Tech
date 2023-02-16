import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "./Product";
import "../styles/components/products.css";
import { backendConnection } from "../utils/axiosConnection";
import { AiOutlineDown } from "react-icons/ai";

const Products = ({ openModal }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState(null);
  const [priceFilter, setPriceFilter] = useState({ min: null, max: null });
  const [discount, setDiscount] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [priceModalOpen, setPriceModalOpen] = useState(false);

  const priceModalHandler = (e) => {
    if (!priceModalOpen) {
      setPriceModalOpen(true);
    }
  };

  const modalCloseHandler = (e) => {
    if (!e.target.closest(".priceFilter")) {
      setPriceModalOpen(false);
    }
  };

  const handlePriceFilter = (e) => {
    setPriceFilter({ ...priceFilter, [e.target.name]: e.target.value });
  };

  const allFilters = {
    discount,
    ...priceFilter,
  };

  console.log(allFilters);

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

  useEffect(() => {
    setFilteredProducts(
      products.filter((item) => {
        return priceFilter.min && item.price >= priceFilter.min;
      })
    );
  }, [discount, products, priceFilter]);

  console.log(filteredProducts);
  return (
    <div className="products" onClick={modalCloseHandler}>
      <div className="productsCont">
        <div className="filterList">
          <div className="filterListCont">
            <div
              className="priceFilter modalParent"
              onClick={priceModalHandler}
            >
              <p className="modalParent">
                Price{" "}
                <span>
                  <AiOutlineDown />
                </span>
              </p>
              {priceModalOpen && (
                <div className="modal">
                  <input
                    type="number"
                    name="min"
                    placeholder="min"
                    onChange={handlePriceFilter}
                  />
                  <input
                    type="number"
                    name="max"
                    placeholder="max"
                    onChange={handlePriceFilter}
                  />
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
            <div
              className="selectCont"
              onClick={() =>
                discount ? setDiscount(false) : setDiscount(true)
              }
            >
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
