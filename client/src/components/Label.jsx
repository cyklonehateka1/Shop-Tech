import "../styles/components/label.css";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
const Label = ({ text, link }) => {
  return (
    <div className="label">
      <div className="labelCont">
        <h3>{text}</h3>
        <Link className="seeAll" to={`/${link}`}>
          see all
          <span>
            <BiChevronRight />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Label;
