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
    <div>
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
        <div className="w-1/2 mt-12 flex justify-center gap-4">
          
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
            <p>{restaurant.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurantdetails;
