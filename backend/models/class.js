const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
    max: 8,
  },
  courseTeaching: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      facultyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
      },
    },
  ],
  coordinatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
  },
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
