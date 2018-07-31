import express from 'express';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import redisSession from 'connect-redis';
import session from 'express-session';
import knex from 'knex';
import bodyParser from 'body-parser';
import authRoutes from './routes/Auth';
import dbRoutes from './routes/DB';

/*
 * dotenv expand allows you to use
 * variables inside the dot env file
 * IE CLIENT_LOCATION
 */

dotenvExpand(dotenv.config());

const app = express();

const {
	SERVER_PORT,
	SESSION_SECRET,
	REDIS_PORT,
	DB_CONNECTION_STRING
} = process.env;

app.set(
	'db',
	knex({
		client: 'pg',
		connection: DB_CONNECTION_STRING
	})
);

app.use(bodyParser.json());

/**
 * If the application is in production, then Redis
 * due to the default session store purpose being dev only
 * and will purposely give memory leaks.
 * Redis is a NoSQL like database, stored in RAM for increased speed
 */
if (app.get('env') === 'production') {
	const RedisStore = redisSession(session);

	app.use(
		session({
			store: new RedisStore({
				port: REDIS_PORT
			}),
			secret: SESSION_SECRET,
			resave: false,
			saveUninitialized: false
		})
	);
} else {
	app.use(
		session({
			secret: SESSION_SECRET,
			resave: false,
			saveUninitialized: false
		})
	);
}

app.use(`${process.env.NGINX_LOCATION}/api/auth`, authRoutes);
app.use(`${process.env.NGINX_LOCATION}/api`, dbRoutes);

app.listen(process.env.SERVER_PORT, () => {
	console.log(`listening on port ${SERVER_PORT}`);
});
