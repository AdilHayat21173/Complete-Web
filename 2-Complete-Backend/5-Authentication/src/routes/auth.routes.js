const express = require("express");

const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", authController.registerUser);

router.get("/users", authController.getUsers);

module.exports = router;