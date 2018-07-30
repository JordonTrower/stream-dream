import _ from 'lodash';
import DB from './DBConnect';

export default {
	getVideoLink(req, res) {
		const db = DB.connect(
			res,
			req
		);

		return db('videos')
			.where('id', req.params.video_id)
			.select('link')
			.first()
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

		return db('videos')
			.select('title', 'created_by')
			.where({
				id: req.params.video_id
			})
			.first()
			.catch(error => console.log(error))
			.then(videoInfo => {
				res.send(videoInfo);
			});
	},

	getChannelInfo(req, res) {
		const db = DB.connect(
			res,
			req
		);

		let fullRes = [];

		db('users')
			.select('display_name', 'avatar')
			.where({ id: req.params.channel_id })
			.catch(error => console.log(error))
			.then(userInfo => {
				fullRes = userInfo;

				db('videos')
					.count('*')
					.where({
						created_by: req.params.channel_id
					})
					.catch(error => console.log(error))
					.then(totalVideos => {
						fullRes[0].channelVideosTotal = +totalVideos[0].count;

						db('followings')
							.count('*')
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

		if (req.session.userId) {
			return db('followings')
				.select('*')
				.where({
					user: req.session.userId
				})
				.andWhere({
					following: req.body.channel_id
				})
				.first()
				.catch(error => {
					console.log(error);
					res.send('there was an error');
				})
				.then(userFollowed => res.send(!_.isEmpty(userFollowed)));
		}
		return res.send('Please Log In');
	},

	newFollow(req, res) {
		const db = DB.connect(
			res,
			req
		);

		return db('followings')
			.insert({
				user: req.session.userId, // req.body.user,
				following: req.body.following
			})
			.catch(error => {
				console.log(error);
				res.send('there was an error');
			})
			.then(() => {
				res.send('we did it');
			});
	},

	unFollow(req, res) {
		const db = DB.connect(
			res,
			req
		);

		return db('followings')
			.where('user', 1)
			.andWhere('following', req.body.channel_id)
			.delete()
			.catch(error => {
				console.log(error);
				res.send('there was an error');
			})
			.then(() => {
				res.send('deleted');
			});
	},

	getComments(req, res) {
		const db = DB.connect(
			res,
			req
		);

		return db('comments')
			.join('users', 'users.id', '=', 'comments.created_by')
			.select(
				'users.display_name',
				'users.avatar',
				'comments.comment',
				'comments.created_at',
				'comments.updated_at'
			)
			.where({
				video_id: req.params.video_id
			})
			.orderBy('updated_at', 'desc')
			.catch(error => console.log(error))
			.then(comments => {
				res.send(comments);
			});
	}
};
