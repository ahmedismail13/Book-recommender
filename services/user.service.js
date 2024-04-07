const User = require("../models/user.model");

const UserSerivce = {};

UserSerivce.createUser = async ({ name, email, password, avatar }) => {
  return await User.create({
    name: name,
    email: email,
    password: password,
    avatar: avatar,
  });
};

module.exports = UserSerivce;
