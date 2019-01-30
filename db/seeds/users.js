exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Stan', email: 'stan.solomean@gmail.com'}),
        knex('users').insert({id: 2, name: 'Gagan', email: 'lalgagan@hotmail.com'}),
        knex('users').insert({id: 3, name: 'Sarah', email: 'farahsaa@gmail.com'}),
        knex('users').insert({id: 4, name: 'Lucas', email: 'lucas_ftc@hotmail.com'})

      ]);
    }),
    //we can .then more seed for other tables
  ])
};
