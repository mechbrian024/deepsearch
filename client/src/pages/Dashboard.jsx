import NavigationBar from "../components/NavigationBar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { syncData } from "../utils/spotifyUtils";
import { useSpotifyAuth } from "../context/SpotifyAuthContext";

const Dashboard = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("dashboard called");
  const navigate = useNavigate();
  const { isAuthenticated, accessToken } = useSpotifyAuth();
  useEffect(() => {
    if (isAuthenticated) {
      syncData(accessToken);
    }
  }, [isAuthenticated]);

  return (
    <>
      <NavigationBar />
      <div
        className="bg-black min-h-screen text-[#a8f0e8] p-10"
        style={{ paddingTop: "80px" }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">Saved Searches</h3>
          <button
            onClick={() => navigate("/create-search")}
            className="bg-gradient-to-r from-[#a8f0e8] to-[#6ee7b7] text-black px-6 py-2 rounded-lg shadow-md hover:shadow-lg hover:from-[#6ee7b7] hover:to-[#a8f0e8] transition-all duration-300"
          >
            Create New Search
          </button>
        </div>
        {/* Add content for saved searches here */}
        <div className="bg-[#1e1e1e] p-5 rounded-lg shadow-md">
          <p className="text-gray-400">No saved searches available.</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
