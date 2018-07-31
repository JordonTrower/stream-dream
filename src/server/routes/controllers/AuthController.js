import bcrypt from 'bcrypt';
import knex from 'knex';
import 'dotenv/config';
import _ from 'lodash';
/**
 *
 * @param {*} string
 *
 * tests to see if the string contains a numeric
 */
function containsNumeric(string) {
	return /\d/.test(string);
}

// pray for thee that must look upon this regex.
/**
 *
 * @param {*} email
 *
 * Passing a email as a string to be validated as an actual email
 */
function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

export default {
	/**
	 * Handles the user login
	 * Will redirect to user page upon completion,
	 */
	login(req, res) {
		const { password, email } = req.body;

		let db = null;

		if (res !== null) {
			db = req.app.get('db');
		} else {
			db = knex({
				client: 'pg',
				connection: process.env.DB_CONNECTION_STRING
			});
		}

		return db('users')
			.where('email', email)
			.select('id', 'email', 'password', 'display_name', 'avatar')
			.first()
			.then(dbRes => {
				if (!_.isEmpty(dbRes)) {
					return bcrypt
						.compare(password, dbRes.password)
						.then(compareRes => {
							if (compareRes) {
								const toReturn = {
									response: true,
									reasons: [],
									userInfo: {
										email: dbRes.email,
										display_name: dbRes.display_name,
										avatar: dbRes.avatar,
										id: dbRes.id
									}
								};

								if (res !== null) {
									req.session.userId = dbRes.id;

									return res.send(toReturn);
								}

								return toReturn;
							}

							const toReturn = {
								response: false,
								reasons: ['Password is incorrect']
							};

							if (res !== null) {
								return res.send(toReturn);
							}

							return toReturn;
						});
				}

				const toReturn = {
					response: false,
					reasons: ['Email is not valid']
				};

				if (res !== null) {
					return res.send(toReturn);
				}

				return toReturn;
			});
	},

	/**
	 * Will check for existing screen name / email in db
	 * if doesnt exist then create a new one, hash/salt pass
	 */
	register(req, res) {
		const response = {
			response: true,
			reasons: []
		};

		// Begin validating credentials
		// Starting with Password
		const { password, email, displayName } = req.body;

		if (password !== '') {
			if (!containsNumeric(password)) {
				response.reasons.push('Password should contain a number');
				response.response = false;
			}

			if (password.length < 8) {
				response.reasons.push('Password should 8 or more characters');
				response.response = false;
			}
		} else {
			response.response = false;
			response.reasons.push(
				'Password should be longer than 6 characters',
				'Password should contain a number'
			);
		}

		if (displayName === '') {
			response.reasons.push('Must have a username');
			response.response = false;
		}

		if (!validateEmail(email)) {
			response.reasons.push('Must have a valid email');
			response.response = false;
		}

		if (response.response) {
			let db = null;

			if (res !== null) {
				db = req.app.get('db');
			} else {
				db = knex({
					client: 'pg',
					connection: process.env.DB_CONNECTION_STRING
				});
			}

			return db('users')
				.select()
				.where('email', email)
				.andWhere('display_name', displayName)
				.then(dbRes => {
					// If there are no users matching the inputs, create a new one
					if (dbRes.length === 0) {
						// Begin hashing the password like a promise, enabling returns
						return bcrypt.hash(password, 15).then((hash, err) => {
							if (!err) {
								db('users')
									.select()
									.insert({
										email,
										display_name: displayName,
										online: true,
										password: hash,
										avatar: ''
									})
									.then(() => {});
							}

							// if it is currently a test
							if (res === null) {
								return response;
							}

							return res.send(response);
						});
					}

					// if there is an existing user then give an error to the new user
					response.reasons.push('Email or Username already is use');
					response.response = false;

					// if it is currently a test
					if (res === null) {
						return response;
					}

					return res.send(response);
				});
		}

		// if it is currently a test
		if (res === null) {
			return response;
		}

		return res.send(response);
	},

	/**
	 * Deletes the session and tells the clients redux to
	 * delete their info, redirect to home.
	 */
	logout(req, res) {
		req.session.destroy();
		res.status(200).send(req.session);
	},
	
	/**
	 *  Checks the session for a user being logged in. 
	 * 	If there is no user on session, it will delete the persistent redux store.
	 */
	checkSession(req, res){ 
		if(req.session.userId) {
			res.status(200).send(true)
		} else {
			res.status(200).send(false)
		}
	},

	/**
	 * Deletes the logged in users account Account
	 */
	deleteAccount(req, res) {
		// get the user off of the sessions or body (if test)
		const { displayName, email } = req.user || req.body;

		let db = null;

		if (res !== null) {
			db = req.app.get('db');
		} else {
			db = knex({
				client: 'pg',
				connection: process.env.DB_CONNECTION_STRING
			});
		}

		// find the user and delete it
		return db('users')
			.where('email', email)
			.andWhere('displayName', displayName)
			.del()
			.then(() => {
				const response = {
					response: true,
					reasons: []
				};

				return response;
			})
			.catch(err => {
				const response = {
					response: false,
					reasons: err
				};

				return response;
			});
	}
};
