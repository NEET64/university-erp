const express = require("express");
const {
  allCourses,
  createCourse,
  editCourse,
  deleteCourse,
} = require("../controllers/admin/course");
const router = express.Router();
const ExpressError = require("../utils/ExpressErrors");
const wrapAsync = require("../utils/wrapAsync");

router.get("/dashboard", (req, res) => {
  // throw new ExpressError(400, "Dashboard error");
  res.json({
    message: "at the admin Dashboard",
  });
});

router.route("/course").get(wrapAsync(allCourses)).post(createCourse);

router
  .route("/course/:id")
  .put(wrapAsync(editCourse))
  .delete(wrapAsync(deleteCourse));

module.exports = router;
