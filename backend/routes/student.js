const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const {
  createStudent,
  editStudent,
  deleteStudent,
  getStudents,
  getStudentById,
  studentSignin,
} = require("../controllers/student");
const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.json({
    message: "at the student Dashboard",
  });
});

router.route("/").get(wrapAsync(getStudents)).post(wrapAsync(createStudent));

router.route("/signin").post(wrapAsync(studentSignin));
router
  .route("/:id")
  .get(wrapAsync(getStudentById))
  .put(wrapAsync(editStudent))
  .delete(wrapAsync(deleteStudent));

module.exports = router;
