import "../styles/components/brands.css";
import { brandsData } from "../utils/data";
import { useNavigate } from "react-router-dom";

const Brands = (props) => {
  const navigate = useNavigate();
  const sendBrand = (e) => {
    navigate(`/products?brand=${e.target.id}`);
  };

  return (
    <div className="brands">
      <div className="brandsCont">
        <h4>Popular Brands</h4>
        <div>
          {brandsData.map((item, index) => {
            return (
              <div key={index} id={item.id} onClick={sendBrand}>
                <div className="imgCont" id={item.id}>
                  <img src={item.img} alt="" id={item.id} />
                </div>
                <div className="detailsCont" ide={item.id}>
                  <span id={item.id}>{item.name}</span>
                  <p id={item.id}>{item.quantity} products available</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Brands;
