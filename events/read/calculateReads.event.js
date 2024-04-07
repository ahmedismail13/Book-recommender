const EventEmitter = require("./events/index");
const Read = require("../../models/read.model");
const Book = require("../../models/book.model");

async function calculateReadsEvent(bookId) {
  const reads = await Read.findAll({
    where: {
      book_id: bookId,
    },
  });

  let totalReadPages = 0;
  const mergedReads = reads.map((read) => read.dataValues);

  mergedReads.sort((a, b) => a.start_page - b.start_page);

  for (let i = 0; i < mergedReads.length; i++) {
    for (let j = i + 1; j < mergedReads.length; j++) {
      if (mergedReads[i].end_page >= mergedReads[j].start_page - 1) {
        if (mergedReads[i].end_page >= mergedReads[j].end_page) {
          mergedReads.splice(j, 1);
          j = i;
        } else {
          mergedReads[i].end_page = mergedReads[j].end_page;
          mergedReads.splice(j, 1);
          j = i;
        }
      } else {
        break;
      }
    }
  }

  totalReadPages = mergedReads.reduce(
    (acc, read) => acc + read.end_page - read.start_page,
    0
  );

  await Book.update(
    { num_of_read_pages: totalReadPages },
    {
      where: {
        id: bookId,
      },
    }
  );
}

EventEmitter.on("calculateReads", calculateReadsEvent);

module.exports = calculateReadsEvent;
