"use strict";

const express = require('express');
const router  = express.Router();

function generateRandomURL() {
  let shortURL = '';
  const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 17; i++) {
     shortURL += char.charAt(Math.floor(Math.random() * char.length));
   }
   return shortURL;
}

module.exports = (knex) => {

  //NEW ROUTE
  router.get('/new', (req, res) => {
    res.render('new_event');
  });

  //CREATE ROUTE
  router.post('/', (req, res) =>  {
    const shortUrl = generateRandomURL();
      knex('events')
        .returning('id')
        .insert({
          title: req.body.title,
          description: req.body.description,
          location: req.body.location,
          shortURL: shortUrl,
          users_id: 1    //====>>>Change here!!!
        })
        .then((id) => {
          knex("time_slots")
            .insert({
              option1: req.body.option1,
              option2: req.body.option2,
              option3: req.body.option3,
              events_id: id[0]
            })
            .then(() => {
              res.redirect(`/events/${shortUrl}`);
            })
        })
        .catch((err) => {
          console.log(err);
        })
  });

  //SHOW ROUTE
  router.get('/:id', (req, res) => {
    let id = req.params.id;
    knex('events')
      .select()
      .where({shortURL : id})
      .then((results)=> {
        const result = results[0];
        var templateVar = {
          title : result.title,
          shortURL : result.shortURL
        };
        res.render('shortUrl', templateVar);
      })
       .catch((err) => {
        console.log(err);
      });
  });

  //USER VERIFICATION ROUTE
  router.get('/:id/user_verify', (req, res) => {
    let id = req.params.id;
    knex('events')
      .select()
      .where({shortURL : id})
      .then((results)=> {
        const result = results[0];
        var templateVar = {
          shortURL : result.shortURL,
          title: result.title
        };
        res.render('users_verification', templateVar);
      })
       .catch((err) => {
        console.log(err);
      });
  });

  router.post('/:id/user_verify', (req, res) => {
    let id = req.params.id;
    knex('users')
      .returning('id')
      .insert({
        name: req.body.name,
        email: req.body.email
      })
      .then(() => {
        res.redirect(`/events/${id}/availability`);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //AVAILABILITY ROUTE
  router.get('/:id/availability', (req, res) => {
    let shortUrlId = req.params.id;
    knex("events")
      .select()
      .where({shortURL: shortUrlId})
      .then((rows) => {
        const row = rows[0];
        knex('time_slots')
          .select()
          .where({ events_id: row.id })
          .then((results) => {
            const timeSlots = results[0];
            var templateVar = {
              option1: timeSlots.option1,
              option2: timeSlots.option2,
              option3: timeSlots.option3,
              shortURL: row.shortURL,
              title: row.title,
              location: row.location

            };
            res.render('availability', templateVar);
          })
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //AVAILABILITY POST ROUTE
  router.post('/:id/main', (req, res) => {
    let id = req.params.id;
    knex('events')
      .select()
      .where({shortURL : id})
      .then((results) => {
        const result = results[0];
        knex('users')
          .select()
          .where({ id: results[0].users_id})
          .then((users) => {
            const user = users[0];
            knex('time_slots')
              .select()
              .where({ events_id: result.id})
              .then((time_id) => {
                knex('availability')
                  .insert({
                    response: req.body.rsvp,
                    time_slots_id: time_id[0].id,
                    users_id: 7   //=====>>>> Change it here
                  })
                  .then(() => {
                    res.redirect(`/events/${id}/main`);
                  })
              })
          })
      })
      .catch((err) => {
        console.log(err);
      })
  });

  //MAIN ROUTE
  router.get('/:id/main', (req, res) => {
    let shortUrlId = req.params.id;
    knex.select('*').from('users')
      .join('availability', {
        'users.id': 'availability.users_id'
      })
      .then((results) => {
        var templateVar = {
          users: results,
          shortURL: shortUrlId
        }
        res.render('main', templateVar);
      })
      .catch((err) => {
        console.log(err);
      })
  });

  //EDIT ROUTE
  router.get('/:id/edit', (req,res) => {
    let shortURL = req.params.id;
    knex('events')
      .select()
      .where({shortURL: shortURL})
      .then((results) => {
        const result = results[0];
        knex('time_slots')
        .select()
        .where({events_id: result.id})
        .then((rows) => {
          const row = rows[0];
          knex('availability')
          .select()
          .where({time_slots_id: row.id})
          .then((responses) => {
            const response = responses[0];
            var templateVar = {
              option1 : row.option1,
              option2: row.option2,
              option3: row.option3,
              shortURL : result.shortURL
            };
            res.render('edit', templateVar)
          })
        })
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //UPDATE ROUTE
  router.put('/:id/main', (req, res) => {
    let id = req.params.id;
    knex('users')
      .select()
      .then((rows) => {
        knex('availability')
          .where({ users_id : 7}) //=====>>> Change it here
          .update({ response : req.body.rsvp })
          .then(() => {
            res.redirect(`/events/${id}/main`);
          })
      })
      .catch((err) => {
         console.log(err);
      })
  });

  return router;

}
