import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current path

  // State to check if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const storedToken = localStorage.getItem("spotify_access_token");
    setIsLoggedIn(!!storedToken); // true or false
  }, []);

  // This function will redirect the user to the Spotify authorization URL
  const handleLogin = () => {
    console.log("Logging in...");
    // Redirect to the Spotify authorization URL
    window.location.href = "http://localhost:3000/auth";
  };

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    backgroundColor: "#1e1e1e", // Dark background
    color: "#a8f0e8", // Teal text color
    fontSize: "16px",
    fontWeight: "normal",
    zIndex: 1000, // Ensure it stays on top
  };

  const leftLogoStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#a8f0e8", // Teal color for the logo
  };

  const rightContainerStyle = {
    display: "flex",
    gap: "30px",
  };

  const navLinkStyle = (path) => ({
    textDecoration: "none",
    color: location.pathname === path ? "#6ee7b7" : "#a8f0e8", // Highlight active link
    cursor: "pointer",
    transition: "color 0.3s ease, text-shadow 0.3s ease, transform 0.3s ease", // Smooth transition for color and glow
    textShadow:
      location.pathname === path
        ? "0 0 6px #6ee7b7, 0 0 12px #6ee7b7, 0 0 18px #34d399" // Softer gradient glow
        : "none",
    transform: location.pathname === path ? "scale(1.05)" : "none", // Slightly enlarge the active link
  });

  return (
    <div style={navStyle}>
      {/* Logo */}
      <div
        onClick={() => (isLoggedIn ? navigate("/dashboard") : navigate("/"))}
        style={leftLogoStyle}
      >
        Deep <span style={{ fontWeight: "normal" }}>Search</span>
      </div>

      {/* Navigation Links */}
      {isLoggedIn ? (
        <div style={rightContainerStyle}>
          <span
            onClick={() => navigate("/dashboard")}
            style={navLinkStyle("/dashboard")}
          >
            Dashboard
          </span>
          <span
            onClick={() => navigate("/searches")}
            style={navLinkStyle("/searches")}
          >
            Your Searches
          </span>
          <span
            onClick={() => navigate("/playlists")}
            style={navLinkStyle("/playlists")}
          >
            Your Playlists
          </span>
          <span
            onClick={() => navigate("/community")}
            style={navLinkStyle("/community")}
          >
            Community
          </span>
          <span
            onClick={() => navigate("/account")}
            style={navLinkStyle("/account")}
          >
            Account
          </span>
        </div>
      ) : (
        <div style={rightContainerStyle}>
          <span
            onClick={() => navigate("/community")}
            style={navLinkStyle("/community")}
          >
            Community
          </span>
          <span onClick={handleLogin} style={navLinkStyle("/account")}>
            Login
          </span>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
