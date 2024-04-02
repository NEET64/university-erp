const Class = require("../models/class");

module.exports.allClasses = async (req, res) => {
  let classes = await Class.find({});
  res.json({
    classes: classes,
  });
};

module.exports.createClass = async (req, res) => {
  let body = req.body;

  let _class = new Class(body);
  await _class.save();

  res.json({
    message: `${_class.name} added`,
  });
};

module.exports.editClass = async (req, res) => {
  let { id } = req.params;
  let body = req.body;

  let _class = await Class.findByIdAndUpdate(id, body);

  res.json({
    message: `${_class.name} edited`,
  });
};

module.exports.deleteClass = async (req, res) => {
  let { id } = req.params;

  let _class = await Class.findByIdAndDelete(id);

  res.json({
    message: `${_class.name} deleted`,
  });
};

// get all classes where faculty id is {req.params}
module.exports.facultyClasses = async (req, res) => {
  let { id } = req.params;

  let classes = await Class.find({ "courseTeaching.facultyId": id }).select(
    "name"
  );

  res.json(classes);
};
