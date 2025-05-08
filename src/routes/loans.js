const express = require("express");
const loansController = require("../controllers/loansController");
const { ensureAuth } = require("../middlewares/authMiddlewares");
const loansRouter = express.Router();

// Define routes
loansRouter.get("/", loansController.index);
loansRouter.get("/:id", loansController.show);
loansRouter.post("/", ensureAuth, loansController.save);
loansRouter.put("/:id/return", loansController.return);

module.exports = loansRouter;
