
exports.up = function(knex, Promise) {
    return knex.schema.table('availability', function (table) {
        table.string('response')
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.table('availability', function (table) {
        table.dropColumn('response');
    });
}