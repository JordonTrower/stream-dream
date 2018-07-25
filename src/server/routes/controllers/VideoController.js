import _ from 'lodash';
import DB from './DBConnect';

export default {
	addVideo(req, res) {
		console.log('addVideo', req.body);

		const { title, link } = req.body;

		const db = DB.connect(
			res,
			req
		);
		// TODO add gameid

		db('videos')
			.insert({
				created_by: req.session.userId,
				title,
				link
			})
			.catch(error => console.log(error))
			.then(() => res.send('ok'));
	},

	deleteVideo(req, res) {
		const db = DB.connect(
			res,
			req
		);
		return db('videos')
			.where('id', req.params.id)
			.del()
			.catch(error => console.log(error))
			.then(() => res.send('ok'));
	},

	getCarouselVideos(req, res) {
		const db = DB.connect(
			res,
			req
		);

		// if (!_.isNil(req.session.userId)) {
		return (
			db
				.select('link')
				.from('videos')
				// .where({
				// 	created_by: req.session.userId
				// })
				.orderBy('created_at', 'desc')
				.limit(5)
				.catch(error => console.log(error))
				.then(dbresults => {
					res.send(dbresults);
				})
		);
		// }

		// return res.send([]);
	},

	getVideos(req, res) {
		const db = DB.connect(
			res,
			req
		);

		if (!_.isNil(req.session.userId)) {
			return db('videos')
				.where({
					created_by: req.session.userId
				})
				.catch(error => console.log(error))
				.then(dbresults => res.send(dbresults));
		}

		return res.send([]);
	},

	updateVideoTitle(req, res) {
		const db = DB.connect(
			res,
			req
		);
		return db('videos')
			.where({
				id: req.body.id
			})
			.update({
				title: req.body.title
			})
			.catch(error => console.log(error))
			.then(() => res.send('ok'));
	}
};
