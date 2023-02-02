import React from "react";
import "../styles/reviews.css";
import { BsStarHalf, BsFillStarFill } from "react-icons/bs";

const Reviews = () => {
  return (
    <div className="reviews">
      <div className="reviewsCont">
        <h5>Customer Review</h5>
        <div className="rating">
          <div className="stars">
            <BsFillStarFill />
            <BsFillStarFill />
            <BsFillStarFill />
            <BsFillStarFill />
            <BsStarHalf />
          </div>
          <span>4.8 out of 5</span>
        </div>
        <span>Total 23,494 reviews</span>
        <div className="ratingLevels">
          <div>
            <span>5 star</span>
            <div>
              <div className="stars5"></div>
            </div>
            <span>70%</span>
          </div>
          <div>
            <span>4 star</span>
            <div>
              <div className="stars4"></div>
            </div>
            <span>10%</span>
          </div>
          <div>
            <span>3 star</span>
            <div>
              <div className="stars3"></div>
            </div>
            <span>2%</span>
          </div>
          <div>
            <span>2 star</span>
            <div>
              <div className="stars2"></div>
            </div>
            <span>7%</span>
          </div>
          <div>
            <span>1 star</span>
            <div>
              <div className="star1"></div>
            </div>
            <span>10%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
