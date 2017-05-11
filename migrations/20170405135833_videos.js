
exports.up = function(knex) {
  return knex.schema.createTable('videos', table => {
    table.increments()
    table.string('title')
    .notNullable()
    .defaultTo("")
    table.string('director')
    .notNullable()
    .defaultTo("")
    table.string('duration')
    .notNullable()
    .defaultTo('Pedro Almodovar')
    table.text('image')
      .defaultTo('https://upload.wikimedia.org/wikipedia/commons/6/67/VHS-cassette.jpg')
    table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('videos')
};
