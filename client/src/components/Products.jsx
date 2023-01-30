import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "./Product";
import "../styles/components/products.css";
import { productsData } from "../utils/ProductsData";
import { backendConnection } from "../utils/axiosConnection";

const Products = (props) => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);

  const location = useLocation();
  const query = location.pathname.split("?")[1];

  useEffect(() => {
    const getProducts = async () => {
      let res;
      try {
        res = await backendConnection.get("/products/getproducts");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
        setError("Something went wrong");
      }
    };

    getProducts();
  }, [location.pathname]);
  console.log(products);
  return (
    <div className="products">
      <div className="productsCont">
        <h4>Headphones For You!</h4>
        <div>
          {products && products.length > 0 ? (
            products.map((item, index) => {
              return <Product item={item} key={index} />;
            })
          ) : (
            <h2>...Ooops! No Products found</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
