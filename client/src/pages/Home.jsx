import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import "../styles/pages/home.css";

const Home = () => {
  return (
    <div className="home">
      <TopBar />
      <Navbar />
      <Hero />
    </div>
  );
};

export default Home;
