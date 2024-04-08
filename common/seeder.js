const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");
dotenv.config();

const Read = require("../models/read.model");
const Book = require("../models/book.model");
const User = require("../models/user.model");

const ReadService = require("../services/read.service");

const Database = require("../common/db");

const DatabaseSeeder = async () => {
  try {
    const book1 = await Book.create({
      name: "Book 1",
      num_of_pages: 100,
      num_of_read_pages: 0,
    });
    const book2 = await Book.create({
      name: "Book 2",
      num_of_pages: 100,
      num_of_read_pages: 0,
    });

    const user1 = await User.create({
      name: "User 1",
      email: faker.internet.email(),
      password: "12345678",
    });

    const user2 = await User.create({
      name: "User 2",
      email: faker.internet.email(),
      password: "12345678",
    });

    const user3 = await User.create({
      name: "User 3",
      email: faker.internet.email(),
      password: "12345678",
    });

    await Read.create({
      user_id: user1.id,
      book_id: book1.id,
      start_page: 10,
      end_page: 30,
    });

    await Read.create({
      user_id: user2.id,
      book_id: book1.id,
      start_page: 2,
      end_page: 25,
    });

    await ReadService.calculateReadsEvent(book1.id);

    await Read.create({
      user_id: user1.id,
      book_id: book2.id,
      start_page: 40,
      end_page: 50,
    });

    await Read.create({
      user_id: user3.id,
      book_id: book2.id,
      start_page: 1,
      end_page: 10,
    });

    await ReadService.calculateReadsEvent(book2.id);
  } catch (error) {
    console.error(error);
  }
};

DatabaseSeeder();
