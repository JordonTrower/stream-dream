import DB from './DBConnect';

export default {
	addGame(req, res) {

		const {
			title,
			picture,
		} = req.body

		const db = DB.connect(res, req);
		// TODO add gameid
		return db('games')
			.insert({
				title,
				picture
			})
			.catch( error => console.log(error) )
	},

	getGames(req, res) {
		console.log('getGames hit!')
		const db = DB.connect(res, req);
		return db.select()
			.table('games')
			.then(dbresults => res.send(dbresults));
	}

}