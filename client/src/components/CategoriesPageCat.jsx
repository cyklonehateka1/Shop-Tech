import React from "react";
import "../styles/components/categoriesPageCat.css";
import "../styles/components/categoriesPageCatResponsive.css";
import { backendConnection } from "../utils/axiosConnection";
import { useNavigate } from "react-router-dom";

const CategoriesPageCat = ({
  itemName,
  image,
  catType,
  setProductsQuery,
  setSubCategory,
}) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    catType === "subCat"
      ? navigate(`/products/flex?sCategory=${itemName.toLowerCase()}`)
      : navigate(`/products/flex?brand=${itemName.toLowerCase()}`);
    setSubCategory({ itemName, catType });
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
