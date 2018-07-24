import DB from './DBConnect';

export default {
	addVideo(req, res) {

		console.log('addVideo', req.body)

		const {
			title,
			link
		} = req.body

		const db = DB.connect(res, req);
		// TODO add gameid
		
		db('videos')
			.insert({
				created_by: req.session.userId,
				title,
				link
			})
			.catch( error => console.log(error) )
			.then(() => res.send('ok'))
	},

	deleteVideo(req, res) {
		const db = DB.connect(res, req);
		return db('videos')
			.where('id', req.params.id)
			.del()
			.catch( error => console.log(error) )
			.then(() => res.send('ok'))
	},	

	getCarouselVideos(req, res) {
		const db = DB.connect(res, req);
		return db.select('link')
			.from('videos')
			.where({
				created_by: req.session.userId,
			})
			.orderBy('created_at', 'desc')
			.limit(5)
			.catch( error => console.log(error) )
			.then(dbresults => {
				res.send(dbresults)})
	},
	
	getVideos(req, res) {
		const db = DB.connect(res, req);
		return db('videos')
			.where({
				created_by: req.session.userId,
			})
			.catch( error => console.log(error) )
			.then(dbresults => res.send(dbresults))
	},

	updateVideoTitle(req, res) {
		const db = DB.connect(res, req);
		return db('videos')
			.where({
				id: req.body.id,
			})
			.update({
				title: req.body.title
			})
			.catch( error => console.log(error) )
			.then(() => res.send('ok'))
	},

}