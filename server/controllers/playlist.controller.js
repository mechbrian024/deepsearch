import Playlist from "../models/playList.model.js";
import Song from "../models/song.model.js";
import errorHandler from "./error.controller.js";
import extend from "lodash/extend.js";
import { spotifyApi } from "../../server.js";

// const createPlaylist = async (req, res) => {
//   const playlist = new Playlist(req.body);
//   try {
//     await playlist.save();
//     return res.status(200).json({
//       message: "Successfully created playlist!",
//     });
//   } catch (err) {
//     return res.status(400).json({
//       error: errorHandler.getErrorMessage(err),
//     });
//   }
// };

const getPlaylists = async (req, res) => {
  try {
    console.log("request received");
    const accessToken = req.query.access_token;
    console.log("Access token:", accessToken);
    spotifyApi.setAccessToken(accessToken); // Set the access token dynamically
    const playlists = await spotifyApi.getUserPlaylists();
    res.json(playlists.body);
    // console.log(res.json(playlists.body));
  } catch (err) {
    console.error("Error fetching playlists:", err);
    res.status(500).send("Failed to fetch playlists.");
  }
};

const getPlaylistTracks = async (req, res) => {
  const { access_token, playlist_id } = req.query;

  try {
    spotifyApi.setAccessToken(access_token);
    const data = await spotifyApi.getPlaylistTracks(playlist_id);
    res.json(data.body);
  } catch (err) {
    console.error("Error fetching playlist tracks:", err);
    res.status(500).send("Failed to fetch playlist tracks.");
  }
};

const getSongInfo = async (req, res) => {
  const { access_token, song_id } = req.query;
  try {
    spotifyApi.setAccessToken(access_token);
    const data = await spotifyApi.getTrack(song_id);
    res.json(data.body);
  } catch (err) {
    console.error("Error fetching song info:", err);
    res.status(500).send("Failed to fetch song info.");
  }
};

const getLikedSongs = async (req, res) => {
  const accessToken = req.query.access_token;
  try {
    spotifyApi.setAccessToken(accessToken);
    const data = await spotifyApi.getMySavedTracks();
    res.json(data.body);
  } catch (err) {
    console.error("Error fetching liked songs:", err);
    res.status(500).send("Failed to fetch liked songs.");
  }
};

const createPlaylist = async (req, res) => {
  const accessToken = req.query.access_token;
  const { topTracks } = req.body;

  try {
    console.log("Received Top Tracks:", topTracks); // Debugging: Log received data

    // Validate topTracks
    if (!Array.isArray(topTracks) || topTracks.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid or empty topTracks array." });
    }

    // Ensure all tracks have valid URIs
    const validTracks = topTracks.filter((track) =>
      track.startsWith("spotify:track:")
    );
    if (validTracks.length === 0) {
      return res.status(400).json({ error: "No valid track URIs provided." });
    }

    spotifyApi.setAccessToken(accessToken);

    // Create the playlist
    const playlistResponse = await spotifyApi.createPlaylist(
      "Top 10 Liked Songs",
      {
        description: "A playlist of your top 10 liked songs",
        public: false,
      }
    );
    console.log("Playlist Response:", playlistResponse);

    const playlistId = playlistResponse.body.id;

    // Add tracks to the playlist
    await spotifyApi.addTracksToPlaylist(playlistId, validTracks);

    res.json({ message: "Playlist created successfully!", playlistId });
  } catch (err) {
    console.error("Error creating playlist:", err);
    if (err.response) {
      console.error("Spotify API Error Response:", err.response.body);
    }

    res.status(500).send("Failed to create playlist.");
  }
};

const deletePlaylist = async (req, res) => {
  const accessToken = req.query.access_token;
  const { playlistId } = req.body;
  try {
    spotifyApi.setAccessToken(accessToken);
    await spotifyApi.unfollowPlaylist(playlistId);
    res.json({ message: "Playlist deleted successfully!" });
  } catch (err) {
    console.error("Error deleting playlist:", err);
    res.status(500).send("Failed to delete playlist.");
  }
};

