import React, { useState, useContext } from "react";
import "../css/login.css";
import Logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);

  function validateInputs() {
    let valid = true;
    if (username.trim() === "") {
      setUsernameError("Username is required");
      valid = false;
    } else {
      setUsernameError("");
    }
    if (password.trim() === "") {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }
    return valid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateInputs()) {
      return;
    }
    else {
      await fetch("http://localhost:8000/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username,
          password
        })
      });
  
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="loginpage flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        {" "}
        {/* add onSubmit handler */}
        <div className="loginbox w-80 bg-white flex flex-col items-center rounded-3xl p-8">
          <img alt="" className="w-24" src={Logo} />
          <p className="p-4 font-semibold text-xl">Sign in</p>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="border border-black w-56 rounded-3xl placeholder:text-xs px-3 placeholder:text-red-600 py-2"
            type="text"
            placeholder="Username"
          />
          {usernameError && (
            <p className="mt-1 text-xs text-red-500">{usernameError}</p>
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
              <FontAwesomeIcon
                className="bg-white"
                icon={showPassword ? faEyeSlash : faEye}
              />
            </button>
          </div>
          {passwordError && (
            <p className="mt-1 text-xs text-red-500">{passwordError}</p>
          )}

          <button
            type="submit" // change type to submit
            className="text-white bg-black rounded-3xl w-56 py-3 text-sm mt-4"
          >
            Sign in
          </button>
          <p className="mt-4 text-xs">Don't have an account yet?</p>
          <span className="text-xs">
            Click{" "}
            <a href="/Register" className=" text-red-600">
              here
            </a>{" "}
            to make one.
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
