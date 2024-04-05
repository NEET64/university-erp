const Faculty = require("../models/faculty");

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
