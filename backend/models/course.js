const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  code: String,
  name: String,
  credit: Number,
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
