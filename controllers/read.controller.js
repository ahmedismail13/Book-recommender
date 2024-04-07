const ReadService = require("../services/read.service");

const ReadController = {};

ReadController.createRead = async (req, res, next) => {
  try {
    const { book_id, num_of_pages } = req.body;
    const read = await ReadService.createRead({ book_id, num_of_pages });
    return res.status(201).json(read);
  } catch (error) {
    next(error);
  }
};

module.exports = ReadController;
