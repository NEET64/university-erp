const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.json({
    message: "at the faculty Dashboard",
  });
});

module.exports = router;
