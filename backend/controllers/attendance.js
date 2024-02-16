const Attendance = require("../models/attendance");

module.exports.getAttandence = async (req, res) => {
  let { studentId } = req.params;
  let studentAttendance = await Attendance.find({
    students: { $in: [studentId] },
  }).select("date status");

  res.json({
    attendance: studentAttendance,
  });
};

module.exports.createAttendance = async (req, res) => {
  let body = req.body;

  let attendance = new Attendance(body);
  await attendance.save();

  res.json({
    message: `attendance added`,
  });
};
