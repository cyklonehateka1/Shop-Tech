import "../styles/components/categories.css";

const Categories = () => {
  return (
    <div className="categories">
      <div className="categoriesCont">
        <h4>Shop Our Top Categories</h4>
        <div>
          <div className="phones">
            <h5>Phones</h5>
          </div>
          <div className="laptops">
            <h5>Laptops</h5>
          </div>
          <div className="gaming">
            <h5>Gaming</h5>
          </div>
          <div className="accessories">
            <h5>Accessories</h5>
          </div>
          <div className="monitors">
            <h5>TV/Monitors</h5>
          </div>
          <div className="desktops">
            <h5>Desktops</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
