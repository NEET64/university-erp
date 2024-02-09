const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  credit: {
    type: String,
    required: true,
    min: 0,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
