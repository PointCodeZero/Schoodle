
exports.up = function(knex, Promise) {
    return knex.schema.renameTable('time_preferences', 'availability')

};

exports.down = function(knex, Promise) {
  knex.schema.renameTable('availability','time_preferences')

};
