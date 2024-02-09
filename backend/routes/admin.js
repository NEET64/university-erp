const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.json({
    message: "at the admin Dashboard",
  });
});

module.exports = router;
