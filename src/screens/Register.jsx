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
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const emailRegex = /\S+@\S+\.\S+/;

  function validateInputs() {
    let valid = true;
    if (firstname.trim() === "") {
      setFirstnameError("First name is required");
      valid = false;
    } else {
      setFirstnameError("");
    }
    if (lastname.trim() === "") {
      setLastnameError("Last name is required");
      valid = false;
    } else {
      setLastnameError("");
    }
    if (username.trim() === "") {
      setUsernameError("Username is required");
      valid = false;
    } else {
      setUsernameError("");
    }
    if (email.trim() === "") {
      setEmailError("Email is required");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email");
      valid = false;
    } else {
      setEmailError("");
    }
    if (password.trim() === "") {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }
    return valid;
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent default form submission
    if (!validateInputs()) {
      return;
    }
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
      <form onSubmit={handleSubmit}> {/* add onSubmit handler */}
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
          {firstnameError && <p className="mt-1 text-xs text-red-500">{firstnameError}</p>}
          <input
            className="border border-black w-56 rounded-3xl placeholder:text-xs px-3 placeholder:text-red-600 py-2 mt-2"
            type="text"
            placeholder="Last name"
            onChange={(e)=>setLastname(e.target.value)}
          />
          {lastnameError && <p className="mt-1 text-xs text-red-500">{lastnameError}</p>}
          <input
            className="border border-black w-56 rounded-3xl placeholder:text-xs px-3 placeholder:text-red-600 py-2 mt-2"
            type="text"
            placeholder="Username"
            onChange={(e)=>setUsername(e.target.value)}
          />
          {usernameError && <p className="mt-1 text-xs text-red-500">{usernameError}</p>}
          <input
            className="border border-black w-56 rounded-3xl placeholder:text-xs px-3 placeholder:text-red-600 py-2 mt-2"
            type="text"
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
          />
          {emailError && <p className="mt-1 text-xs text-red-500">{emailError}</p>}
          <input
            className="border border-black w-56 rounded-3xl placeholder:text-xs px-3 placeholder:text-red-600 py-2 mt-2"
            type="password"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
          />
          {passwordError && <p className="mt-1 text-xs text-red-500">{passwordError}</p>}
          <button type="submit" className="text-white bg-black rounded-3xl w-56 py-3 text-sm mt-4"> {/* change type to submit */}
            Sign up
          </button>
          <p className="mt-4 text-xs">Already have an account?</p>
          <span className='text-xs'>Click <a href="/Login" className=' text-red-600'>here</a> to sign in.</span>
        </div>
      </form>
    </div>
  );
};

export default Register;
