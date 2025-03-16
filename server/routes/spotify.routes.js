import express from 'express';
import spotifyCtrl from '../controllers/spotify.controller.js';

const router = express.Router();
router.route('/api/spotify').get(spotifyCtrl.listTopTracks);

export default router;