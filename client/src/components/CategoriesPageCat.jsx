import React from "react";
import "../styles/components/categoriesPageCat.css";

const CategoriesPageCat = ({ itemName, image }) => {
  return (
    <div className="categoriesPageCat">
      <div className="categoriesPageCatCont">
        <h5>{itemName}</h5>
        <img src={`/catPageImages/${image}`} alt="" />
        <span>Shop now</span>
      </div>
    </div>
  );
};

export default CategoriesPageCat;
