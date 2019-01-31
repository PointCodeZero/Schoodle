exports.up = function(knex, Promise) {
  return knex.schema.createTable('time_slots', function (table) {
    table.increments();
    table.string('option');
    table.integer('events_id').references('id').inTable('events').notNull().onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('time_slots');
};
