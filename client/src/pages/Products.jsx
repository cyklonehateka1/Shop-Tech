import React from "react";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import "../styles/pages/products.css";
import Products from "../components/Products";

const ProductsPage = () => {
  return (
    <div className="productsPage">
      <TopBar />
      <Navbar />
      <div className="productsPageCont">
        <Products />
      </div>
    </div>
  );
};

export default ProductsPage;
