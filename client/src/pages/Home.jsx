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
import { useState } from "react";
import { backendConnection } from "../utils/axiosConnection";
import { useSelector } from "react-redux";

const Home = () => {
  const [remoteCart, setRemoteCart] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getRemoteCart = async () => {
      try {
        const remoteCart = await backendConnection.get(
          `/cart/getusercart/${currentUser}`
        );
        console.log(remoteCart.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRemoteCart();
    const setLocalCart = () => {
      const checkCart = localStorage.getItem("clientCart");
      if (!checkCart) {
        localStorage.setItem("clientCart", remoteCart);
      }
    };
    setLocalCart();
  }, []);
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
