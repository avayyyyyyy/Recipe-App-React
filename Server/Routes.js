const express = require("express");
const router = express.Router();
const { signup, login, logout, getUser } = require("./Controllers/Controller");
const { verifyUser } = require("./Middlewares/VerifyUser");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user", verifyUser, getUser);

module.exports = router;