const syncPlaylistsWithSpotify = async (req, res) => {
  const accessToken = req.query.access_token;

  try {
    // Step 1: Fetch playlists from Spotify
    spotifyApi.setAccessToken(accessToken);
    const spotifyPlaylistsResponse = await spotifyApi.getUserPlaylists();
    const spotifyPlaylists = spotifyPlaylistsResponse.body.items;

    console.log("Fetched Spotify Playlists:", spotifyPlaylists);

    // Step 2: Fetch all playlists from MongoDB
    const dbPlaylists = await Playlist.find({});
    const dbPlaylistsMap = new Map(dbPlaylists.map((p) => [p.playlistId, p]));

    // Step 3: Sync playlists (create or delete)
    const spotifyPlaylistIds = spotifyPlaylists.map((playlist) => playlist.id);

    // Create or update playlists in MongoDB
    for (const spotifyPlaylist of spotifyPlaylists) {
      const { id: playlistId, name } = spotifyPlaylist;
      console.log("Playlist name", name);

      if (dbPlaylistsMap.has(playlistId)) {
        // Update existing playlist in MongoDB
        const dbPlaylist = dbPlaylistsMap.get(playlistId);
        dbPlaylist.name = name; // Update name if it has changed
        await dbPlaylist.save();
        console.log(`Updated playlist: ${name}`);
      } else {
        // Create new playlist in MongoDB
        const newPlaylist = new Playlist({
          playlistId,
          name,
          songs: [], // Initialize with an empty songs array
        });
        await newPlaylist.save();
        console.log(`Created new playlist: ${name}`);
      }
    }

    // Delete playlists from MongoDB that are no longer in Spotify
    for (const dbPlaylist of dbPlaylists) {
      if (!spotifyPlaylistIds.includes(dbPlaylist.playlistId)) {
        await Playlist.findByIdAndDelete(dbPlaylist._id); // Use findByIdAndDelete to remove the playlist
        console.log(`Deleted playlist: ${dbPlaylist.name}`);
      }
    }

    // Step 4: Fetch tracks for each playlist and update MongoDB
    const updatedPlaylists = await Playlist.find({}); // Fetch updated playlists from MongoDB
    for (const playlist of updatedPlaylists) {
      const playlistId = playlist.playlistId;

      // Fetch tracks for the playlist from Spotify
      const tracksResponse = await spotifyApi.getPlaylistTracks(playlistId);
      const trackIds = tracksResponse.body.items.map((item) => item.track.id);

      // Update the songs array in MongoDB
      playlist.songs = trackIds;
      await playlist.save();

      for (const trackId of trackIds) {
        // Check if the song already exists in the songs collection
        const existingSong = await Song.findOne({ songId: trackId });
        if (!existingSong) {
          // Fetch song details from Spotify
          const songData = await spotifyApi.getTrack(trackId);
          const { id, name, artists, album } = songData.body;

          // Fetch release date from album
          const albumData = await spotifyApi.getAlbum(album.id);

          const genre =
            albumData.body.genres.length > 0 ? albumData.body.genres[0] : " ";

          let releaseYear = null;
          const releaseDate = albumData.body.release_date;
          console.log("release date:", releaseDate);

          // Validate release_date and extract releaseYear
          if (releaseDate) {
            const parsedDate = new Date(releaseDate);
            if (!isNaN(parsedDate)) {
              releaseYear = parsedDate.getFullYear();
            }
          }

          // const artistInfo = await spotifyApi.getArtist(artists[0].id);

          // Create a new song in the songs collection
          const newSong = new Song({
            songId: id,
            songName: name,
            artists: artists.map((artist) => artist.name),
            genre, // Use the genre fetched from the album
            playlistId,
            albumId: album.id,
            releaseYear: releaseYear || 0, // Default to 0 if releaseYear is null
          });
          await newSong.save();
          console.log(`Created new song: ${name}`);
        }
      }
      console.log(`Updated songs for playlist: ${playlist.name}`);
    }

    res.json({ message: "Playlists synced successfully!" });
  } catch (err) {
    console.error("Error syncing playlists:", err);
    res.status(500).send("Failed to sync playlists.");
  }
};

// const getPlayListById = async (req, res) => {
//   try {
//     const playlistid = req.body.playlistId;
//     const accessToken = req.query.access_token;
//     spotifyApi.setAccessToken(accessToken);
//     const playlist = await spotifyApi.getPlaylist(playlistid);
//     res.send(200).json(playlist.body);
//   } catch (err) {
//     console.error("Error fetching playlist:", err);
//     res.status(500).send("Failed to fetch playlist.");
//   }
// };

// const createPlaylist = async (req, res) => {
//   const accessToken = req.query.access_token;
//   const { topTracks } = req.body;
//   try {
//     spotifyApi.setAccessToken(accessToken);
//     const playlistResponse = await spotifyApi.createPlaylist(
//       "Top 10 Liked Songs",
//       {
//         description: "A playlist of your top 10 liked songs",
//         public: false,
//       }
//     );
//     const playlistId = playlistResponse.body.id;
//     await spotifyApi.addTracksToPlaylist(
//       playlistId,
//       topTracks.map((track) => track.uri)
//     );

//     res.json({ message: "Playlist created successfully!", playlistId });
//   } catch (err) {
//     console.error("Error creating playlist:", err);
//     if (err.response) {
//       console.error("Spotify API Error Response:", err.response.body);
//     }

//     res.status(500).send("Failed to create playlist.");
//   }
// };

// const playlistByID = async (req, res, next, id) => {
//   try {
//     let playlist = await Playlist.findById(id);
//     if (!playlist)
//       return res.status("400").json({
//         error: "Playlist not found",
//       });
//     req.playlist = playlist;
//     next();
//   } catch (err) {
//     return res.status("400").json({
//       error: "Could not retrieve playlist",
//     });
//   }
// };

// const read = (req, res) => {
//   return res.json(req.playlist);
// };

// const update = async (req, res) => {
//   try {
//     let playlist = req.playlist;
//     playlist = extend(playlist, req.body);
//     playlist.updated = Date.now();
//     await playlist.save();
//     res.json(playlist);
//   } catch (err) {
//     return res.status(400).json({
//       error: errorHandler.getErrorMessage(err),
//     });
//   }
// };

// const remove = async (req, res) => {
//   try {
//     let playlist = req.playlist;
//     let deletedPlaylist = await playlist.remove();
//     res.json(deletedPlaylist);
//   } catch (err) {
//     return res.status(400).json({
//       error: errorHandler.getErrorMessage(err),
//     });
//   }
// };

export default {
  // createPlaylist,
  syncPlaylistsWithSpotify,
  getPlaylists,
  getPlaylistTracks,
  getSongInfo,
  getLikedSongs,
  createPlaylist,
  deletePlaylist,
  syncPlaylistsWithSpotify,
  // getPlayListById,
  // read,
  // update,
  // remove,
};
