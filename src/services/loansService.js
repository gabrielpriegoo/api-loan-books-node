const { loans } = require("../models/loans");
const uuid = require("uuid").v4;
const { updateBook, takeBook, returnBook } = require("./booksService");

module.exports = {
  getAllLoans: () => loans,

  getLoanById: (id) => loans.find((loan) => loan.id === id),

  createLoan: (user, book) => {
    if (book.quantity < 1) {
      throw new HttpError(400, "Book not available");
    }

    const today = new Date();
    const returnDate = new Date();
    returnDate.setDate(today.getDate() + 14); // Set return date to 14 days from today

    const newLoan = {
      id: uuid(),
      userId: user.id,
      bookId: book.id,
      book: book.title,
      loanDate: today,
      returnDate: false,
      isReturned: false,
      isLate: false,
    };
    loans.push(newLoan);
    takeBook(book.id);
    return newLoan;
  },

  returnLoan: (id) => {
    const loanIndex = loans.findIndex((loan) => loan.id === id);

    if (loanIndex === -1) {
      throw new HttpError(404, "Loan not found");
    }

    const loan = loans[loanIndex];

    if (loan.isReturned) {
      throw new HttpError(400, "Loan already returned");
    }

    loan.isReturned = true;
    const today = new Date();

    const limitDate = new Date(loan.returnDate);
    if (today > limitDate) {
      loan.isLate = true;
    }

    loan.returnDate = today;

    returnBook(loan.bookId);
    return loan;
  },
};
