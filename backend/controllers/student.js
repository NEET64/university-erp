const Student = require("../models/student");

const jwt = require("jsonwebtoken");

module.exports.studentSignin = async (req, res) => {
  // const { success } = UserSignInSchema.safeParse(req.body);
  // if (!success) {
  //   return res.status(400).json({
  //     message: "Incorrect Input",
  //   });
  // }

  const user = await Student.findOne({
    name: req.body.username,
    password: req.body.password,
  });
  if (!user) {
    return res.status(400).json({
      message: "Username or Password is incorrect",
    });
  }
  const studentId = user._id;
  const token = jwt.sign({ studentId }, process.env.JWT_SECRET);
  res.json({
    message: "user Found",
    id: studentId.toString(),
    name: user.name,
    token: token,
  });
};

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

module.exports.getStudentById = async (req, res) => {
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

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({
      student,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
