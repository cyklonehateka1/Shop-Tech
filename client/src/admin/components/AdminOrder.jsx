import React, { useEffect, useState } from "react";
import "../styles/adminOrder.css";
import Table from "./AdminTable";
import { orderProductsCol, orderProductRow } from "../utils/data";
import { getMethods, postMethods } from "../../utils/protectedRoutes";
import { useSelector } from "react-redux";

const Order = ({ orderData }) => {
  const [modalIsOpen, setModalIsOpen] = useState(orderData.state);
  const [customerData, setCustomerData] = useState("");
  const { orders } = useSelector((state) => state.orders);
  const modalHandler = (e) => {
    if (e.target.closest(".orderCont")) return;
    setModalIsOpen(false);
  };
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await getMethods(
          `/users/getuser/${orderData.data.row.customer}`
        );
        // console.log(res.data);
        setCustomerData(res.data);
        setModalIsOpen(true);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, [orderData]);
  let customerOrder = [];
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].id === orderData.data.row.id) {
      const order = orders[i];
      customerOrder.push({
        address: order.address,
        amount: order.amount,
        customer: order.customer,
        fulfilled: order.fulfilled,
        shippingCost: order.shippingCost || null,
        id: order.id,
        paymentDetails: order.paymentDetails,
        products: order.productObjects.map((item) => {
          return {
            id: item._id,
            color: item.color,
            price: item.price,
            quantity: item.quantity,
            img: item.profileImg,
            productName: item.name,
          };
        }),
      });
    }
  }
  const sale = {
    totalAmount: customerOrder[0].amount + customerOrder[0].shippingCost,
    customer: customerOrder[0].customer,
    shippingCost: customerOrder.shippingCost || null,
  };
  // console.log(customerOrder);
  const fulfillHandler = async () => {
    try {
      const res = await postMethods(
        `/orders/fulfill/${customerOrder[0].id}`,
        sale
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {modalIsOpen && (
        <div className="order" onClick={modalHandler}>
          <div className="orderCont">
            <div className="orderNameStatusCont">
              <h5>Order from {customerData.name}</h5>
              <button onClick={fulfillHandler}>fulfill</button>
            </div>
            <div className="orderTopBar">
              <div className="first">
                <span>Order Id</span>
                <h5>{customerOrder[0].id}</h5>
              </div>
              <div className="second">
                <span>Custmer ID</span>
                <h5>{customerData._id}</h5>
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
                  <span>Card Number</span>
                  <h5>1400005266928</h5>
                </div>
              </div>
            </div>
            <div className="productsInfoCont">
              <h4>Products</h4>
              <div className="products">
                <Table
                  rows={customerOrder[0].products}
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
