const express = require("express");
const {
  createAttendance,
  getAllAttendance,
  getStudentAttendance,
  getChartData,
  getFacultyAttendence,
} = require("../controllers/attendance");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");

router
  .route("/")
  .get(wrapAsync(getAllAttendance))
  .post(wrapAsync(createAttendance));

router.route("/:studentId").get(wrapAsync(getStudentAttendance));

router.route("/faculty/:facultyId").get(wrapAsync(getFacultyAttendence));

router.route("/chart/:studentId").get(wrapAsync(getChartData));

module.exports = router;
