import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";

import { catPageCatBar } from "../utils/data";
import "../styles/pages/categories.css";
import "../styles/pages/categoriesResponsive.css";
import CategoriesPageCat from "../components/CategoriesPageCat";
import Products from "../components/Products";
import { useEffect, useState } from "react";
import { backendConnection } from "../utils/axiosConnection";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Label from "../components/Label";

const Categories = () => {
  const [categoryData, setCategoryData] = useState(null);
  const [productsQuery, setProductsQuery] = useState("pCategory=phones");
  const [selectedCat, setSelectedCat] = useState({
    catName: "accessories",
    catType: "subCat",
  });
  const [subCategory, setSubCategory] = useState({
    itemName: null,
    catType: null,
  });
  const navigate = useNavigate();
  const getCatData = async (item) => {
    setSelectedCat({ catName: item.id, catType: item.catType });
    setProductsQuery(`pCategory=${item.id.toLowerCase()}`);
    navigate(`/categories?pCategory=${item.id}`);
  };

  const getSubCategory = (data) => {
    setSubCategory(data);
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
                      setProductsQuery={setProductsQuery}
                      setSubCategory={getSubCategory}
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
                      setSubCategory={getSubCategory}
                    />
                  );
                })
              : "No data found"}
          </div>
          <Label
            text={`Shop from a wide range of ${selectedCat.catName}`}
            link={`products/flex?pCategory=${selectedCat.catName}`}
          />
          <Products query={productsQuery} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Categories;
