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
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [priceFilterActive, setPriceFilterActive] = useState(false);
  const [discount, setDiscount] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [filtersActive, setFiltersActive] = useState(false);

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

  const applyPriceFilters = () => {
    if (min > max) {
      const temp = min;

      setMin(max);
      setMax(temp);
    }
    if (min <= 0 && max <= 0) {
      setPriceFilterActive(false);
    } else {
      setPriceFilterActive(true);
      setFiltersActive(true);
    }

    if ((discount === "discount" || discount === "") && min <= 0 && max <= 0) {
      setFiltersActive(false);
    }
  };

  const discountHandler = (e) => {
    setDiscount(e.target.value);

    if (e.target.value !== "discount" || priceFilterActive) {
      setFiltersActive(true);
    } else {
      setFiltersActive(false);
    }
  };

  useEffect(() => {
    const setProductsAfterFilter = () => {
      setFilteredProducts(
        filtersActive &&
          products.filter((item) => {
            return item.price >= min && item.price <= max && item;
          })
      );
    };
  }, [discount, products]);

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
                    value={min}
                    placeholder="min"
                    onChange={(e) => setMin(e.target.value)}
                  />
                  <input
                    type="number"
                    name="max"
                    value={max}
                    placeholder="max"
                    onChange={(e) => setMax(e.target.value)}
                  />
                  <button onClick={applyPriceFilters}>Apply</button>
                </div>
              )}
            </div>
            <div className="selectCont">
              <select
                name=""
                id=""
                defaultValue="discount"
                onChange={discountHandler}
              >
                <option value="discount">Discount</option>
                <option>Yes</option>
                <option>No</option>
              </select>
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
