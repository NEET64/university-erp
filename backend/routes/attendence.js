const express = require("express");
const {
  getAttandence,
  createAttendance,
  getAllAttendance,
  getStudentAttendance,
} = require("../controllers/attendance");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");

router
  .route("/")
  .get(wrapAsync(getAllAttendance))
  .post(wrapAsync(createAttendance));

router.route("/:studentId").get(wrapAsync(getStudentAttendance));

module.exports = router;
