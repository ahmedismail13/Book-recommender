const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const ErrorHandler = require("./middlewares/error.middlware");

const bookRoutes = require("./routes/book.routes");
const readRoutes = require("./routes/read.routes");
const userRoutes = require("./routes/user.routes");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/books", bookRoutes);
app.use("/reads", readRoutes);
app.use("/users", userRoutes);

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hello World",
      version: "1.0.0",
    },
  },
  apis: ["./docs/user.yaml", "./docs/book.yaml", "./docs/read.yaml"],
};

const openapiSpecification = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
