const express = require("express");
const authController = require("../controllers/authController");
const authMiddlewares = require("../middlewares/authMiddlewares");
const authRouter = express.Router();

// Define routes
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

authRouter.get("/user", authMiddlewares.ensureAuth, (req, res) => {
  res.status(200).json({
    message: "User authenticated",
    user: req.user,
  });
});

module.exports = authRouter;
