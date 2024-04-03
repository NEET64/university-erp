const Student = require("../models/student");

module.exports.getStudents = async (req, res) => {
  let classId = req.query.id || "";
  let students = await Student.find({}).populate("class");
  if (classId) students = await Student.find({ class: classId });
  res.json({
    students: students,
  });
};

module.exports.createStudent = async (req, res) => {
  let body = req.body;

  let student = new Student(body);
  await student.save();

  res.json({
    message: `${student.name} added`,
  });
};

module.exports.editStudent = async (req, res) => {
  let { id } = req.params;
  let body = req.body;

  let student = await Student.findByIdAndUpdate(id, body);

  res.json({
    message: `${student.name} edited`,
  });
};

module.exports.deleteStudent = async (req, res) => {
  let { id } = req.params;

  let student = await Student.findByIdAndDelete(id);

  res.json({
    message: `${student.name} deleted`,
  });
};

module.exports.getStudentById = async (req, res) => {
  console.log("hello");
  let { id } = req.params;
  try {
    let student = await Student.findById(id).populate({
      path: "class",
      populate: {
        path: "courseTeaching",
        populate: [
          {
            path: "courseId",
            select: "name code credit _id",
          },
          { path: "facultyId", select: "name" },
        ],
      },
    });

    console.log(student);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
