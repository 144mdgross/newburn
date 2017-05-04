var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const saltRounds = 11
const jwt = require('jsonwebtoken')
const knex= require('../knex')
const cookieSession = require('cookie-session')

router.use(cookieSession({
  name: 'session',
  keys: "process.env.JWT_KEY",

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

/* GET home page. */
// this will be the login, sign-up and info page
// set cookies when logged in successfully and signed up successsfully
function exists (req, res, next) {
  let username = req.body.username
  let password = req.body.password
  let newUsername = req.body.newUsername
  let newPassword = req.body.newPassword

  if (username && password) {
    knex('users')
    .where('username', `${username}`)
    .then(userInfo => {
      if (userInfo.length < 1){
        res.render('error', {message: "you don't exist. please exist first"})
      } else {
        let token = jwt.sign({id: userInfo[0].id}, "process.env.JWT_KEY")
        req.session.token = token
        res.render('videos')
      }
    })
  } else if (newUsername && newPassword) {
    next()
  }
}

function newUserAllowed (req, res, next) {
  if (!req.session.token) {
  let newUsername = req.body.newUsername
  let password = req.body.newPassword
  const hash = bcrypt.hashSync(password, saltRounds)

  if (newUsername && password) {
    knex('users')
    .insert([{
      username: newUsername,
      password: hash
    }], '*')
    .then(success => {
      token = jwt.sign({newUser: 'allowed'}, new Buffer(process.env.JWT_KEY, 'base64'))
      req.session.token = token
      console.log(req.session.token);
      next()
      // res.redirect('/videos')
    })
  }

} else {
  next()
}
}

// LEAVING OFF BEING ABLE TO INSERT INTO TABLE.
// ONCE ABLE TO RENDER THE VIDEOS PAGE BUT NO LONGER
// MOST LIKELY FROM COOKIE ADDITION
// CHECK REQ.SESISON SET UP LATER.
// FULL CRUD IS DONE FOR NOW THOUGH.
// JUST WORKING ON USER AUTH.


// router.use(session({
//   name: 'session',
//   keys: [process.env.JWT_KEY],
//
//   // Cookie Options
//   maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }))

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', exists, newUserAllowed, (req, res, next) => {
  res.redirect('/videos')
})

module.exports = router;
