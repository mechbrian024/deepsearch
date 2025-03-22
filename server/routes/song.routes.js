import express from 'express';
import songCtrl from '../controllers/song.controller.js';

const router = express.Router();
router.route('/api/songs').post(songCtrl.create);
router.route('/api/songs').get(songCtrl.list);
router.route('/api/songs/:songId').get(songCtrl.read);
router.route('/api/songs/:songId').put(songCtrl.update);
router.route('/api/songs/:songId').delete(songCtrl.remove);
export default router;
