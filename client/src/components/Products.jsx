import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Product from "./Product";
import "../styles/components/products.css";
import "../styles/components/productsResponsive.css";
import { backendConnection } from "../utils/axiosConnection";
import { AiOutlineDown } from "react-icons/ai";
import LoadingWidget from "./LoadingWidget";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Products = ({
  openModal,
  limit,
  query,
  headingText,
  display,
  paginationDisplay,
}) => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState(null);
  const [inputPrice, setInputPrice] = useState({ min: 0, max: 0 });
  const [priceFilterActive, setPriceFilterActive] = useState(false);
  const [discount, setDiscount] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [filtersActive, setFiltersActive] = useState(false);
  const [skip, setSkip] = useState(null);
  const [keyPressed, setKeyPressed] = useState(0);

  // Getting products
  const productsCopy = useRef([]);
  useEffect(() => {
    const getProducts = async () => {
      let res;
      try {
        res = await backendConnection.get(
          skip
            ? `/products/getproducts?${query}&limit=${limit}&skip=${skip}`
            : `/products/getproducts?${query}&limit=${limit}`
        );
        setProducts(res.data);
        productsCopy.current = [...res.data];
      } catch (error) {
        console.log(error);
        setError("Something went wrong");
      }
    };

    getProducts();
  }, [query, limit, skip]);

  // Pagination controll
  const pageClickHandler = (e) => {
    if (!isNaN(parseInt(e.target.innerText))) {
      setSkip((parseInt(e.target.innerText) - 1) * 16);
    }
  };
  const prevNextHandler = (e) => {
    if (e === "next") {
      setSkip(skip + 16);
    } else if (skip && skip >= 16) {
      setSkip(skip - 16);
    }
  };

  // Filter by price fliter and modal open and close controller
  const priceModalHandler = (e) => {
    if (!priceModalOpen) {
      setPriceModalOpen(true);
    }
  };

  const modalCloseHandler = (e) => {
    if (!e.target.closest(".modal") && priceModalOpen) {
      setPriceModalOpen(false);
    }
  };

  const inputPriceHandler = (e) => {
    setInputPrice({ ...inputPrice, [e.target.name]: e.target.value });
  };

  const { min, max } = inputPrice;

  const applyPriceFilters = () => {
    const newMin = parseFloat(min);
    const newMax = parseFloat(max);
    if (newMin > newMax) {
      setError("Invalid price range");
      return;
    } else if (newMax > 0 && newMax >= newMin) {
      setPriceFilterActive(true);
      setFiltersActive(true);
    } else if (newMin === 0 && newMax === 0 && discount === null) {
      setPriceFilterActive(false);
      setFiltersActive(false);
    }
    setKeyPressed(keyPressed + 1);
    console.log(keyPressed);
  };

  // filter by discount
  const discountHandler = (e) => {
    if (e.target.value === "Yes") {
      setDiscount(true);
      setFiltersActive(true);
    } else if (e.target.value === "No") {
      setFiltersActive(true);
      setDiscount(false);
    } else if (!priceFilterActive) {
      setDiscount(null);
      filtersActive(false);
    } else {
      setDiscount(null);
    }
  };

  const sortHandler = (e) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    const newMin = parseFloat(min);
    const newMax = parseFloat(max);

    const filterParameters = (i) => {
      if (priceFilterActive && discount) {
        return i.price >= newMin && i.price <= newMax && i.onDiscount;
      } else if (priceFilterActive && discount === false) {
        return i.price >= newMin && i.price <= newMax && !i.onDiscount;
      } else if (priceFilterActive && discount === null) {
        return i.price >= newMin && i.price <= newMax;
      } else if (!priceFilterActive && discount) {
        return i.onDiscount;
      } else if (!priceFilterActive && discount === false) {
        return !i.onDiscount;
      } else if (!filtersActive) {
        return i;
      }
    };
    const filterProducts = productsCopy.current.filter(filterParameters);
    setFilteredProducts(filterProducts);
  }, [discount, filtersActive, priceFilterActive, keyPressed]);

  useEffect(() => {
    const filteredProductsCopy = [...filteredProducts];
    if (sort === "newest") {
      setFilteredProducts(
        filteredProductsCopy.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    } else if (sort === "lowestPrice") {
      setFilteredProducts(
        filteredProductsCopy.sort((a, b) => a.price - b.price)
      );
    } else if (sort === "highestPrice") {
      setFilteredProducts(
        filteredProductsCopy.sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <div className="products" onClick={modalCloseHandler}>
      <div className="productsCont">
        <div className="filterList" style={{ display: `${display}` }}>
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
                    value={min}
                    onChange={inputPriceHandler}
                  />
                  <input
                    type="number"
                    name="max"
                    placeholder="max"
                    value={max}
                    onChange={inputPriceHandler}
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
              <select name="" id="" onChange={sortHandler}>
                <option value="recomended">Recomended</option>
                <option value="newest">Newest</option>
                <option value="lowestPrice">Lowest Price</option>
                <option value="highestPrice">Highest Price</option>
              </select>
            </div>
          </div>
        </div>
        <div className="productsParent">
          {products && filtersActive ? (
            filteredProducts.map((item, index) => {
              return <Product item={item} key={index} />;
            })
          ) : products && products.length > 0 ? (
            products.map((item, index) => {
              return <Product item={item} key={index} />;
            })
          ) : products && products.length === 0 ? (
            <h2>...Ooops! No Products found</h2>
          ) : (
            <LoadingWidget />
          )}
        </div>
        <div className="paginationCont" style={{ display: paginationDisplay }}>
          <button
            className="prev"
            name="prevBtn"
            onClick={() => prevNextHandler("prev")}
          >
            <BsArrowLeft />
          </button>
          <div className="pagesCount" onClick={pageClickHandler}>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div className="ellipsis">...</div>
            <div>8</div>
            <div>9</div>
          </div>
          <button
            className="next"
            name="nextBtn"
            onClick={() => prevNextHandler("next")}
          >
            <BsArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
