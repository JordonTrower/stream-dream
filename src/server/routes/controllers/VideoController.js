import _ from 'lodash';
import DB from './DBConnect';

export default {
	addVideo(req, res) {
		// added to support end point testing
		let userid = "2";
		if (!_.isNil(req.session.userId)) {
			userid = req.session.userId
		}

		const { title, link, game_id } = req.body;

		const db = DB.connect(
			res,
			req
		);

		db('videos')
			.insert({
				created_by: userid,
				game_id,
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

		// added to support end point testing
		let userid = "2";
		if (!_.isNil(req.session.userId)) {
			userid = req.session.userId
		}
		console.log(req.session);
		const db = DB.connect(
			res,
			req
		);

		// if (!_.isNil(req.session.userId)) {
		return (
			db
				.select('link', 'id')
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
				
		// added to support end point testing
		let userid = "2";
		if (!_.isNil(req.session.userId)) {
			userid = req.session.userId
		}

		const db = DB.connect(
			res,
			req
		);


		return db('videos')
			.where({
				created_by: userid
			})
			.catch(error => console.log(error))
			.then(dbresults => res.send(dbresults));
	
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
	},

	getVideosByGameId(req, res) {

		const db = DB.connect(
			req, 
			res
		);
		return db('videos')
			.join('games', 'videos.game_id', '=', 'games.id')
			.select('videos.id', 'videos.title', 'videos.game_id', 'videos.link')
			.where( 'games.id', req.params.game_id )
			.then((dbResults) => res.send(dbResults));
	}
};
