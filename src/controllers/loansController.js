const { getBookById } = require("../services/booksService");
const {
  getAllLoans,
  getLoanById,
  createLoan,
  returnLoan,
} = require("../services/loansService");

module.exports = {
  index: (req, res) => {
    const loans = getAllLoans();
    res.status(200).json({
      loans,
    });
  },

  show: (req, res) => {
    const { id } = req.params;
    const loanbook = getLoanById(id);

    if (!loanbook) {
      return res.status(404).json({
        message: "Loan not found",
      });
    }

    res.status(200).json({
      loanbook,
    });
  },

  save: (req, res) => {
    const user = req.user;
    const { bookId } = req.body;

    if (typeof bookId !== "string") {
      return res.status(400).json({
        message: "Book is invalid",
      });
    }

    const book = getBookById(bookId);
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const newLoan = createLoan(user, book);
    res.status(201).json({
      message: "Loan created",
      loan: newLoan,
    });
  },

  return: (req, res) => {
    const { id } = req.params;
    const loan = returnLoan(id);

    res.status(200).json({
      message: "Loan returned",
      loan: loan,
    });
  },
};
