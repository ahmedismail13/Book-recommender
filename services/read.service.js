const Read = require("../models/read.model");
const Book = require("../models/book.model");

const ReadService = {};

ReadService.calculateReadsEvent = async (bookId) => {
  try {
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

    console.log(`Total read pages for book ${bookId} is ${totalReadPages}`);
  } catch (error) {
    console.error(error);
  }
};

ReadService.sendThankYouSMSEvent = async (userId) => {
  try {
    const URL =
      (process.env.SMS_PROVIDER === "first_provider" &&
        "https://run.mocky.io/v3/8eb88272-d769-417c-8c5c-159bb023ec0a") ||
      (process.env.SMS_PROVIDER === "second_provider" &&
        "https://run.mocky.io/v3/268d1ff4-f710-4aad-b455-a401966af719");

    const response = await axios.post(URL, {
      user_id: userId,
    });

    console.log("Thank you SMS sent to user: ", userId);
  } catch (error) {
    console.error(error);
  }
};

ReadService.createRead = async ({ user_id, book_id, start_page, end_page }) => {
  const read = await Read.create({
    user_id: user_id,
    book_id: book_id,
    start_page: start_page,
    end_page: end_page,
  });

  ReadService.calculateReadsEvent(book_id);
  ReadService.sendThankYouSMSEvent(user_id);

  return read;
};

module.exports = ReadService;
