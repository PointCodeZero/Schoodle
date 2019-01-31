exports.up = function(knex, Promise) {
  return knex.schema.createTable('time_preferences', function (table) {
    table.increments();
    table.integer('users_id').references('id').inTable('users').notNull().onDelete('cascade');
    table.integer('time_slots_id').references('id').inTable('time_slots').notNull().onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('time_preferences');
};
