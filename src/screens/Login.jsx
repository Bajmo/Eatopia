import React, { useState } from "react";
import "../css/login.css";
import Logo from "../assets/logo.png";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent default form submission
    if (!validateInputs()) {
      return;
    }
    try {
      // Authenticate the user and retrieve the token
      const token = await authenticateUser(username, password);

      // Set the token in the local storage
      localStorage.setItem("token", token);

      // Redirect the user to the dashboard page
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Invalid username or password");
    }
  };

  async function authenticateUser(username, password) {
    try {
      const body = {
        "username": username,
        "password": password
      };

      // Send a POST request to the ClientUserLogin endpoint to authenticate the user
      const response = await axios.post("http://localhost:8000/signin", body)
        .then((response) => {
          // Handle success
        })
        .catch((error) => {
          // Handle error
        });
      console.log(body);

      // Extract the token from the response and return it
      return response.data.token;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    <div className="loginpage flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        {" "}
        {/* add onSubmit handler */}
        <div className="loginbox w-80 bg-white flex flex-col items-center rounded-3xl p-8">
          <img className="w-24" src={Logo} />
          <p className="p-4 font-semibold text-xl">Authenticate</p>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="border border-black w-56 rounded-3xl placeholder:text-xs px-3 placeholder:text-red-600 py-2"
            type="text"
            placeholder="Username"
          />
          {usernameError && <p className="mt-1 text-xs text-red-500">{usernameError}</p>}
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border border-black w-56 rounded-3xl placeholder:text-xs px-3 placeholder:text-red-600 py-2 mt-2"
            type="password"
            placeholder="Password"
          />
          {passwordError && <p className="mt-1 text-xs text-red-500">{passwordError}</p>}

          <button
            type="submit" // change type to submit
            className="text-white bg-black rounded-3xl w-56 py-3 text-sm mt-4"
          >
            Log in
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
