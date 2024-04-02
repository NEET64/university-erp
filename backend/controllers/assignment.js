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

// All assignments for each student
module.exports.classAllAssignment = async (req, res) => {
  let id = req.params.classid;

  const classAssignment = await Assignment.find({ class: id });
  res.status(201).json(classAssignment);
};

// All assignments for each teacher
module.exports.courseAllAssignment = async (req, res) => {
  console.log(req.params);
  const courseAssignment = await Assignment.find({
    class: req.params.classid,
    course: req.params.courseid,
  });

  res.status(201).json(courseAssignment);
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
