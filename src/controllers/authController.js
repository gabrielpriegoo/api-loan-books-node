const { users } = require("../models/users");
const { getUserByEmail, createUser } = require("../services/userService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const HttpError = require("../errors/HttpError");

module.exports = {
  register: (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res
        .status(400)
        .json({ message: "Invalid input, fields must be strings" });
    }

    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = createUser(name, email, password);
    if (!newUser) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    const responseUser = {
      name: newUser.name,
      email: newUser.email,
    };

    // Return success response
    return res.status(201).json({
      message: "User created successfully",
      user: { ...responseUser },
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;
    if (typeof email !== "string" || typeof password !== "string") {
      throw new HttpError(400, "Invalid input, fields must be strings");
    }

    // Check if user exists
    const user = getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return success response
    return res.status(200).json({
      message: "Login successful",
      userLogged: { name: user.name, email: user.email },
      token,
    });
  },
};
