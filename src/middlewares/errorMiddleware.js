const HttpError = require("../errors/HttpError");

module.exports = (err, req, res, next) => {
  if (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ message: err.message });
    } else {
      return res.status(400).json({ message: err.message });
    }
  } else {
    next();
  }
};
