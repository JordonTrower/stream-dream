import express from 'express';
import multer from 'multer';
import GameController from './controllers/GameController';
import S3Controller from './controllers/S3Controller';
import VideoController from './controllers/VideoController';
import SearchController from './controllers/SearchController';
import UserController from './controllers/UserController';

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
router.get('/carouselVideos', VideoController.getCarouselVideos);
router.get('/videos', VideoController.getVideos);
router.post('/video', VideoController.addVideo);
router.put('/video', VideoController.updateVideoTitle);

// SEARCHING
router.post(`/search`, SearchController.searchBar);

// USERS
router.post('/change-profile-picture', UserController.updateProfilePicture);

export default router;
