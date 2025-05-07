const express = require("express");
const booksController = require("../controllers/booksController");
const booksRouter = express.Router();

// Define routes
booksRouter.get("/", booksController.index);
booksRouter.get("/:id", booksController.show);
booksRouter.post("/", booksController.save);
booksRouter.put("/:id", booksController.update);
booksRouter.delete("/:id", booksController.delete);

module.exports = booksRouter;
