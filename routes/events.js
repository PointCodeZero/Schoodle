"use strict";

const express = require('express');
const router  = express.Router();

function generateRandomURL() {
  const shortURL = '';
  const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 17; i++) {
     shortURL += char.charAt(Math.floor(Math.random() * char.length));
   }
   return shortURL;
}

module.exports = (knex) => {

  //NEW ROUTE  // when clicking event button
  router.get('/events/new', (req, res) => {
    res.render('new_event');
  });

  //CREATE ROUTE    // when you submit event details
  router.post('/events', (req, res) =>  {
    const shortUrl = generateRandomURL();
    knex('events')
      .insert({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        short_url: shortUrl
      })
      .then((err) => {
        if (err) {
          console.log(err)
        }
        knex("time_slots")
          .insert({
            option: req.body.option
          })
          .catch((err) => {
            if (err) {
              console.log(err)
            }
          })
      });
    res.redirect(`/events/${shortUrl}`);
  }

  //SHOW ROUTE
  router.get('/events/:id', (req, res) => {
    let id = req.params.id;
    knex('events')
      .select('title', 'short_url')
      .where({short_url : id})
      .then((err, rows)=> {
        if (err) {
          console.log('error finding id')
        }
        var templateVar = {
          title : rows[0].title,
          shortURL : rows[1].shortUrl
        };
      })
    res.render('shortUrl', templateVar);
  });

  //USER VERIFICATION ROUTE
  router.get('/events/:id/user_verify', (req, res) => {
    res.render('users_verification');
  });

  router.post('/events/:id/user_verify', (req, res) => {
    let id = req.params.id;
    knex('users')
      .insert({
        name: req.body.name,
        email: req.body.email
      })
      .catch((err) => {
        console.log(err);
      });
    res.redirect(`/events/${id}/availability`);
  });

  //AVAILABILITY ROUTE
  router.get('/events/:id/availability', (req, res) => {
    res,render('availability');
  });

  router.post('/events/:id/main', (req, res) => {
    let id = req.params.id;
    knex('availability')
      .insert({ response: req.body.rsvp })
      .catch((err) => {
        console.log(err);
      });
    res.redirect(`/events/${id}/main`);
  });

  //MAIN ROUTE
  router.get('/events/:id/main', (req, res) => {
    let url_id = req.params.id;
    knex('events')
      .select('title', 'description', 'location')
      .where({short_url: url_id})
      .then((err, rows) => {
        if (err) { console.log(err); }
        var templateVar = {
          title: rows[0].title,
          description: rows[1].description,
          location: rows[2].location
        }
        knex('users')
          .select('name')
          .where({id: users_id}) //ask a mentor
          .then((err, rows) => {
            if (err) { console.log(err); }
            templateVar.user_name = rows[0].name
          })
          knex('time_slots')
            .select('option')
            .where({event_id : id}) // ask a mentor
            .then((err, rows) => {
              if (err) { console.log(err); }
              templateVar.option = rows[0].option
            });
      })
    res.render('main', templateVar);
  });

  //EDIT ROUTE


  //UPDATE ROUTE


  //LOGIN ROUTE
  router.post('/login/:id', (req, res) => {
    req.session.id = req.params.id
    res.redirect('/');
  });

  return router;

}
