import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";

import { catData, catPageCatBar } from "../utils/data";
import "../styles/pages/categories.css";
import CategoriesPageCat from "../components/CategoriesPageCat";
import Products from "../components/Products";
import { catPageItems } from "../utils/data";
import { useEffect, useState } from "react";
import { backendConnection } from "../utils/axiosConnection";
import { useLocation, useNavigate } from "react-router-dom";

const Categories = () => {
  const [categoryData, setCategoryData] = useState(null);
  const [selectedCat, setSelectedCat] = useState({
    catName: "accessories",
    catType: "subCat",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const getCatData = async (item) => {
    setSelectedCat({ catName: item.id, catType: item.catType });
    navigate(`/categories?pCategory=${item.id}`);
  };

  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const res = await backendConnection.get(
          `/categories/get?catName=${selectedCat.catName}`
        );
        setCategoryData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategoryData();
  }, [selectedCat]);
  return (
    <div className="catPage">
      <TopBar />
      <Navbar />
      <div className="catPageCont">
        <div className="categoriesBar">
          {catPageCatBar.map((item) => {
            return (
              <div
                className={item.className}
                key={item.id}
                onClick={(e) => getCatData(item)}
              >
                <img src={item.img} alt="" />
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
        <div className="catsCont">
          <div className="firstCatsCont">
            {selectedCat.catType === "subCat"
              ? categoryData &&
                categoryData.subCategories.map((item) => {
                  return (
                    <CategoriesPageCat
                      key={item._id}
                      itemName={item.name}
                      image={item.img}
                      catType={selectedCat.catType}
                    />
                  );
                })
              : selectedCat.catType === "brand"
              ? categoryData &&
                categoryData.associatedBrands.map((item) => {
                  return (
                    <CategoriesPageCat
                      key={item._id}
                      itemName={item.name}
                      image={item.img}
                      catType={selectedCat.catType}
                    />
                  );
                })
              : "No data found"}
          </div>
          <Products />
        </div>
      </div>
    </div>
  );
};

export default Categories;
