const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");

const {
  createAssignment,
  allAssignment,
  classAllAssignment,
  courseAllAssignment,
  deleteAssignment,
} = require("../controllers/assignment");

router
  .route("/")
  .post(wrapAsync(createAssignment))
  .get(wrapAsync(allAssignment));

router.route("/:classid").get(wrapAsync(classAllAssignment));
router.route("/:classid/:courseid").get(wrapAsync(courseAllAssignment));

router.route("/:assignmentid").delete(wrapAsync(deleteAssignment));

module.exports = router;
