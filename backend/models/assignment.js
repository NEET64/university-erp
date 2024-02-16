const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  aim: {
    type: String,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  dueOn: {
    type: Date,
    default: new Date(new Date().getTime() + 7 * 24 * 3600 * 1000),
  },
  postedOn: {
    type: Date,
    default: new Date(),
    required: true,
  },
  marks: {
    type: Number,
    default: 10,
    min: 10,
    max: 100,
    required: true,
  },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
module.exports = Assignment;
