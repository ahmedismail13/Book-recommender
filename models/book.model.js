const { DataTypes } = require("sequelize");
const sequelize = require("../common/db");

const Book = sequelize.define("Book", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  num_of_pages: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  num_of_read_pages: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Book.sync();

module.exports = Book;
