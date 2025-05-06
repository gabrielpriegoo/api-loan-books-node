require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

// Import routes
app.use("/api", require("./routes/routes"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
