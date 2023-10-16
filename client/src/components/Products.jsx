import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "./Product";
import "../styles/components/products.css";
import "../styles/components/productsResponsive.css";
import { backendConnection } from "../utils/axiosConnection";
import { AiOutlineDown } from "react-icons/ai";
import LoadingWidget from "./LoadingWidget";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Products = ({ openModal, limit, query, headingText }) => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState(null);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [priceFilterActive, setPriceFilterActive] = useState(false);
  const [discount, setDiscount] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [filtersActive, setFiltersActive] = useState(false);
  const [skip, setSkip] = useState(null);

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
  // let query = location.search;

  useEffect(() => {
    const getProducts = async () => {
      let res;
      try {
        res = await backendConnection.get(
          skip
            ? `/products/getproducts?${query}&limit=16&skip=${skip}`
            : `/products/getproducts?${query}&limit=16`
        );
        setProducts(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        setError("Something went wrong");
      }
    };

    getProducts();
  }, [location.pathname, query, limit, skip]);

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

  const sortHandler = (e) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    const setProductsAfterFilter = () => {
      let filteredProducts =
        products &&
        products.filter((item) => {
          if (discount === "Yes" && priceFilterActive) {
            return item.price >= min && item.price <= max && item.onDiscount;
          } else if (discount === "Yes" && !priceFilterActive) {
            return item.onDiscount;
          } else if (discount === "No" && priceFilterActive) {
            return item.price >= min && item.price <= max && !item.onDiscount;
          } else if (discount === "No" && !priceFilterActive) {
            return !item.onDiscount;
          } else {
            return item.price >= min && item.price <= max;
          }
        });
      setFilteredProducts(filteredProducts);
    };
    filtersActive && setProductsAfterFilter();
  }, [products, discount, priceFilterActive, filtersActive, min, max]);

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
                  <button
                    onClick={{
                      applyPriceFilters,
                    }}
                  >
                    Apply
                  </button>
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
        <div className="paginationCont">
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
