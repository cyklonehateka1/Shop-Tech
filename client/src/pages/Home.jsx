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
import { useState } from "react";

const Home = () => {
  const [modalsClose, setModalClose] = useState(false);

  const closeAllModals = () => {
    setModalClose(true);
  };

  const handleModalsClose = (event) => {
    if (!event.target.closest(".modal")) {
      closeAllModals();
    }
  };

  return (
    <div className="home" onClick={handleModalsClose}>
      <TopBar />
      <Navbar />
      <div className="homeMainCont">
        <Hero />
        <Categories />
        <Brands />
        <Products closeAllModals={closeAllModals} modalsClose={modalsClose} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
