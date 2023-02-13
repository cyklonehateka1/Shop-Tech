import React from "react";
import Brands from "../components/Brands";
import Categories from "../components/Categories";
import FilterList from "../components/FilterList";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import TopBar from "../components/TopBar";
import "../styles/pages/home.css";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="home">
      <TopBar />
      <Navbar />
      <div className="homeMainCont">
        <Hero />
        <Categories />
        <Brands />
        <Products />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
