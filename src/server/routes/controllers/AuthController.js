import bcrypt from 'bcrypt';
import knex from 'knex';
import 'dotenv/config'
/**
 * 
 * @param {*} string 
 * 
 * tests to see if the string contains a numeric
 */
function containsNumeric(string) {
	return /\d/.test(string)
}

// pray for thee that must look upon this regex.
/**
 * 
 * @param {*} email 
 * 
 * Passing a email as a string to be validated as an actual email
 */
function validateEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());

}

export default {

	/**
	 * Handles the user login
	 * Will redirect to user page upon completion, 
	 */
	login(req, res) {
		// write tests then do this
	},

	/**
	 * Will check for existing screen name / email in db
	 * if doesnt exist then create a new one, hash/salt pass
	 */
	register(req, res) {

		const response = {
			response: true,
			reasons: []
		}

		// Begin validating credentials
		// Starting with Password

		const {
			password,
			email,
			displayName
		} = req.body

		if (password !== '') {
			if (!containsNumeric(password)) {
				response.reasons.push('Password should contain a number')
				response.response = false;
			}
			if (password.length < 6) {
				response.reasons.push('Password should be longer than 6 characters')
				response.response = false;
			}
		} else {
			response.response = false;
			response.reasons.push('Password should be longer than 6 characters',
				'Password should contain a number'
			)
		}

		if (displayName === '') {
			response.reasons.push('Must have a username')
			response.response = false;
		}

		if (!validateEmail(email)) {
			response.reasons.push('Must have a valid email')
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
				})
			}

			return db('users')
				.select()
				.where('email', email)
				.andWhere('displayName', displayName)
				.then((dbRes) => {

					// If there are no users matching the inputs, create a new one
					if (dbRes.length === 0) {

						// Begin hashing the password like a promise, enabling returns
						return bcrypt.hash(password, 15).then((hash, err) => {
							if (!err) {
								db('users')
									.insert({
										email,
										displayName,
										online: true,
										password: hash,
										avatar: '',
									}).then(() => {

									})

							}

							// if it is currently a test
							if (res === null) {
								return response;
							}

							return res.send(response)
						})
					}

					// if there is an existing user then give an error to the new user
					response.reasons.push('Email or Username already is use');
					response.response = false;

					// if it is currently a test
					if (res === null) {
						return response;
					}

					return res.send(response)
				})
		}

		// if it is currently a test
		if (res === null) {
			return response;
		}

		return res.send(response)
	},

	/**
	 * Deletes the session and tells the clients redux to 
	 * delete their info, redirect to home.
	 */
	logout(req, res) {

	},

	/**
	 * Deletes the logged in users account Account
	 */
	deleteAccount(req, res) {

		// get the user off of the sessions or body (if test)
		const {
			displayName,
			email
		} = req.user || req.body;

		let db = null;

		if (res !== null) {
			db = req.app.get('db');
		} else {
			db = knex({
				client: 'pg',
				connection: process.env.DB_CONNECTION_STRING
			})
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
				}

				return response;
			}).catch((err) => {
				const response = {
					response: false,
					reasons: err
				}

				return response
			})
	}
}