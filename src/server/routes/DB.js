import express from 'express';
import multer from 'multer';
import GameController from './controllers/GameController';
import S3Controller from './controllers/S3Controller';
import VideoController from './controllers/VideoController';
import SearchController from './controllers/SearchController';
import UserController from './controllers/UserController';
import PlayingController from './controllers/PlayingController';

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// GAMES
router.get('/channels', GameController.getGames);
router.post('/channel', GameController.addGame);
router.get('/games', GameController.getGames)

// S3
router.delete("/s3video", S3Controller.deleteMedia);
router.post("/upload", upload.single("media"), S3Controller.uploadMedia);

// VIDEOS
router.delete('/video/:id', VideoController.deleteVideo);
router.get('/carouselVideos', VideoController.getCarouselVideos);
router.get('/videos', VideoController.getVideos);
router.post('/video', VideoController.addVideo);
router.put('/video', VideoController.updateVideoTitle)
router.get('/game_videos/:game_id', VideoController.getVideosByGameId)

// SEARCHING
router.post(`/search`, SearchController.searchBar);

// USERS
router.post('/change-profile-picture', UserController.updateProfilePicture);
router.get('/user/videos/:user_id', UserController.getVideos);
router.get('/user/:user_id/follows', UserController.getFollows);

// PLAYINNG VIEW
router.post("/get-video", PlayingController.getVideoLink); // for the video itself
router.post("/get-info", PlayingController.getInfo); // for the video information
router.post("/get-channel-info", PlayingController.getChannelInfo); // gets channel name, total videos
router.post("/if-followed", PlayingController.ifFollowed); // ascertains if the user is logged in and if they follow the channel of the video they are watching
router.post("/follow", PlayingController.newFollow); // for a user to follow a channel that is not currently followed
router.delete("/unfollow", PlayingController.unFollow); // for a user to unfollow a channel
router.post("/get-comments", PlayingController.getComments); // for the comments

// Endpoints for the Chat room

export default router;
