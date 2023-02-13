import React from "react";
import "../styles/components/filterList.css";

const FilterList = () => {
  return (
    <div className="filterList">
      <div className="filterListCont">
        <div className="parentCont">
          <div className="selectCont">
            <label htmlFor="price">Price</label>
            <input
              type="range"
              id="price"
              name="price"
              min="0"
              max="100"
              step="1"
            />
          </div>
          <div className="selectCont">
            <select name="" id="" defaultValue="headphoneTypes">
              <option value="headphoneTypes">Review</option>
            </select>
          </div>
          <div className="selectCont">
            <select name="" id="" defaultValue="headphoneTypes">
              <option value="headphoneTypes">Color</option>
            </select>
          </div>
          <div className="selectCont">
            <select name="" id="" defaultValue="headphoneTypes">
              <option value="headphoneTypes">Offer</option>
            </select>
          </div>
        </div>
        <div className="sortBy">
          <select name="" id="">
            <option value="">Recomended</option>
            <option value="">Newest</option>
            <option value="">Lowest Price</option>
            <option value="">Highest Price Price</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterList;
