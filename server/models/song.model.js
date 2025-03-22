import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
    id:{
        type: String,
        trim: true,
        required: "Id is required",
    },
    name: {
        type: String,
        trim: true,
        required: "Name is required",
    },
    artist: {
        type: String,
        trim: true,
        required: "Artist is required",
    },
    album: {
        type: String,
        trim: true,
        required: "Album is required",
    },
    duration: {
        type: Number,
        required: "Duration is required",
    },
    coverPhoto: {
        type: String,
        default: "",
        trim: true,
    },
    genres: {
        type: Array,
        default: [],
    },
});

export default mongoose.model("Song", SongSchema);
