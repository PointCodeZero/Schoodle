exports.seed = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1'),
    knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({name: 'Stan', email: 'stan.solomean@gmail.com'}),
        knex('users').insert({name: 'Gagan', email: 'lalgagan@hotmail.com'}),
        knex('users').insert({name: 'Sarah', email: 'farahsaa@gmail.com'}),
        knex('users').insert({name: 'Lucas'})
        ]);
    }),
    // knex('events').del()
    // .then(function () {
    //   return Promise.all([
    //     knex('events').insert({
    //       title: 'Birthday Party',
    //       description: 'Awesome party for my birthday!!!',
    //       location: 'My place, @lighthouselabs',
    //       shortURL: 'o3i1h52o3ih5',
    //       users_id: 4
    //     })
    //   ]);
    // }),

    // knex('time_slots').del()
    // .then(function () {
    //   return Promise.all([
    //     knex('time_slots').insert({
    //       option: '2019-02-04-1700',
    //       events_id: 11
    //     })
    //   ]);
    // }),

    // knex('time_preferences').del()
    // .then(function () {
    //   return Promise.all([
    //     knex('time_preferences').insert({
    //       users_id: 30,
    //       time_slots_id: 2
    //     })
    //   ]);
    // }),

    //we can .then more seed for other tables
    ])
};
