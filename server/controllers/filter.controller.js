import errorHandler from "./error.controller.js";
import Filter from "../models/filter.model.js";
import Playlist from "../models/playList.model.js";
import Song from "../models/song.model.js";
import { filterSongsByFilterObject } from "../utils/filterEngine.js";

const create = async (req, res) => {
  const transformedFilter = {
    name: req.body.name,    
    filterBlocks: req.body.filters.map(block => ({      
      filterLines: block.map(line => ({
        field: line.field,
        condition: line.condition,
        value: line.value,
        connector: line.connector
      }))
    }))
  };

  const filter = new Filter(transformedFilter);
  console.log("$$$$ filter object:", JSON.stringify(filter, null, 2));
  
  try {
    await filter.save();
    return res.status(200).json({
      message: "Successfully created filter!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const filterByName = async (req, res) => {
  try {
    const filter = await Filter.findOne({ name: req.params.name });
    return res.status(200).json(filter);
  } catch (err) {
    return res.status(400).json({});
  }
};

const search = async (req, res) => {
  try {
    // Get playlistId from the request
    const listId = req.body.playlistId;

    // Retrieve songs from the playlist using playlistId
    const playlist = await Playlist.findOne({ playlistId: listId });
    // console.log("$$$ This is the playlist: " + playlist);

    // retirve songs from the playlist
    const songs = await Promise.all(
      playlist.songs.map(async (id) => {
        return await Song.findOne({ songId: id });
      })
    );

    // Filter Object
    const filter = new Filter(req.body.filter);

    // Use FilterModel to filter songs
    const filteredSongs = filterSongsByFilterObject(songs, filter);

    // Return filtered songs
    return res.status(200).json(filteredSongs);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, filterByName, search };
