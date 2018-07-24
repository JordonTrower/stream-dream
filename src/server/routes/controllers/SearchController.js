import _ from 'lodash';

export default {
	searchBar(req, res) {
		const db = req.app.get('db');

		const response = {
			data: {},
			response: true
		};

		db('users')
			.whereRaw(
				'LOWER(display_name) LIKE ?',
				`%${req.body.search.toLowerCase()}%`
			)
			.select('display_name', 'avatar', 'id')
			.limit(20)
			.then(userSearch => {
				if (!_.isEmpty(userSearch)) {
					response.data.users = userSearch;
				}

				db('games')
					.whereRaw(
						'LOWER(title) LIKE ?',
						`%${req.body.search.toLowerCase()}%`
					)
					.select('id', 'title')
					.limit(20)
					.then(gameSearch => {
						if (!_.isEmpty(gameSearch)) {
							response.data.games = gameSearch;
						}

						return res.send(response);
					});
			});
	}
};
