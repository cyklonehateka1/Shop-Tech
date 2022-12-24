import React from "react";
import FilterList from "../components/FilterList";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import TopBar from "../components/TopBar";
import "../styles/pages/home.css";

const Home = () => {
  return (
    <div className="home">
      <TopBar />
      <Navbar />
      <div className="homeMainCont">
        <Hero />
        <FilterList />
        <Products />
      </div>
    </div>
  );
};

export default Home;
