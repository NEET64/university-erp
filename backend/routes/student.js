const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const {
  allStudents,
  createStudent,
  editStudent,
  deleteStudent,
} = require("../controllers/student");
const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.json({
    message: "at the student Dashboard",
  });
});

router.route("/").get(wrapAsync(allStudents)).post(wrapAsync(createStudent));

router
  .route("/:id")
  .put(wrapAsync(editStudent))
  .delete(wrapAsync(deleteStudent));

module.exports = router;
