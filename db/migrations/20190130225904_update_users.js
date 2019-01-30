
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('users', function (table) {
    table.string('email');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropColumn('email');
};
