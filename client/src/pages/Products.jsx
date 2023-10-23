import React from "react";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import "../styles/pages/products.css";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { useLocation, useParams } from "react-router-dom";
import Label from "../components/Label";

const ProductsPage = () => {
  const location = useLocation();
  const { status } = useParams();

  const query = location.search.split("?")[1];
  return (
    <div className="productsPage">
      <TopBar />
      <Navbar />
      <div className="productsPageCont">
        <Label text={"Products"} seeAll={"none"} />
        <Products query={query} display={status} />
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
