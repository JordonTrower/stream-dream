import knex from "knex";
import "dotenv/config";

export default {
	connect(res, req) {
		let db = null;

		if (res !== null) {
			db = req.app.get("db");
		} else {
			db = knex({
				client: "pg",
				connection: process.env.DB_CONNECTION_STRING
			});
		}
		return db;
	}
};
