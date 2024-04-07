const Read = require("../models/read.model");
const EventEmitter = require("../events/index");
const ReadService = {};

ReadService.createRead = async ({ user_id, book_id, start_page, end_page }) => {
  const read = await Read.create({
    user_id: user_id,
    book_id: book_id,
    start_page: start_page,
    end_page: end_page,
  });

  EventEmitter.emit("calculateReads", book_id);

  return read;
};

module.exports = ReadService;
