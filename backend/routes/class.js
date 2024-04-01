const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const {
  allClasses,
  createClass,
  editClass,
  deleteClass,
  facultyClasses,
} = require("../controllers/class");
const router = express.Router();

router.route("/").get(wrapAsync(allClasses)).post(wrapAsync(createClass));

router.route("/:id").put(wrapAsync(editClass)).delete(wrapAsync(deleteClass));

router.route("/faculty/:id").get(wrapAsync(facultyClasses));

module.exports = router;
