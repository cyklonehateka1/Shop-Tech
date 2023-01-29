import React, { useEffect } from "react";
import Product from "./Product";
import "../styles/components/products.css";
import { productsData } from "../utils/ProductsData";
import { backendConnection } from "../utils/axiosConnection";

const Products = ({ query }) => {
  // useEffect(() => {
  //   const getProducts = async () => {
  //     let res;

  //     try {
  //       if (query.value !== null) {
  //         res = await backendConnection.get(
  //           `/products/getproducts?${query.type}=${query.value}`
  //         );
  //       } else {
  //         res = await backendConnection.get("/products/getproducts");
  //       }
  //       console.log(res);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getProducts();
  // });
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
