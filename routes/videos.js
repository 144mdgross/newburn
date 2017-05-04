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
  console.log(token, "token in videos route protect funciton");
  jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
    console.log('verify', token)
    if (err || !decoded) {
      res.render('error', {message: "you don't exist. please exist first"})
    } else {
      next()
    }
  });
}


/* GET users listing. */
router.get('/', protect, function(req, res, next) {
  // list things from db here by most recently created
  knex('videos')
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
      console.log('success?');
      res.render('single-video', {
        newVHS: newVHS
      })
    })
    .catch(err => err)
})

router.get('/:id', protect, (req, res, next) => {
  console.log('getting here?');
  let id = req.params.id
  console.log("ID is here?", id);
  knex('videos')
    .where('id', `${id}`)
    .then(single => {
      console.log(single, "single");
      // res.status(200)
      // .send(true)
      console.log("single", single);
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
      console.log(data, "data");
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
