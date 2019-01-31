exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', function (table) {
    table.increments();
    table.string('title');
    table.string('description');
    table.string('location');
    table.string('shortURL');
    table.integer('users_id').references('id').inTable('users').notNull().onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events');
};
