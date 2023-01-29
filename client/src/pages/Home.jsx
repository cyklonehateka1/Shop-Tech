import React from "react";
import Brands from "../components/Brands";
import Categories from "../components/Categories";
import FilterList from "../components/FilterList";
import Hero from "../components/Hero";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import TopBar from "../components/TopBar";
import "../styles/pages/home.css";
import { useState } from "react";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [category, setCategory] = useState(null);

  console.log(category);

  return (
    <div className="home">
      <TopBar />
      <Navbar />
      <div className="homeMainCont">
        <Hero />
        <Categories sendCat={(category) => setCategory(category)} />
        <Brands />
        <FilterList />
        <Products />
      </div>
    </div>
  );
};

export default Home;
