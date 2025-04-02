import express from "express";
import playListCtrl from "../controllers/playlist.controller.js";

const router = express.Router();
// router.route("/api/playlists").post(playListCtrl.create);

router.route("/api/syncWithSpotify").get(playListCtrl.syncPlaylistsWithSpotify);

// router.route("/api/getPlaylists").get(playListCtrl.getPlaylists);
// // router.route("/api/getPlaylistById").get(playListCtrl.getPlaylistById);

// router.route("/api/getPlaylistTracks").get(playListCtrl.getPlaylistTracks);

// router.route("/api/getSongInfo").get(playListCtrl.getSongInfo);

// router.route("/api/getLikedSongs").get(playListCtrl.getLikedSongs);
router.route("/api/createPlaylist").post(playListCtrl.createPlaylist);

router.route("/api/deletePlaylist").delete(playListCtrl.deletePlaylist);

// router.route("/api/playlists").get(playListCtrl.getAllPlaylists);

router.get("/api/playlists", playListCtrl.getAllPlaylists);

router.get("/api/playlists/:playlistId", playListCtrl.getPlaylistById); // router.param("playlistId", playListCtrl.playlistByID);

router.get("/api/songs/:songId", playListCtrl.getSongById);

router.post("/api/createSpotifyPlaylist", playListCtrl.createSpotifyPlaylist);

// router.route("/api/playlists/:playlistId").get(playListCtrl.read);
// router.route("/api/playlists/:playlistId").put(playListCtrl.update);
export default router;
