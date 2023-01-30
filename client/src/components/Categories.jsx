import "../styles/components/categories.css";
import { catData } from "../utils/data";
import { useNavigate } from "react-router-dom";
const Categories = () => {
  const navigate = useNavigate();
  const sendCat = (e) => {
    navigate(`/products?pCategory=${e.target.id}`);
  };

  return (
    <div className="categories">
      <div className="categoriesCont">
        <h4>Shop Our Top Categories</h4>
        <div>
          {catData.map((item, index) => {
            return (
              <div
                className={item.className}
                id={item.id}
                key={index}
                onClick={sendCat}
              >
                <h5 id={item.id}>{item.text}</h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
