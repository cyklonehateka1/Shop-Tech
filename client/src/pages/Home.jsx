import React, { useEffect } from "react";
import Brands from "../components/Brands";
import Categories from "../components/Categories";
import FilterList from "../components/FilterList";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import TopBar from "../components/TopBar";
import "../styles/pages/home.css";
import "../styles/pages/homeResponsive.css";
import Footer from "../components/Footer";
import Label from "../components/Label";
import PromotionBanner from "../components/PromotionBanner";

const Home = () => {
  return (
    <div className="home">
      <TopBar />
      <Navbar />
      <div className="homeMainCont">
        <Hero />
        <Categories />
        <Label text={"Selected products for you"} />
        <Products />
        <Label text={"New Arrivals"} />
        <Products />
        <Label text={"Shop from our most popular brands"} />
        <Brands />
        <Label text={"Gamer's inspiration"} />
        <Products />
        <PromotionBanner
          item={"Laptops"}
          img={"https://i.ibb.co/sqhrHkf/promolaptop.png"}
          heading={"High Performance Laptops"}
        />
        <Products />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
