
exports.up = function(knex) {
  return knex.schema.createTable('videos', table => {
    table.increments()
    table.string('title')
    .notNullable()
    .defaultTo("")
    table.string('director')
    .notNullable()
    .defaultTo("")
    table.timestamps(true, true)
    table.string('duration')
    .notNullable()
    .defaultTo('Pedro Almodovar')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('videos')
};
