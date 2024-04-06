const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: "pass",
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  ],
  classCoordinator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
});

const Faculty = mongoose.model("Faculty", facultySchema);
module.exports = Faculty;
