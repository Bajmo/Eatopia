import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import L from "leaflet";
import Navbar from "../components/Navbar";
import Heart from "../assets/heart.png";
import RHeart from "../assets/redheart.png";
import Website from "../assets/website.png";
import Time from "../assets/tiime.png";
import Tel from "../assets/telephoner.png";
import { Rate } from "antd";
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
      if (!restaurant === undefined) {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/address/${restaurant.address}`
          ); // replace with your API endpoint
          const data = await response.json();
          setAddress(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchRestaurant();
    console.log(restaurant);
  }, [id]);

  const myIcon = L.icon({
    iconUrl: require("../assets/restaurantMarker.png"),
    iconRetinaUrl: require("../assets/restaurantMarker.png"),
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });

  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col justify-center items-center my-6">
        <img
          className="w-7 cursor-pointer"
          src={heartIcon}
          onClick={() => setIsInWishlist(!isInWishlist)}
        />
        <h1 className="text-6xl">{restaurant.name}</h1>
        <Rate disabled allowHalf value={restaurant.average_rating} />
        <div className="flex items-center gap-8 mt-12">
          <div className="flex items-center">
            <img className="w-5 mr-1" src={Tel} />
            <span className="text-sm">{restaurant.telephone}</span>
          </div>
          <a href={restaurant.website} target="_blank">
            <div className="flex items-center cursor-pointer">
              <img className="w-5" src={Website} />
              <span className="ml-1 text-sm">Website</span>
            </div>
          </a>
        </div>
        <div className="flex items-center mt-2">
          <img className="w-5" src={Time} />
          <p className="ml-1 text-sm">
            Opening hours - {restaurant.opening_hours}
          </p>
        </div>
        <div className="mt-12 flex justify-center gap-4 w-4/6">
          <MapContainer center={[31.623075, -7.966311]} zoom={13}>
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]} icon={myIcon}>
              <Popup>{restaurant.name}</Popup>
            </Marker>
          </MapContainer>

          <div className="bg-zinc-100 rounded-2xl p-4 w-1/2">
            <span className="font-bold">Description</span>
            {restaurant && restaurant.description ? (
              more ? (
                <p>{restaurant.description}</p>
              ) : (
                <p>
                  {restaurant.description.slice(0, 425)}
                  <span
                    onClick={() => setMore(true)}
                    className="text-gray-500 cursor-pointer"
                  >
                    ...more
                  </span>
                </p>
              )
            ) : (
              <p>Loading description...</p>
            )}
          </div>
        </div>
      </div>
      <hr className="" />
      <div className="h-full flex justify-center m-6">
        <div className="w-4/6 flex gap-4">
          <div className="w-1/2">
            <div className="w-full flex flex-col items-center bg-zinc-100 rounded-xl p-5">
              <h3 className="">Mehdi Fassi Fihri</h3>

              <Rate disabled allowHalf value={4} />
              <p>
                Le Lorem Ipsum est simplement du faux texte employé dans la
                composition et la mise en page avant impression. Le Lorem Ipsum
                est le faux texte standard de l'imprimerie depuis les années
                1500, quand un imprimeur anonyme assembla ensemble des morceaux
                de texte pour réaliser un livre.
              </p>
            </div>
          </div>
          <div className="w-1/2 h-52 bg-zinc-100 rounded-xl p-4">
            <p className="text-gray-400">Your Review</p>
            <textarea placeholder="Write something..." className='placeholder:text-gray-400 rounded-xl p-3 mt-5' rows="4" cols="50">
        
            </textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurantdetails;
