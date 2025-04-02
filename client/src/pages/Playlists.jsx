import { useState, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import { fetchPlaylists } from "../utils/spotifyUtils";

// Helper function to format duration in mm:ss
const formatDuration = (durationInSeconds) => {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const Playlists = () => {
  // State variables for playlists and songs
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState({});
  const [loading, setLoading] = useState(true);
  const [expandedCardId, setExpandedCardId] = useState(null); // Tracks the ID of the currently expanded card

  // // Fetch playlists from the backend
  // const fetchPlaylists = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/api/playlists"); // Replace with your backend API endpoint
  //     const data = await response.json();
  //     setPlaylists(data || []); // Ensure playlists is an array
  //   } catch (error) {
  //     console.error("Error fetching playlists:", error);
  //   }
  // };

  // Fetch song details for a given array of song IDs
  const fetchSongs = async (songIds) => {
    try {
      const songDetails = await Promise.all(
        songIds.map(async (songId) => {
          const response = await fetch(
            `http://localhost:3000/api/songs/${songId}`
          ); // Replace with your backend API endpoint
          const data = await response.json();
          return { id: songId, ...data };
        })
      );

      // Update the songs state with the fetched song details
      setSongs((prevSongs) => ({
        ...prevSongs,
        ...Object.fromEntries(songDetails.map((song) => [song.id, song])),
      }));
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  // Fetch playlists and their songs on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchPlaylists();
      setPlaylists(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Fetch songs whenever playlists are updated
  useEffect(() => {
    if (playlists.length > 0) {
      const allSongIds = playlists.flatMap((playlist) => playlist.songs || []); // Ensure songs is an array
      fetchSongs(allSongIds);
    }
  }, [playlists]);

  // Toggle card expansion
  const toggleCardExpansion = (playlistId) => {
    setExpandedCardId((prevId) => (prevId === playlistId ? null : playlistId)); // Toggle the expanded state for the given playlist
  };

  return (
    <div className="bg-black min-h-screen text-[#a8f0e8] p-10 w-full flex flex-col">
      {/* Navigation Bar */}
      <div className="bg-black fixed top-0 left-0 right-0 z-50 w-full">
        <NavigationBar />
      </div>

      {/* Main Content */}
      <div className="mt-24 flex flex-col items-center">
        <h2 className="text-3xl font-semibold mb-6">Your Playlists</h2>

        {/* Loading State */}
        {loading ? (
          <p className="text-lg text-gray-400">Loading playlists...</p>
        ) : playlists.length === 0 ? (
          <p className="text-lg text-gray-400">No playlists found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {playlists.map((playlist) => {
              const isExpanded = expandedCardId === playlist.id; // Check if the card is expanded
              return (
                <div
                  key={playlist.id}
                  className="bg-[#1e1e1e] p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
                >
                  {/* Playlist Name */}
                  <h3 className="text-xl font-semibold mb-4 text-[#a8f0e8]">
                    {playlist.name || "Untitled Playlist"}
                  </h3>

                  {/* Songs List */}
                  <div className="relative">
                    <ul
                      className={`space-y-4 ${
                        isExpanded ? "max-h-none" : "max-h-58"
                      } overflow-y-auto scrollbar-thin scrollbar-thumb-[#a8f0e8] scrollbar-track-[#2a2a2a]`}
                    >
                      {playlist.songs && playlist.songs.length > 0 ? (
                        playlist.songs.map((songId) => {
                          const song = songs[songId];
                          return song ? (
                            <li
                              key={`${playlist.id}-${songId}`}
                              className="bg-[#2a2a2a] p-4 rounded-lg shadow-md hover:bg-[#3a3a3a] transition-colors duration-300"
                            >
                              <p className="text-lg font-medium text-white">
                                {song.songName || "Unknown Song"}
                              </p>
                              <p className="text-sm text-gray-400">
                                Artists: {song.artists?.join(", ") || "Unknown"}
                              </p>
                              <p className="text-sm text-gray-400">
                                Release Year: {song.releaseYear || "Unknown"}
                              </p>
                              <p className="text-sm text-gray-400">
                                Duration: {formatDuration(song.duration || 0)}
                              </p>
                            </li>
                          ) : (
                            <li
                              key={`${playlist.id}-${songId}-loading`}
                              className="bg-[#2a2a2a] p-4 rounded-lg shadow-md text-gray-400"
                            >
                              Loading song details...
                            </li>
                          );
                        })
                      ) : (
                        <li className="text-gray-400 text-sm">
                          No songs available
                        </li>
                      )}
                    </ul>

                    {/* Scroll Indicator */}
                    {!isExpanded &&
                      playlist.songs &&
                      playlist.songs.length > 3 && (
                        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#1e1e1e] to-transparent pointer-events-none"></div>
                      )}
                  </div>

                  {/* Toggle Button */}
                  {playlist.songs && playlist.songs.length > 3 && (
                    <button
                      onClick={() => toggleCardExpansion(playlist.id)}
                      className="mt-2 text-sm text-gray-500 flex items-center justify-center w-full"
                    >
                      {isExpanded ? (
                        <>
                          <span>Show Less</span> <span className="ml-2">↑</span>
                        </>
                      ) : (
                        <>
                          <span>Show More</span> <span className="ml-2">↓</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Playlists;
