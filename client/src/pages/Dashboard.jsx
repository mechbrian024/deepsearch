import NavigationBar from "../components/NavigationBar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { syncData } from "../utils/spotifyUtils";

const Dashboard = () => {
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

  // const syncData = async () => {
  //   const accessToken = localStorage.getItem("spotify_access_token");
  //   if (!accessToken) {
  //     alert("Please log in first!");
  //     return;
  //   }

  //   const response = await fetch(
  //     `http://localhost:3000/api/syncWithSpotify?access_token=${accessToken}`
  //   );
  //   const data = await response.json();
  //   console.log(data);
  // };

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
