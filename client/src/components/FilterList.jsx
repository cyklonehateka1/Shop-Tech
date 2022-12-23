import React from "react";
import "../styles/components/filterList.css";

const FilterList = () => {
  return (
    <div className="filterList">
      <div className="filterListCont">
        <div className="parentCont">
          <div className="selectCont">
            <select name="" id="" defaultValue="headphoneTypes">
              <option value="headphoneTypes">Headphone Type</option>
            </select>
          </div>
          <div className="selectCont">
            <select name="" id="" defaultValue="headphoneTypes">
              <option value="headphoneTypes">Price</option>
            </select>
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
              <option value="headphoneTypes">Material</option>
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
            <option value="">Sort By</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterList;
