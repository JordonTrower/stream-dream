/**
 * Seed for creating base data, can be updated and randomized later with hundreds of pieces of data
 */

const bcrypt = require('bcrypt');

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
							.insert(
								[{
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
								]
							)
							.then(() =>
								knex('followings')
								.insert({
									user: 1,
									following: 2
								})
								.then(() =>
									knex('games')
									.insert({
										title: 'destiny',
										picture: '',
									})
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
											.insert({
												created_by: 1,
												video_id: 1,
												comment: 'Oof ouch me bones'
											})
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