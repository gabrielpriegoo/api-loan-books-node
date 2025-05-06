const express = require("express");
const authController = require("../controllers/authController");
const authMiddlewares = require("../middlewares/authMiddlewares");
const router = express.Router();

// Define routes
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.get("/user", authMiddlewares.ensureAuth, (req, res) => {
  res.status(200).json({
    message: "User authenticated",
    user: req.user,
  });
});

module.exports = router;
