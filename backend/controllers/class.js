const Class = require("../models/class");

module.exports.allClasses = async (req, res) => {
  let classes = await Class.find({})
    .populate("courseTeaching.courseId")
    .populate("courseTeaching.facultyId")
    .populate("coordinatorId");
  res.json({
    classes: classes,
  });
};

module.exports.createClass = async (req, res) => {
  let body = req.body;

  let _class = new Class(body);
  await _class.save();

  res.json({
    message: `${_class.name} Added`,
  });
};

module.exports.editClass = async (req, res) => {
  let { id } = req.params;
  let body = req.body;

  let _class = await Class.findByIdAndUpdate(id, body);

  res.json({
    message: `${_class.name} Edited`,
  });
};

module.exports.deleteClass = async (req, res) => {
  let { id } = req.params;

  let _class = await Class.findByIdAndDelete(id);

  res.json({
    message: `${_class.name} Deleted`,
  });
};
