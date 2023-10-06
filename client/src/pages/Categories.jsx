import React from "react";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import { catPageCatBar } from "../utils/data";
import "../styles/pages/categories.css";
import CategoriesPageCat from "../components/CategoriesPageCat";
import Products from "../components/Products";
import { catPageItems } from "../utils/data";

const Categories = () => {
  return (
    <div className="catPage">
      <TopBar />
      <Navbar />
      <div className="catPageCont">
        <div className="categoriesBar">
          {catPageCatBar.map((item) => {
            return (
              <div className={item.className} key={item.id}>
                <img src={item.img} alt="" />
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
        <div className="catsCont">
          <div className="firstCatsCont">
            {catPageItems.map((item) => {
              return (
                <CategoriesPageCat
                  key={item.id}
                  itemName={item.itemName}
                  image={item.image}
                />
              );
            })}
          </div>
          <Products />
        </div>
      </div>
    </div>
  );
};

export default Categories;
