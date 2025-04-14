import NavigationBar from "../components/NavigationBar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { syncData } from "../utils/spotifyUtils";

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

  const handleLogin = () => {
    console.log("Logging in...");
    // Redirect to the Spotify authorization URL
    window.location.href = `${import.meta.env.VITE_API_URL}/auth`;
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
