import React from "react";
import Table from "../components/AdminTable";
import TopBar from "../components/AdminTopBar";
import "../styles/adminProducts.css";
import { orderProductsCol, orderProductRow } from "../utils/data";
import Navbar from "../components/AdminNavbar";

const Products = () => {
  return (
    <div className="adminParent">
      <Navbar />
      <div className="products">
        <TopBar />
        <div className="productsCont">
          <h5>Products</h5>
          <div className="productsTableCont">
            <Table
              rows={orderProductRow}
              columns={orderProductsCol}
              pagination={10}
              pageSize={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
