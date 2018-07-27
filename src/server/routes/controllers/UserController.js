import _ from 'lodash';
import DB from './DBConnect';

export default {
	updateProfilePicture(req, res) {
		const db = DB.connect(
			req,
			res
		);

		if (!_.isNil(req.session)) {
			return db('users')
				.update({
					avatar: req.body.url
				})
				.where('id', req.session.userId)
				.then(() => res.status(200).send({ response: true }));
		}

		return res.status(403).send('Bad Auth');
	},

	getVideos(req, res) {
		const db = DB.connect(
			req,
			res
		);

		if (!Number.isNaN(req.params.user_id / 1)) {
			return db('videos')
				.where('created_by', req.params.user_id)
				.select('id', 'link', 'title')
				.orderBy('videos.created_at', 'desc')
				.then(videoRes => {
					const toSend = {
						videos: videoRes
					};

					return db('users')
						.where('id', req.params.user_id)
						.select('display_name', 'id', 'avatar')
						.first()
						.then(userRes => {
							toSend.userInfo = userRes;

							return res.send(toSend);
						});
				});
		}

		return res.status(400).send({
			response: false,
			reason: 'Not a valid user'
		});
	},

	getFollows(req, res) {
		const db = DB.connect(
			req,
			res
		);

		const { user_id: userId } = req.params;

		if (!Number.isNaN(userId / 1) && userId !== -1) {
			return db('followings')
				.where('user', userId)
				.join('users', 'users.id', '=', 'followings.following')
				.leftJoin('videos', 'videos.created_by', '=', 'users.id')
				.orderBy('videos.created_at')
				.select('users.id', 'users.display_name')
				.then(dbRes => res.send(dbRes));
		}

		return [];
	}
};
