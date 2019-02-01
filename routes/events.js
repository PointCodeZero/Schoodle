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

  //NEW ROUTE  // when clicking event button
  router.get('/new', (req, res) => {
    res.render('new_event')
  });

  //CREATE ROUTE    // when you submit event details
  router.post('/', (req, res) =>  {
    const shortUrl = generateRandomURL();
    Promise.all([
      knex('events')
        .returning('id')
        .insert({
          title: req.body.title,
          description: req.body.description,
          location: req.body.location,
          shortURL: shortUrl,
          users_id: 1
        })
        .then((id) => {
          console.log(id)

          knex("time_slots")
        .insert({
          option: req.body.option,
          events_id: id[0]
         })

        .then((results) => {
          console.log(results)
          res.redirect(`/events/${shortUrl}`);
        })
        .catch((err) => {
          if (err) { console.log(err); }
        })
        })
        .catch((err) => {
          if (err) { console.log(err); }
        }),
    ]);
    // res.redirect(`/events/${shortUrl}`);

  });

  //SHOW ROUTE
  router.get('/:id', (req, res) => {
    let id = req.params.id;
    knex('events')
      .returning('shortURL')
      .select()
      .where({shortURL : id})
      .then((results)=> {
        console.log("this is the result :", results)
        var templateVar = {
          title : results[0].title,
          shortURL : results[0].shortURL

        };
        console.log(templateVar)
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
      .returning('shortURL')
      .select()
      .where({shortURL : id})
      .then((results)=> {
        var templateVar = {
          shortURL : results[0].shortURL
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
      .insert({
        name: req.body.name,
        email: req.body.email
      })
      .then(() => {
        res.redirect(`/events/${id}/availability`)
      })
      .catch((err) => {
        console.log(err);
      });

  });

  //AVAILABILITY ROUTE
  router.get('/:id/availability', (req, res) => {
    let shortUrlId = req.params.id
    knex("events")
    .select()
    .where({shortURL: shortUrlId})
    .then((rows) => {
      knex('time_slots')
        .select()
        .where({
          events_id: rows[0].id
        })
        .then((results) => {
          const timeSlots = results[0]
          var templateVar = {
            option: timeSlots.option,
            shortURL: rows[0].shortURL
          }
          res.render('availability', templateVar)

        })
        .catch((err) => {
      console.log(err);
    });

    })
    .catch((err) => {
      console.log(err);
    });
  });
//availibility response route
  router.post('/:id/main', (req, res) => {
    let id = req.params.id;
    knex('availability')
      .insert({ response: req.body.rsvp })
      .then(() => {
        res.redirect(`/events/${id}/main`);s
      })
      .catch((err) =>{
        console.log(err)
      })
  });

//MAIN ROUTE
  router.get('/:id/main', (req, res) => {
    let shortUrlId = req.params.id;
    knex('events')
      .select()
      .where({shortURL: shortUrlId})
      .then((rows) => {
        const row = rows[0];
        var templateVar = {
          title: row.title,
          description: row.description,
          location: row.location,
          shortURL: row.shortURL
        }
        knex('users')
          .select()
          .where({id: row.users_id})
          .then((user_rows) => {
            const user_row = user_rows[0];
            templateVar.name = user_row.name;
          })
            knex('time_slots')
              .select()
              .where({events_id : row.id})
              .then((options) => {
                const time_slot = options[0];
                templateVar.option = time_slot.option;
                res.render('main', templateVar);
              });
      })
      .catch((err) => {
        console.log(err);
      })
  });

  // //EDIT ROUTE

  router.get('/:id/edit', (req,res) => {
    let shortURL = req.params.id
    knex('events')
    .select()
    .where({shortURL: shortURL})
    .then((results) => {
      const result = results[0]
      knex('time_slots')
      .select()
      .where({events_id: result.id})
      .then((rows) => {
        const row = rows[0]
        knex('availability')
        .select()
        .where({time_slots_id: row.id})
        .then((responses) => {
          const response = responses[0]
           var templateVar = {
        option : response.response,
        shortURL : result.shortURL

      }
      res.render('edit', templateVar)

        })
      })
    })
    .catch((err) => {
      console.log(err);
    });
  })


  // //UPDATE ROUTE
  router.put('/:id/main', (req, res) => {
    let id = req.params.id;
    knex('events')
      .select()
      .where({ shortURL : id })
      .then((rows) => {
        const event = rows[0];
        knex('time_slots')
          .select()
          .where({ events_id : event.id })
          .update({ option : req.body.option })
          .then(() => {
            res.redirect(`/events/${id}/main`);
          })
      })
      .catch((err) => {
         console.log(err)
      })
  });




  return router;

}
