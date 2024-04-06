const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/dashboard", (req, res) => {
  res.json({
    message: "at the admin Dashboard",
  });
});

router.post("/signin", (req, res) => {
  console.log("enter");
  if (
    req.body.username !== process.env.ADMIN_ID &&
    req.body.password !== process.env.ADMIN_PASS
  ) {
    return res.status(400).json({
      message: "Username or Password is incorrect",
    });
  }
  const adminId = req.body.username;
  const token = jwt.sign({ adminId }, process.env.JWT_SECRET);
  res.json({
    message: "user Found",
    name: "admin name",
    token: token,
  });
});

module.exports = router;
