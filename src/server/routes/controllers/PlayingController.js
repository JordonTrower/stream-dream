import DB from "./DBConnect";

export default {
	getVideo(req, res) {
		const db = DB.connect(
			res,
			req
		);
		console.log(req.params.id);
		return db
			.select("link")
			.from("videos")
			.where({
				id: req.params.id
			})
			.catch(error => console.log(error))
			.then(video => {
				res.send(video);
			});
	},

	getInfo(req, res) {
		const db = DB.connect(
			res,
			req
		);
		return db
			.select("title", "created_by")
			.from("videos")
			.where({
				id: req.params.id
			})
			.catch(error => console.log(error))
			.then(video => {
				console.log(video[0]);
				res.send(video[0]);
			});
	},

	getChannelInfo(req, res) {
		const db = DB.connect(
			res,
			req
		);

		let fullRes = [];

		db.select("display_name", "avatar")
			.from("users")
			.where({ id: req.params.channel_id })
			.catch(error => console.log(error))
			.then(userInfo => {
				fullRes = userInfo;

				db("videos")
					.count("*")
					.where({
						created_by: req.params.channel_id
					})
					.catch(error => console.log(error))
					.then(totalVideos => {
						fullRes[0].channelVideosTotal = +totalVideos[0].count;
						db("followings")
							.count("*")
							.where({
								following: req.params.channel_id
							})
							.catch(error => console.log(error))
							.then(totalFollowerws => {
								fullRes[0].channelFollowersTotal = +totalFollowerws[0]
									.count;
								res.send(fullRes[0]);
							});
					});
			});
	},

	ifFollowed(req, res) {
		const db = DB.connect(
			res,
			req
		);

		console.log(req.params);

		if (req.session.userId) {
			db("followings")
				.select("*")
				.where({
					user: req.session.userId
				})
				.andWhere({
					following: req.params.channel_id
				})
				.catch(error => {
					console.log(error);
					res.send("there was an error");
				})
				.then(arr => {
					console.log(arr[0]);
					if (arr[0]) {
						res.send(true);
					} else {
						res.send(false);
					}
				});
		}
		res.send("Please Log In");
	},

	NewFollow(req, res) {
		const db = DB.connect(
			res,
			req
		);

		console.log("we got here");

		return db("followings")
			.insert({
				user: req.session.userId, // req.body.user,
				following: req.body.following
			})
			.catch(error => {
				console.log(error);
				res.send("there was an error");
			})
			.then(() => {
				res.send("we did it");
			});
	},

	UnFollow(req, res) {
		const db = DB.connect(
			res,
			req
		);

		console.log("we got here", req.query.channel_id);

		return db("followings")
			.where("user", 1)
			.andWhere("following", req.query.channel_id)
			.delete()
			.catch(error => {
				console.log(error);
				res.send("there was an error");
			})
			.then(() => {
				res.send("deleted");
			});
	},

	getComments(req, res) {
		const db = DB.connect(
			res,
			req
		);
		return db("comments")
			.join("users", "users.id", "=", "comments.created_by")
			.select(
				"users.display_name",
				"users.avatar",
				"comments.comment",
				"comments.created_at",
				"comments.updated_at"
			)
			.where({
				video_id: req.params.id
			})
			.orderBy("updated_at", "desc")
			.catch(error => console.log(error))
			.then(comments => {
				console.log(comments);
				res.send(comments);
			});
	}
};
