import React, { useState } from "react";
import Table from "../components/AdminTable";
import TopBar from "../components/AdminTopBar";
import "../styles/adminProducts.css";
import { productsPageCol, productsPageRow } from "../utils/productsPageList";
import Navbar from "../components/AdminNavbar";
import { backendConnection } from "../../utils/axiosConnection";
import { useEffect } from "react";

const Products = () => {
  const [productsData, setProductsData] = useState(null);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await backendConnection.get("/products/getproducts");
        setProductsData(
          products.data.map((product) => {
            return {
              id: product._id,
              name: product.name,
              profileImg: product.profileImg,
              brand: product.brand,
              model: product.model,
              price: product.price,
              quantity: product.quantity,
              colors: product.colors,
              onDiscount: product.onDiscount,
            };
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();

    //
  }, []);
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  // console.log(date.getMonth());
  console.log(new Date(new Date().setMonth(lastMonth.getMonth() - 1)));

  return (
    <div className="adminParent">
      <Navbar />
      <div className="products">
        <TopBar />
        <div className="productsCont">
          <h5>Products</h5>
          <div className="productsTableCont">
            {productsData && (
              <Table
                rows={productsData}
                columns={productsPageCol}
                pagination={10}
                pageSize={10}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
