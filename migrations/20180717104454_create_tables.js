
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) =>{
        table.increments();
        table.string('user', 50);
        table.string('password', 62);
        table.string('displayName', 26);
        table.string('avatar',255);
        table.boolean('online');
    })
    
    .then ( () => knex.schema.createTable('games', (table) => {
        table.increments();
        table.string('title', 100);
        table.string('picture', 255);
    }))

    .then ( () => knex.schema.createTable('videos', (table) => {
        table.increments();
        table.integer('userid').references('users.id')
        table.integer('gameid').references('games.id')
        table.string('title', 100);
        table.string('link', 255);
        table.timestamps(false, true) // setting to Date-Time type value and using current time when saving
    }))

    .then ( () => knex.schema.createTable('streams', (table) => {
        table.increments();
        table.integer('userid').references('users.id');
        table.integer('videoid').references('videos.id');
        table.integer('gameid').references('games.id');
        table.string('title', 100);
      }))

    .then ( () => knex.schema.createTable('followings', (table) => {
        table.increments();
        table.integer('userid').references('users.id'); //the person who is doing the following
        table.integer('followingid').references('users.id'); //the user the person is following
    }))

    .then ( () => knex.schema.createTable('comments', (table) => {
        table.increments();
        table.integer('userid').references('users.id');
        table.integer('videoid').references('videos.id');
        table.string('comment',255);
    }))
};

exports.down = function(knex, Promise) {
  
};
