import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import Card from "../components/Card";

const Categories = [
  "African",
  "Albanian",
  "Algerian",
  "American",
  "Arabic",
  "Armenian",
  "Asian",
  "Australian",
  "Azerbaijani",
  "Bangladeshi",
  "Bar",
  "Barbecue",
  "Beer restaurants",
  "Belgian",
  "Brazilian",
  "Brew Pub",
  "British",
  "Cafe",
  "Cambodian",
  "Campania",
  "Canadian",
  "Caribbean",
  "Catalan",
  "Central American",
  "Central European",
  "Central-Italian",
  "Chilean",
  "Chinese",
  "Contemporary",
  "Deli",
  "Diner",
  "Dining bars",
  "Eastern European",
  "Egyptian",
  "European",
  "Fast Food",
  "French",
  "Fruit parlours",
  "Fusion",
  "Gastropub",
  "Georgian",
  "Greek",
  "Grill",
  "Guatemalan",
  "Hawaiian",
  "Healthy",
  "Indian",
  "International",
  "Israeli",
  "Italian",
  "Jamaican",
  "Japanese",
  "Japanese Fusion",
  "Korean",
  "Latin",
  "Lebanese",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Moroccan",
  "Neapolitan",
  "Northern-Italian",
  "Persian",
  "Pizza",
  "Polynesian",
  "Portuguese",
  "Pub",
  "Seafood",
  "Soups",
  "South American",
  "Southern-Italian",
  "Spanish",
  "Steakhouse",
  "Street Food",
  "Sushi",
  "Swiss",
  "Thai",
  "Turkish",
  "Tuscan",
  "Vietnamese",
  "Welsh",
  "Wine Bar",
];
const Preferences = () => {
  const [showMore, setShowMore] = useState(false);
  const visibleCategoriesLimit = 10;

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const visibleCategories = showMore
    ? Categories
    : Categories.slice(0, visibleCategoriesLimit);
  return (
    <>
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
        <p className="text-xl p-6">Specify your preferences</p>
        <div className="grid grid-cols-2 gap-4">
          {visibleCategories.map((e) => (
            <Card name={e} />
          ))}
        </div>
        <span
          className="text-black cursor-pointer text-xs mt-4"
          onClick={toggleShowMore}
        >
          {showMore ? "Show less" : "Show more"}
        </span>
      </div>
      <div className="flex justify-center py-4 gap-4">
        <Link to="/">
          <button className="bg-black text-white px-7 py-4 rounded-full mx-auto">
            Next
          </button>
        </Link>
      </div>
    </>
  );
};

export default Preferences;
