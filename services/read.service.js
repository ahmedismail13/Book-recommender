const Read = require("../models/read.model");
const EventEmitter = require("../events/index");
const ReadService = {};

ReadService.createRead = async ({ book_id, num_of_pages }) => {
  const read = await Read.create({
    book_id: book_id,
    start_page: 1,
    end_page: num_of_pages,
  });

  EventEmitter.emit("calculateReads", book_id);

  return read;
};

module.exports = ReadService;
