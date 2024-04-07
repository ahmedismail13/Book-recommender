const ReadService = require("../services/read.service");

const ReadController = {};

ReadController.createRead = async (req, res, next) => {
  try {
    const { user_id, book_id, start_page, end_page } = req.body;
    const read = await ReadService.createRead({
      user_id,
      book_id,
      start_page,
      end_page,
    });
    return res.status(201).json(read);
  } catch (error) {
    next(error);
  }
};

module.exports = ReadController;
