import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/addProduct.css";
import { useState } from "react";
import TopBar from "../components/TopBar";

const AddProduct = () => {
  const [value, setValue] = useState("");
  return (
    <div className="addProduct">
      <TopBar />
      <div className="addProductCont">
        <h4>Create New Product</h4>
        <form>
          <div className="details">
            <div className="formRow">
              <div>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" />
              </div>
              <div>
                <label htmlFor="categories">Categories: </label>
                <input type="text" name="categories" />
              </div>
              <div>
                <label htmlFor="colors">Colors: </label>
                <input type="text" name="colors" />
              </div>
            </div>
            <div className="formRow">
              <div>
                <label htmlFor="sizes">Sizes: </label>
                <input type="text" name="sizes" />
              </div>
              <div>
                <label htmlFor="price">Price: </label>
                <input type="number" name="price" />
              </div>
              <div>
                <label htmlFor="quantity">Quantity In Stock: </label>
                <input type="text" name="quantity" />
              </div>
            </div>
            <div className="reactQuillCont">
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                placeholder="Description"
                className="reactQuill"
              />
            </div>
          </div>
          <div className="stockImgCont">
            <label htmlFor="img">
              <img src="https://i.ibb.co/mymMxyv/download-2.png" alt="" />
            </label>
            <input type="file" name="img" id="img" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
