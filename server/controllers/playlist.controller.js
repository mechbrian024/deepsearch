import Playlist from "../models/playlist.model.js";
import errorHandler from "./error.controller.js";
import extend from "lodash/extend.js";

const create = async (req, res) => {
  const playlist = new Playlist(req.body);
  try {
    await playlist.save();
    return res.status(200).json({
      message: "Successfully created playlist!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
}

const list = async (req, res) => {
  try {
    let playlists = await Playlist.find().select("name songs created updated coverPhoto description owner visibility subscribers songList searchTerms");
    res.json(playlists);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
}

const playlistByID = async (req, res, next, id) => {
  try {
    let playlist = await Playlist.findById(id);
    if (!playlist)
      return res.status("400").json({
        error: "Playlist not found",
      });
    req.playlist = playlist;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve playlist",
    });
  }
}

const read = (req, res) => {
  return res.json(req.playlist);
}

const update = async (req, res) => {
  try {
    let playlist = req.playlist;
    playlist = extend(playlist, req.body);
    playlist.updated = Date.now();
    await playlist.save();
    res.json(playlist);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
}

const remove = async (req, res) => {
  try {
    let playlist = req.playlist;
    let deletedPlaylist = await playlist.remove();
    res.json(deletedPlaylist);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
}

export default { create, list, playlistByID, read, update, remove };