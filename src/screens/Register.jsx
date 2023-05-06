import React from "react";
import { useState } from "react";
import Logo from '../assets/logo.png'
import axios from "axios"
const Register = () => {
    const [firstname,setFirstname]=useState("")
    const [lastname,setLastname]=useState("")
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const handlePress = () => {
      const body = {
        "first_name": firstname,
        "last_name": lastname,
        "username": username,
        "email": email,
        "password": password
      };
      axios.post("http://127.0.0.1:8000/signup", body)
        .then((response) => {
          // Handle success
        })
        .catch((error) => {
          // Handle error
        });
      console.log(body);
    };
    
  return (
    <div className="loginpage flex items-center justify-center">
      <div className="loginbox w-80 bg-white flex flex-col items-center rounded-3xl p-8">
        <img className="w-24" src={Logo} />
        <p className="m-4 font-semibold text-xl">Sign up</p>
        <hr/>
        <input
          className="border border-black w-56 rounded-3xl placeholder:text-xs px-3 placeholder:text-red-600 py-2"
          type="text"
          placeholder="First name"
          onChange={(e)=>setFirstname(e.target.value)}
        />
        <input
          className="border border-black w-56 rounded-3xl placeholder:text-xs px-3 placeholder:text-red-600 py-2 mt-2"
          type="text"
          placeholder="Last name"
          onChange={(e)=>setLastname(e.target.value)}
        />
        <input
          className="border border-black w-56 rounded-3xl placeholder:text-xs px-3 placeholder:text-red-600 py-2 mt-2"
          type="text"
          placeholder="Username"
          onChange={(e)=>setUsername(e.target.value)}
        />
        <input
          className="border border-black w-56 rounded-3xl placeholder:text-xs px-3 placeholder:text-red-600 py-2 mt-2"
          type="text"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />
        <input
          className="border border-black w-56 rounded-3xl placeholder:text-xs px-3 placeholder:text-red-600 py-2 mt-2"
          type="text"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button onClick={handlePress} className="text-white bg-black rounded-3xl w-56 py-3 text-sm mt-4">
          Register
        </button>
        <p className="mt-4 text-xs">Already have an account?</p>
        <span className='text-xs'>Click <a href="/Login" className=' text-red-600'>here</a> to sign in.</span>
      </div>
    </div>
  );
};

export default Register;
