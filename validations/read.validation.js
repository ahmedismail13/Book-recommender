const Joi = require("joi");

const ReadValidation = {};

ReadValidation.createRead = {
  body: Joi.object().keys({
    user_id: Joi.number().required(),
    book_id: Joi.number().required(),
    start_page: Joi.number().required(),
    end_page: Joi.number().required(),
  }),
};

module.exports = ReadValidation;
