import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Restaurantcard from "../components/Restaurantcard";
import { useNavigate } from "react-router-dom";
import AuthContext from "../auth/AuthContext";
import {
  Checkbox,
  Col,
  InputNumber,
  Row,
  Slider,
  Space,
  Pagination,
} from "antd";

const Homepage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [userFirstName, setUserFirstName] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(search.toLowerCase())
  );

  const navigate = useNavigate();
  const restaurantsPerPage = 6;
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = filteredRestaurants.slice(
    indexOfFirstRestaurant,
    indexOfLastRestaurant
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset current page when search changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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

        for (let i = 0; i < data.length; i++) {
          fetch("http://127.0.0.1:8000/api/restaurant_images/" + data[i].id)
            .then((response) => response.json())
            .then((imagesData) => {
              // Update the specific restaurant object with the fetched image data
              setRestaurants((prevRestaurants) =>
                prevRestaurants.map((restaurant) =>
                  restaurant.id === data[i].id
                    ? { ...restaurant, image: imagesData[0].url }
                    : restaurant
                )
              );
            })
            .catch((error) => console.error(error));
        }
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
  }, []);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const [inputValue, setInputValue] = useState(1);
  const onChangee = (newValue) => {
    setInputValue(newValue);
  };

  const Categories = [
    "Asian",
    "Morrocan",
    "French",
    "Turkish",
    "American",
    "Grill",
    "Italian",
  ];
  return (
    <div>
      <Navbar onSearchChange={handleSearchChange} />
      <div className="flex">
        <div className="w-60 p-5">
          <p className="text-black text-sm font-extrabold mb-2">Cuisines</p>
          <div className="flex flex-col">
            {Categories.map((e, index) => (
              <Checkbox
                key={index}
                className=""
                onChange={onChange}
                style={{ marginInlineStart: 0 }}
              >
                {e}
              </Checkbox>
            ))}
          </div>
          <div>
            <p className="text-black text-sm font-extrabold mt-10 mb-2">
              Range in KMs
            </p>

            <Row className="flex justify-between">
              <Col span={15}>
                <Slider
                  min={1}
                  max={10}
                  onChange={onChangee}
                  value={typeof inputValue === "number" ? inputValue : 0}
                />
              </Col>
              <Col className="md:self-center">
                <InputNumber
                  min={1}
                  max={10}
                  style={{
                    width: "50px",
                  }}
                  value={inputValue}
                  onChange={onChangee}
                />
              </Col>
            </Row>
          </div>
        </div>
        <div className="w-full p-7">
          <div className="text-black text-lg px-72 text-center">
            {userFirstName ? (
              <p>
                Hello <span className="font-bold">{userFirstName}</span>!
              </p>
            ) : (
              ""
            )}
            Find your Eatopia!
          </div>
          <div className="flex justify-center">
            <div className="flex justify-between flex-wrap">
              {currentRestaurants.map((e) => (
                <div
                  key={e.id}
                  className="w-1/3 mb-7 p-7 rounded-3xl transition-transform transform hover:border-2 hover:bg-white hover:scale-105 duration-300 hover:shadow-2xl"
                >
                  <Restaurantcard
                    id={e.id}
                    image={e.image}
                    title={e.name}
                    rate={e.average_rating}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <Pagination
              defaultCurrent={1}
              pageSize={restaurantsPerPage}
              total={restaurants.length}
              onChange={handlePageChange}
              responsive={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
