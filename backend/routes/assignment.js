const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");

const {
  createAssignment,
  allAssignment,
  classAllAssignment,
  courseAllAssignment,
  deleteAssignment,
  facultyAllAssignment,
} = require("../controllers/assignment");

router
  .route("/")
  .post(wrapAsync(createAssignment))
  .get(wrapAsync(allAssignment));

// router.route("/class/:classid").get(wrapAsync(classAllAssignment));
// router.route("/:classid/:courseid").get(wrapAsync(courseAllAssignment));
router.route("/faculty/:facultyid").get(wrapAsync(facultyAllAssignment));

router.route("/:assignmentid").delete(wrapAsync(deleteAssignment));

module.exports = router;
