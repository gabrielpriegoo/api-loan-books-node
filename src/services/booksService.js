const HttpError = require("../errors/HttpError");
const { books } = require("../models/books");
const uuid = require("uuid").v4;

module.exports = {
  getAllBooks: () => books.map((book) => ({ id: book.id, title: book.title })),

  getBookById: (id) => books.find((book) => book.id === id),

  createBook: (title, author, quantity) => {
    const newBook = {
      id: uuid(),
      title,
      author,
      quantity,
    };
    console.log(newBook);
    books.push(newBook);
    return newBook;
  },

  updateBook: (id, updateBook) => {
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new HttpError(404, "Book not found");
    }
    books[bookIndex] = { ...books[bookIndex], ...updateBook };
    return books[bookIndex];
  },

  deleteBook: (id) => {
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new HttpError(404, "Book not found");
    }
    const deletedBook = books[bookIndex];
    books = books.filter((book) => book.id !== id);
    return deletedBook;
  },
};
