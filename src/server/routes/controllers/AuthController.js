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

		// if it is currently a test
		if (res === null) {
			return response;
		}

	},

	/**
	 * Deletes the session and tells the clients redux to 
	 * delete their info, redirect to home.
	 */
	logout(req, res) {

	}
}