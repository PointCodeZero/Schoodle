
exports.up = function(knex, Promise) {
    return knex.schema.table('time_slots', function (table) {
        table.dropColumn('option')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('time_slots', function (table) {
        table.string('option')
    })
};
