import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import Burger from "../assets/burger.png";
import Sushi from "../assets/sushi.png";
import LocationIcon from "../assets/maps-and-flags.png";
import Droite from "../assets/droite.png";

const Welcome = () => {
  return (
    <div>
      <img className="absolute top-52 left-0 w-80" src={Sushi} />
      <img className="absolute w-96 bottom-0 right-0" src={Burger} />
      <div className="nav flex justify-between items-center px-32 py-4">
        <Link to="/welcome">
          <img className="w-24" src={Logo} />
        </Link>
        <div>
          <Link to="/login">
            <button className="px-8 py-4 rounded-3xl text-xs border border-black mr-2">
              Sign in
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-black text-white px-8 py-4 rounded-3xl text-xs">
              Sign up
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex-row justify-center items-center my-24">
          <p className="text-center px-96 py-7 text-2xl">
            Welcome to <span className="font-bold">Eatopia</span>, where we help
            you find the perfect restaurant for any occasion. Get started now by
            localizing your radius on the map as well as food preferences, and
            let us handle the rest. Sign up now and discover the best dining
            experiences near you!
          </p>
          <div className="bg-zinc-200 flex items-center justify-between w-80 px-7 py-4 rounded-full mx-auto">
            <div className="flex items-center">
              <img className="w-5" src={LocationIcon} />
            </div>
            <p className="bg-transparent text-black text-sm px-3 focus:outline-none focus:placeholder-transparent">
                Where are you?
              </p>
            <button>
              <img className="w-6" src={Droite} />
            </button>
          </div>
          <div className="flex justify-center py-4 gap-4">
            <Link to="/preferences">
              <button className="bg-black text-white px-7 py-4 rounded-full mx-auto">
                Next
              </button>
            </Link>
            <Link to="/">
              <button className="bg-zinc-200 px-7 py-4 rounded-full mx-auto">
                Skip
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
