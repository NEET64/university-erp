const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const facultySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  ],
  classCoordinator: {
    type: Schema.Types.ObjectId,
    ref: "Class",
  },
});

const Faculty = mongoose.model("Faculty", facultySchema);
module.exports = Faculty;
