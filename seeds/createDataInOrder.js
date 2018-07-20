/**
 * Seed for creating base data, can be updated and randomized later with hundreds of pieces of data
 */

const bcrypt = require('bcrypt');
const faker = require('faker');

let users = [{
		email: 'test@test.com',
		password: bcrypt.hashSync('testU5er', bcrypt.genSaltSync(15)),
		display_name: 'Test',
		avatar: '',
		online: false,
	},
	{
		email: 'admin@test.com',
		password: bcrypt.hashSync('admin', bcrypt.genSaltSync(15)),
		display_name: 'Admin',
		avatar: '',
		online: false,
	},
];

for (let i = 0; i < 30; i += 1) {

	users.push({
		email: faker.internet.email(),
		display_name: faker.internet.userName(),
		avatar: faker.image.avatar(),
		password: faker.internet.password()
	})
}

let followings = [{
	user: 1,
	following: 2
}]

for (let i = 0; i < 12; i += 1) {

	followings.push({
		user: Math.floor(Math.random() * 30) + 2,
		following: Math.floor(Math.random() * 30) + 2
	})
}

let games = [{
	title: 'destiny',
	picture: faker.image.people(),
}]

for (let i = 0; i < 15; i += 1) {

	games.push({
		title: faker.internet.userName(),
		picture: faker.image.people()
	})

}

comments = [];

for (let i = 0; i < 45; i += 1) {
	comments.push({
		created_by: Math.floor(Math.random() * 30) + 2,
		video_id: 1,
		comment: faker.lorem.sentence()
	})
}


exports.seed = function (knex, Promise) {
	// Deletes ALL existing entries
	return knex('streams')
		.del()
		.then(() =>
			knex('comments')
			.del()
			.then(() =>
				knex('videos')
				.del()
				.then(() =>
					knex('games')
					.del()
					.then(() =>
						knex('followings')
						.del()
						.then(() =>
							knex('users')
							.del()
							.then(() => // Start adding in the fake data
								knex('users')
								.insert(users)
								.then(() =>
									knex('followings')
									.insert(followings)
									.then(() =>
										knex('games')
										.insert(games)
										.then(() =>
											knex('videos')
											.insert({
												created_by: 1,
												game_id: 1,
												title: 'Cool destiny video',
												link: 'https://www.youtube.com/watch?v=5c2r1nPU-Nw'
											})
											.then(() =>
												knex('comments')
												.insert(comments)
											)
										)
									)
								)
							)
						)
					)
				)
			)
		)

};