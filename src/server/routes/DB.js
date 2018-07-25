import express from 'express';
import multer from 'multer';
import GameController from './controllers/GameController';
import S3Controller from './controllers/S3Controller';
import VideoController from './controllers/VideoController';
import SearchController from './controllers/SearchController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// GAMES
router.get('/channels', GameController.getGames);
router.post('/channel', GameController.addGame);
router.get('/games', GameController.getGames)

// S3
router.delete('/s3video', S3Controller.deleteMedia)
router.post('/upload', upload.single('media'), S3Controller.uploadMedia)

// VIDEOS
router.delete('/video/:id', VideoController.deleteVideo)
router.get('/carouselVideos', VideoController.getCarouselVideos)
router.get('/videos', VideoController.getVideos);
router.post('/video', VideoController.addVideo);
router.put('/video', VideoController.updateVideoTitle)
router.get('/game_videos/:game_title', VideoController.getVideosByGameTitle)

// SEARCHINGs
router.post(`/search`, SearchController.searchBar);
export default router;
