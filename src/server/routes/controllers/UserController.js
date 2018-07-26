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
	}
};
