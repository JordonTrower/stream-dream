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

// S3
router.delete('/s3video', S3Controller.deleteMedia);
router.post('/upload', upload.single('media'), S3Controller.uploadMedia);

// VIDEOS
router.delete('/video/:id', VideoController.deleteVideo);
router.get('/videos', VideoController.getVideos);
router.post('/video', VideoController.addVideo);

// SEARCHINGs
router.post(`/search`, SearchController.searchBar);
export default router;
