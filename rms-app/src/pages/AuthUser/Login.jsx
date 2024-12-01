import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    axios
      .post(
        "http://localhost:3000/auth/login",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        console.log("Login successful", response.data);
      })
      .catch((error) => {
        console.error("There was an error with the login:", error);
      });
  };

  const getdata = () => {
    axios
      .get("http://localhost:3000/")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error:", error);
      });
  };
  getdata()

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
