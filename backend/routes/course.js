const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const {
  allCourses,
  createCourse,
  editCourse,
  deleteCourse,
} = require("../controllers/course");

router.route("/").get(wrapAsync(allCourses)).post(wrapAsync(createCourse));

router.route("/:id").put(wrapAsync(editCourse)).delete(wrapAsync(deleteCourse));

module.exports = router;
