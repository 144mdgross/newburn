(function() {
  'use strict'

  const Joi = require('joi')

  module.exports.post = {
    body: {
      newUsername: Joi.string().required().min(8).max(50),
      newPassword: Joi.string().required().min(12).max(100)
    }
  }
})()
