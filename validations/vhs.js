'use strict';
const Joi = require('joi');

module.exports.post = {
  body: {
    title: Joi.string().required().trim(),
    director: Joi.string().trim(),
    duration: Joi.string().required().trim(),
    coverUrl: Joi.string().trim()
  }
};
