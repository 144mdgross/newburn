var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const saltRounds = 11
const jwt = require('jsonwebtoken')
const knex = require('../knex')
const cookieSession = require('cookie-session')
const ev = require('express-validation')
const validations = require('../validations/users')
// wrap all of these in if statements for deploying to heroku
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

router.use(cookieSession({
  name: 'session',
  keys: [process.env.JWT_KEY],
  maxAge: 24 * 60 * 60 * 1000
}))

function exists(req, res, next) {
  let username = req.body.username
  let password = req.body.password
  let newUsername = req.body.newUsername
  let newPassword = req.body.newPassword

  if (username && password) {
    knex('users')
      .where('username', username)
      .then(userInfo => {
        if (userInfo.length < 1) {
          res.render('error', {
            message: "we didn't find you in the database.",
            hint: "make sure your username and password are correct"
          })
        } else if (userInfo.length >= 1) {
          let token = jwt.sign({
            id: userInfo[0].id
          }, process.env.JWT_KEY)
          req.session.token = token
          next()
        }
      })
  } else if (newUsername && newPassword) {
    next()
  }
}

function newUserAllowed(req, res, next) {
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
          newUser = jwt.sign({
            newUser: 'allowed'
          }, process.env.JWT_KEY)
          req.session.token = newUser
          next()
        })
    }
  } else {
    next()
  }
}

router.get('/', function(req, res, next) {
  res.render('index');
});

// NOTE: because I have diff form names for username and newUsername....I need to change those names and code, or change validations...somehow. 
router.post('/', exists, newUserAllowed, (req, res, next) => {
  res.redirect('/videos')
})

module.exports = router;
