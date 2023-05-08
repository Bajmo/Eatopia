import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import L from "leaflet";
import Navbar from "../components/Navbar";
import Heart from "../assets/heart.png";
import RHeart from "../assets/redheart.png";
import Website from "../assets/website.png";
import Restaurant from "../assets/restaurant.jpg";

import Time from "../assets/tiime.png";
import Tel from "../assets/telephoner.png";
import { Rate, Carousel } from "antd";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Restaurantdetails = () => {
  const [more, setMore] = useState(false);
  const [restaurant, setRestaurant] = useState([]);
  const [address, setAddress] = useState([]);
  const [latitude, setLatitude] = useState(31.623075);
  const [longitude, setLongitude] = useState(-7.966311);
  const { id } = useParams();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const heartIcon = isInWishlist ? RHeart : Heart;

  // useEffect to fetch restaurants
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/restaurant/${id}`
        ); // replace with your API endpoint
        const data = await response.json();
        setRestaurant(data);        
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRestaurantAddress = async () => {
      if (!restaurant === undefined) {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/address/${restaurant.address.id}`
          ); // replace with your API endpoint
          const data = await response.json();
          setAddress(data);
          console.log(data)
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchRestaurant();
    fetchRestaurantAddress();
  }, [id]);

  const myIcon = L.icon({
    iconUrl: require("../assets/restaurantMarker.png"),
    iconRetinaUrl: require("../assets/restaurantMarker.png"),
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col justify-center items-center my-6">
        <img
          className="w-7 cursor-pointer"
          src={heartIcon}
          onClick={() => setIsInWishlist(!isInWishlist)}
        />
        <h1
          className="text-6xl p-2"
          style={{
            backgroundImage:
              "linear-gradient(90deg, hsla(0, 2%, 8%, 1) 0%, hsla(353, 73%, 43%, 1) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {restaurant.name}
        </h1>

        <Rate disabled allowHalf value={restaurant.average_rating} className="text-black"/>
        <div className="flex items-center mt-3">
            <span className="text-sm">{restaurant.cuisine}</span>
          </div>
        <div className="w-2/5 my-6">
          <Carousel effect="fade" afterChange={onChange}>
            <div>
              <img className="rounded-3xl" src={Restaurant}/>
            </div>
            <div>
              <img className="rounded-3xl" src={Restaurant}/>
            </div>
            <div>
              <img className="rounded-3xl" src={Restaurant}/>
            </div>
            <div>
              <img className="rounded-3xl" src={Restaurant}/>
            </div>
          </Carousel>
        </div>

        <div className="flex items-center gap-20">
          <div className="flex items-center">
            <img className="w-5 mr-1" src={Tel} />
            <span className="text-sm">{restaurant.telephone}</span>
          </div>
          <div className="flex items-center">
          <img className="w-5" src={Time} />
          <p className="ml-1 text-sm">
            Opening hours - {restaurant.opening_hours}
          </p>
        </div>
          <a href={restaurant.website} target="_blank">
            <div className="flex items-center cursor-pointer">
              <img className="w-5" src={Website} />
              <span className="ml-1 text-sm">Website</span>
            </div>
          </a>
        </div>
        
        <div className="mt-6 flex justify-center gap-4 w-4/6">
          <MapContainer center={[31.623075, -7.966311]} zoom={13}>
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]} icon={myIcon}>
              <Popup>{restaurant.name}</Popup>
            </Marker>
          </MapContainer>

          <div className="w-1/2 h-full flex mb-5 flex-col items-center bg-zinc-200 rounded-xl p-5">
            <h3 className="font-bold">Description</h3>
            <p className="mt-5">{restaurant.description}</p>
          </div>
        </div>
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-4/6 h-px my-8 border-0 bg-black" />
          <span className="absolute px-3 font-bold text-2xl -translate-x-1/2 bg-white left-1/2">
            Reviews
          </span>
        </div>
        <div className="w-4/6 flex gap-4">
          <div className="w-1/2">
            <div className="w-full flex mb-5 flex-col items-center bg-zinc-200 rounded-xl p-5">
              <h3 className="font-bold">Anas Mourad</h3>

              <Rate disabled allowHalf value={4} />
              <p className="mt-5">
                Le Lorem Ipsum est simplement du faux texte employé dans la
                composition et la mise en page avant impression. Le Lorem Ipsum
                est le faux texte standard de l'imprimerie depuis les années
                1500, quand un imprimeur anonyme assembla ensemble des morceaux
                de texte pour réaliser un livre.
              </p>
            </div>
            <div className="w-full flex mb-5 flex-col items-center bg-zinc-200 rounded-xl p-5">
              <h3 className="font-bold">Mehdi Fassi Fihri</h3>

              <Rate disabled allowHalf value={4} />
              <p className="mt-5">
                Le Lorem Ipsum est simplement du faux texte employé dans la
                composition et la mise en page avant impression.
              </p>
            </div>
            <div className="w-full flex mb-5 flex-col items-center bg-zinc-200 rounded-xl p-5">
              <h3 className="font-bold">Mohamed Ameksa</h3>

              <Rate disabled allowHalf value={4} />
              <p className="mt-5">
                Le Lorem Ipsum est simplement du faux texte employé dans la
                composition et la mise en page avant impression. Le Lorem Ipsum
                est le faux texte standard de l'imprimerie depuis les années
                1500.
              </p>
            </div>
          </div>
          <div className="w-1/2">
            <div className="h-50 bg-zinc-200 rounded-xl p-4 flex flex-col items-center">
              <p className="font-bold">Write a review</p>
              <Rate allowHalf />
              <textarea
                placeholder="Describe your experience..."
                className="block placeholder:text-gray-400 rounded-xl p-3 mt-5 w-full"
              ></textarea>
            </div>
            <div className="flex justify-center mt-5">
              <button
                className="bg-black gap-2 flex items-center px-5 text-sm text-white rounded-full py-3 mr-4"
                
              >
                Submit
              </button>
              <button
                className="bg-zinc-200 gap-2 flex items-center px-5 text-sm rounded-full py-3 mr-4 border-2"
                
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="" />
    </div>
  );
};

export default Restaurantdetails;
