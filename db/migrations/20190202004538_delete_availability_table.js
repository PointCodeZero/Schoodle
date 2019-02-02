
exports.up = function(knex, Promise) {
return knex.schema.dropTable('time_preferences_id_seq'),
knex.schema.dropTable('availability');

};

exports.down = function(knex, Promise) {
    return knex.schema.createTable('availability', function (table) {
        table.increments();
        table.integer('users_id').references('id').inTable('users').notNull().onDelete('cascade');
        table.integer('time_slots_id').references('id').inTable('time_slots').notNull().onDelete('cascade');
        table.string('response');
      });
};
