const express = require("express");
const {
  getAttandence,
  createAttendance,
} = require("../controllers/attendance");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");

router.route("/").post(wrapAsync(createAttendance));

router.route("/:studentId").get(wrapAsync(getAttandence));

module.exports = router;
