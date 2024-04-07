const UserSerivce = require("../services/user.service");

const UserController = {};

UserController.createUser = async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;
    const user = await UserSerivce.createUser({
      name: name,
      email: email,
      password: password,
      avatar: avatar,
    });
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = UserController;
