import express from "express";
import multer from "multer";
import GameController from "./controllers/GameController";
import S3Controller from "./controllers/S3Controller";
import VideoController from "./controllers/VideoController";
import SearchController from "./controllers/SearchController";
import UserController from "./controllers/UserController";
import PlayingController from "./controllers/PlayingController";

const router = express.Router();
const upload = multer({
	dest: "uploads/"
});

// GAMES
router.get("/channels", GameController.getGames);
router.post("/channel", GameController.addGame);
router.get("/games", GameController.getGames);

// S3
router.delete("/s3video", S3Controller.deleteMedia);
router.post("/upload", upload.single("media"), S3Controller.uploadMedia);

// VIDEOS
router.delete("/video/:id", VideoController.deleteVideo);
router.get("/homeCarouselVideos", VideoController.getHomeCarouselVideos);
router.get("/carouselVideos", VideoController.getCarouselVideos);
router.get("/videos", VideoController.getVideos);
router.post("/video", VideoController.addVideo);
router.put("/video", VideoController.updateVideoTitle);
router.get("/game_videos/:game_id", VideoController.getVideosByGameId);

// SEARCHING
router.post(`/search`, SearchController.searchBar);

// USERS
router.post("/change-profile-picture", UserController.updateProfilePicture);
router.get("/user/videos/:user_id", UserController.getVideos);
router.get("/user/:user_id/follows", UserController.getFollows);

// PLAYINNG VIEW
router.get("/get-video/:video_id", PlayingController.getVideoLink); // for the video itself
router.get("/get-info/:video_id", PlayingController.getInfo); // for the video information
router.get("/get-channel-info/:channel_id", PlayingController.getChannelInfo); // gets channel name, total videos
router.post("/if-followed", PlayingController.ifFollowed); // ascertains if the user is logged in and if they follow the channel of the video they are watching
router.post("/follow", PlayingController.newFollow); // for a user to follow a channel that is not currently followed
router.delete("/unfollow/:channel_id", PlayingController.unFollow); // for a user to unfollow a channel
router.get("/get-comments/:video_id", PlayingController.getComments); // for the comments
router.get("/get-user-info", PlayingController.getUserInfo); // will display just before the input box
router.post("/comment-new", PlayingController.newComment); // to post new comment

export default router;