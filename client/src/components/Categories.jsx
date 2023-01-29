import "../styles/components/categories.css";

const catData = [
  {
    id: "phones",
    className: "phones",
    text: "Phones",
    bgImg: "../assets/images/Pixel7-6.jpg",
  },
  {
    id: "laptops",
    className: "laptops",
    text: "Laptops",
    bgImg: "../assets/images/Pixel7-6.jpg",
  },
  {
    id: "gaming",
    className: "gaming",
    text: "Gaming",
    bgImg: "../assets/images/Pixel7-6.jpg",
  },
  {
    id: "accessories",
    className: "accessories",
    text: "Accessories",
    bgImg: "../assets/images/Pixel7-6.jpg",
  },
  {
    id: "monitors",
    className: "monitors",
    text: "Monitors",
    bgImg: "../assets/images/Pixel7-6.jpg",
  },
  {
    id: "desktops",
    className: "desktops",
    text: "Desktops",
    bgImg: "../assets/images/Pixel7-6.jpg",
  },
];
const Categories = (props) => {
  return (
    <div className="categories">
      <div className="categoriesCont">
        <h4>Shop Our Top Categories</h4>
        <div>
          {/* <div className="phones" id="phones">
            <h5>Phones</h5>
          </div>
          <div className="laptops" id="laptops">
            <h5>Laptops</h5>
          </div>
          <div className="gaming" id="gaming">
            <h5>Gaming</h5>
          </div>
          <div className="accessories" id="accessories">
            <h5>Accessories</h5>
          </div>
          <div className="monitors" id="monitors">
            <h5>TV/Monitors</h5>
          </div>
          <div className="desktops" id="desktops">
            <h5>Desktops</h5>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Categories;
