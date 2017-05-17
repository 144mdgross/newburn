var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const saltRounds = 11
const jwt = require('jsonwebtoken')
const knex = require('../knex')
const cookieSession = require('cookie-session')
const ev = require('express-validation')
const returning = require('../validations/returning-users')
const newPerson = require('../validations/new-users')
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
            message: "we couldn't find you.",
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

router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/new', ev(newPerson.post), exists, newUserAllowed, (req, res, next) => {
  res.redirect('/videos')
})

router.post('/', ev(returning.post), exists, newUserAllowed, (req, res, next) => {
  res.redirect('/videos')
})


module.exports = router;
