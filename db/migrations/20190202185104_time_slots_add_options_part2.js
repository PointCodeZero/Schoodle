
exports.up = function(knex, Promise) {
    return knex.schema.table('time_slots', function (table) {
        table.string('option1');
        table.string('option2');
        table.string('option3');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('time_slots', function (table) {
        table.dropColumn('option1');
        table.dropColumn('option2');
        table.dropColumn('option3');
    });
};
