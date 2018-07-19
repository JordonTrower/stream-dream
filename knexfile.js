require('dotenv').config();

module.exports = {
	client: 'pg',
	connection: process.env.DB_CONNECTION_STRING
}