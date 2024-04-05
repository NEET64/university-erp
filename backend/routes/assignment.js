const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");

const {
  createAssignment,
  allAssignment,
  deleteAssignment,
  facultyAllAssignment,
  courseAssignment,
} = require("../controllers/assignment");

router
  .route("/")
  .post(wrapAsync(createAssignment))
  .get(wrapAsync(allAssignment));

router.route("/faculty/:facultyid").get(wrapAsync(facultyAllAssignment));

router.route("/courseAssignments").post(wrapAsync(courseAssignment));

router.route("/:assignmentid").delete(wrapAsync(deleteAssignment));

module.exports = router;
