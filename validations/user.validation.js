const Joi = require("joi");

const UserValidation = {};

UserValidation.createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    avatar: Joi.string(),
  }),
};

module.exports = UserValidation;
