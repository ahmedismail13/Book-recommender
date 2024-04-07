const BooksService = require("../services/book.service");

const BookController = {};

BookController.getRecommendations = async (req, res, next) => {
  try {
    const books = await BooksService.getRecommendations();
    return res.json(books);
  } catch (error) {
    next(error);
  }
};

BookController.createBook = async (req, res, next) => {
  try {
    const { name, num_of_pages } = req.body;
    const book = await BooksService.createBook({ name, num_of_pages });
    return res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

module.exports = BookController;
