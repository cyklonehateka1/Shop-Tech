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
  const [searchInput, setSearchInput] = useState(null);

  const handleChange = (value) => {
    setSearchInput(value);
  };

  return (
    <div className="home">
      <TopBar />
      <Navbar onInputChange={handleChange} />
      <div className="homeMainCont">
        <Hero />
        <Categories />
        <Brands />
        <FilterList />
        <Products search={searchInput} />
      </div>
    </div>
  );
};

export default Home;
