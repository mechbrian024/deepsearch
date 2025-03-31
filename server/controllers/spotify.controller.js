import errorHandler from "../helpers/dbErrorHandler.js";
import extend from "lodash/extend.js";
import { spotifyApi } from "../../server.js";

const scopes = [
  "playlist-read-private", // Scope to read private playlists
  "playlist-read-collaborative", // Scope to read collaborative playlists
  "user-library-read", // Scope to read the user's saved tracks
  "playlist-modify-public", // Scope to create and modify public playlists
  "playlist-modify-private", // Scope to create and modify private playlists
];

const getSpotifyAuth = (req, res) => {
  const authUrl = spotifyApi.createAuthorizeURL(scopes, "your_state_value");
  res.redirect(authUrl);
};

const handleSpotifyCallback = async (req, res) => {
  const code = req.query.code;

  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const accessToken = data.body.access_token;
    const refreshToken = data.body.refresh_token;

    // Save tokens for future use (e.g., in a database or session)
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.setRefreshToken(refreshToken);

    res.redirect(`http://localhost:5173/login?access_token=${accessToken}`);
  } catch (err) {
    console.error("Error during Spotify authorization:", err);
    res.status(500).send("Failed to authenticate with Spotify.");
  }
};

export default { getSpotifyAuth, handleSpotifyCallback };
