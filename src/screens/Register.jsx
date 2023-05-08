import React, {SyntheticEvent, useState} from "react";
import "../css/login.css";
import Logo from "../assets/logo.png";
import {Navigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);
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
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }
    if (password.trim() === "") {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("Password too short");
      valid = false;
    } else {
      setPasswordError("");
    }
    return valid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateInputs()) {
      try {
        await fetch("http://localhost:8000/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname,
            lastname,
            username,
            email,
            password,
          }),
        });
        setShowSuccessMessage(true); // set success message to show
        setTimeout(() => {
          setShowSuccessMessage(false); // remove success message after 2 seconds
          setRedirect(true); // set redirect state to true after 2 seconds
        }, 2000);
      } catch (error) {
        console.error('Error during signup:', error);
      }
    }
  };
  

  if (redirect) {
    return <Navigate to = "/login" />;
  }

  return (
    <div className="loginpage flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        {" "}
        {/* add onSubmit handler */}
        <div className="loginbox w-80 bg-white flex flex-col items-center rounded-3xl p-8">
          <img className="w-24" src={Logo} />
          <p className="m-4 font-semibold text-xl">Sign up</p>
          <hr />
          <input
            className="border border-black w-56 rounded-3xl placeholder:text-xs px-3 placeholder:text-red-600 py-2"
            type="text"
            placeholder="First name"
            onChange={(e) => setFirstname(e.target.value)}
          />
          {firstnameError && (
            <p className="mt-1 text-xs text-red-500">{firstnameError}</p>
          )}
          <input
            className="border border-black w-56 rounded-3xl placeholder:text-xs px-3 placeholder:text-red-600 py-2 mt-2"
            type="text"
            placeholder="Last name"
            onChange={(e) => setLastname(e.target.value)}
          />
          {lastnameError && (
            <p className="mt-1 text-xs text-red-500">{lastnameError}</p>
          )}
          <input
            className="border border-black w-56 rounded-3xl placeholder:text-xs px-3 placeholder:text-red-600 py-2 mt-2"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && (
            <p className="mt-1 text-xs text-red-500">{usernameError}</p>
          )}
          <input
            className="border border-black w-56 rounded-3xl placeholder:text-xs px-3 placeholder:text-red-600 py-2 mt-2"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <p className="mt-1 text-xs text-red-500">{emailError}</p>
          )}
          <div className="relative mt-2">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="border border-black w-56 rounded-3xl placeholder:text-xs px-3 placeholder:text-red-600 py-2"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute top-1/2 right-0 transform -translate-y-1/2 mr-4"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon className="bg-white" icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {passwordError && (
            <p className="mt-1 text-xs text-red-500">{passwordError}</p>
          )}
          <button
            type="submit"
            className="text-white bg-black rounded-3xl w-56 py-3 text-sm mt-4"
          >
            {" "}
            {/* change type to submit */}
            Sign up
          </button>
          {showSuccessMessage && (
            <>
              <span className="mt-4 text-xs text-green-500">
                Signed up successfully!
              </span>
              <span className="text-xs text-green-500">
              Redirecting to login page...
              </span>
            </>
          )}
          <p className="mt-4 text-xs">Already have an account?</p>
          <span className="text-xs">
            Click{" "}
            <a href="/Login" className=" text-red-600">
              here
            </a>{" "}
            to sign in.
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
