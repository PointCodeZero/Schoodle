// modularize generaterandomurl

// add title/desc/location to user_verify, shorturl, maybe some other pages

// Gagan, Lucas - yes button take us to main page

// Edit page

// Main page - for each function to display results in a table -- like app.js from tweeter, inject html with loops




// name = users.name
// date = time_slots.option
// response = availability.response

var result = {
user1 : {
  name : user.name,
  date : time_slots.option,
  response: availability.response
},
user2 : {}
}

users.forEach(user => {
  result.user1.name = user.name
  availability.forEach(entry => {
    if(entry.users_id === user.id) {
    result.user1.response = entry.response
    }
    time_slots.forEach(slot => {
      if (slot.id === entry.time_slots_id) {
      result.user1.date = time_slots.option
      }
    })
  })
})

