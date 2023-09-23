import React, { useEffect, useState } from "react";
import "../styles/adminOrder.css";
import Table from "./AdminTable";
import { orderProductsCol, orderProductRow } from "../utils/data";
import { getMethods } from "../../utils/protectedRoutes";

const Order = ({ orderData }) => {
  const [modalIsOpen, setModalIsOpen] = useState(orderData.state);
  const modalHandler = (e) => {
    if (e.target.closest(".orderCont")) return;
    setModalIsOpen(false);
  };

  useEffect(() => {
    const getUserData = async () => {
      const res = await getMethods(`/users/getuser/${orderData.row.customer}`);
    };
  });
  return (
    <>
      {modalIsOpen && (
        <div className="order" onClick={modalHandler}>
          <div className="orderCont">
            <h5>Order from Cyklone Hateka</h5>
            <div className="orderTopBar">
              <div className="first">
                <span>Order Id</span>
                <h5>424867236643</h5>
              </div>
              <div className="second">
                <span>Custmer ID</span>
                <h5>7232445354657</h5>
              </div>
            </div>
            <h4 className="orderInfoH">Order Info</h4>
            <div className="orderInfoCont">
              <div>
                <div className="first">
                  <span>Estimated Shipping Cost</span>
                  <h5>$3984</h5>
                </div>
                <div className="second">
                  <span>Address</span>
                  <h5>Accra, Airport City</h5>
                </div>
              </div>
              <div>
                <div className="first">
                  <span>Payment Method</span>
                  <h5>Debit Card (MaterCard)</h5>
                </div>
                <div className="second">
                  <span>Account Number</span>
                  <h5>1400005266928</h5>
                </div>
              </div>
            </div>
            <div className="productsInfoCont">
              <h4>Products</h4>
              <div className="products">
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
      )}
    </>
  );
};

export default Order;
