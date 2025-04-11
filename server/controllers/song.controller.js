import Song from "../models/song.model.js";
import errorHandler from "./error.controller.js";
import extend from "lodash/extend.js";
import axios from "axios";

const create = async (req, res) => {
  const song = new Song(req.body);
  try {
    await song.save();
    return res.status(200).json({
      message: "Successfully created song!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    let songs = await Song.find().select(
      "name artists album duration addedBy addedOn"
    );
    res.json(songs);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const songByID = async (req, res, next, id) => {
  try {
    let song = await Song.findById(id);
    if (!song)
      return res.status("400").json({
        error: "Song not found",
      });
    req.song = song;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve song",
    });
  }
};

const read = (req, res) => {
  return res.json(req.song);
};

const update = async (req, res) => {
  try {
    let song = req.song;
    song = extend(song, req.body);
    song.updated = Date.now();
    await song.save();
    res.json(song);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let song = req.song;
    let deletedSong = await song.remove();
    res.json(deletedSong);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, list, songByID, read, update, remove };
