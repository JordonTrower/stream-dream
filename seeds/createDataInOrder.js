/**
 * Seed for creating base data, can be updated and randomized later with hundreds of pieces of data
 */

const bcrypt = require('bcrypt');
const faker = require('faker');

const users = [
	{
		email: 'test@test.com',
		password: bcrypt.hashSync('testU5er', bcrypt.genSaltSync(15)),
		display_name: 'Test',
		avatar: '/Images/NoUser.jpg',
		online: false
	},
	{
		email: 'admin@test.com',
		password: bcrypt.hashSync('admin', bcrypt.genSaltSync(15)),
		display_name: 'Admin',
		avatar: '/Images/NoUser.jpg',
		online: false
	}
];

for (let i = 0; i < 30; i += 1) {
	users.push({
		email: faker.internet.email(),
		display_name: faker.internet.userName(),
		avatar: '/Images/NoUser.jpg',
		password: faker.internet.password()
	});
}

const followings = [
	{
		user: 2,
		following: 1
	}
];

for (let i = 0; i < 12; i += 1) {
	followings.push({
		user: Math.floor(Math.random() * 30) + 2,
		following: Math.floor(Math.random() * 30) + 2
	});
}

let games = [
	{
		picture: 'https://cdn.shopify.com/s/files/1/0417/0233/products/destiny2.jpg?v=1495132332',
		title: 'Destiny 2'
	},
	{
		picture: 'http://assets1.ignimgs.com/2015/05/27/rocket-league-posterjpg-ef2765.jpg',
		title: 'Rocket League'
	},
	{
		picture : 'http://www.newgamesbox.net/wp-content/uploads/2017/08/FORTNITE-Free-Download.jpg',
		title: 'Fortnite'
	},
	{
		picture : 'http://hdphonewallpapers.com/content/K64vyRLY97LZgKQK25ih55na5OMkI9R8bV3uo432bzYWGjl3S4Te54rORc1kEkQA.png',
		title: 'League of Legends'
	},
	{
		picture: 'http://orig00.deviantart.net/cd70/f/2014/184/0/8/super_smash_bros__lockscreen_by_ciezure-d7p24ys.png',
		title: 'Super Smash Bros'
	},
	{
		picture: 'http://imgc.allpostersimages.com/images/P-473-488-90/96/9683/3PTC500Z/posters/overwatch-game-cover.jpg',
		title: 'Overwatch'
	},
	{
		picture: 'https://d1x7zurbps6occ.cloudfront.net/product/xlarge/635177-176831.jpg',
		title: 'Breath of The Wild'
	},
	{
		picture: 'http://news.toyark.com/wp-content/uploads/sites/4/2014/09/NECA-18-Inch-Master-Chief-01.jpg',
		title: 'Halo'
	},
	{
		picture: 'https://cdn.wallpapersafari.com/9/31/kQMIvN.jpg',
		title: 'Other'
	}
]

comments = [];

for (let i = 0; i < 45; i += 1) {
	comments.push({
		created_by: Math.floor(Math.random() * 30) + 2,
		video_id: 1,
		comment: faker.lorem.sentence()
	});
}

exports.seed = function(knex, Promise) {
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
												.then(() =>
													// Start adding in the fake data
													knex('users')
														.insert(users)
														.then(() =>
															knex('followings')
																.insert(
																	followings
																)
																.then(() =>
																	knex(
																		'games'
																	)
																		.insert(
																			games
																		)
																		.then(
																			() =>
																				knex(
																					'videos'
																				)
																					.insert(
																						{
																							created_by: 1,
																							game_id: 1,
																							title:
																								'Cool destiny video',
																							link:
																								'https://www.youtube.com/watch?v=5c2r1nPU-Nw'
																						}
																					)
																					.then(
																						() =>
																							knex(
																								'comments'
																							).insert(
																								comments
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
		);
};
