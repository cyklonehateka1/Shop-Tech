import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/adminAddProduct.css";
import { useState } from "react";
import TopBar from "../components/AdminTopBar";
import Navbar from "../components/AdminNavbar";
import { backendConnection } from "../../utils/axiosConnection";

const AddProduct = () => {
  const [desc, setDesc] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [value, setValue] = useState({
    name: "",
    parentCat: "",
    subCat: "",
    colors: "",
    brand: "",
    price: "",
    quantity: "",
    model: "",
  });
  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const [file, setFile] = useState(null);
  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await backendConnection.post("/upload", formData);
      setProfileImg(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(value);

  const handlePhotoUpload = (e) => {
    e.preventDefault();
    uploadImage();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await backendConnection.post(
        "/products/createproduct",
        {
          ...value,
          desc,
          profileImg,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="adminPrent">
      <Navbar />
      <div className="adminAddProduct">
        <TopBar />
        <div className="addProductCont">
          <h4>Create New Product</h4>
          <form>
            <div className="details">
              <div className="formRow">
                <div>
                  <label htmlFor="name">Name: </label>
                  <input type="text" name="name" onChange={changeHandler} />
                </div>
                <div>
                  <label htmlFor="mainCategories">Main Categories: </label>
                  <input
                    type="text"
                    name="parentCat"
                    onChange={changeHandler}
                  />
                </div>
                <div>
                  <label htmlFor="subCategories">Sub Categories: </label>
                  <input type="text" name="subCat" onChange={changeHandler} />
                </div>
                <div>
                  <label htmlFor="colors">Colors: </label>
                  <input type="text" name="colors" onChange={changeHandler} />
                </div>
              </div>
              <div className="formRow">
                <div>
                  <label htmlFor="Brand">Brand </label>
                  <input type="text" name="brand" onChange={changeHandler} />
                </div>
                <div>
                  <label htmlFor="price">Price: </label>
                  <input type="number" name="price" onChange={changeHandler} />
                </div>
                <div>
                  <label htmlFor="quantity">Quantity In Stock: </label>
                  <input type="text" name="quantity" onChange={changeHandler} />
                </div>
                <div>
                  <label htmlFor="quantity">Model: </label>
                  <input type="text" name="model" onChange={changeHandler} />
                </div>
              </div>
              <div className="reactQuillCont">
                <ReactQuill
                  theme="snow"
                  value={desc}
                  onChange={setDesc}
                  placeholder="Description"
                  className="reactQuill"
                  name="desc"
                />
              </div>
              <button onClick={handleSubmit}>Submit</button>
            </div>
            <div className="stockImgCont">
              <label htmlFor="img">
                <img src="https://i.ibb.co/mymMxyv/download-2.png" alt="" />
              </label>
              <input
                type="file"
                name="profileImg"
                id="img"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button onClick={handlePhotoUpload}>Add</button>
              <span>Please let image be 400 x 400 and not more than 350kb</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
