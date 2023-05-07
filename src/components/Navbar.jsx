import React from "react";
import Logo from "../assets/logo.png";
import Heart from "../assets/heart.png";
import User from "../assets/user.png";
import Map from "../assets/map.png";
import Search from "../assets/search.png";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-44 py-4 border-b">
      <div className="flex items-center">
        <Link to="/">
          <img className="w-20" src={Logo} />
        </Link>
        <div className="flex items-center border rounded-3xl px-3 py-1 ml-5">
          <img className="w-4" src={Search} />
          <input type="text" className="bg-transparent outline-none px-3" />
        </div>
      </div>
      
      <div className="flex items-center">
      <button className="bg-zinc-100 gap-2 flex items-center px-5 text-sm rounded-full py-3 mr-7">
      <img className="w-5" src={Map} />
        Specify Location
      </button>
        <div className="flex items-center mr-7">
          <img className="w-5" src={Heart} />
          <p className="text-sm ml-2">Wishlist</p>
        </div>
        <img className="w-5" src={User} />
      </div>
    </div>
  );
};

export default Navbar;
