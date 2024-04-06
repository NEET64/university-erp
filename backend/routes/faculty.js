const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const {
  allFaculties,
  createFaculty,
  editFaculty,
  deleteFaculty,
  facultyCourses,
  facultySignin,
} = require("../controllers/faculty");
const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.json({
    message: "at the faculty Dashboard",
  });
});

router.route("/").get(wrapAsync(allFaculties)).post(wrapAsync(createFaculty));

router.route("/signin").post(wrapAsync(facultySignin));

router
  .route("/:id")
  .put(wrapAsync(editFaculty))
  .delete(wrapAsync(deleteFaculty))
  .get(wrapAsync(facultyCourses));

module.exports = router;
