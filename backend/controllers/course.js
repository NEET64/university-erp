// const courseData = require("../../data/course");
const Course = require("../models/course");

module.exports.allCourses = async (req, res) => {
  let courses = await Course.find({});
  res.json({
    courses: courses,
  });
};

module.exports.createCourse = async (req, res) => {
  let body = req.body;

  let course = new Course(body);
  await course.save();

  res.json({
    message: `${course.name} added`,
  });
};

module.exports.editCourse = async (req, res) => {
  let { id } = req.params;
  let body = req.body;

  let course = await Course.findByIdAndUpdate(id, body);

  res.json({
    message: `${course.name} edited`,
  });
};

module.exports.deleteCourse = async (req, res) => {
  let { id } = req.params;

  let course = await Course.findByIdAndDelete(id);

  res.json({
    message: `${course.name} deleted`,
  });
};
