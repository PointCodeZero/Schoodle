
exports.up = function(knex, Promise) {

    return knex.schema.table('availability', function (table) {
        table.dropColumn('response')
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.table('availability', function (table) {
        table.boolean('response');
    });
}