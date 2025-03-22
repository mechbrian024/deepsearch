import express from 'express';
import playListCtrl from '../controllers/playlist.controller.js';

const router = express.Router();
router.route('/api/playlists').post(playListCtrl.create);
router.route('/api/playlists').get(playListCtrl.list);

router.param('playlistId', playListCtrl.playlistByID);
router.route('/api/playlists/:playlistId').get(playListCtrl.read);
router.route('/api/playlists/:playlistId').put(playListCtrl.update);
export default router;