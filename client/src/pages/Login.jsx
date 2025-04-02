import NavigationBar from "../components/NavigationBar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");

    console.log("Token from query:", accessToken);

    if (accessToken) {
      setIsLoggedIn(true);
      localStorage.setItem("spotify_access_token", accessToken);      
      window.history.replaceState({}, document.title, "/");

      // Invoke syncData immediately after login
      syncData();
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
    if (isLoggedIn) {
      navigate("/landing");
    }
  }, [isLoggedIn, navigate]);

  const syncData = async () => {
    const accessToken = localStorage.getItem("spotify_access_token");
    if (!accessToken) {
      alert("Please log in first!");
      return;
    }

    const response = await fetch(
      `http://localhost:3000/api/syncWithSpotify?access_token=${accessToken}`
    );
    const data = await response.json();
    console.log(data);
  };

  const handleLogin = () => {
    console.log("Logging in...");
    // Redirect to the Spotify authorization URL
    window.location.href = "http://localhost:3000/auth";
  };

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Deep Search</h1>
        {!isLoggedIn && (
          <button
            onClick={handleLogin}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              margin: "10px",
              backgroundColor: "#1DB954",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Login to Spotify
          </button>
        )}
      </div>
    </>
  );
};

export default Login;
