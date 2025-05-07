require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/auth");
const booksRouter = require("./routes/books");
const errorMiddleware = require("./middlewares/errorMiddleware");
const app = express();

app.use(express.json());

// Import routes
app.use("/api/auth", authRouter);
app.use("/api/books", booksRouter);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
