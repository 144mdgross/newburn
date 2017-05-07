var express = require('express');
var router = express.Router();
const knex = require("../knex")
const bodyParser = require('body-parser')
const Boom = require('boom')
const jwt = require('jsonwebtoken')
const cookieSession = require('cookie-session')
require('dotenv').config()

function protect(req, res, next) {
  let token = req.session.token

  jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
    if (err || !decoded) {
      res.render('error', {message: "you don't exist. please exist first", hint: ''})
    } else {
      next()
    }
  });
}


/* GET users listing. */
router.get('/', protect, function(req, res, next) {
  // list things from db here by most recently created
  knex('videos')
  .orderBy('created_at', 'desc')
    .then(library => {
      res.render('videos', {
        vhs: library
      });
    })
});

router.post('/', protect, (req, res, next) => {
  knex('videos')
    .insert([{
      title: req.body.title,
      director: req.body.director,
      duration: req.body.duration
    }], '*')
    .then(newVHS => {
      let redirectID = newVHS[0].id

      res.redirect(`/videos/${redirectID}`)
    })
    .catch(err => err)
})

router.delete('/', protect, (req, res, next) => {
  req.session = null
  res.json(true)
})

router.get('/:id', protect, (req, res, next) => {
  let id = req.params.id
  knex('videos')
    .where('id', id)
    .then(single => {
      res.render('single-video', {
        newVHS: single
      })
    })
})



router.patch('/:id', protect, (req, res, next) => {

  knex('videos')
    .where('id', `${req.body.id}`)
    .update({
      title: req.body.title,
      director: req.body.director,
      duration: req.body.duration
    })
    .then(data => {
      res.json(true)
    })
    .catch(err => {
      console.log(err);
    })

})

router.delete('/:id', protect, (req, res, next) => {
  let id = +req.body.id

  knex('videos')
    .where('id', `${id}`)
    .del()
    .then(success => {
      res.json(true)
    })

})



module.exports = router;
