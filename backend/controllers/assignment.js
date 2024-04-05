const Assignment = require("../models/assignment");
const Student = require("../models/student");
const Class = require("../models/class");

// posting new assignment
module.exports.createAssignment = async (req, res) => {
  try {
    const body = req.body;
    const allStudents = await Student.find({ class: body.class });
    const finalStudents = [];

    for (const student of allStudents) {
      let obj = { student: student._id };
      finalStudents.push(obj);
    }

    // Create assignment document
    const assignmentDoc = new Assignment({
      title: body.title,
      aim: body.aim,
      class: body.class,
      course: body.course,
      faculty: body.faculty,
      students: finalStudents,
    });

    const newAssignment = await assignmentDoc.save();

    res.json({
      message: `${newAssignment.aim} added`,
      assignment: newAssignment,
    });
  } catch (error) {
    console.error("Error creating assignment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// All assignment on the server
module.exports.allAssignment = async (req, res) => {
  const assignments = await Assignment.find();

  res.status(200).json(assignments);
};

//find assignments for student
module.exports.courseAssignment = async (req, res) => {
  const studentId = req.body.studentId;
  const courseId = req.body.courseId;

  const assignments = await Assignment.find({
    "students.student": studentId,
    course: courseId,
  }).populate("class faculty students.student course");

  res.json(assignments);
};

// get assignments for each faculty
module.exports.facultyAllAssignment = async (req, res) => {
  console.log(req.params);

  const facultyAssignments = await Assignment.find({
    faculty: req.params.facultyid,
  })
    .populate("course", "name code")
    .populate("faculty", "name courses")
    .populate("class", "name branch semester");

  res.status(200).json(facultyAssignments);
};

// delete assignment
module.exports.deleteAssignment = async (req, res) => {
  const deletedassignment = await Assignment.findOneAndDelete({
    _id: req.params.assignmentid,
  });

  console.log(deletedassignment);

  res.status(200).json({
    message: "Assignment deleted successfully",
    deletedassignment,
  });
};
