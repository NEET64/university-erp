const Student = require("../models/student");

module.exports.allStudents = async (req, res) => {
  let students = await Student.find({}).populate("class");
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
