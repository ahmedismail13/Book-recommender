const { DataTypes } = require("sequelize");
const sequelize = require("../common/db");
const User = require("./user.model");
const Book = require("./book.model");

const Read = sequelize.define("Read", {
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
  },
  book_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Book,
      key: "id",
    },
    allowNull: false,
  },
  start_page: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  end_page: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Read.sync();

module.exports = Read;
