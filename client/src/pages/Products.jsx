import React from "react";
import Table from "../components/Table";
import TopBar from "../components/TopBar";
import "../styles/products.css";
import { orderProductsCol, orderProductRow } from "../utils/data";

const Products = () => {
  return (
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
  );
};

export default Products;
