const Joi = require("joi");

const BookValidation = {};

BookValidation.createBook = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    num_of_pages: Joi.number().required(),
  }),
};

module.exports = BookValidation;
