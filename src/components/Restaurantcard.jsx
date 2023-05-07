import React from "react";
import Restaurant from "../assets/restaurant.jpg";
import Heart from "../assets/heart.png";
import { Rate } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Restaurantcard = (props) => {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer relative"
      onClick={() => navigate(`../details/${props.id}`)}
    >
      <div className="bg-white inline-block absolute right-3 top-3 rounded-full p-2 transition-transform transform hover:scale-125">
        <img className="w-5" src={Heart} />
      </div>
      <img className="rounded-3xl" src={Restaurant} />
      <div className="mt-2">
        <span className="font-bold text-2xl">{props.title}</span>
      </div>
      <div>
        <Rate disabled allowHalf value={props.rate} />
        <span className="ml-3">{props.rate}/5</span>
      </div>
    </div>
  );
};

export default Restaurantcard;
