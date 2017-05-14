(function() {
  'use strict';

  const Joi = require('joi')

  module.exports.post = {
    body: {
      username: Joi.string().required().min(8).max(50),
      password: Joi.string().required().min(12).max(100)
    }
  }
})()
