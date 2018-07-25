import express from "express";
import GameController from "./controllers/GameController";
import VideoController from "./controllers/VideoController";
import PlayingController from "./controllers/PlayingController";

const router = express.Router();

// GAMES
router.get("/channels", GameController.getGames);
router.post("/channel", GameController.addGame);

// VIDEOS
router.delete("/video/:id", VideoController.deleteVideo);
router.get("/videos", VideoController.getVideos);
router.post("/video", VideoController.addVideo);

// PLAYINNG VIEW
router.get("/getvideo/:id", PlayingController.getVideo); // for the video itself
router.get("/getinfo/:id", PlayingController.getInfo); // for the video information
router.get("/getchannelinfo/:channel_id", PlayingController.getChannelInfo); // gets channel name, total videos
router.get("/iffollowed/:user_id/:channel_id", PlayingController.ifFollowed); // ascertains if the user is logged in and if they follow the channel of the video they are watching
router.post("/follow", PlayingController.NewFollow); // for a user to follow a channel that is not currently followed
router.delete("/unfollow", PlayingController.UnFollow); // for a user to unfollow a channel
router.get("/getcomments/:id", PlayingController.getComments); // for the comments

// Endpoints for the Chat room

export default router;
