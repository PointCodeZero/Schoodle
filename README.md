# Schoodle!

### Your go-to events planner app!

## Description

Schoodle is an online calendar tool for time management and coordinating meetings. Users are asked to determine the best time and date to meet. The organizer then chooses the time that best suits everyone and the meeting is booked in your calendar.

Schoodle's free online calendar helps users enjoy the integrated organization made simple. Quickly and efficiently users can create any number of events. Schoodle is the perfect tool for organization and planning.

## Images

!["main"](https://github.com/PointCodeZero/Schoodle/blob/master/docs/main.jpg)
!["pick date"](https://github.com/PointCodeZero/Schoodle/blob/master/docs/pick_date.jpg)

## Getting Started

In order to run Schoodle on your machine, clone the repo into your directory of choice, fire up your vagrant machine and
make sure to install all the dependencies outlined below using the simple
`npm -i` 'dependency name' `--save` command.
Follow it up with `npm run local` and you are all set!
Go to your localhost:3000 and enjoy!

## Functionality

Schoodle's functionalities are implemented smoothly without the typical user authentication process. Users don't register or log in and the only way to access Schoodle is via links shared amongst each other. In order to change the number of users, the contributors have to change the event.js file and edit the users_id which ended up being the alternative to logging in.
Upon implementing an user authentication functionality the app could actually be used online.

## Dependencies

    "body-parser": "^1.15.2",
    "dotenv": "^2.0.0",
    "ejs": "^2.4.1",
    "express": "^4.13.4",
    "knex": "^0.11.10",
    "knex-logger": "^0.1.0",
    "method-override": "^3.0.0",
    "morgan": "^1.7.0",
    "node-sass-middleware": "^0.9.8",
    "pg": "^6.0.2"

## Contributors

_Lighthouse Labs_ provided the node skeleton for this project,
but the **DreamTeam**, aka
**Gagan Lal,
Lucas Cruz,
Sarah Farah
Stanislav Solemeanciuc**
made it all happen!
