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
          knex("time_slots")
            .insert({
              option: req.body.option,
              events_id: id[0]
             })
            .then((results) => {
              res.redirect(`/events/${shortUrl}`);
            })
            .catch((err) => {
              if (err) { console.log(err); }
            })
        })
        .catch((err) => {
          if (err) { console.log(err); }
        })
    ]);
  });

  // //SHOW ROUTE
  // router.get('/:id', (req, res) => {
  //   let id = req.params.id;
  //   console.log(id)
  //   knex('events')
  //     .select()
  //     .where({shortURL : id})
  //     .then((err, rows)=> {
  //       console.log(rows)
  //       const event = rows[0];
  //       if (err) {
  //         console.log('error finding id')
  //       }
  //       var templateVar = {
  //         title : event.title,
  //         shortURL : event.shortUrl
  //       };
  //       res.render('shortUrl', templateVar);
  //     })
  // });

  // //USER VERIFICATION ROUTE
  // router.get('/:id/user_verify', (req, res) => {
  //   res.render('users_verification');
  // });

  // router.post('/:id/user_verify', (req, res) => {
  //   let id = req.params.id;
  //   knex('users')
  //     .insert({
  //       name: req.body.name,
  //       email: req.body.email
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   res.redirect(`/events/${id}/availability`);
  // });

  // //AVAILABILITY ROUTE
  // router.get('/:id/availability', (req, res) => {
  //   res,render('availability');
  // });

  // router.post('/:id/main', (req, res) => {
  //   let id = req.params.id;
  //   knex('availability')
  //     .insert({ response: req.body.rsvp })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   res.redirect(`/events/${id}/main`);
  // });

  // //MAIN ROUTE
  // router.get('/:id/main', (req, res) => {
  //   let url_id = req.params.id;
  //   knex('events')
  //     .select('title', 'description', 'location')
  //     .where({shortURL: url_id})
  //     .then((err, rows) => {
  //       if (err) { console.log(err); }
  //       var templateVar = {
  //         title: rows[0].title,
  //         description: rows[1].description,
  //         location: rows[2].location
  //       }
  //       knex('users')
  //         .select('name')
  //         .where({id: users_id}) //ask a mentor
  //         .then((err, rows) => {
  //           if (err) { console.log(err); }
  //           templateVar.user_name = rows[0].name
  //         })
  //         knex('time_slots')
  //           .select('option')
  //           .where({event_id : id}) // ask a mentor
  //           .then((err, rows) => {
  //             if (err) { console.log(err); }
  //             templateVar.option = rows[0].option
  //           });
  //     })
  //   res.render('main', templateVar);
  // });

  // //EDIT ROUTE


  // //UPDATE ROUTE


  //LOGIN ROUTE
  // router.get('/login/:id', (req, res) => {
  //   req.session.users_id = req.params.id;
  //   res.redirect('/');
  // })

  // router.post('/login/:id', (req, res) => {
  //   req.session.id = req.params.id
  //   res.redirect('/');
  // });

  return router;

}
