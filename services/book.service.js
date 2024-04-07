const Book = require("../models/book.model");

const BooksService = {};

BooksService.getRecommendations = async () => {
  const books = await Book.findAll({
    attributes: ["id", "name", "num_of_read_pages"],
    order: [["num_of_read_pages", "DESC"]],
    limit: 5,
  });
  return books;
};

BooksService.createBook = async ({ name, num_of_pages }) => {
  const book = await Book.create({
    name: name,
    num_of_pages: num_of_pages,
    num_of_read_pages: 0,
  });

  return book;
};

module.exports = BooksService;
