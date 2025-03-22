import errorHandler from '../helpers/dbErrorHandler';
import SpotifyAPI from '../services/spotify.service';
import SongModel from '../models/song.model';
import filterModel from '../models/filter.model';

const filter = async (req, res) => {
    try {
        // Get playlistId from the request
        const { playlistId } = req.body;

        // Retrieve songs from the playlist using playlistId
        // const playlistSongs = 

        // Check if the songs exist in MongoDB, if not, fetch from Spotify API
        // Use SongController
        // const songs = 

        // Filter songs based on filter criteria
        // Create FilterModel fron request body
        //const filterModel = new FilterModel(req.body);

        // Use FilterModel to filter songs
        const filteredSongs = songs;

        // Return filtered songs
        return res.status(200).json(filteredSongs);

    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

// ...existing code...