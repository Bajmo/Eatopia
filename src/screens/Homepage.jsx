import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Restaurantcard from "../components/Restaurantcard";
import { useNavigate } from "react-router-dom";
import AuthContext from "../auth/AuthContext";

const Homepage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [userFirstName, setUserFirstName] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // useEffect to fetch restaurants
  useEffect(() => {
    const isFirstTime = sessionStorage.getItem("firstTime") === null;

    if (isFirstTime) {
      sessionStorage.setItem("firstTime", false);

      if (!isAuthenticated) {
        navigate("/welcome");
      }
    }

    fetch("http://127.0.0.1:8000/api/restaurants")
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();

      setUserFirstName(content.first_name);
    })();
  });

  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        <div className="w-60 border-r p-5">
          <p className="text-black text-sm">Categories</p>
        </div>
        <div className="w-full p-7">
          <p className="text-black text-lg px-72">
            {userFirstName ? (
              <p>
                Hello <span className="font-bold">{userFirstName}</span>!
              </p>
            ) : (
              ""
            )}
            Based on your query, we recommend the following restaurants:
          </p>
          <div className="flex justify-center mt-7">
            <div className="flex justify-between flex-wrap">
              {restaurants.map((e) => (
                <div className="w-1/3 mb-7 p-7 rounded-3xl transition-transform transform hover:scale-105 duration-300 hover:shadow-2xl">
                  <Restaurantcard
                    id={e.id}
                    title={e.name}
                    rate={e.average_rating}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
