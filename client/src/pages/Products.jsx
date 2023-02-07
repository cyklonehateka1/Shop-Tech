import React from "react";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import "../styles/pages/products.css";

const Products = () => {
  return (
    <div className="products">
      <TopBar />
      <Navbar />
      <div className="productsPageCont"></div>
    </div>
  );
};

export default Products;
