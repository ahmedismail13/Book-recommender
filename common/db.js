const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  `${process.env.POSTGRES_DB}`,
  `${process.env.POSTGRES_USER}`,
  `${process.env.POSTGRES_PASSWORD}`,
  {
    host: `localhost`,
    dialect: "postgres",
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    sequelize.sync();
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
