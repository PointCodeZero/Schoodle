exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({name: 'Stan', email: 'stan.solomean@gmail.com'}),
        knex('users').insert({name: 'Gagan', email: 'lalgagan@hotmail.com'}),
        knex('users').insert({name: 'Sarah', email: 'farahsaa@gmail.com'}),
        knex('users').insert({name: 'Lucas', email: 'lucas_ftc@hotmail.com'})
        ]);
    }),
    // knex('events').del()
    // .then(function () {
    //   return Promise.all([
    //     knex('events').insert({
    //       title: 'Birthday Party',
    //       description: 'Awesome party for my birthday!!!',
    //       location: 'My place, @lighthouselabs',
    //       shortURL: 'o3i1h52o3ih5'
    //     })

      // ]);


    // }),


    //we can .then more seed for other tables
    ])
};
