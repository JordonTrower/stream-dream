import DB from './DBConnect';

export default {
	addVideo(req, res) {

		const {
			title,
			link,
		} = req.body

		const db = DB.connect(res, req);
		// TODO add gameid
		return db('videos')
			.insert({
				created_by: req.session.userId,
				title,
				link
			})
			.catch( error => console.log(error) )
	},

	deleteVideo(req, res) {
		const db = DB.connect(res, req);
		return db('videos')
			.where('id', req.params.id)
			.delete()
			.catch( error => console.log(error) )
	},	

	getVideos(req, res) {
		const db = DB.connect(res, req);
		return db('videos')
			.where({
				created_by: req.session.userId,
			})
			.catch( error => console.log(error) )
			.then(dbresults => res.send(dbresults))
	}

}