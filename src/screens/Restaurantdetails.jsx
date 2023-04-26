import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';

import Navbar from '../components/Navbar'
import Heart from '../assets/heart.png'
import Website from '../assets/website.png'
import Time from '../assets/tiime.png'
import Tel from '../assets/telephoner.png'
import { Rate } from 'antd';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Restaurantdetails = () => {
  const [restaurant, setRestaurant] = useState([]);
  const { id } = useParams();

  // useEffect to fetch restaurants
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/restaurant/${id}`); // replace with your API endpoint
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        console.error(error);
      }
    };
   fetchRestaurant();
  }, [id]);
  return (
    <div>
    <Navbar/>
    <div className='flex flex-col justify-center items-center p-6'>
    <img className='w-7' src={Heart}/>
    <h1 className='text-gray-400 text-6xl'>{restaurant.name}</h1>
    <div className='flex items-center gap-8 p-3'>
      <div className='flex items-center'>
      <img className='w-5 mr-1' src={Tel}/>
        <span className='text-sm'>{restaurant.telephone}</span>
      </div>
      <Rate disabled defaultValue={2} />
      <div href={restaurant.website} className='flex items-center cursor-pointer'>
      <img className='w-5' src={Website}/>
      <span className='ml-1 text-sm'>Website</span>
      </div>
    </div>
    <div className='flex items-center'>
    <img className='w-5' src={Time}/>
    <p className='ml-2 text-sm'>Ouvert: 12:00 L'après-midi - 02:30 Le matin</p>
    </div>
    <div className='h-full flex mt-12 justify-center grid grid-cols-2 gap-4'>
  
  <MapContainer center={[31.623075, -7.966311]} zoom={13}>
    <TileLayer
      attribution="&copy; OpenStreetMap contributors"
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[31.623075, -7.966311]}>
      <Popup>IJ</Popup>
    </Marker>
  </MapContainer>

    <div className='bg-zinc-100 rounded-2xl p-3'>
      <p>Emplacement et coordonnées</p>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Restaurantdetails