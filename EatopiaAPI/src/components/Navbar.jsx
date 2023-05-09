import React, { useState } from "react";
import Logo from "../assets/logo.png";
import Heart from "../assets/heart.png";
import User from "../assets/user.png";
import Map from "../assets/map.png";
import Search from "../assets/search.png";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

Modal.setAppElement("#root");

const LocationModal = ({ isOpen, onRequestClose }) => {
  const [position, setPosition] = useState(null);

  const handleMapClick = (event) => {
    setPosition(event.latlng);
  };

  const handleSaveClick = () => {
    onRequestClose(position);
  };

  const handleCloseClick = () => {
    onRequestClose(null);
  };

  return (
    <Modal
  isOpen={isOpen}
  onRequestClose={onRequestClose}
  contentLabel="Select your location on the map"
  className="fixed z-100 inset-0 overflow-y-auto"
>
  <div className="flex items-center justify-center min-h-screen ">
    <div className="bg-white rounded-lg lg:w-1/3 p-5 border-2">
      <h2 className="font-bold text-3xl text-center mb-5">
        Select your location on the map
      </h2>
      <div className="flex justify-center">
        <MapContainer
          style={{ width: "100%", height: 500 }}
          center={[31.623075, -7.966311]}
          zoom={13}
          onClick={handleMapClick}
          className="border-2"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {position && <Marker position={position} />}
        </MapContainer>
      </div>

      <div className="flex justify-center mt-5">
        <button
          className="bg-black gap-2 flex items-center px-5 text-sm text-white rounded-full py-3 mr-4"
          onClick={handleSaveClick}
        >
          Save
        </button>
        <button
          className="bg-zinc-200 gap-2 flex items-center px-5 text-sm rounded-full py-3 mr-4 border-2"
          onClick={handleCloseClick}
        >
          Close
        </button>
      </div>
    </div>
  </div>
</Modal>

  );
};

const Navbar = ({ onSearchChange }) => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSpecifyLocationClick = () => {
    setShowLocationModal(true);
  };

  const handleLocationModalClose = (position) => {
    setShowLocationModal(false);
    if (position) {
      setSelectedLocation(position);
    }
  };

  return (
    
    <div className="flex items-center justify-between px-44 py-4 border-b">
      <LocationModal
        isOpen={showLocationModal}
        onRequestClose={handleLocationModalClose}
      />
      <div className="flex items-center">
        <Link to="/">
          <img className="w-20" src={Logo} />
        </Link>
        <div className="flex items-center border rounded-3xl px-3 py-1 ml-5">
          <img className="w-4" src={Search} />
          <input type="text" onChange={onSearchChange} className="bg-transparent outline-none px-3" />
        </div>
      </div>

      <div className="flex items-center">
        <button
          className="bg-zinc-200 gap-2 flex items-center px-5 text-sm rounded-full py-3 mr-4"
          onClick={handleSpecifyLocationClick}
        >
          <img className="w-5" src={Map} />
          Specify Location
        </button>
        <button className="flex bg-zinc-200 items-center mr-5 px-6 py-3 rounded-full">
          <img className="w-5" src={Heart} />
          <p className="text-sm ml-2">Wishlist</p>
        </button>
        <img className="w-5" src={User} />
      </div>
    </div>
  );
};

export default Navbar;
