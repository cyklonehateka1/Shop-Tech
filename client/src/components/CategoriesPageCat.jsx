import React from "react";
import "../styles/components/categoriesPageCat.css";
import { backendConnection } from "../utils/axiosConnection";
import { useNavigate } from "react-router-dom";

const CategoriesPageCat = ({ itemName, image, catType }) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    catType === "subCat"
      ? navigate(`/products?sCategory=${itemName.toLowerCase()}`)
      : navigate(`/products?brand=${itemName.toLowerCase()}`);
  };
  return (
    <div className="categoriesPageCat">
      <div className="categoriesPageCatCont" onClick={handleClick}>
        <h5>{itemName}</h5>
        <div className="imgCont">
          <img src={`/catPageImages/${image}`} alt="" />
        </div>
        <span>Shop now</span>
      </div>
    </div>
  );
};

export default CategoriesPageCat;
