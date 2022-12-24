import React from "react";
import Product from "./Product";
import "../styles/components/products.css";
import { productsData } from "../utils/ProductsData";

const Products = () => {
  return (
    <div className="products">
      <div className="productsCont">
        <h4>Headphones For You!</h4>
        <div>
          {productsData.map((item, index) => {
            return <Product item={item} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
