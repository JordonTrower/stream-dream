import express from 'express';
import GameController from './controllers/GameController';
import VideoController from './controllers/VideoController';

const router = express.Router();

// GAMES
router.get('/channels', GameController.getGames);
router.post('/channel', GameController.addGame);

// VIDEOS
router.delete('/video/:id', VideoController.deleteVideo)
router.get('/videos', VideoController.getVideos);
router.post('/video', VideoController.addVideo);

export default router;