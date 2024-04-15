const Faculty = require("../models/faculty");
const jwt = require("jsonwebtoken");

module.exports.facultySignin = async (req, res) => {
  // const { success } = UserSignInSchema.safeParse(req.body);
  // if (!success) {
  //   return res.status(400).json({
  //     message: "Incorrect Input",
  //   });
  // }

  const user = await Faculty.findOne({
    name: req.body.username,
    password: req.body.password,
  });
  if (!user) {
    return res.status(400).json({
      message: "Username or Password is incorrect",
    });
  }
  const facultyId = user._id;
  const token = jwt.sign({ facultyId }, process.env.JWT_SECRET);
  res.json({
    message: "user Found",
    id: facultyId,
    name: user.name,
    token: token,
  });
};

module.exports.allFaculties = async (req, res) => {
  let faculties = await Faculty.find({}).populate("courses");
  res.json({
    faculties: faculties,
  });
};

module.exports.createFaculty = async (req, res) => {
  let body = req.body;

  let faculty = new Faculty(body);
  await faculty.save();

  res.json({
    message: `${faculty.name} Added`,
  });
};

module.exports.editFaculty = async (req, res) => {
  let { id } = req.params;
  let body = req.body;

  let faculty = await Faculty.findByIdAndUpdate(id, body);

  res.json({
    message: `${faculty.name} Edited`,
  });
};

module.exports.deleteFaculty = async (req, res) => {
  let { id } = req.params;

  let faculty = await Faculty.findByIdAndDelete(id);

  res.json({
    message: `${faculty.name} Deleted`,
  });
};

module.exports.facultyCourses = async (req, res) => {
  let { id } = req.params;
  let faculty = await Faculty.findById(id).populate("courses", "name");

  res.json(faculty.courses);
};
