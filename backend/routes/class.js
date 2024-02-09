const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const {
  allClasses,
  createClass,
  editClass,
  deleteClass,
} = require("../controllers/class");
const router = express.Router();

router.route("/").get(wrapAsync(allClasses)).post(wrapAsync(createClass));

router.route("/:id").put(wrapAsync(editClass)).delete(wrapAsync(deleteClass));

module.exports = router;
