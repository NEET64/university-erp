const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
    default: "pass",
  },
  enrollmentNumber: {
    type: String,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
