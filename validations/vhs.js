(function(){
'use strict';

const Joi = require('joi')

module.exports.post = {
  body: {
    title: Joi.string().required().trim().min(2),
    director: Joi.string().trim(),
    duration: Joi.string().required().trim(3),
    coverUrl: Joi.string().trim()
    }
  }
})()
