const {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
  updateBook,
} = require("../services/booksService");

module.exports = {
  index: (req, res) => {
    const books = getAllBooks();
    res.status(200).json({
      books,
    });
  },

  show: (req, res) => {
    const { id } = req.params;
    const book = getBookById(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      book,
    });
  },

  save: (req, res) => {
    const { title, author, quantity } = req.body;
    console.log(req.body);

    if (
      typeof title !== "string" ||
      typeof author !== "string" ||
      typeof quantity !== "number"
    ) {
      return res.status(400).json({
        message: "Title, author, and quantity are required",
      });
    }

    const newBooks = createBook(title, author, quantity);
    console.log(newBooks);
    res.status(201).json({
      message: "Book created",
      book: newBooks,
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    const { title, author, quantity } = req.body;
    const fieldsTpUpdate = {};

    if (title) fieldsTpUpdate.title = title;
    if (author) fieldsTpUpdate.author = author;
    if (quantity) fieldsTpUpdate.quantity = quantity;

    const updatedBook = updateBook(id, fieldsTpUpdate);
    res.status(200).json({
      message: "Book updated",
      book: updatedBook,
    });
  },

  delete: (req, res) => {
    const { id } = req.params;
    const deletedBook = deleteBook(id);
    res.status(200).json({
      message: `Book deleted`,
      deletedBook,
    });
  },
};
