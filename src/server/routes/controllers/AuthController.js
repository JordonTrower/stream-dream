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

	},

	/**
	 * Deletes the session and tells the clients redux to 
	 * delete their info, redirect to home.
	 */
	logout(req, res) {

	}
}