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
    message: `${student.name} Added`,
  });
};

module.exports.editStudent = async (req, res) => {
  let { id } = req.params;
  let body = req.body;

  let student = await Student.findByIdAndUpdate(id, body);

  res.json({
    message: `${student.name} Edited`,
  });
};

module.exports.deleteStudent = async (req, res) => {
  let { id } = req.params;

  let student = await Student.findByIdAndDelete(id);

  res.json({
    message: `${student.name} Deleted`,
  });
};
