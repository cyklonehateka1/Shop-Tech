import Brands from "../components/Brands";
import Categories from "../components/Categories";
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
        <Label text={"Selected products for you"} link={`products/flex`} />
        <Products display={"none"} paginationDisplay={"none"} limit={8} />
        <Label
          text={"New Arrivals"}
          link={"products/none?sort=new&display=none"}
        />
        <Products
          display={"none"}
          query={"sort=new"}
          paginationDisplay={"none"}
          limit={8}
        />
        <Label text={"Shop from our most popular brands"} seeAll={"none"} />
        <Brands />
        {/* <Label text={"Gamer's inspiration"} /> */}
        <PromotionBanner
          item={"Gaming"}
          text={"Get 20% off on selected gaming products"}
          heading={"Gamer's inspiration"}
          img={"https://i.ibb.co/vdKmtWg/ps5rotated.png"}
          link={"products/flex?pCategory=gaming&sCategory=gaming&discount=20"}
        />
        <Products
          display={"none"}
          query={"pCategory=gaming&sCategory=gaming&discount=20"}
          paginationDisplay={"none"}
          limit={8}
        />
        <PromotionBanner
          item={"Laptops"}
          img={
            "https://i.ibb.co/vkfXkK9/lenovo-laptop-yoga-slim-series-feature-2-1.png"
          }
          text={"Get 25% off on selected laptops"}
          heading={"High Performance Laptops"}
          link={"products/flex?pCategory=laptops&discount=25"}
        />
        <Products
          display={"none"}
          query={"pCategory=laptops&discount=25"}
          paginationDisplay={"none"}
          limit={8}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
